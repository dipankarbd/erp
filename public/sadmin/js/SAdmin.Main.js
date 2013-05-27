SAdmin.module('Main', function (Main, App, Backbone, Marionette, $, _) {

    // Main Router
    // ---------------
    Main.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "users/:id": "showUser"
        }
    });

    // Main Controller (Mediator)
    Main.Controller = function () {
        this.userlist = new App.User.Models.UserList();
        this.apps = new App.Apps.Models.AppList();
        this.tabheaderlist = new App.Tab.Models.HeaderItems([new App.Tab.Models.HeaderItem({ text: 'User Details', index: 0, active: true }), new App.Tab.Models.HeaderItem({ text: 'Apps', index: 1 })]);
        this.mainlayout = new App.Layout.Main();
        this.detailslayout = new App.Layout.Details();
        this.appslayout = new App.Layout.Apps();

        // Application Event Handlers
        // --------------------------
        var self = this;
        App.vent.on("user:selected", function (model) {
            //self.restTabSelection();
            //self.showTabHeaderView();
            if (self.tabheaderlist.at(0).get('active')) {
                self.showUserDetailsView();
            }
            else {
                self.showUserAppsView();
            }
        });
        App.vent.on("usertab:selected", function (model) {
            if (model.get('index') === 0) {
                self.showUserDetailsView();
            }
            else if (model.get('index') === 1) {
                self.showUserAppsView();
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
        App.vent.on("user:deleted", function (user) {
            self.clearTabPane();
        });
        App.vent.on("user:saved", function (user) {
            self.showUserDetailsView();
        });
        App.vent.on("user:cancel", function (user) {
            self.showUserDetailsView();
        });
        App.vent.on("alert:showerror", function (model) {
            self.showErrorAlert(model);
        });
        App.vent.on("alert:showsuccess", function (model) {
            self.showSuccessAlert(model);
        });

        App.vent.on("userdetailsappsdropdown:selected", function (model) {
            self.roles.setAppId(model.value);
            self.roles.fetch({ async: false });
            self.rolesView = new App.Apps.Views.RolesDropdownView({ collection: self.roles });
            self.appslayout.roles.show(self.rolesView);
        });

    };


    _.extend(Main.Controller.prototype, {
        start: function () {
            this.userlist.fetch({ async: false });
            this.apps.fetch({ async: false });
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
            this.clearAlert();
            if (this.selectedUser) {
                this.detailslayout.tabpane.show(new App.User.Views.DetailsView({ model: this.selectedUser }));
            }
            else {
                this.detailslayout.tabpane.close();
            }
        },

        showCreateNewUserView: function () {
            this.clearAlert();
            this.detailslayout.tabpane.show(new App.User.Views.CreateView({ collection: this.userlist }));
        },

        showUserEditView: function (user) {
            this.clearAlert();
            this.detailslayout.tabpane.show(new App.User.Views.EditView({ model: user }));
        },

        clearTabPane: function () {
            this.clearAlert();
            this.detailslayout.tabpane.close();
        },

        clearAlert: function () {
            this.mainlayout.alert.close();
        },

        showSuccessAlert: function (alertModel) {
            this.mainlayout.alert.show(new App.Alert.Views.SuccessView({ model: alertModel }));
        },

        showInfoAlert: function (alertModel) {
            this.mainlayout.alert.show(new App.Alert.Views.InfoView({ model: alertModel }));
        },
        showErrorAlert: function (alertModel) {
            this.mainlayout.alert.show(new App.Alert.Views.ErrorView({ model: alertModel }));
        },
        showUser: function (username) {
            console.log(this.userlist);
            this.selectedUser = this.userlist.find(function (model) {
                return username === model.get('username');
            });
            if (this.selectedUser != null) {
                this.selectedUser.set({ 'selected': true });
                App.vent.trigger("user:selected", this.selectedUser);
            }
        },
        showUserAppsView: function () {
            this.detailslayout.tabpane.show(this.appslayout);
            this.appsView = new App.Apps.Views.AppsDropdownView({ collection: this.apps });
            this.appslayout.apps.show(this.appsView);

            this.roles = new App.Apps.Models.Roles([], { appid: this.appsView.getSelectedItem().value });
            this.roles.fetch({ async: false });

            this.rolesView = new App.Apps.Views.RolesDropdownView({ collection: this.roles });
            this.appslayout.roles.show(this.rolesView);
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