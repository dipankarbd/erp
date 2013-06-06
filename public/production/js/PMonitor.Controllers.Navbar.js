PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.NavbarController = Marionette.Controller.extend({
        initialize: function (options) {
        },

        start: function () {
            this.navBarModel = new App.Navbar.Models.NavbarDataModel();
            this.navBarModel.fetch();
        },

        onClose: function () {
        }
    });

}); 