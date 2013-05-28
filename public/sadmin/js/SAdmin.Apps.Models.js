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
});