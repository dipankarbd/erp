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

});