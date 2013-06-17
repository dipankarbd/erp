PMonitor.module('Buyers.Models', function (Models, App, Backbone, Marionette, $, _) {

    // Buyer Model
    // ----------
    Models.Buyer = Backbone.Model.extend({
        urlRoot: 'prodmonitor/buyers',

        defaults: {
            selected: false
        }
    });

    // BuyerList Model
    // ----------
    Models.Buyers = Backbone.Collection.extend({
        url: 'prodmonitor/buyers',
        model: Models.Buyer  
        
    });

    Models.Filter = Backbone.Model.extend({});
});