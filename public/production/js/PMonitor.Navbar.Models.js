PMonitor.module('Navbar.Models', function (Models, App, Backbone, Marionette, $, _) {

    //Navbar Data Model
    Models.NavbarDataModel = Backbone.Model.extend({
        urlRoot: function () {
            return 'prodmonitor/nav';
        },

        defaults: {
            brand: 'dipankar.com'
        }
    });

});