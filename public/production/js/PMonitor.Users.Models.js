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
        model: Models.UserItem
    }); 

});