'use strict';

var myApp = angular.module('mainApp', ["kendo.directives"]);

myApp.controller('accessRequestController', function accessRequestController($scope, AccessRequestService) {
    $scope.formMode = ""
    $scope.accessRequestId = -1;
    $scope.userName = "";
    $scope.userTitle = "";
    $scope.requestorId = -1;
    $scope.requestorName = "";
    $scope.startDate = "2000-01-01T00:00:00Z";
    $scope.departmentId = -1;
    $scope.currentStatus = "New Access Request";
    $scope.previousStatus = "New Access Request";
    $scope.eTag = "";

    $scope.gridData = new kendo.data.ObservableArray([]);
    $scope.gridColumns = [];
    $scope.departmentValues = [];
    $scope.accessResources = [];

    $scope.toolbarOptions = {
        items: [
            {
                type: "button", text: "Add Resource", click: function (e) {
                    var newRequestDetail = {};
                    newRequestDetail.Id = null;
                    newRequestDetail.accessRequestID = null;

                    if ($scope.accessResources.length > 0) {
                        newRequestDetail.resourceId = $scope.accessResources[0].Id;
                    }
                    else {
                        newRequestDetail.resourceId = -1;
                    };

                    newRequestDetail.currentStatus = "Pending Approval";
                    newRequestDetail.previousStatus = "Pending Approval";
                    newRequestDetail.transaction = "A";
                    $scope.gridData.push(newRequestDetail);
                }
            }
        ]
    };

    //  Populates the data store for the "Departments" pull down control.
    $scope.setDepartmentDropDownValues = function () {
        var promise = AccessRequestService.getDepartmentValues();
        var firstTime = true;
        promise.then(function (result) {
            result.forEach(function (entry) {
                if (firstTime == true) {
                    $scope.departmentId = entry.value;
                    firstTime = false;
                };
                $scope.departmentValues.push(entry);
            });
            //  Note that the departmentOptions are used, declaratively, by the Kendo control, in the form source.
            $scope.departmentOptions = {
                dataTextField: "text",
                dataValueField: "value",
                dataSource: $scope.departmentValues
            };
        }
            , function (reason) { alert(reason); });
    };

    //  Delete button handler for the detailed resource grid.
    $scope.deleteRow = function (e) {
        //  When this runs, "this" will be the grid.
        //e.preventDefault();
        var gridRow = $(e.currentTarget).closest("tr");
        var dataItem = this.dataItem(gridRow);
        if ($scope.formMode == "NewRequest") {
            this.dataSource.remove(dataItem);
        }
        else {
            dataItem.set("transaction", "D");
        }
    };

    //  Grid editor for a readonly column.  (Kendo grid has no concept of a read only column.)
    $scope.readOnlyEditor = function (container, options) {
        $scope.resourcesGrid.closeCell();
    };

    $scope.setGridColumns = function () {
        var promise = AccessRequestService.getResourceValues();
        promise.then(function (result) {
            var fieldDefinition = {
                field: "Id", title: "ID", hidden: true
            };
            $scope.gridColumns.push(fieldDefinition);

            fieldDefinition = {
                field: "accessRequestID", title: "Request ID", type: "number", hidden: true
            };
            $scope.gridColumns.push(fieldDefinition);

            var accessResourcesLookupValues = [];
            result.forEach(function (entry) {
                var dropDownLookupItem = {
                };
                dropDownLookupItem.value = entry.Id;
                dropDownLookupItem.text = entry.accessResource;
                accessResourcesLookupValues.push(dropDownLookupItem);

                //  Heads-up:  Populating our Access Resource store here.
                $scope.accessResources.push(entry);
            });

            //  Details on how to configure the lookup:  http://blog.falafel.com/lookup-columns-in-kendo-grid/
            fieldDefinition = {
                field: "resourceId", title: "Resource", type: "number"
            };

            fieldDefinition.values = accessResourcesLookupValues;
            $scope.gridColumns.push(fieldDefinition);

            fieldDefinition = {
                field: "currentStatus", title: "Status", editor: $scope.readOnlyEditor, width: "15%"
            };
            $scope.gridColumns.push(fieldDefinition);

            fieldDefinition = {
                command: { text: "Delete", click: $scope.deleteRow }, title: " ", width: "10%"
            };
            $scope.gridColumns.push(fieldDefinition);
            //  No button on the readonly grid.

            fieldDefinition = {
                field: "transaction", title: "transaction", hidden: true
            };
            $scope.gridColumns.push(fieldDefinition);

            //  Dynamically defining the columns because I have to retrieve the lookup values above.
            //   See http://docs.telerik.com/kendo-ui/AngularJS/the-grid-widget#dynamically-set-columns for information.
            $scope.resourcesGridOptions = {
                sortable: false,
                selectable: false,
                editable: true,
                scrollable: true,
                dataSource: $scope.gridData,
                columns: $scope.gridColumns,
                dataBound: function () {
                    var data = this.dataSource.view();
                    for (var i = 0; i < data.length; i++)
                        //  Hide deleted (but uncommitted) rows.
                        if (data[i].transaction == "D") {
                            var row = this.tbody.find("tr[data-uid='" + data[i].uid + "']");
                            row.css("display", "none");
                        }
                }
            };

            //  CRITICAL ASSUMPTION:  spItemId is set globally from the SPListItemId URL parameter.
            if ((spItemId == null) || (spItemId == "undefined")) {
                $scope.formMode = "NewRequest"
                $scope.initializeNewRequest(false);
            }
            else {
                $scope.formMode = "EditRequest";
                $scope.loadFormFromExistingRequest(spItemId);
            };
        }
            , function (reason) { alert(reason); });
    };

    //  Populates this controller with data for a given access request ID.  Drive configuration 
    //   of the form based on that data.
    $scope.loadFormFromExistingRequest = function (accessRequestId) {
        var getRequestPromise = AccessRequestService.getAccessRequest(accessRequestId);
        getRequestPromise.then(function (result) {
            result.forEach(function (entry) {
                $scope.accessRequestId = entry.Id;
                $scope.userName = entry.userName;
                $scope.requestorId = entry.requestorId;
                $scope.requestorName = entry.requestorName;
                $scope.startDate = entry.startDate;
                $scope.userTitle = entry.userTitle;
                $scope.departmentId = entry.departmentId;
                $scope.currentStatus = entry.currentStatus;
                $scope.previousStatus = entry.previousStatus;
                $scope.eTag = entry.eTag;
            });
        }
            , function (reason) { alert(reason); });

        var getDetailsPromise = AccessRequestService.getAccessRequestDetails(accessRequestId);
        getDetailsPromise.then(function (result) {
            for (var rowCounter = 0; rowCounter < result.length; rowCounter++) {
                result[rowCounter].transaction = "";
                var resourceInformation = $scope.accessResources.filter(function (resourceEntry) {
                    return (resourceEntry.Id == result[rowCounter].resourceId);
                });

                $scope.gridData.push(result[rowCounter]);
            };
        }
            , function (reason) { alert(reason); });
    };

    //  Removes all rows from the request details data grid store.
    $scope.clearRequestDetails = function () {
        var requestDetailsCount = $scope.gridData.length;
        var i;
        for (i = 1; i <= requestDetailsCount; i++) {
            var removedDetail = $scope.gridData.pop();
        };
    };

    //  Returns the Monday after the current date.
    $scope.getNextMonday = function () {
        var currentDate = new Date();
        var returnDate = currentDate;
        var currentDOW = currentDate.getDay();
        var daysToAdd;
        if (currentDOW == 0) {
            daysToAdd = 1;
        }
        else if (currentDOW == 1) {
            daysToAdd = 0;
        }
        else {
            daysToAdd = 8 - currentDOW;
        }
        returnDate.setDate(currentDate.getDate() + daysToAdd);
        return returnDate;
    };

    //  Initializes the form for a new request.
    $scope.initializeNewRequest = function () {
        $scope.loadUserContext();
        var nextMonday = $scope.getNextMonday();
        $scope.startDate = convertDateToUSDateString(nextMonday);
        $scope.initializeRequestDetailsWithStandardResources(true);
    };

    //  Add resources defined as "standard" to the request details grid.
    $scope.initializeRequestDetailsWithStandardResources = function (clearGrid) {
        if (clearGrid == true) {
            $scope.clearRequestDetails();
        };

        for (var i = 0; i < $scope.accessResources.length; i++) {
            if ($scope.accessResources[i].standardResource == true) {
                var newRequestDetail = {
                };
                newRequestDetail.Id = null;
                newRequestDetail.accessRequestID = null;
                newRequestDetail.resourceId = $scope.accessResources[i].Id;
                newRequestDetail.currentStatus = "Pending Approval";
                newRequestDetail.previousStatus = "Pending Approval";
                newRequestDetail.transaction = "A";
                $scope.gridData.push(newRequestDetail);
            };
        };
    };

    // This function prepares, loads, and then executes a SharePoint query to get the current users information
    $scope.loadUserContext = function () {
        //  CRITICAL ASSUMPTION:  User has been defined globally.
        context.load(user);
        context.executeQueryAsync($scope.onLoadUserContextSuccess, $scope.onLoadUserContextFail);
    }

    $scope.onLoadUserContextSuccess = function () {
        $scope.requestorName = user.get_title();
        $scope.requestorId = user.get_id();
        //  Couldn't get the control to refresh with the value, so I'm forcing.
        $('#requestorName').val($scope.requestorName);
        $('#requestorIdHiddenInput').val($scope.requestorId);
    }

    // This function is executed if the above call fails
    $scope.onLoadUserContextFail = function (sender, args) {
        alert('Failed to get current user name. Error:' + args.get_message());
    }

    //  Saves the data in the form to SharePoint.
    $scope.saveData = function () {
        //  I'm doing this in multiple statements because I want to run all validators on the form.  
        //   If they were in a single statement, validation would stop with the first fail (false).
        var userNameValidationResults = $scope.userNameValidator.validate();
        var userTitleValidationResults = $scope.userTitleValidator.validate();

        if (userNameValidationResults && userTitleValidationResults) {
            if ($scope.formMode == "NewRequest") {
                //  Add the Access Request
                var addAccessPromise = AccessRequestService.addAccessRequest($scope.userName, $scope.requestorId, $scope.startDate, $scope.userTitle, $scope.departmentId, "New");
                addAccessPromise.then(function (result) { // The result will have all the data inserted, including the SharePoint-supplied stuff (ID).  From here, we can insert the details.
                    $scope.accessRequestId = result.data.ID;
                    $scope.eTag = result.headers.ETAG;
                    $scope.gridData.forEach(function (entry) {
                        entry.accessRequestID = result.data.ID;

                        //  Add the access request details.
                        var addAccessDetailsPromise = AccessRequestService.addAccessRequestDetails(entry.accessRequestID, entry.resourceId);
                        addAccessDetailsPromise.then(function (result) {
                            entry.Id = result.data.ID;
                            entry.eTag = result.headers.ETAG;
                            entry.transaction = "";
                        }
                            , function (reason) { alert(reason); });
                    });

                    alert('New request for ' + $scope.userName + ' has been added.');
                }
                    , function (reason) { alert(reason); });

            }
            else {
                //  Update the Access Request
                var updateAccessPromise = AccessRequestService.updateAccessRequest($scope.accessRequestId, $scope.userName, $scope.requestorId, $scope.startDate, $scope.userTitle, $scope.departmentId, $scope.eTag);
                updateAccessPromise.then(function (headers) {
                    $scope.eTag = headers.ETAG;
                    $scope.gridData.forEach(function (entry) {
                        if (entry.accessRequestID == null) {
                            entry.accessRequestID = $scope.accessRequestId;

                            //  Add the access request details.
                            var addAccessDetailsPromise = AccessRequestService.addAccessRequestDetails(entry.accessRequestID, entry.resourceId);
                            addAccessDetailsPromise.then(function (result) {
                                entry.Id = result.data.ID;
                                entry.eTag = result.headers.ETAG;
                                entry.transaction = "";
                            }
                                , function (reason) { alert(reason); });
                        }
                        else {
                            if (entry.transaction == "D") {
                                var deleteAccessDetailsPromise = AccessRequestService.deleteAccessRequestDetails(entry.Id, entry.eTag);
                                deleteAccessDetailsPromise.then(function (result) {
                                    $scope.resourcesGrid.dataSource.remove(entry);
                                }
                                    , function (reason) { alert(reason); });
                            }
                            else {
                                //  Update the access request details.
                                var updateAccessDetailsPromise = AccessRequestService.updateAccessRequestDetails(entry.Id, entry.accessRequestID, entry.resourceId, entry.eTag);
                                updateAccessDetailsPromise.then(function (headers) {
                                    entry.eTag = headers.ETAG;
                                    entry.transaction = "";
                                }
                                    , function (reason) { alert(reason); });
                            }
                        };
                    });
                    alert('Request for ' + $scope.userName + ' has been updated.');
                }
                    , function (reason) { alert(reason); });
            }
        }
        else {
            alert("There are some errors on the form.  Please correct them before saving.");
        };
    };
});

