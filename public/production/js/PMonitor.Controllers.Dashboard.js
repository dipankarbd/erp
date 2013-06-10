PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.DashboardController = Marionette.Controller.extend({
       initialize: function (options) {
            console.log('initializing dashboard controller');
        },

        start: function () {
            console.log('starting dashboard controller');
        },

        onClose: function () {
            console.log('closing dashboard controller');
        }

    });

}); 