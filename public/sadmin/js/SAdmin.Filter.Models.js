SAdmin.module('Filter.Models', function (Models, App, Backbone, Marionette, $, _) { 
    
    // Filter Model 
    Models.Filter = Backbone.Model.extend({
        
    }); 

    // AppUser Model 
    Models.AppUser = Backbone.Model.extend({
        
    }); 

    // AppUsers Model 
    Models.AppUsers = Backbone.Collection.extend({ 
        model: Models.AppUser,

        initialize: function (models, options) {
            this.appid = options.appid;
        },

        url: function () {
            return 'appusers/'+this.appid;
        }
    }); 
 
});