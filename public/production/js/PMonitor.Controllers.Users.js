PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.UsersController = Marionette.Controller.extend({
        initialize: function (options) {
            console.log('initializing users controller');
        },

        start: function () {
            console.log('starting users controller');

            this.containerLayout = new App.Layout.ContainerLayout();
            App.container.show(this.containerLayout);


            this.users = new App.Users.Models.UserList();
            this.users.fetch();

            this.showUsersView();
            this.showFilterView();
            this.showCommandViewForUserNotSelected();

            this.listenTo(App.vent, "users:selected", this.userSelected, this);
        },

        onClose: function () {
            console.log('closing users controller');
            App.container.close();
        },

        userSelected: function (user) {
            this.showCommandViewForUserSelected();
        },

        showUsersView: function () {
            this.usersView = new App.Users.Views.UsersView({ collection: this.users });
            this.containerLayout.mainpanel.show(this.usersView);
        },

        hideUsersView: function () {
            this.containerLayout.mainpanel.close();
        },

        showFilterView: function () {
            this.filterView = new App.Users.Views.FilterView();
            this.containerLayout.filterpanel.show(this.filterView);
        },

        showCommandViewForUserNotSelected: function () {
            this.commandView = new App.Users.Views.CommandViewUserNotSelected();
            this.containerLayout.commandpanel.show(this.commandView);
        },

        hideCommandViewForUserNotSelected: function () {
            this.containerLayout.commandpanel.close();
        },

        showCommandViewForUserSelected: function () {
            this.commandView = new App.Users.Views.CommandViewUserSelected();
            this.containerLayout.commandpanel.show(this.commandView);
        },

        hideCommandViewForUserSelected: function () {
            this.containerLayout.commandpanel.close();
        }
    });

}); 