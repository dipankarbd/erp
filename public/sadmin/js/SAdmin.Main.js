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
        App.StaticData.apps = new App.Apps.Models.Apps();
        this.userlist = new App.User.Models.UserList();
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
            if (self.tabheaderlist.at(0).get('active')) {
                self.showUserDetailsView();
            }
            else {
                self.showUserAppsView();
            }
        });
        App.vent.on("user:cancel", function (user) {
            if (self.tabheaderlist.at(0).get('active')) {
                self.showUserDetailsView();
            }
            else {
                self.showUserAppsView();
            }
        });
        App.vent.on("alert:showerror", function (model) {
            self.showErrorAlert(model);
        });
        App.vent.on("alert:showsuccess", function (model) {
            self.showSuccessAlert(model);
        });

        App.vent.on("userapp:selected", function (userapp) {
            self.showUserAppDetails(userapp);
        });

        App.vent.on("userapp:create", function () {
            self.showUserAppDetailsForCreate();
        });
    };


    _.extend(Main.Controller.prototype, {
        start: function () {
            App.StaticData.apps.fetch({ async: false });
            this.userlist.fetch({ async: false });
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
            this.selectedUser = this.userlist.find(function (model) {
                return username === model.get('username');
            });
            if (this.selectedUser != null) {
                this.selectedUser.set({ 'selected': true });
                App.vent.trigger("user:selected", this.selectedUser);
            }
        },
        showUserAppsView: function () {
            this.clearAlert();
            if (this.selectedUser) {
                this.userApps = new App.Apps.Models.UserApps([], { userid: this.selectedUser.get('id') });
                this.userApps.fetch({ async: false });
                this.detailslayout.tabpane.show(this.appslayout);
                this.userAppsView = new App.Apps.Views.UserApps({ collection: this.userApps });
                this.userAppCreateButtonView = new App.Apps.Views.UserAppCreateButton();
                this.appslayout.applist.show(this.userAppsView);
                this.appslayout.newuserapp.show(this.userAppCreateButtonView);
            }
            else {
                this.detailslayout.tabpane.close();
            }
        },
        showUserAppDetails: function (userapp) {
            this.userAppDetailsModel = new App.Apps.Models.UserAppDetails({
                id: userapp.get('id'),
                appid: userapp.get('appid'),
                roleid: userapp.get('roleid'),
                apps: App.StaticData.apps
            });

            var selectedApp = App.StaticData.apps.find(function (model) {
                return userapp.get('appid') === model.get('id');
            }); 
            this.userAppDetailsModel.set({ roles: selectedApp.get('roles') });

            this.userAppDetailsView = new App.Apps.Views.UserAppDetails({ model: this.userAppDetailsModel });
            this.appslayout.appdetails.show(this.userAppDetailsView);
        },
        showUserAppDetailsForCreate: function () {
            this.userAppDetailsModel = new App.Apps.Models.UserAppDetails({
                id: 0,
                appid: 0,
                roleid: 0,
                apps: App.StaticData.apps,
                userid: this.selectedUser.get('id')
            });

            var selectedAppId = 0;

            if( App.StaticData.apps.length>0){
                selectedAppId = App.StaticData.apps.at(0).get('id');
            }
             
            var selectedApp = App.StaticData.apps.find(function (model) {
                return selectedAppId === model.get('id');
            });

            var roles = selectedApp.get('roles');

            var roleId = 0;
            if (roles.length > 0) roleid = roles[0].id;

            
            this.userAppDetailsModel.set({ roles: selectedApp.get('roles') });

            this.userAppDetailsView = new App.Apps.Views.UserAppDetails({ model: this.userAppDetailsModel });
            this.appslayout.appdetails.show(this.userAppDetailsView);
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