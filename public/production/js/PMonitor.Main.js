PMonitor.module('Main', function (Main, App, Backbone, Marionette, $, _) {

    // ---------------
    Main.NavRouter = Marionette.AppRouter.extend({
        appRoutes: {
            'dashboard': 'showDashboard',
            'orders': 'showOrders',
            'buyers': 'showBuyers',
            'users': 'showUsers'
        }
    });

    // Main Initializer
    // -------------------- 
    Main.addInitializer(function () {
        var navController = new App.Controllers.NavbarController();
        var alertController = new App.Controllers.AlertController();
        new Main.NavRouter({
            controller: navController
        });
        navController.start();
        alertController.start();
    });

});