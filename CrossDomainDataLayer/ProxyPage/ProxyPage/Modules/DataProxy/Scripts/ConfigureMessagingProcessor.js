'use strict';

var messageProcessor = {
    lastMessageSource: '',
    lastMessageOrigin: '',
    receiveMessage: function (event) {
        var eventData;
        try {
            //alert("ReceiveMessage data=" + event.data + " origin=" + event.origin);
            messageProcessor.lastMessageSource = event.source;
            messageProcessor.lastMessageOrigin = event.origin;
            eventData = JSON.parse(event.data);
            //  The REST method call is supplied by the caller, but we provide the site context that this page supports.
            messageProcessor.callRestAPI("http://jehcwsserver/sites/DevTest/_api/" + eventData.method);
        } catch (error) {
        }
    },

    callRestAPI: function (restUrl) {
        $.ajax(
        {
            url: restUrl, method: "GET",
            headers:
            {
                "accept": "application/json;odata=verbose",
            },
            success: messageProcessor.onSuccess,
            error: messageProcessor.onError
        });
    },

    onSuccess: function (data) {
        if (data) {
            var response = { header: "response", message: data };
            messageProcessor.lastMessageSource.postMessage(JSON.stringify(response), messageProcessor.lastMessageOrigin);
        }
    },

    onError: function (err) {
        var response = { header: "error", message: err };
        messageProcessor.lastMessageSource.postMessage(JSON.stringify(response), messageProcessor.lastMessageOrigin);
    }
};

//alert("Calling attachEventHandlers");
_spBodyOnLoadFunctionNames.push("attachEventHandlers");
//alert("Back from attachEventHandlers");

function attachEventHandlers() {
    if (typeof window.addEventListener !== "undefined") {
        window.addEventListener("message", messageProcessor.receiveMessage, false);
    }
}
