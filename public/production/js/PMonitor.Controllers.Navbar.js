PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.NavbarController = Marionette.Controller.extend({
        initialize: function (options) {
        },

        start: function () {
            this.navBarModel = new App.Navbar.Models.NavbarDataModel();
            this.navBarModel.fetch({ async: false });

            this.navbarView = new App.Navbar.Views.NavbarView({ model: this.navBarModel });
            App.navbar.show(this.navbarView);
        },

        onClose: function () {
            App.navbar.close();
        }
    });

}); 