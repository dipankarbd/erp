PMonitor.module('Orders.Models', function (Models, App, Backbone, Marionette, $, _) {

    Models.Order = Backbone.Model.extend({
        urlRoot: 'prodmonitor/orders',

        defaults: {
            selected: false
        },

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

            this.set({ 'previousdaytotal': previousDayTotal, 'totalproduction': totalProduction, 'grandtotal': grandTotal, 'balance': balance });
        }

    });


    Models.Orders = Backbone.Collection.extend({
        url: 'prodmonitor/orders',
        model: Models.Order
    });

    Models.Production = Backbone.Model.extend({

        defaults: {
            quantity4amto8am: 0,
            quantity12amto4am: 0,
            quantity8pmto12am: 0,
            quantity4pmto8pm: 0,
            quantity12pmto4pm: 0,
            quantity8amto12pm: 0
        },

        pad: function (num, size) {
            var s = num + "";
            while (s.length < size) s = "0" + s;
            return s;
        },

        isToday: function () {
            var currentdate = new Date();
            var day = currentdate.getDate();
            var month = currentdate.getMonth() + 1;
            var year = currentdate.getFullYear();
            var hour = currentdate.getHours();
            if (hour < 8) day = day - 1;
            var today = year + "-" + this.pad(month, 2) + "-" + this.pad(day, 2); 
            if (this.get('date') === today) return true;
            else return false;
        }
    });

    Models.Productions = Backbone.Collection.extend({
        model: Models.Production,
        initialize: function (models, options) {
            this.orderid = options.orderid;
        },

        url: function () {
            return 'prodmonitor/orders/' + this.orderid + '/productions';
        },

        getTodaysProduction: function () {
            var prod = new Models.Production();
            _.each(this.models, function (p) {
                if (p.isToday()) prod = p;
            });
            return prod;
        }
    });
});