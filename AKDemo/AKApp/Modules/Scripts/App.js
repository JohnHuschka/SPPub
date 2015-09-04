'use strict';

var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();

//  Have to get user information loaded pretty early because the form edit/read mode depends on the user.
context.load(user);
context.executeQueryAsync(
     Function.createDelegate(null, function () { }),
     Function.createDelegate(null, function () { alert("Load of user information failed.") }));

var supervisor;
var hostweburl;
hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));
var appweburl;
appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
var spItemId;
spItemId = decodeURIComponent(getQueryStringParameter("SPListItemId"));

// Function to retrieve a query string value.
// For production purposes you may want to use
// a library to handle the query string.
function getQueryStringParameter(paramToRetrieve) {
    var params = document.URL.split("?")[1].split("&");
    var strParams = "";
    for (var i = 0; i < params.length; i = i + 1) {
        var singleParam = params[i].split("=");
        if (singleParam[0] == paramToRetrieve)
            return singleParam[1];
    }
}
