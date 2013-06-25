PMonitor.module('Orders.Models', function (Models, App, Backbone, Marionette, $, _) {

    Models.Order = Backbone.Model.extend({
        urlRoot: 'prodmonitor/orders',

        defaults: {
            selected: false
        },

        initialize: function () {
            this.updateComputedAttributes();
            this.on("change", this.updateComputedAttributes, this);
        },

        updateComputedAttributes: function () {
            var totalProduction = 0;
            var previousDayTotal = 0;

            _.each(this.get('productions'), function (p) {
                totalProduction += parseInt(p.quantity4amto8am);
                totalProduction += parseInt(p.quantity12amto4am);
                totalProduction += parseInt(p.quantity8pmto12am);
                totalProduction += parseInt(p.quantity4pmto8pm);
                totalProduction += parseInt(p.quantity12pmto4pm);
                totalProduction += parseInt(p.quantity8amto12pm);
            });


            this.set({ 'previousdaytotal': previousDayTotal, 'totalproduction': totalProduction });
        }

    });


    Models.Orders = Backbone.Collection.extend({
        url: 'prodmonitor/orders',
        model: Models.Order
    });

});