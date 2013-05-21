SAdmin.module('Main', function (Main, App, Backbone, Marionette, $, _) {

    // Main Router
    // ---------------
    Main.Router = Marionette.AppRouter.extend({
    });

    // Main Controller (Mediator)
    Main.Controller = function () {
        this.userlist = new App.User.Models.UserList();
        this.tabheaderlist = new App.Tab.Models.HeaderItems([new App.Tab.Models.HeaderItem({ text: 'User Details', index: 0, active: true }), new App.Tab.Models.HeaderItem({ text: 'Apps', index: 1 })]);
        this.mainlayout = new App.Layout.Main();
        this.detailslayout = new App.Layout.Details();
        this.appslayout = new App.Layout.Apps();

        // Application Event Handlers
        // --------------------------
        var self = this;
        App.vent.on("user:selected", function (model) {
            self.selectedUser = model;
            self.showTabHeaderView();
            self.showUserDetailsView();
        });
        App.vent.on("usertab:selected", function (model) {
            if (model.get('index') === 0) {
                self.showUserDetailsView();
            }
            else if (model.get('index') === 1) {
                self.showAppsLayout();
            }
        });
        App.vent.on("user:createnew", function () {
            self.showCreateNewUserView();
        });
        App.vent.on("user:created", function () {
            self.showUserDetailsView();
        });
        App.vent.on("user:edit", function (user) {
            self.showUserEditView(user);
        });
        App.vent.on("user:delete", function (user) {
            self.clearTabPane();
        });
        App.vent.on("user:save", function (user) {
            self.showUserDetailsView();
        });
        App.vent.on("user:cancel", function (user) {
            self.showUserDetailsView();
        });

    };


    _.extend(Main.Controller.prototype, {
        start: function () {
            this.userlist.fetch();
            this.showMainLayout();
            this.showDetailsLayout();
            this.showFilterView();
            this.showUserlistView();
            this.showTabHeaderView();
        },

        showMainLayout: function () {
            App.container.show(this.mainlayout);
        },

        showDetailsLayout: function () {
            this.mainlayout.center.show(this.detailslayout);
        },

        showAppsLayout: function () {
            this.detailslayout.tabpane.show(this.appslayout);
        },

        showFilterView: function () {
            this.mainlayout.top.show(new App.Filter.Views.FilterView());
        },

        showUserlistView: function () {
            this.mainlayout.left.show(new App.User.Views.ListView({ collection: this.userlist }));
        },

        showTabHeaderView: function () {
            this.detailslayout.tabheader.show(new App.Tab.Views.TabView({ collection: this.tabheaderlist }));
        },

        restTabSelection: function () {
            this.tabheaderlist.resetSelection();
        },

        showUserDetailsView: function () {
            if (this.selectedUser) {
                this.detailslayout.tabpane.show(new App.User.Views.DetailsView({ model: this.selectedUser }));
            }
            else {
                this.detailslayout.tabpane.close();
            }
        },

        showCreateNewUserView: function () {
            this.detailslayout.tabpane.show(new App.User.Views.CreateView({ collection: this.userlist }));
        },

        showUserEditView: function (user) { 
            this.detailslayout.tabpane.show(new App.User.Views.EditView({ model: user }));
        },

        clearTabPane: function(){
            this.detailslayout.tabpane.close();
        }

    });


    // Main Initializer
    // -------------------- 
    Main.addInitializer(function () {
        var controller = new Main.Controller();
        new Main.Router({
            controller: controller
        });

        controller.start();
    });
});