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

});