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

});