PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.OrdersController = Marionette.Controller.extend({
        initialize: function (options) {
            console.log('initializing orders controller');
        },

        start: function () {
            console.log('starting orders controller');

            this.showContainerTemplate();


            this.orders = new App.Orders.Models.Orders();
            this.orders.fetch();

            this.showOrdersView();
        },

        onClose: function () {
            console.log('closing orders controller');
            App.container.close();
        },

        showContainerTemplate: function () {
            this.containerLayout = new App.Layout.Container2ColumnLayout();
            App.container.show(this.containerLayout);
        }
        ,
        showOrdersView: function () {
            this.selectedOrder = null;
            this.ordersView = new App.Orders.Views.OrdersView({ collection: this.orders });
            this.containerLayout.mainpanel.show(this.ordersView);
        },

        closeOrdersView: function () {
            this.containerLayout.mainpanel.close();
        }
    });

}); 