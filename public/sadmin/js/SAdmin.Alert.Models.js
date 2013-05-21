SAdmin.module('Alert.Models', function (Models, App, Backbone, Marionette, $, _) {
    
    // Alert Model
    // ----------
    Models.Alert = Backbone.Model.extend({
        defaults:{
            heading : '',
            body : ''
        }
    });

});