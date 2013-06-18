PMonitor.module('Common.Models', function (Models, App, Backbone, Marionette, $, _) {

    // Country Model
    // ----------
    Models.Country = Backbone.Model.extend({
        urlRoot: 'common/countries' 
    });

    // UserList Model
    // ----------
    Models.Countries = Backbone.Collection.extend({
        url: 'common/countries',
        model: Models.Country 
    }); 
});