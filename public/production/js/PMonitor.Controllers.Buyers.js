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
            this.countries = new App.Common.Models.Countries();
            this.countries.fetch();

            this.showBuyersView();
            this.showFilterView();
            this.showCommandViewForBuyerNotSelected();

            this.listenTo(App.vent, "buyers:selected", this.buyerSelected, this);
            this.listenTo(App.vent, "buyers:applyfilter", this.applyFilter, this);
            this.listenTo(App.vent, "buyers:clearfilter", this.clearFilter, this);
            this.listenTo(App.vent, "buyers:createnewbuyer", this.createNewBuyer, this);
            this.listenTo(App.vent, "buyers:editselectedbuyer", this.editBuyer, this);
            this.listenTo(App.vent, "buyers:deleteselectedbuyer", this.deleteBuyer, this);
            this.listenTo(App.vent, "buyers:savenewbuyer", this.saveNewBuyer, this);
            this.listenTo(App.vent, "buyers:cancelsavingnewbuyer", this.cancelSavingNewBuyer, this);
        },

        onClose: function () {
            console.log('closing buyers controller');
            App.container.close();
        },

        buyerSelected: function (buyer) {
            this.selectedBuyer = buyer;
            this.showCommandViewForBuyerSelected();
        },

        createNewBuyer: function (user) {
            this.closeFilterView();
            this.closeCommandView();
            this.showCreateNewBuyerView();
        },

        editBuyer: function (user) {
            //this.closeFilterView();
            //this.showCommandViewForCreateEditUser();
            //this.showEditUserView();
        },

        deleteBuyer: function () {
            /* var self = this;
            if (this.selectedUser) {
            bootbox.confirm("Are you sure, you want to delete this user?", function (result) {
            if (result === true) {
            self.selectedUser.destroy({ wait: true,
            success: function (model, response) {
            App.vent.trigger("users:deleted", alertModel);
            var alertModel = new App.Alert.Models.Alert({ body: 'User Deleted Successfully!' });
            App.vent.trigger("alert:showsuccess", alertModel);
            },
            error: function (model, err) {
            var alertModel = new App.Alert.Models.Alert({ heading: 'Error in deleting user!', body: err.responseText });
            App.vent.trigger("alert:showerror", alertModel);
            }
            });
            }
            });
            }
            */
        },

        saveNewBuyer: function (model) {
            var self = this;
            this.buyers.create({
                companyname: model.get('companyname'),
                country: model.get('country'),
                address: model.get('address'),
                email: model.get('email'),
                phone: model.get('phone'),
                website: model.get('website'),
                user_firstname: model.get('userfirstname'),
                user_lastname: model.get('userlastname'),
                user_email: model.get('useremail'),
                user_username: model.get('useruserid'),
                user_password: model.get('userpassword'),
                user_password_confirmation: model.get('userconfirmpassword')
            }, {
                wait: true,
                success: function (model, response) { 
                    self.showBuyersView();
                    self.showFilterView();
                    self.showCommandViewForBuyerNotSelected();

                    var alertModel = new App.Alert.Models.Alert({ body: 'Buyer Created Successfully!' });
                    App.vent.trigger("alert:showsuccess", alertModel);
                },
                error: function (model, err) {
                    var response = $.parseJSON(err.responseText);
                    var msg = '';

                    if (response instanceof Array) {
                        for (var i = 0; i < response.length; i++) {
                            msg += '<p>' + response[i] + '</p>';
                        }
                    } else {
                        msg = response;
                    }
                    var alertModel = new App.Alert.Models.Alert({ heading: 'Error in creating new buyer!', body: msg });
                    App.vent.trigger("alert:showerror", alertModel);
                }
            });
        },

        cancelSavingNewBuyer: function () {
            this.showBuyersView();
            this.showFilterView();
            this.showCommandViewForBuyerNotSelected();
            App.vent.trigger('alert:close');
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
        },

        showCreateNewBuyerView: function () {
            var newBuyerModel = new App.Buyers.Models.Buyer();
            newBuyerModel.set({ countries: this.countries });
            this.createNewBuyerView = new App.Buyers.Views.CreateNewBuyerView({ model: newBuyerModel });
            this.containerLayout.mainpanel.show(this.createNewBuyerView);
            this.closeAlert();
        },

        closeCreateNewBuyerView: function () {
            this.containerLayout.mainpanel.close();
            this.closeAlert();
        },

        applyFilter: function (filterModel) {
            this.filteredBuyers = this.buyers.getFilteredCollection(filterModel);

            this.closeCommandView();
            this.closeAlert();
            this.clearSelection();

            this.selectedBuyer = null;

            this.buyersView = new App.Buyers.Views.BuyersView({ collection: this.filteredBuyers });
            this.containerLayout.mainpanel.show(this.buyersView);
        },

        clearFilter: function () {
            this.filteredBuyer = null;

            this.closeCommandView();
            this.closeAlert();
            this.clearSelection();

            this.showBuyersView();
        },

        closeAlert: function () {
            App.vent.trigger('alert:close');
        },

        clearSelection: function () {
            if (this.selectedBuyer) {
                this.selectedBuyer.set({ selected: false });
            }
        }

    });

}); 