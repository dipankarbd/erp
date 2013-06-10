PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.BuyersController = Marionette.Controller.extend({
        initialize: function (options) {
            console.log('initializing buyers controller');
        },

        start: function () {
            console.log('starting buyers controller');
        },

        onClose: function () {
            console.log('closing buyers controller');
        }

    });

}); 