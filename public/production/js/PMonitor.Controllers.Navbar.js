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

            //deafult show dashbard controller
            this.startDashboardController();

            var self = this;
            App.vent.on("navbar:selected", function (nav) {
                switch (nav) {
                    case 'dashboard':
                        self.closeAllControllers();
                        self.startDashboardController();
                        break;
                    case 'orders':
                        self.closeAllControllers();
                        self.startOrdersController();
                        break;
                    case 'users':
                        self.closeAllControllers();
                        self.startUsersController();
                        break;
                    case 'buyers':
                        self.closeAllControllers();
                        self.startBuyersController();
                        break;
                    default:
                        break;
                }
            });
        },

        onClose: function () {
            App.navbar.close();
        },


        closeAllControllers: function () {
            this.closeDashboardController();
            this.closeOrdersController();
            this.closeBuyersController();
            this.closeUsersController();
        },

        startDashboardController: function () {
            this.dashboardController = new App.Controllers.DashboardController();
            this.dashboardController.start();
        },

        closeDashboardController: function () {
            if (this.dashboardController) {
                this.dashboardController.close();
                this.dashboardController = null;
            }
        },

        startOrdersController: function () {
            this.ordersController = new App.Controllers.OrdersController();
            this.ordersController.start();
        },

        closeOrdersController: function () {
            if (this.ordersController) {
                this.ordersController.close();
                this.ordersController = null;
            }
        },

        startBuyersController: function () {
            this.buyersController = new App.Controllers.BuyersController();
            this.buyersController.start();
        },

        closeBuyersController: function () {
            if (this.buyersController) {
                this.buyersController.close();
                this.buyersController = null;
            }
        },

        startUsersController: function () {
            this.usersController = new App.Controllers.UsersController();
            this.usersController.start();
        },

        closeUsersController: function () {
            if (this.usersController) {
                this.usersController.close();
                this.usersController = null;
            }
        },


        //routes methods
        showDashboard: function () {
            App.vent.trigger("navbar:selected", 'dashboard');
        },
        showOrders: function () {
            App.vent.trigger("navbar:selected", 'orders');
        },
        showBuyers: function () {
            App.vent.trigger("navbar:selected", 'buyers');
        },
        showUsers: function () {
            App.vent.trigger("navbar:selected", 'users');
        }

    });

}); 