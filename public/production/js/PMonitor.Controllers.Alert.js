PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //alert controller
    Controllers.AlertController = Marionette.Controller.extend({
        initialize: function (options) {
            console.log('initializing alert controller');
        },

        start: function () {
            console.log('starting alert controller');

            this.listenTo(App.vent, "alert:showerror", this.showErrorAlert, this);
            this.listenTo(App.vent, "alert:showsuccess", this.showSuccessAlert, this);
            this.listenTo(App.vent, "alert:showinfo", this.showInfoAlert, this);
            this.listenTo(App.vent, "alert:close", this.closeAlert, this);
        },

        showErrorAlert: function (alertModel) {
            App.alert.show(new App.Alert.Views.ErrorView({ model: alertModel }));
        },

        showSuccessAlert: function (alertModel) {
            App.alert.show(new App.Alert.Views.SuccessView({ model: alertModel }));
        },

        showInfoAlert: function (alertModel) {
            App.alert.show(new App.Alert.Views.InfoView({ model: alertModel }));
        },

        closeAlert: function () {
            App.alert.close();
        },

        onClose: function () {
            console.log('closing alert controller');
        }

    });

}); 