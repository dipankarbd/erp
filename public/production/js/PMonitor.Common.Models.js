PMonitor.module('Common.Models', function (Models, App, Backbone, Marionette, $, _) { 

    Models.Country = Backbone.Model.extend({
        urlRoot: 'common/countries' 
    }); 
     
    Models.Countries = Backbone.Collection.extend({
        url: 'common/countries',
        model: Models.Country 
    }); 
     
    Models.Buyer = Backbone.Model.extend({
        urlRoot: 'common/buyers' 
    });
     
    Models.Buyers = Backbone.Collection.extend({
        url: 'common/buyers',
        model: Models.Buyer 
    }); 

});