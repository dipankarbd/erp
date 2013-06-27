PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.OrdersController = Marionette.Controller.extend({
        pad: function (num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        },

        initialize: function (options) {
            console.log('initializing orders controller');
        },

        start: function () {
            console.log('starting orders controller');

            this.showContainerTemplate();


            this.orders = new App.Orders.Models.Orders();
            this.orders.fetch();

            this.showOrdersView();

            this.listenTo(App.vent, "orders:selected", this.orderSelected, this);
            this.listenTo(App.vent, "productions:save", this.saveProduction, this);
            this.listenTo(App.vent, "productions:cancelsaving", this.cancelSavingProduction, this);
        },

        onClose: function () {
            console.log('closing orders controller');
            App.container.close();
        },

        orderSelected: function (order) {
            this.selectedOrder = order;
            this.closeAlert();

            this.productions = new App.Orders.Models.Productions([], { orderid: this.selectedOrder.get('id') });
            this.productions.fetch({ async: false });

            this.todaysProduction = this.productions.getTodaysProduction();
            
            this.showProductionView();
        },

        saveProduction: function (model) {
            var self = this;
            if (model.get('id') > 0) {
                //update     
                this.todaysProduction.save({
                    quantity8amto12pm: model.get('quantity8amto12pm'),
                    quantity12pmto4pm: model.get('quantity12pmto4pm'),
                    quantity4pmto8pm: model.get('quantity4pmto8pm'),
                    quantity8pmto12am: model.get('quantity8pmto12am'),
                    quantity12amto4am: model.get('quantity12amto4am'),
                    quantity4amto8am: model.get('quantity4amto8am')
                }, {
                    wait: true,
                    success: function (model, response) {
                        var alertModel = new App.Alert.Models.Alert({ body: 'Production Saved Successfully!' });
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
                        var alertModel = new App.Alert.Models.Alert({ heading: 'Error in saving production!', body: msg });
                        App.vent.trigger("alert:showerror", alertModel);
                    }
                });
            }
            else {
                //create new
                var currentdate = new Date();
                var day = currentdate.getDate();
                var month = currentdate.getMonth() + 1;
                var year = currentdate.getFullYear();
                var hour = currentdate.getHours();
                if (hour < 8) day = day - 1;
                var today = year + "-" + this.pad(month, 2) + "-" + this.pad(day, 2);
                this.productions.create({
                    date: today,
                    order_id: this.selectedOrder.get('id'),
                    quantity8amto12pm: model.get('quantity8amto12pm'),
                    quantity12pmto4pm: model.get('quantity12pmto4pm'),
                    quantity4pmto8pm: model.get('quantity4pmto8pm'),
                    quantity8pmto12am: model.get('quantity8pmto12am'),
                    quantity12amto4am: model.get('quantity12amto4am'),
                    quantity4amto8am: model.get('quantity4amto8am')
                }, {
                    wait: true,
                    success: function (model, response) {
                        var alertModel = new App.Alert.Models.Alert({ body: 'Production Saved Successfully!' });
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
                        var alertModel = new App.Alert.Models.Alert({ heading: 'Error in saving production!', body: msg });
                        App.vent.trigger("alert:showerror", alertModel);
                    }
                });
            }
        },

        cancelSavingProduction: function () {
            this.closeProductionView();
            this.closeAlert();
            this.clearSelection();
        },

        showContainerTemplate: function () {
            this.containerLayout = new App.Layout.Container2ColumnLayout();
            App.container.show(this.containerLayout);
        }
        ,
        showOrdersView: function () {
            this.selectedOrder = null;
            this.ordersView = new App.Orders.Views.OrdersView({ collection: this.orders });
            this.containerLayout.leftpanel.show(this.ordersView);
        },

        closeOrdersView: function () {
            this.containerLayout.leftpanel.close();
        },

        showProductionView: function () {
            this.productionEntryView = new App.Orders.Views.ProductionEntryView({ model: this.todaysProduction });
            this.containerLayout.rightpanel.show(this.productionEntryView);
        },

        closeProductionView: function () {
            this.containerLayout.rightpanel.close();
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