//  $q is for running functions asynchronously.
//  $http is for remote HTTP server communication via XMLHttpRequest
myApp.service('AccessRequestService', function ($q, $http) {
    //  Retrieves all resource values, for populating a select list.
    this.getResourceValues = function () {
        var deferred = $q.defer();

        var selectClause = "$select=ID, Access_x0020_Resource,Access_x0020_Resource_x0020_Desc,Standard_x0020_Resource";
        var restUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('Access%20Resources')/Items?@target='" + hostweburl + "'&" + selectClause;
        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: restUrl,
            method: "GET",
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: function (data) {
                var detailsData = [];
                var jsonObject = JSON.parse(data.body);
                jsonObject.d.results.forEach(function (entry) {
                    var dataItem = {
                        Id: entry.ID, accessResource: entry.Access_x0020_Resource, accessResourceDescription: entry.Access_x0020_Resource_x0020_Desc, standardResource: entry.Standard_x0020_Resource
                    };
                    detailsData.push(dataItem);
                });

                deferred.resolve(detailsData);
            },
            error: function (error) {
                alert("Error in getResourceValues: " + JSON.stringify(error));
                deferred.reject('Request failed with error ' + JSON.stringify(error));
            }
        });

        return deferred.promise;
    };

    //  Retrieves all department values, for populating a select list.
    this.getDepartmentValues = function () {
        var deferred = $q.defer();

        var restUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('Departments')/Items?@target='" + hostweburl + "'&$select=ID,Title";
        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: restUrl,
            method: "GET",
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: function (data) {
                var detailsData = [];
                var jsonObject = JSON.parse(data.body);
                jsonObject.d.results.forEach(function (entry) {
                    var dataItem = {
                        value: entry.ID, text: entry.Title
                    };
                    detailsData.push(dataItem);
                });
                deferred.resolve(detailsData);
            },
            error: function (error) {
                alert("Error in getDepartmentValues: " + JSON.stringify(error));
                deferred.reject('Request failed with error ' + JSON.stringify(error));
            }
        });

        return deferred.promise;
    };

    //  Retrieves an Access Request of a given ID.
    this.getAccessRequest = function (accessRequestId) {
        var deferred = $q.defer();

        var restSelectClause = "$select=ID,New_x0020_User_x0020_Name,RequestorId,Requestor/Title,User_x0020_Title,User_x0020_Start_x0020_Date,";
        restSelectClause = restSelectClause + "User_x0020_DepartmentId,Current_x0020_Status,";
        restSelectClause = restSelectClause + "Previous_x0020_Status";
        var restExpandClause = "$expand=Requestor/Title";
        var restFilterClause = "$filter=ID eq " + accessRequestId;

        var restUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('Access%20Requests')/Items?@target='" + hostweburl + "'&" + restSelectClause + "&" + restExpandClause + "&" + restFilterClause;
        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: restUrl,
            method: "GET",
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: function (data) {
                var requestData = [];
                var jsonObject = JSON.parse(data.body);
                jsonObject.d.results.forEach(function (entry) {
                    var startDateFormatted = "";
                    if (entry.User_x0020_Start_x0020_Date != null) {
                        var startDate = new Date(entry.User_x0020_Start_x0020_Date);
                        startDateFormatted = convertDateToUSDateString(startDate);
                    };

                    var dataItem = {
                        Id: entry.ID, userName: entry.New_x0020_User_x0020_Name, requestorId: entry.RequestorId, requestorName: entry.Requestor.Title,
                        startDate: startDateFormatted,
                        userTitle: entry.User_x0020_Title,
                        departmentId: entry.User_x0020_DepartmentId, currentStatus: entry.Current_x0020_Status, 
                        previousStatus: entry.Previous_x0020_Status, eTag: entry.__metadata.etag
                    };
                    requestData.push(dataItem);
                });
                deferred.resolve(requestData);
            },
            error: function (error) {
                alert("Error in getAccessRequest: " + JSON.stringify(error));
                deferred.reject('Request failed with error ' + JSON.stringify(error));
            }
        });

        return deferred.promise;
    };

    //  Retrieves all Access Request Details for a given supplied Access Request ID.
    this.getAccessRequestDetails = function (accessRequestId) {
        var deferred = $q.defer();

        var selectClause = "$select=ID,Access_x0020_ResourceId,Access_x0020_RequestId,Current_x0020_Detail_x0020_Status";
        var restUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('Access%20Request%20Details')/Items?@target='" + hostweburl + "'&" + selectClause + "&$filter=Access_x0020_Request/Id eq " + accessRequestId;
        var executor = new SP.RequestExecutor(appweburl);
        executor.executeAsync({
            url: restUrl,
            method: "GET",
            headers: {
                "accept": "application/json;odata=verbose"
            },
            success: function (data) {
                var detailsData = [];
                var jsonObject = JSON.parse(data.body);
                jsonObject.d.results.forEach(function (entry) {
                    var dataItem = {
                        Id: entry.ID, accessRequestID: entry.Access_x0020_RequestId, resourceId: entry.Access_x0020_ResourceId,
                        previousStatus: entry.Previous_x0020_Detail_x0020_Status,
                        currentStatus: entry.Current_x0020_Detail_x0020_Status, eTag: entry.__metadata.etag
                    };

                    detailsData.push(dataItem);
                });
                deferred.resolve(detailsData);
            },
            error: function (error) {
                alert("Error in getAccessRequestDetails: " + JSON.stringify(error));
                deferred.reject('Request failed with error ' + JSON.stringify(error));
            }
        });

        return deferred.promise;
    };

    //  Adds a new access request.
    this.addAccessRequest = function (userName, requestorId, startDateString, userTitle, departmentId) {
        var deferred = $q.defer();
        var startDateEDM = "";
        var startDate = new Date(startDateString);
        startDateEDM = convertDateToEDMDate(startDate);

        var restUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('Access%20Requests')/Items?@target='" + hostweburl + "'";
        var executor = new SP.RequestExecutor(appweburl);
        var updateObject = {
            '__metadata': {
                'type': "SP.Data.Access_x0020_RequestsListItem"
            }, 'New_x0020_User_x0020_Name': userName, 'RequestorId': requestorId, 
            'User_x0020_Start_x0020_Date': startDateEDM, 'User_x0020_Title': userTitle,
            'User_x0020_DepartmentId': departmentId
        };

        executor.executeAsync({
            url: restUrl,
            method: "POST",
            body: JSON.stringify(updateObject),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var jsonObject = JSON.parse(data.body);
                //  jsonObject.d should be an object representing the newly inserted item, including information supplied by SharePoint on the insert.
                var returnResult = {
                    data: jsonObject.d, headers: data.headers
                };
                deferred.resolve(returnResult);
            },
            error: function (error) {
                alert("Error in addAccessRequest: " + JSON.stringify(error));
                deferred.reject('Request failed with error ' + JSON.stringify(error));
            }
        });

        return deferred.promise;
    };

    //  Adds a new access request details record.
    this.addAccessRequestDetails = function (accessRequestId, resourceId) {
        var deferred = $q.defer();
        var restUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('Access%20Request%20Details')/Items?@target='" + hostweburl + "'";
        var executor = new SP.RequestExecutor(appweburl);

        executor.executeAsync({
            url: restUrl,
            method: "POST",
            body: JSON.stringify({
                '__metadata': {
                    'type': "SP.Data.Access_x0020_Request_x0020_DetailsListItem"
                }, 'Access_x0020_RequestId': accessRequestId, 'Access_x0020_ResourceId': resourceId
            }),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var jsonObject = JSON.parse(data.body);
                //  jsonObject.d should be an object representing the newly inserted item, including information supplied by SharePoint on the insert.
                var returnResult = {
                    data: jsonObject.d, headers: data.headers
                };
                deferred.resolve(returnResult);
            },
            error: function (error) {
                alert("Error in addAccessRequestDetails: " + JSON.stringify(error));
                deferred.reject('Request failed with error ' + JSON.stringify(error));
            }
        });

        return deferred.promise;
    };

    //  Updates an access request.
    this.updateAccessRequest = function (accessRequestId, userName, requestorId, startDateString, userTitle, departmentId, eTag) {
        var deferred = $q.defer();
        var startDateEDM = "";
        var startDate = new Date(startDateString);
        startDateEDM = convertDateToEDMDate(startDate);

        //  Note that the update references the specific item URL rather than just the list.
        var restUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('Access%20Requests')/Items(" + accessRequestId + ")?@target='" + hostweburl + "'";
        var executor = new SP.RequestExecutor(appweburl);
        var updateObject = {
            '__metadata': {
                'type': "SP.Data.Access_x0020_RequestsListItem"
            }, 'New_x0020_User_x0020_Name': userName, 'RequestorId': requestorId,
            'User_x0020_Start_x0020_Date': startDateEDM, 'User_x0020_Title': userTitle,
            User_x0020_DepartmentId: departmentId
        };

        executor.executeAsync({
            url: restUrl,
            method: "POST",
            body: JSON.stringify(updateObject),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                //  MERGE updates only the fields we supply.  PUT would replace the entire entity.
                "X-HTTP-Method": "MERGE",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": eTag
            },
            success: function (data) {
                // For success, statusCode 204, "No Content" will be returned.  The body will be empty, but we need to capture the etag value 
                //  if we want to make subsequent updates, so I'm going to forward the headers.
                deferred.resolve(data.headers);
            },
            error: function (error) {
                alert("Error in updateAccessRequest: " + JSON.stringify(error));
                deferred.reject('Request failed with error ' + JSON.stringify(error));
            }
        });

        return deferred.promise;
    };

    //  Update an access request details record.
    this.updateAccessRequestDetails = function (accessRequestDetailsId, accessRequestId, resourceId, eTag) {
        var deferred = $q.defer();
        //  Note that the update references the specific item URL rather than just the list.
        var restUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('Access%20Request%20Details')/Items(" + accessRequestDetailsId + ")?@target='" + hostweburl + "'";
        var executor = new SP.RequestExecutor(appweburl);

        executor.executeAsync({
            url: restUrl,
            method: "POST",
            body: JSON.stringify({
                '__metadata': {
                    'type': "SP.Data.Access_x0020_Request_x0020_DetailsListItem"
                }, 'Access_x0020_RequestId': accessRequestId, 'Access_x0020_ResourceId': resourceId
            }),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                //  MERGE updates only the fields we supply.  PUT would replace the entire entity.
                "X-HTTP-Method": "MERGE",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": eTag
            },
            success: function (data) {
                // For success, statusCode 204, "No Content" will be returned.  The body will be empty, but we need to capture the etag value 
                //  if we want to make subsequent updates, so I'm going to forward the headers.
                deferred.resolve(data.headers);
            },
            error: function (error) {
                alert("Error in updateAccessRequestDetails: " + JSON.stringify(error));
                deferred.reject('Request failed with error ' + JSON.stringify(error));
            }
        });

        return deferred.promise;
    };

    //  Update status on an access request details record.
    this.updateAccessRequestDetailsStatus = function (accessRequestDetailsId, previousStatus, currentStatus, eTag) {
        var deferred = $q.defer();
        //  Note that the update references the specific item URL rather than just the list.
        var restUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('Access%20Request%20Details')/Items(" + accessRequestDetailsId + ")?@target='" + hostweburl + "'";
        var executor = new SP.RequestExecutor(appweburl);

        executor.executeAsync({
            url: restUrl,
            method: "POST",
            body: JSON.stringify({
                '__metadata': {
                    'type': "SP.Data.Access_x0020_Request_x0020_DetailsListItem"
                }, 'Current_x0020_Detail_x0020_Status': currentStatus, 'Previous_x0020_Detail_x0020_Status': previousStatus
            }),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                //  MERGE updates only the fields we supply.  PUT would replace the entire entity.
                "X-HTTP-Method": "MERGE",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": eTag
            },
            success: function (data) {
                // For success, statusCode 204, "No Content" will be returned.  The body will be empty, but we need to capture the etag value 
                //  if we want to make subsequent updates, so I'm going to forward the headers.
                deferred.resolve(data.headers);
            },
            error: function (error) {
                alert("Error in updateAccessRequestDetailsStatus: " + JSON.stringify(error));
                deferred.reject('Request failed with error ' + JSON.stringify(error));
            }
        });

        return deferred.promise;
    };

    //  Deletes an access request details record.
    this.deleteAccessRequestDetails = function (accessRequestDetailsId, eTag) {
        var deferred = $q.defer();
        //  Note that the update references the specific item URL rather than just the list.
        var restUrl = appweburl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('Access%20Request%20Details')/Items(" + accessRequestDetailsId + ")?@target='" + hostweburl + "'";
        var executor = new SP.RequestExecutor(appweburl);

        executor.executeAsync({
            url: restUrl,
            method: "POST",
            headers: {
                "X-HTTP-Method": "DELETE",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": eTag
            },
            success: function (data) {
                deferred.resolve();
            },
            error: function (error) {
                alert("Error in deleteAccessRequestDetails: " + JSON.stringify(error));
                deferred.reject('Request failed with error ' + JSON.stringify(error));
            }
        });

        return deferred.promise;
    };

});

