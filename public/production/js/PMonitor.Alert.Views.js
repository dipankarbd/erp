PMonitor.module('Alert.Views', function (Views, App, Backbone, Marionette, $, _) {

    // Error
    // -------------------
    Views.ErrorView = Backbone.Marionette.ItemView.extend({
        model:App.Alert.Models.Alert,
        template: "#alert-template",
        className: "alert alert-block alert-error"
    });

    // Success
    // -------------------
    Views.SuccessView = Backbone.Marionette.ItemView.extend({
        model:App.Alert.Models.Alert,
        template: "#alert-template",
        className: "alert alert-block alert-success"
    });

    // Information
    // -------------------
    Views.InfoView = Backbone.Marionette.ItemView.extend({
        model:App.Alert.Models.Alert,
        template: "#alert-template",
        className: "alert alert-block alert-info"
    });

});