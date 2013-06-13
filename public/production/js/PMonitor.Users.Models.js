PMonitor.module('Users.Models', function (Models, App, Backbone, Marionette, $, _) {

    // Usesr Model
    // ----------
    Models.UserItem = Backbone.Model.extend({
        urlRoot: 'prodmonitor/users',

        defaults: {
            selected: false
        }
    });

    // UserList Model
    // ----------
    Models.UserList = Backbone.Collection.extend({
        url: 'prodmonitor/users',
        model: Models.UserItem,

        getFilteredCollection: function (filtermodel) {
            var filterdData = this.filter(function (data) { 
                return (data.get('firstname').toLowerCase().startsWith(filtermodel.get('firstname').toLowerCase())) &&
                       (data.get('lastname').toLowerCase().startsWith(filtermodel.get('lastname').toLowerCase())) &&
                       (data.get('email').toLowerCase().startsWith(filtermodel.get('email').toLowerCase())) &&
                       (data.get('username').toLowerCase().startsWith(filtermodel.get('username').toLowerCase()));
            });
            return new Models.UserList(filterdData);
        }
    });

    Models.Filter = Backbone.Model.extend({});
});