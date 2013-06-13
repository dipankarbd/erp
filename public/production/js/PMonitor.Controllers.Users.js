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
            this.listenTo(App.vent, "users:saveuser", this.saveUser, this);
            this.listenTo(App.vent, "users:cancelsavinguser", this.cancelSavingUser, this);
            this.listenTo(App.vent, "users:deleted", this.seletedUserDeleted, this);
            this.listenTo(App.vent, "users:applyfilter", this.applyFilter, this);
            this.listenTo(App.vent, "users:clearfilter", this.clearFilter, this);
        },

        onClose: function () {
            console.log('closing users controller');
            App.container.close();
        },

        userSelected: function (user) {
            this.selectedUser = user;
            this.showCommandViewForUserSelected();
        },

        createNewUser: function (user) {
            this.closeFilterView();
            this.showCommandViewForCreateNewUser();
            this.showCreateNewUserView();
        },

        editUser: function (user) {
            this.closeFilterView();
            this.showCommandViewForCreateEditUser();
            this.showEditUserView();
        },

        deleteUser: function () {
            var self = this;
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

        },

        saveNewUser: function () {
            var self = this;
            if (this.createNewUserView) {
                var model = this.createNewUserView.getEnteredData();
                this.users.create({
                    firstname: model.firstname,
                    lastname: model.lastname,
                    email: model.email,
                    username: model.userid,
                    usertype: model.usertype,
                    password: model.password,
                    password_confirmation: model.confirmpassword
                }, {
                    wait: true,
                    success: function (model, response) {
                        console.log('success');
                        self.showUsersView();
                        self.showFilterView();
                        self.showCommandViewForUserNotSelected();

                        var alertModel = new App.Alert.Models.Alert({ body: 'User Created Successfully!' });
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
                        var alertModel = new App.Alert.Models.Alert({ heading: 'Error in creating new user!', body: msg });
                        App.vent.trigger("alert:showerror", alertModel);
                    }
                });
            }


        },

        cancelSavingNewUser: function () {
            this.showUsersView();
            this.showFilterView();
            this.showCommandViewForUserNotSelected();
            App.vent.trigger('alert:close');
        },

        saveUser: function () {
            var self = this;
            if (this.editUserView && this.selectedUser) {
                var model = this.editUserView.getEnteredData();

                this.selectedUser.save({
                    firstname: model.firstname,
                    lastname: model.lastname,
                    email: model.email,
                    usertype: model.usertype
                }, {
                    wait: true,
                    success: function (model, response) {
                        console.log('success');
                        self.showUsersView();
                        self.showFilterView();
                        self.showCommandViewForUserNotSelected();

                        var alertModel = new App.Alert.Models.Alert({ body: 'User Saved Successfully!' });
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
                        var alertModel = new App.Alert.Models.Alert({ heading: 'Error in saving user!', body: msg });
                        App.vent.trigger("alert:showerror", alertModel);
                    }
                });
            }


        },

        cancelSavingUser: function () {
            this.showUsersView();
            this.showFilterView();
            this.showCommandViewForUserNotSelected();
            App.vent.trigger('alert:close');
        },

        seletedUserDeleted: function () {
            this.showCommandViewForUserNotSelected();
        },

        applyFilter: function (filterModel) {
            this.filteredUser = this.users.getFilteredCollection(filterModel);

            this.selectedUser = null;
            this.usersView = new App.Users.Views.UsersView({ collection: this.filteredUser });
            this.containerLayout.mainpanel.show(this.usersView);
            this.closeCommandView();
            this.closeAlert();
        },

        clearFilter: function () {
            this.filteredUser = null;
            this.showUsersView();
            this.closeCommandView();
            this.closeAlert();
        },

        showUsersView: function () {
            this.selectedUser = null;
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

        showCommandViewForCreateEditUser: function () {
            this.commandView = new App.Users.Views.CommandViewEditUser();
            this.containerLayout.commandpanel.show(this.commandView);
        },
        closeCommandView: function () {
            this.containerLayout.commandpanel.close();
        },

        showCreateNewUserView: function () {
            this.createNewUserView = new App.Users.Views.CreateNewUserView();
            this.containerLayout.mainpanel.show(this.createNewUserView);
            this.closeAlert();
        },

        closeCreateNewUserView: function () {
            this.containerLayout.mainpanel.close();
            this.closeAlert();
        },

        showEditUserView: function () {
            this.editUserView = new App.Users.Views.EditUserView({ model: this.selectedUser });
            this.containerLayout.mainpanel.show(this.editUserView);
            this.closeAlert();
        },

        closeEditUserView: function () {
            this.containerLayout.mainpanel.close();
            this.closeAlert();
        },

        closeAlert: function () {
            App.vent.trigger('alert:close');
        }
    });

}); 