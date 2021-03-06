PMonitor.module('Dashboard.Models', function (Models, App, Backbone, Marionette, $, _) {

    Models.Order = Backbone.Model.extend({
        urlRoot: 'prodmonitor/orders/dashboard',

        pad: function (num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        },

        initialize: function () {
            this.updateComputedAttributes();
            this.on("change", this.updateComputedAttributes, this);
        },

        updateComputedAttributes: function () {
            var totalProduction = 0;
            var previousDayTotal = 0;
            var grandTotal = 0
            var balance = 0;
            var percentcompleted = 0;

            var currentdate = new Date();
            var day = currentdate.getDate();
            var month = currentdate.getMonth() + 1;
            var year = currentdate.getFullYear();
            var hour = currentdate.getHours();
            if (hour < 8) day = day - 1;
            var today = year + "-" + this.pad(month, 2) + "-" + this.pad(day, 2);


            _.each(this.get('productions'), function (p) {
                if (p.date === today) {
                    totalProduction += parseInt(p.quantity4amto8am);
                    totalProduction += parseInt(p.quantity12amto4am);
                    totalProduction += parseInt(p.quantity8pmto12am);
                    totalProduction += parseInt(p.quantity4pmto8pm);
                    totalProduction += parseInt(p.quantity12pmto4pm);
                    totalProduction += parseInt(p.quantity8amto12pm);
                }
                else {
                    previousDayTotal += parseInt(p.quantity4amto8am);
                    previousDayTotal += parseInt(p.quantity12amto4am);
                    previousDayTotal += parseInt(p.quantity8pmto12am);
                    previousDayTotal += parseInt(p.quantity4pmto8pm);
                    previousDayTotal += parseInt(p.quantity12pmto4pm);
                    previousDayTotal += parseInt(p.quantity8amto12pm);
                }

            });

            grandTotal = totalProduction + previousDayTotal;
            balance = this.get('quantity') - grandTotal;
            percentcompleted = parseInt((grandTotal / this.get('quantity')) * 100);

            this.set({ 'previousdaytotal': previousDayTotal, 'totalproduction': totalProduction, 'grandtotal': grandTotal, 'balance': balance, 'percentcompleted': percentcompleted });
        }

    });

    Models.Orders = Backbone.Collection.extend({
        url: 'prodmonitor/orders/dashboard',
        model: Models.Order
    });
});