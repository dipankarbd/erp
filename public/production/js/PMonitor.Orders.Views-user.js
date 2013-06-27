PMonitor.module('Orders.Views', function (Views, App, Backbone, Marionette, $, _) {

    //Order Item View
    Views.OrderItemView = Backbone.Marionette.ItemView.extend({
        template: '#orders-orderitemview-template-user',
        tagName: 'tr',
        modelEvents: {
            'change': 'render'
        },

        onRender: function () {
            if (this.model.get('selected')) {
                $(this.el).addClass('success');
            }
            else {
                $(this.el).removeClass('success');
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
        template: '#orders-ordersview-template-user',
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

    //Production Entry View
    Views.ProductionEntryView = Backbone.Marionette.ItemView.extend({
        template: '#orders-productionview-template',
        className: "roundborder padding-10px",

        ui: {
            quantity8amto12pm: '#quantity8amto12pm',
            quantity12pmto4pm: '#quantity12pmto4pm',
            quantity4pmto8pm: '#quantity4pmto8pm',
            quantity8pmto12am: '#quantity8pmto12am',
            quantity12amto4am: '#quantity12amto4am',
            quantity4amto8am: '#quantity4amto8am'
        },

        events: {
            'click #cancelsavingproduction': 'cancelSaving',
            'click #saveproduction': 'save'
        },

        cancelSaving: function () {
            App.vent.trigger('productions:cancelsaving');
        },

        save: function () {
            this.model.set({
                quantity8amto12pm: this.ui.quantity8amto12pm.val(),
                quantity12pmto4pm: this.ui.quantity12pmto4pm.val(),
                quantity4pmto8pm: this.ui.quantity4pmto8pm.val(),
                quantity8pmto12am: this.ui.quantity8pmto12am.val(),
                quantity12amto4am: this.ui.quantity12amto4am.val(),
                quantity4amto8am: this.ui.quantity4amto8am.val()
            });
            App.vent.trigger('productions:save', this.model);
        }
    });

});