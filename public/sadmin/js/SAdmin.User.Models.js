SAdmin.module('User.Models', function (Models, App, Backbone, Marionette, $, _) {
    
    // User Model
    // ----------
    Models.User = Backbone.Model.extend({ 
        urlRoot:'users',

        defaults: {
            selected: false
        } 
    });

    // UserList Model
    // ----------
    Models.UserList = Backbone.Collection.extend({ 
        url:'users',
        model: Models.User
    });

});