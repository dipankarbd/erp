PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.BuyersController = Marionette.Controller.extend({
        initialize: function (options) {
            console.log('initializing buyers controller');
        },

        start: function () {
            console.log('starting buyers controller');

            this.containerLayout = new App.Layout.ContainerLayout();
            App.container.show(this.containerLayout);


            this.buyers = new App.Buyers.Models.Buyers();
            this.buyers.fetch();

            this.showBuyersView(); 
        },

        onClose: function () {
            console.log('closing buyers controller');
            App.container.close();
        },

         showBuyersView: function () {
            this.selectedBuyer = null;
            this.buyersView = new App.Buyers.Views.BuyersView({ collection: this.buyers });
            this.containerLayout.mainpanel.show(this.buyersView);
        },

        closeBuyersView: function () {
            this.containerLayout.mainpanel.close();
        }

    });

}); 