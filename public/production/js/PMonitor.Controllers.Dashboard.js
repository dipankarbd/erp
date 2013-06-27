PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.DashboardController = Marionette.Controller.extend({
       initialize: function (options) {
            console.log('initializing dashboard controller');
        },

        start: function () {
            console.log('starting dashboard controller');

            this.orders = new App.Dashboard.Models.Orders();
            this.orders.fetch();

            this.showOrdersView();

            this.listenTo(App.vent, "dashboard:refresh", this.refreshDashboard, this);
        },

        onClose: function () {
            console.log('closing dashboard controller');
            App.container.close();
        },

        refreshDashboard : function(){
            this.orders.fetch();
        },

        showOrdersView: function () { 
            this.ordersView = new App.Dashboard.Views.DashboardView({ collection: this.orders });
            App.container.show(this.ordersView);
        },

        closeOrdersView: function () {
            App.container.close();
        }

    });

}); 