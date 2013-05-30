SAdmin.module('User.Models', function (Models, App, Backbone, Marionette, $, _) {

    // User Model
    // ----------
    Models.User = Backbone.Model.extend({
        urlRoot: 'users',

        defaults: {
            selected: false
        }
    });

    // UserList Model
    // ----------
    Models.UserList = Backbone.Collection.extend({
        url: 'users',
        model: Models.User,

        getFilteredCollection: function (filtermodel) {
            var filterdData = this.filter(function (data) { 
                return (data.get('firstname').startsWith(filtermodel.get('firstname'))) &&
                       (data.get('lastname').startsWith(filtermodel.get('lastname'))) &&
                       (data.get('email').startsWith(filtermodel.get('email'))) &&
                       (data.get('username').startsWith(filtermodel.get('username')));
            });
            return new Models.UserList(filterdData);
        }
    });

});