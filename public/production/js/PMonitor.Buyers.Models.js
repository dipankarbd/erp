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
        model: Models.Buyer ,
        
        getFilteredCollection: function (filtermodel) {
            var filterdData = this.filter(function (data) { 
                return (data.get('company').toLowerCase().startsWith(filtermodel.get('name').toLowerCase())) &&
                       (data.get('countryname').toLowerCase().startsWith(filtermodel.get('country').toLowerCase())) &&
                       (data.get('email').toLowerCase().startsWith(filtermodel.get('email').toLowerCase())) &&
                       (data.get('phone').toLowerCase().startsWith(filtermodel.get('phone').toLowerCase()));
            });
            return new Models.Buyers(filterdData);
        } 
        
    });

    Models.Filter = Backbone.Model.extend({});
});