PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.OrdersController = Marionette.Controller.extend({
        initialize: function (options) {
            console.log('initializing orders controller');
        },

        start: function () {
            console.log('starting orders controller'); 
        },

        onClose: function () {
            console.log('closing orders controller'); 
        }
       
    });

}); 