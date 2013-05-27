SAdmin.module('Apps.Models', function (Models, App, Backbone, Marionette, $, _) {

    // App Model
    // ----------
    Models.AppItem = Backbone.Model.extend({
        urlRoot: 'apps'
    });

    Models.AppList = Backbone.Collection.extend({
        url: 'apps',
        model: Models.AppItem
    });

    //Roles Model

    Models.RoleItem = Backbone.Model.extend({
        urlRoot: 'apps'
    });

    Models.Roles = Backbone.Collection.extend({
        model: Models.RoleItem,
        initialize: function (models, options) {
            this.appid = options.appid;
        },

        setAppId: function (id) {
            this.appid = id;
        },
        url: function () {
            return 'apps/' + this.appid + '/roles';
        }
    });

});