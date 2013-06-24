PMonitor.module('Orders.Views', function (Views, App, Backbone, Marionette, $, _) {

    Views.CommandViewOrderNotSelected = Backbone.Marionette.ItemView.extend({
        template: '#orders-commandview-ordernotselected-template',
        className: 'roundborder padding-10px margin-bottom-10px',

        events: {
            'click #createneworder': 'createNewOrder'
        },

        createNewOrder: function (e) {
            e.preventDefault();
            App.vent.trigger("orders:createneworder");
        }

    });
     
    Views.CommandViewOrderSelected = Backbone.Marionette.ItemView.extend({
        template: '#orders-commandview-orderselected-template',
        className: 'roundborder padding-10px margin-bottom-10px',

        events: {
            'click #createneworder': 'createNewOrder',
            'click #editselectedorder': 'editwOrder',
            'click #vieworderdetails': 'viewOrder',
            'click #deleteselectedorder': 'deleteOrder'
        },

        createNewOrder: function (e) {
            e.preventDefault();
            App.vent.trigger("orders:createneworder");
        },

        editwOrder: function (e) {
            e.preventDefault();
            App.vent.trigger("orders:editselectedorder");
        },

        viewOrder: function (e) {
            e.preventDefault();
            App.vent.trigger("orders:viewselectedorder");
        },

        deleteOrder: function (e) {
            e.preventDefault();
            App.vent.trigger("orders:deleteselectedorder");
        }

    });
    
    Views.CreateNewOrderView = Backbone.Marionette.ItemView.extend({
        template: '#orders-createneworder-template',
        className: 'roundborder padding-10px',

        ui: {
            buyer: '#buyer',
            style: '#style',
            gg: '#gg',
            quantity: '#quantity',
            machinecount: '#machinecount',
            timeperpcs: '#timeperpcs'
        },

        events: {
            'click #saveneworder': 'saveOrder',
            'click #cancelsavingneworder': 'cancelSaving'
        },

        saveOrder: function () {
            this.model.set({
                buyer: this.ui.buyer.val(),
                style: this.ui.style.val(),
                gg: this.ui.gg.val(),
                quantity: this.ui.quantity.val(),
                machinecount: this.ui.machinecount.val(),
                timeperpcs: this.ui.timeperpcs.val()
            });
            App.vent.trigger("orders:saveneworder", this.model);
        },

        cancelSaving: function () {
            App.vent.trigger("orders:cancelsavingneworder", this.model);
        }

    });

    Views.EditOrderView = Backbone.Marionette.ItemView.extend({
        template: '#orders-editorder-template',
        className: 'roundborder padding-10px',

        ui: {
            buyer: '#buyer',
            style: '#style',
            gg: '#gg',
            quantity: '#quantity',
            machinecount: '#machinecount',
            timeperpcs: '#timeperpcs'
        },

        events: {
            'click #saveorder': 'saveOrder',
            'click #cancelsavingorder': 'cancelSaving'
        },

        saveOrder: function () {
            this.model.set({
                buyer: this.ui.buyer.val(),
                style: this.ui.style.val(),
                gg: this.ui.gg.val(),
                quantity: this.ui.quantity.val(),
                machinecount: this.ui.machinecount.val(),
                timeperpcs: this.ui.timeperpcs.val()
            });
            App.vent.trigger("orders:saveorder", this.model);
        },

        cancelSaving: function () {
            App.vent.trigger("orders:cancelsavingorder", this.model);
        }

    });

    //Order Item View
    Views.OrderItemView = Backbone.Marionette.ItemView.extend({
        template: '#orders-orderitemview-template',
        tagName: 'tr',
        modelEvents: {
            'change': 'render'
        },

        onRender: function () {
            if (this.model.get('selected')) {
                $(this.el).addClass('info');
            }
            else {
                $(this.el).removeClass('info');
            }
        },
        events: {
            'click': 'selectOrder'
        },

        selectOrder: function () {
            this.model.set({ 'selected': true });
            App.vent.trigger("orders:selected", this.model);
        }
    });

    //Orders View
    Views.OrdersView = Backbone.Marionette.CompositeView.extend({
        template: '#orders-ordersview-template',
        tagName: 'table',
        className: "table table-striped table-bordered",
        itemView: Views.OrderItemView,

        initialize: function () {
            this.listenTo(App.vent, "orders:selected", this.toggleSelection, this);
        },

        toggleSelection: function (order) {
            if (order.get('selected')) {
                var otherSelectedOrder = this.collection.find(function (model) {
                    return order !== model && model.get('selected');
                });

                if (otherSelectedOrder != null) {
                    otherSelectedOrder.set({ 'selected': false });
                }
            }
        },
        appendHtml: function (collectionView, itemView) {
            collectionView.$("tbody").append(itemView.el);
        }
    });

});