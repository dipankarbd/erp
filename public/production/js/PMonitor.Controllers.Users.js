PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.UsersController = Marionette.Controller.extend({
      initialize: function (options) {
            console.log('initializing users controller');
        },

        start: function () {
            console.log('starting users controller');
        },

        onClose: function () {
            console.log('closing users controller');
        }

    });

}); 