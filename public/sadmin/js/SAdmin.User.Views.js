SAdmin.module('User.Views', function (Views, App, Backbone, Marionette, $, _) {

    // Users No user view
    // -------------------
    Views.EmptyView = Backbone.Marionette.ItemView.extend({
        template: "#no-users-template",
        tagName: 'li'
    });

    // Users Item View
    // -------------------
    Views.ItemView = Backbone.Marionette.ItemView.extend({
        template: "#useritemview-template",
        tagName: 'li',

        modelEvents: {
            'change': 'render'
        },

        events: {
            'click': 'showUserDetails'
        },

        showUserDetails: function () {
            this.model.set({ 'selected': true });
            App.vent.trigger("user:selected", this.model);
        }
    });

    // Users List View
    // -------------------
    Views.ListView = Backbone.Marionette.CollectionView.extend({
        itemView: Views.ItemView,
        emptyView: Views.EmptyView,
        tagName: 'ul',
        className: 'userlist',

        initialize: function () {
            var self = this;
            App.vent.on("user:selected", function (user) { self.toggleSelection(user); });
        },

        toggleSelection: function (user) {
            if (user.get('selected')) {
                var otherSelectedUser = this.collection.find(function (model) {
                    return user !== model && model.get('selected');
                });

                if (otherSelectedUser != null) {
                    otherSelectedUser.set({ 'selected': false });
                }
            }
        }
    });

    // Details View
    // -----------------------------
    Views.DetailsView = Backbone.Marionette.ItemView.extend({
        template: "#user-details-view-template",

        events: {
            'click #edituser': 'editUser',
            'click #deleteuser': 'deleteUser'
        },

        editUser: function () {
            App.vent.trigger("user:edit", this.model);
        },

        deleteUser: function () {
            var self = this;
            bootbox.confirm("Are you sure, you want to delete this user?", function (result) {
                if (result === true) {
                    self.model.destroy({ wait: true,
                        success: function (model, response) {
                            App.vent.trigger("user:deleted");
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
    });

    // Edit View
    // --------------------------
    Views.EditView = Backbone.Marionette.ItemView.extend({
        template: "#user-details-editview-template",

        ui: {
            firstname: '#firstname',
            lastname: '#lastname',
            email: '#email'
        },

        events: {
            'click #saveuserdetails': 'saveUser',
            'click #cancelsavinguserdetails': 'cancelUser'
        },

        saveUser: function () {
            this.model.save({
                firstname: this.ui.firstname.val(),
                lastname: this.ui.lastname.val(),
                email: this.ui.email.val()
            }, {
                wait: true,
                success: function (model, response) {
                    App.vent.trigger("user:saved", this.model);
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
        },

        cancelUser: function () {
            App.vent.trigger("user:cancel", this.model);
        }
    });

    // Create View
    // -------------------
    Views.CreateView = Backbone.Marionette.ItemView.extend({
        template: "#user-details-newview-template",

        ui: {
            firstname: '#firstname',
            lastname: '#lastname',
            email: '#email',
            userid: '#userid',
            password: '#password',
            confirmpassword: '#confirmpassword'
        },

        events: {
            'click #savenewuserdetails': 'saveUser',
            'click #cancelsavingnewuserdetails': 'cancelUser'
        },

        saveUser: function () {
            this.collection.create({
                firstname: this.ui.firstname.val(),
                lastname: this.ui.lastname.val(),
                email: this.ui.email.val(),
                username: this.ui.userid.val(),
                password: this.ui.password.val(),
                password_confirmation: this.ui.confirmpassword.val()
            }, {
                wait: true,
                success: function (model, response) {
                    App.vent.trigger("user:created", this.model);
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

        },

        cancelUser: function () {
            App.vent.trigger("user:cancel", this.model);
        }
    });
});