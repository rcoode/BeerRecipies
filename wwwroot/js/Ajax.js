/// <reference types="jquery" />
/// <reference types="bootstrap-notify" />
var Ajax = /** @class */ (function () {
    function Ajax() {
        var _this = this;
        this.$loading = $("#ajax_loader");
        $.ajaxSetup({
            beforeSend: function (xhr) {
                _this.$loading.show();
            },
            complete: function (xhr, status) {
                _this.$loading.hide();
                if (xhr.getResponseHeader("X-Responded-JSON") !== null && JSON.parse(xhr.getResponseHeader("X-Responded-JSON")).status === "401") {
                    _this.timeout();
                }
            },
            error: function (jqxhr, settings, thrownError) {
                if (jqxhr.status.toString() === "401") { // Login has expired so tell the user and reload the page which will cause a redirect to the login page
                    _this.timeout();
                }
                else {
                    _this.ajaxError(jqxhr);
                }
            }
        });
    }
    Ajax.prototype.timeout = function () {
        var _this = this;
        var options = {};
        options.message = "Login has timed out";
        options.callback = function () { return _this.reload(); };
        bootbox.alert(options);
    };
    Ajax.prototype.ajaxError = function (xhr) {
        console.log(JSON.stringify(xhr));
        var options = {};
        options.message = "Oops! Something went wrong.";
        // options.callback = () => this.reload();
        bootbox.alert(options);
    };
    Ajax.prototype.callServer = function (handler, data, callback) {
        var _this = this;
        var currentUrl = $("body").attr("current-url");
        var ajaxSettings = {};
        ajaxSettings.type = "POST";
        ajaxSettings.dataType = "json";
        ajaxSettings.url = currentUrl + "?handler=" + handler;
        ajaxSettings.data = data;
        ajaxSettings.success = function (response) { callback(response); };
        ajaxSettings.error = function (xhr) {
            _this.ajaxError(xhr);
        };
        ajaxSettings.headers = { "RequestVerificationToken": $("body").attr("xsrf-token") };
        $.ajax(ajaxSettings);
    };
    Ajax.prototype.reload = function () {
        window.location.reload();
    };
    Ajax.prototype.notifyInfo = function (message, $element) {
        this.notify(message, "info");
    };
    Ajax.prototype.notify = function (message, type) {
        var options = {};
        options.message = message;
        var settings = {};
        settings.type = type;
        settings.delay = 1000;
        $.notify(options, settings);
    };
    return Ajax;
}());
//# sourceMappingURL=Ajax.js.map