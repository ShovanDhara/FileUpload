rapid = {};

rapid.isEmpty = function (str) {
    return (!str || 0 === str.length);
};

// Creates the base object for Rapid
rapid.GetBase = function () {
    return {};
};

// Creates a Dictionary structure for storing key value pairs
rapid.GetDictionary = function () {

    var self = rapid.GetBase();

    self.store = {};

    self.hasKey = function (key) {
        return self.store.hasOwnProperty(key);
    };

    self.getValue = function (key) {
        return self.store[key];
    };

    self.addValue = function (key, value) {
        self.store[key] = value;
    };

    self.updateValue = function (key, value) {
        self.store[key] = value;
    };

    self.getAll = function () {
        var vals = [];
        for (var key in self.store) {
            if (self.store.hasOwnProperty(key)) {
                vals.push(self.store[key]);
            }
        }
        return vals;
    };

    return self;
};

// Setup DI for Rapid
rapid.container = rapid.GetDictionary();
rapid.register = function (key, instance) {
    rapid.container.addValue(key, instance);
};
rapid.resolve = function (key) {
    return rapid.container.getValue(key);
};
function Eventing(obj) {

    obj.subscriptions = [];

    obj.listen = function (name, callback) {
        obj.subscriptions.push({ "name": name, "callback": callback });
        return [name, callback];
    };

    obj.ignore = function (args) {
        for (var x = 0; x < obj.subscriptions.length; x++) {
            if (obj.subscriptions[x].name === args[0], obj.subscriptions[x].callback === args[1])
                obj.subscriptions.splice(x, 1);
        }
    };

    obj.notify = function (name, args) {
        var temp = [];
        if (obj.subscriptions.length > 0) {
            for (var x = 0; x < obj.subscriptions.length; x++) {
                if (obj.subscriptions[x].name === name)
                    temp.push({ "fn": obj.subscriptions[x].callback });
            }
            for (x = 0; x < temp.length; x++) {
                temp[x].fn.apply(this, [args]);
            }
        }
    };

    return obj;
};
function Hub() {
    var self = rapid.GetBase();
    self = Eventing(self);
    return self;
};
rapid.register('hub', Hub());
function SettingsManager() {
    var self = rapid.GetBase();
    
    self.defaultSettings = rapid.GetDictionary();
    self.settings = rapid.GetDictionary();
    
    self.register = function (name, value) {
        self.settings.addValue(name, value);
    };
    
    self.resolve = function (name) {
        return self.settings.getValue(name);
    };
    
    return self;
}
rapid.register('settingsManager', SettingsManager());

function DataManager() {

    var self = rapid.GetBase();

    var hub = rapid.resolve('hub');
    var settingsManager = rapid.resolve('settingsManager');

    self.ajaxTransport = function (url, options) {

        var deferred = new $.Deferred();
        var baseUrl = settingsManager.resolve('apiUrl');
        hub.notify("api-get", "working");
        var defaults = {
            statusCode: {
                500: function ()
                {
                    bootbox.alert("Bad Server, something has gone wrong");
                },
                403: function () {
                    bootbox.alert("Session Expired, Login again");
                    setTimeout(function () {
                        window.location.href = "/Account/SignIn";
                    }, 5000);
                }
            },
            url: baseUrl + url,
            cache: false,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            success: function (result) {
                if (result) {
                    deferred.resolve(result);
                    hub.notify("api-get", "complete");
                } else {
                    bootbox.alert('Something went wrong Try again later..!!');
                }
            },
            error: function (xhr, statusText) {
                deferred.rejectWith("Error");
            }
        };

        var o = $.extend({}, defaults, options);
        $.ajax(o);
        return deferred.promise();
    };

    self.getData = function (url) {
        return self.ajaxTransport(url, { type: 'GET' });
    };

    self.postData = function (url, data) {
        return self.ajaxTransport(url, { type: 'POST', data: JSON.stringify(data) });
    };

    self.postDeleteData = function (url, data) {
        return self.ajaxTransport(url, { type: 'POST', data: JSON.stringify(data) });
    };

    return self;
};
rapid.register('dataManager', DataManager());