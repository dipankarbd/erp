SAdmin.module('Apps.Models', function (Models, App, Backbone, Marionette, $, _) {

    // User App Item 
    Models.UserApp = Backbone.Model.extend({
        defaults: {
            selected: false
        } 
    });

    //user apps
    Models.UserApps = Backbone.Collection.extend({ 
        model: Models.UserApp,

        initialize: function (models, options) {
            this.userid = options.userid;
        },

        url: function () {
            return 'users/'+this.userid+'/apps';
        }
    });

    //app 
    Models.App = Backbone.Model.extend({  
    });

    //apps
    Models.Apps = Backbone.Collection.extend({ 
        model: Models.App, 
        url: function () {
            return 'apps';
        }
    });

    //user app details model
    Models.UserAppDetails = Backbone.Model.extend({   
    });
});