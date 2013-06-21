PMonitor.module('Orders.Models', function (Models, App, Backbone, Marionette, $, _) {

     Models.Order = Backbone.Model.extend({
        urlRoot: 'prodmonitor/orders',

        defaults: {
            selected: false
        }
    });

  
    Models.Orders = Backbone.Collection.extend({
        url: 'prodmonitor/orders',
        model: Models.Order 
    });

});