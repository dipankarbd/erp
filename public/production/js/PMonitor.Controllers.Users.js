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
            this.listenTo(App.vent, "users:createnewuser", this.createNewUser, this);
            this.listenTo(App.vent, "users:editselecteduser", this.editUser, this);
            this.listenTo(App.vent, "users:deleteselecteduser", this.deleteUser, this);
            this.listenTo(App.vent, "users:savenewuser", this.saveNewUser, this);
            this.listenTo(App.vent, "users:cancelsavingnewuser", this.cancelSavingNewUser, this);
        },

        onClose: function () {
            console.log('closing users controller');
            App.container.close();
        },

        userSelected: function () {
            this.showCommandViewForUserSelected();
        },

        createNewUser: function (user) {
            this.closeFilterView();
            this.showCommandViewForCreateNewUser();
            this.showCreateNewUserView();
        },

        editUser: function (user) {
            this.closeFilterView();
        },

        deleteUser: function () {

        },

        saveNewUser: function () {
            this.showUsersView();
            this.showFilterView();
            this.showCommandViewForUserNotSelected();
        },

        cancelSavingNewUser: function () {
            this.showUsersView();
            this.showFilterView();
            this.showCommandViewForUserNotSelected();
        },

        showUsersView: function () {
            this.usersView = new App.Users.Views.UsersView({ collection: this.users });
            this.containerLayout.mainpanel.show(this.usersView);
        },

        closeUsersView: function () {
            this.containerLayout.mainpanel.close();
        },

        closeUsersView: function () {
            this.containerLayout.mainpanel.close();
        },

        showFilterView: function () {
            this.filterView = new App.Users.Views.FilterView();
            this.containerLayout.filterpanel.show(this.filterView);
        },

        closeFilterView: function () {
            this.containerLayout.filterpanel.close();
        },

        showCommandViewForUserNotSelected: function () {
            this.commandView = new App.Users.Views.CommandViewUserNotSelected();
            this.containerLayout.commandpanel.show(this.commandView);
        },
        showCommandViewForUserSelected: function () {
            this.commandView = new App.Users.Views.CommandViewUserSelected();
            this.containerLayout.commandpanel.show(this.commandView);
        },

        showCommandViewForCreateNewUser: function () {
            this.commandView = new App.Users.Views.CommandViewCreateNewUser();
            this.containerLayout.commandpanel.show(this.commandView);
        },

        closeCommandView: function () {
            this.containerLayout.commandpanel.close();
        },

        showCreateNewUserView: function () {
            this.createNewUserView = new App.Users.Views.CreateNewUserView();
            this.containerLayout.mainpanel.show(this.createNewUserView);
        },

        closeCreateNewUserView: function () {
            this.containerLayout.mainpanel.close();
        }
    });

}); 