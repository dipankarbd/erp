PMonitor.module('Main', function (Main, App, Backbone, Marionette, $, _) {

    // Main Initializer
    // -------------------- 
    Main.addInitializer(function () { 
        var navController = new App.Controllers.NavbarController();
        navController.start(); 
    });

});