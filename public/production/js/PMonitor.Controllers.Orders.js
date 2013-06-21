PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.OrdersController = Marionette.Controller.extend({
        initialize: function (options) {
            console.log('initializing orders controller');
        },

        start: function () {
            console.log('starting orders controller');

            this.containerLayout = new App.Layout.ContainerLayout();
            App.container.show(this.containerLayout);

            this.buyers = new App.Common.Models.Buyers();
            this.buyers.fetch();

            this.showCommandViewForOrderrNotSelected();

            this.listenTo(App.vent, "orders:createneworder", this.createNewOrder, this);

        },

        onClose: function () {
            console.log('closing orders controller');
            App.container.close();
        },

        createNewOrder: function (user) {
            this.closeFilterView();
            this.closeCommandView();
            this.showCreateNewOrderView();
        },

        showCommandViewForOrderrNotSelected: function () {
            this.commandView = new App.Orders.Views.CommandViewOrderNotSelected();
            this.containerLayout.commandpanel.show(this.commandView);
        },

        closeCommandView: function () {
            this.containerLayout.commandpanel.close();
        },

        showCreateNewOrderView: function () {
            var newOrderModel = new App.Orders.Models.Order();
            newOrderModel.set({ buyers: this.buyers });
            this.createNewOrderView = new App.Orders.Views.CreateNewOrderView({ model: newOrderModel });
            this.containerLayout.mainpanel.show(this.createNewOrderView);
            this.closeAlert();
        },

        closeCreateNewOrderView: function () {
            this.containerLayout.mainpanel.close();
            this.closeAlert();
        },

        closeFilterView: function () {
            this.containerLayout.filterpanel.close();
        },

        closeAlert: function () {
            App.vent.trigger('alert:close');
        }

    });

}); 