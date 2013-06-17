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
            this.showFilterView();
            this.showCommandViewForBuyerNotSelected();

            this.listenTo(App.vent, "buyers:selected", this.buyerSelected, this);
        },

        onClose: function () {
            console.log('closing buyers controller');
            App.container.close();
        },

        buyerSelected: function (buyer) {
            this.selectedBuyer = buyer;
            this.showCommandViewForBuyerSelected();
        },

        showBuyersView: function () {
            this.selectedBuyer = null;
            this.buyersView = new App.Buyers.Views.BuyersView({ collection: this.buyers });
            this.containerLayout.mainpanel.show(this.buyersView);
        },

        closeBuyersView: function () {
            this.containerLayout.mainpanel.close();
        },

        showFilterView: function () {
            this.filterView = new App.Buyers.Views.FilterView();
            this.containerLayout.filterpanel.show(this.filterView);
        },

        closeFilterView: function () {
            this.containerLayout.filterpanel.close();
        },

        showCommandViewForBuyerNotSelected: function () {
            this.commandView = new App.Buyers.Views.CommandViewBuyerNotSelected();
            this.containerLayout.commandpanel.show(this.commandView);
        },

        showCommandViewForBuyerSelected: function () {
            this.commandView = new App.Buyers.Views.CommandViewBuyerSelected();
            this.containerLayout.commandpanel.show(this.commandView);
        }, 

        closeCommandView: function () {
            this.containerLayout.commandpanel.close();
        }


    });

}); 