PMonitor.module('Navbar.Views', function (Views, App, Backbone, Marionette, $, _) {

    // Navbar View
    // -------------------
    Views.NavbarView = Backbone.Marionette.ItemView.extend({
        template: '#navbar-template',
        className: 'navbar-inner'
    });
});