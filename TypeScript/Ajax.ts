/// <reference types="jquery" />
/// <reference types="bootstrap-notify" />

class Ajax {
    $loading: JQuery<HTMLElement>;

    constructor() {
        this.$loading = $("#ajax_loader");

        $.ajaxSetup({
            beforeSend: (xhr) => {
                this.$loading.show();
            },
            complete: (xhr, status) => {
                this.$loading.hide();
                if (xhr.getResponseHeader("X-Responded-JSON") !== null && JSON.parse(xhr.getResponseHeader("X-Responded-JSON")).status === "401") {
                    this.timeout();
                }
            },
            error: (jqxhr, settings, thrownError) => {
                if (jqxhr.status.toString() === "401") { // Login has expired so tell the user and reload the page which will cause a redirect to the login page
                    this.timeout();
                } else {
                    this.ajaxError(jqxhr);
                }
            }
        });
    }

    private timeout() {
        let options: BootboxAlertOptions = {} as BootboxAlertOptions;
        options.message = "Login has timed out";
        options.callback = () => this.reload();
        bootbox.alert(options); 
    }

    private ajaxError(xhr) {
        console.log(JSON.stringify(xhr));

        let options: BootboxAlertOptions = {} as BootboxAlertOptions;
        options.message = "Oops! Something went wrong.";
       // options.callback = () => this.reload();
        bootbox.alert(options);
    }

    public callServer(handler: string, data: any, callback: any) {
        let currentUrl = $("body").attr("current-url");
        let ajaxSettings: JQueryAjaxSettings = {} as JQueryAjaxSettings;
        ajaxSettings.type = "POST";
        ajaxSettings.dataType = "json";
        ajaxSettings.url = currentUrl + "?handler=" + handler;
        ajaxSettings.data = data;
        ajaxSettings.success = (response) => { callback(response); };
        ajaxSettings.error = (xhr) => {
            this.ajaxError(xhr);
        };
        ajaxSettings.headers = { "RequestVerificationToken": $("body").attr("xsrf-token") };
        $.ajax(ajaxSettings);
    }

    public reload() {
        window.location.reload();
    }

    public notifyInfo(message: string, $element?: JQuery<HTMLElement>) {
        this.notify(message, "info");
    }

    private notify(message: string, type: string) {
        var options = <NotifyOptions>{};
        options.message = message;
        var settings = <NotifySettings>{};
        settings.type = type;
        settings.delay = 1000;
        $.notify(options, settings);
    }
}
