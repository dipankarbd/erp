PMonitor.module('Buyers.Views', function (Views, App, Backbone, Marionette, $, _) { 
    //Buyer Item View
    Views.BuyerItemView = Backbone.Marionette.ItemView.extend({
        template: '#buyers-buyeritemview-template',
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
            'click': 'selectBuyer'
        },

        selectBuyer: function () {
            this.model.set({ 'selected': true });
            App.vent.trigger("buyers:selected", this.model);
        }
    });

    //Users View
    Views.BuyersView = Backbone.Marionette.CompositeView.extend({
        template: '#buyers-buyersview-template',
        tagName: 'table',
        className: "table table-striped table-bordered",
        itemView: Views.BuyerItemView,

        initialize: function () {
            this.listenTo(App.vent, "buyers:selected", this.toggleSelection, this);
        },

        toggleSelection: function (buyer) {
            if (buyer.get('selected')) {
                var otherSelectedBuyer = this.collection.find(function (model) {
                    return buyer !== model && model.get('selected');
                });

                if (otherSelectedBuyer != null) {
                    otherSelectedBuyer.set({ 'selected': false });
                }
            }
        },
        appendHtml: function (collectionView, itemView) {
            collectionView.$("tbody").append(itemView.el);
        }
    });

    

});