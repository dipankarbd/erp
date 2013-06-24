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

            this.orders = new App.Orders.Models.Orders();
            this.orders.fetch();

            this.showOrdersView();
            this.showCommandViewForOrderNotSelected();

            this.listenTo(App.vent, "orders:selected", this.orderSelected, this);
            this.listenTo(App.vent, "orders:createneworder", this.createNewOrder, this);
            this.listenTo(App.vent, "orders:saveneworder", this.saveNewOrder, this);
            this.listenTo(App.vent, "orders:cancelsavingneworder", this.cancelSavingNewOrder, this);
        },

        onClose: function () {
            console.log('closing orders controller');
            App.container.close();
        },

        orderSelected : function(order){
            this.selectedOrder = order;
            this.showCommandViewForOrderSelected();
        },

        createNewOrder: function (user) {
            this.closeFilterView();
            this.closeCommandView();
            this.showCreateNewOrderView();
        },

        saveNewOrder: function (model) {
            var self = this;
            this.orders.create({
                buyer: model.get('buyer'),
                style: model.get('style'),
                gg: model.get('gg'),
                quantity: model.get('quantity'),
                machinecount: model.get('machinecount'),
                timeperpcs: model.get('timeperpcs')
            }, {
                wait: true,
                success: function (model, response) {
                    self.showOrdersView();
                    //self.showFilterView();
                    self.showCommandViewForOrderNotSelected();

                    var alertModel = new App.Alert.Models.Alert({ body: 'Order Created Successfully!' });
                    App.vent.trigger("alert:showsuccess", alertModel);
                },
                error: function (model, err) {
                    var response = $.parseJSON(err.responseText);
                    var msg = '';

                    if (response instanceof Array) {
                        for (var i = 0; i < response.length; i++) {
                            msg += '<p>' + response[i] + '</p>';
                        }
                    } else {
                        msg = response;
                    }
                    var alertModel = new App.Alert.Models.Alert({ heading: 'Error in creating new order!', body: msg });
                    App.vent.trigger("alert:showerror", alertModel);
                }
            });
        },

        cancelSavingNewOrder: function () {
            this.showOrdersView();
            //self.showFilterView();
            this.showCommandViewForOrderNotSelected();
            this.closeAlert();
        },

        showOrdersView: function () {
            this.selectedOrder = null; 
            this.ordersView = new App.Orders.Views.OrdersView({ collection: this.orders });
            this.containerLayout.mainpanel.show(this.ordersView);
        },

        closeOrdersView: function () {
            this.containerLayout.mainpanel.close();
        },

        showCommandViewForOrderNotSelected: function () {
            this.commandView = new App.Orders.Views.CommandViewOrderNotSelected();
            this.containerLayout.commandpanel.show(this.commandView);
        },

        showCommandViewForOrderSelected: function () {
            this.commandView = new App.Orders.Views.CommandViewOrderSelected();
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