function convertDateToUSDateString(inputDate) {
    if (inputDate != null) {
        return (inputDate.getMonth() + 1) + "/" + inputDate.getDate() + "/" + inputDate.getFullYear();
    }
};

function convertDateToEDMDate(inputDate) {
    var returnValue = "";
    if (inputDate != null) {
        if (isObjectAValidDate(inputDate)) {
            var utcDate = toUtc(inputDate);
            returnValue = (utcDate.getFullYear() + "-" + ("0" + (utcDate.getMonth() + 1)).slice(-2) + "-" + ("0" + utcDate.getDate()).slice(-2) + "T" + ("0" + utcDate.getHours()).slice(-2) + ":" + ("0" + utcDate.getMinutes()).slice(-2) + ":" + ("0" + utcDate.getSeconds()).slice(-2) + "Z");
        }
    }
    return returnValue;
};

function getCurrentDateTimeAsEDM() {
    var returnValue = "";
    var currentdate = new Date();
    var utcDate = toUtc(currentdate);
    returnValue = (utcDate.getFullYear() + "-" + ("0" + (utcDate.getMonth() + 1)).slice(-2) + "-" + ("0" + utcDate.getDate()).slice(-2) + "T" + ("0" + utcDate.getHours()).slice(-2) + ":" + ("0" + utcDate.getMinutes()).slice(-2) + ":" + ("0" + utcDate.getSeconds()).slice(-2) + "Z");
    return returnValue;
};

function isObjectAValidDate(inputObject) {
    var returnValue = false;

    if (Object.prototype.toString.call(inputObject) === "[object Date]") {
        // it is a date
        if (isNaN(inputObject.getTime())) {  // inputObject.valueOf() could also work
        }
        else {
            returnValue = true;
        }
    };
    return returnValue;
};

function fromUtc(inputDate) {
    var utcTime = inputDate.getTime();
    var localOffset = inputDate.getTimezoneOffset() * 60000;
    var local = utcTime - localOffset;
    var retval = new Date(local);
    return retval;
};

function toUtc(inputDate) {
    var localTime = inputDate.getTime();
    var localOffset = inputDate.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    var retval = new Date(utc);
    return retval;
};

