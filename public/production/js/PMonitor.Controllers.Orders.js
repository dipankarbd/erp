PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.OrdersController = Marionette.Controller.extend({
        initialize: function (options) {
            console.log('initializing orders controller');
        },

        start: function () {
            console.log('starting orders controller');

            this.showContainerTemplate();

            this.buyers = new App.Common.Models.Buyers();
            this.buyers.fetch();

            this.orders = new App.Orders.Models.Orders();
            this.orders.fetch();

            this.showOrdersView();
            this.showCommandViewForOrderNotSelected();

            this.listenTo(App.vent, "orders:selected", this.orderSelected, this);
            this.listenTo(App.vent, "orders:createneworder", this.createNewOrder, this);
            this.listenTo(App.vent, "orders:editselectedorder", this.editOrder, this);
            this.listenTo(App.vent, "orders:deleteselectedorder", this.deleteOrder, this);
            this.listenTo(App.vent, "orders:saveneworder", this.saveNewOrder, this);
            this.listenTo(App.vent, "orders:cancelsavingneworder", this.cancelSavingNewOrder, this);
            this.listenTo(App.vent, "orders:saveorder", this.saveOrder, this);
            this.listenTo(App.vent, "orders:cancelsavingorder", this.cancelSavingOrder, this);
            this.listenTo(App.vent, "orders:viewselectedorder", this.viewOrderDetails, this);
            this.listenTo(App.vent, "orders:backtoorderlist", this.backToOrderlist, this);
        },

        onClose: function () {
            console.log('closing orders controller');
            App.container.close();
        },

        showContainerTemplate: function () {
            this.containerLayout = new App.Layout.ContainerLayout();
            App.container.show(this.containerLayout);
        },

        showOrderDetailsTemplate: function () {
            this.orderDetailsLayout = new App.Layout.OrderDetailsLayout();
            App.container.show(this.orderDetailsLayout);
        },

        orderSelected: function (order) {
            this.selectedOrder = order;
            this.closeAlert();
            this.showCommandViewForOrderSelected();
        },

        createNewOrder: function (user) {
            this.closeFilterView();
            this.closeCommandView();
            this.showCreateNewOrderView();
        },

        editOrder: function (user) {
            this.closeFilterView();
            this.closeCommandView();
            this.showEditOrderView();
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

        saveOrder: function (model) {
            var self = this;
            this.selectedOrder.save({
                buyer: model.get('buyer'),
                style: model.get('style'),
                gg: model.get('gg'),
                quantity: model.get('quantity'),
                machinecount: model.get('machinecount'),
                timeperpcs: model.get('timeperpcs'),
                delivered: model.get('delivered')
            }, {
                wait: true,
                success: function (model, response) {
                    self.showOrdersView();
                    //self.showFilterView();
                    self.showCommandViewForOrderNotSelected();

                    var alertModel = new App.Alert.Models.Alert({ body: 'Order Saved Successfully!' });
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
                    var alertModel = new App.Alert.Models.Alert({ heading: 'Error in saving order!', body: msg });
                    App.vent.trigger("alert:showerror", alertModel);
                }
            });
        },

        cancelSavingOrder: function () {
            this.showOrdersView();
            //this.showFilterView();
            this.showCommandViewForOrderNotSelected();
            App.vent.trigger('alert:close');
        },

        viewOrderDetails: function () {
            this.showOrderDetailsTemplate();
            this.showOrderDetailsView();
            this.showOrderProductionsView();
            this.closeAlert();
        },

        backToOrderlist: function () {
            this.showContainerTemplate();
            this.clearSelection();
            this.showOrdersView();
            this.showCommandViewForOrderNotSelected(); 
        },

        deleteOrder: function () {
            var self = this;
            if (this.selectedOrder) {
                bootbox.confirm("Are you sure, you want to delete this order?", function (result) {
                    if (result === true) {
                        self.selectedOrder.destroy({ wait: true,
                            success: function (model, response) {
                                App.vent.trigger("orders:deleted", alertModel);
                                var alertModel = new App.Alert.Models.Alert({ body: 'Order Deleted Successfully!' });
                                App.vent.trigger("alert:showsuccess", alertModel);
                            },
                            error: function (model, err) {
                                var alertModel = new App.Alert.Models.Alert({ heading: 'Error in deleting order!', body: err.responseText });
                                App.vent.trigger("alert:showerror", alertModel);
                            }
                        });
                    }
                });
            }
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

        showEditOrderView: function () {
            this.selectedOrder.set({ buyers: this.buyers });
            this.editSelectedOrderView = new App.Orders.Views.EditOrderView({ model: this.selectedOrder });
            this.containerLayout.mainpanel.show(this.editSelectedOrderView);
            this.closeAlert();
        },

        closeEditOrderView: function () {
            this.containerLayout.mainpanel.close();
            this.closeAlert();
        },

        showOrderDetailsView: function () {
            this.orderDetailsView = new App.Orders.Views.OrderDetailsView({ model: this.selectedOrder });
            this.orderDetailsLayout.firstpanel.show(this.orderDetailsView);
        },

        showOrderProductionsView: function () {
            this.orderProductions = new App.Orders.Models.Productions([], { orderid: this.selectedOrder.get('id') });
            this.orderProductions.fetch();

            this.orderProductionsView = new App.Orders.Views.OrderProductionsView({ collection: this.orderProductions });
            this.orderDetailsLayout.secondpanel.show(this.orderProductionsView);
        },

        closeFilterView: function () {
            this.containerLayout.filterpanel.close();
        },

        closeAlert: function () {
            App.vent.trigger('alert:close');
        },

        clearSelection: function () {
            if (this.selectedOrder) {
                this.selectedOrder.set({ selected: false });
            }
        }

    });

}); 