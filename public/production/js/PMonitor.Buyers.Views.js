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

    //CommandView for userlist
    Views.CommandViewBuyerNotSelected = Backbone.Marionette.ItemView.extend({
        template: '#buyers-commandview-buyernotselected-template',
        className: 'roundborder padding-10px margin-bottom-10px',

        events: {
            'click #createnewbuyer': 'createNewBuyer'
        },

        createNewBuyer: function (e) {
            e.preventDefault();
            App.vent.trigger("buyers:createnewbuyer");
        }

    });
    Views.CommandViewBuyerSelected = Backbone.Marionette.ItemView.extend({
        template: '#buyers-commandview-buyerselected-template',
        className: 'roundborder padding-10px margin-bottom-10px',

        events: {
            'click #createnewbuyer': 'createNewBuyer',
            'click #editselectedbuyer': 'editSelectedBuyer',
            'click #deleteselectedbuyer': 'deleteSelectedBuyer'
        },

        createNewBuyer: function (e) {
            e.preventDefault();
            App.vent.trigger("buyers:createnewbuyer");
        },

        editSelectedBuyer: function (e) {
            e.preventDefault();
            App.vent.trigger("buyers:editselectedbuyer");
        },

        deleteSelectedBuyer: function (e) {
            e.preventDefault();
            App.vent.trigger("buyers:deleteselectedbuyer");
        }

    });


    //FilterView
    Views.FilterView = Backbone.Marionette.ItemView.extend({
        template: '#buyers-filterview-template',
        className: 'roundborder padding-10px margin-bottom-10px',

        ui: {
            filterName: '#inputName',
            filterCountry: '#inputCountry',
            filterEmail: '#inputEmail',
            filterPhone: '#inputPhone'
        },

        events: {
            'click #clearFilter': 'clearFilter',
            'click #applyFilter': 'applyFilter'
        },

        clearFilter: function () {
            this.ui.filterName.val('');
            this.ui.filterCountry.val('');
            this.ui.filterEmail.val('');
            this.ui.filterPhone.val('');
            App.vent.trigger('buyers:clearfilter');
        },

        applyFilter: function () {
            var filterModel = new App.Users.Models.Filter({
                name: this.ui.filterName.val(),
                country: this.ui.filterCountry.val(),
                email: this.ui.filterEmail.val(),
                phone: this.ui.filterPhone.val()
            });
            App.vent.trigger('buyers:applyfilter', filterModel);
        }
    });

    //Create New Buyer View
    Views.CreateNewBuyerView = Backbone.Marionette.ItemView.extend({
        template: '#buyers-createnewbuyer-template',
        className: 'roundborder padding-10px',

        ui: {
            companyname: '#companyname',
            country: '#country',
            address: '#address',
            email: '#email',
            phone: '#phone',
            website: '#website',

            userfirstname: '#user-firstname',
            userlastname: '#user-lastname',
            useremail: '#user-email',
            useruserid: '#user-userid',
            userpassword: '#user-password',
            userconfirmpassword: '#user-confirmpassword'
        },

        events: {
            'click #savenewbuyerdetails': 'saveBuyerInfo',
            'click #cancelsavingnewbuyerdetails': 'cancelSavingBuyerInfo'
        },

        saveBuyerInfo: function () {
            this.model.set({
                companyname: this.ui.companyname.val(),
                country: this.ui.country.val(),
                address: this.ui.address.val(),
                email: this.ui.email.val(),
                phone: this.ui.phone.val(),
                website: this.ui.website.val(),
                userfirstname: this.ui.userfirstname.val(),
                userlastname: this.ui.userlastname.val(),
                useremail: this.ui.useremail.val(),
                useruserid: this.ui.useruserid.val(),
                userpassword: this.ui.userpassword.val(),
                userconfirmpassword: this.ui.userconfirmpassword.val()
            });
            App.vent.trigger("buyers:savenewbuyer", this.model);
        },

        cancelSavingBuyerInfo: function () {
            App.vent.trigger("buyers:cancelsavingnewbuyer");
        }

    });

});