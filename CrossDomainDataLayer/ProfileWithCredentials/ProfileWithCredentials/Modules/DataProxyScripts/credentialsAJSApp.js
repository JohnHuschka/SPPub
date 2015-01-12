'use strict';

// The title of the iFrame in which the data proxy page is located, equivalent to web part title.
var DataProxyIFrameTitle = "DataProxy";
//  The site at which the data proxy page is located.  Will be target of message.
var DataProxySite = "http://jehcwsserver/sites/DevTest";
//  The list, in the proxy site, from which data is to be retrieved.  Will be forwarded, in a REST query, to the proxy.
var CredentialsList = "AssociateCredentials";

var credentialsAJSApp = angular.module('credentialsAJSApp', ['smart-table']);

var getParameterFromQueryString = function (queryString, paramToRetrieve) {
    var params = queryString.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
};

credentialsAJSApp.controller('SPCredentials', function SPCredentials($scope, SharePointJSOMCredentialsService) {
    $scope.refresh = function () {
        //alert("Running refresh in controller");
        var promise = SharePointJSOMCredentialsService.getCredentials(CredentialsList);
        promise.then(function (result) { $scope.items = SharePointJSOMCredentialsService.items(); $scope.userName = SharePointJSOMCredentialsService.userName(); }, function (reason) { alert(reason); });
    };

    $scope.refresh();
});

//  $q is for running functions asynchronously.
//  $http is for remote HTTP server communication via XMLHttpRequest
credentialsAJSApp.service('SharePointJSOMCredentialsService', function ($q, $http) {
    var credentials = [];
    this.accountName = "";
    this.items = function () { return credentials; };
    this.userName = function () { return this.accountName; };

    //  This is the critical function that interacts with the data proxy.
    this.getCredentials = function (listTitle) {
        var deferred = $q.defer();

        //  Setup the function that will handle the return call from the data proxy.
        var messageHandler = function (event) {
            try {
                //alert("Person, ReceiveMessage data=" + event.data + " origin=" + event.origin);
                var eventData = JSON.parse(event.data);
                eventData.message.d.results.forEach(function (entry) {
                    var row = [];
                    row.Title = entry.Title;
                    credentials.push(row);
                }
                    );
                window.removeEventListener("message", messageHandler, false);
                deferred.resolve();
            } catch (error) {
                window.removeEventListener("message", messageHandler, false);
                deferred.reject('Request failed.');
            }
        };

        //alert("Service sending message to get " + listTitle);
        //  Parse value on profile page so that account name can be displayed.
        var accountName = getParameterFromQueryString(_normalizedPageUrlForSocialItem, "accountname");
        var decodedAccount = decodeURI(accountName);
        if (decodedAccount.indexOf("\\") > -1) { this.accountName = decodedAccount.substring(decodedAccount.indexOf("\\") + 1); }
        else { this.accountName = decodedAccount; }

        //  Define REST query to be sent to data proxy page.
        var message = { method: "lists/getbytitle('" + listTitle + "')/items?$select=Title,Associate/Id,Associate/Name&$expand=Associate/Id&$filter=substringof('" + decodedAccount + "',Associate/Name)" };
        var messageAsJson = JSON.stringify(message);
        window.addEventListener("message", messageHandler, false);

        //  Find data proxy page IFRAME.
        var iFrames = jQuery("iframe[title*='" + DataProxyIFrameTitle + "']");

        if (iFrames.length == 0) { alert("Unable to find expected " + DataProxyIFrameTitle + " iFrame"); }
        else {
            //  Send the message.
            iFrames[0].contentWindow.postMessage(messageAsJson, DataProxySite);
            return deferred.promise;
        }
    };
});

function BootstrapAngular() {
    //  Find data proxy page IFRAME.
    var iFrames = jQuery("iframe[title*='" + DataProxyIFrameTitle + "']");

    if (iFrames.length == 0) { alert("Unable to find expected " + DataProxyIFrameTitle + " iFrame"); }
    else {
        // Before we can attach angular (and send a message to the proxy), the proxy page must be fully loaded in the iFrame.
        iFrames[0].addEventListener("readystatechange", function (event) {
            if (event.target.readyState == 'complete') {
                angular.bootstrap(document.getElementById('CredentialsDisplay'), ['credentialsAJSApp']);
            }
        })
    }
}

//  We put the angular bootstrap on SharePoint's document ready.
_spBodyOnLoadFunctionNames.push("BootstrapAngular");