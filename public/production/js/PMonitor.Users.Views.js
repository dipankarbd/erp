PMonitor.module('Users.Views', function (Views, App, Backbone, Marionette, $, _) {


    //User Item View
    Views.UserItemView = Backbone.Marionette.ItemView.extend({
        template: '#users-useritemview-template',
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
            'click': 'selectUser'
        },

        selectUser: function () {
            this.model.set({ 'selected': true });
            App.vent.trigger("users:selected", this.model);
        }
    });

    //Users View
    Views.UsersView = Backbone.Marionette.CompositeView.extend({
        template: '#users-usersview-template',
        tagName: 'table',
        className: "table table-striped table-bordered",
        itemView: Views.UserItemView,

        initialize: function () {
            this.listenTo(App.vent, "users:selected", this.toggleSelection, this);
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
        },
        appendHtml: function (collectionView, itemView) {
            collectionView.$("tbody").append(itemView.el);
        }
    });

    //FilterView
    Views.FilterView = Backbone.Marionette.ItemView.extend({
        template: '#users-filterview-template',
        className: 'roundborder padding-10px margin-bottom-10px',

        ui: {
            filterFirstname: '#inputFirstname',
            filterLastname: '#inputLastname',
            filterEmail: '#inputEmail',
            filterUsername: '#inputUsername' 
        },

        events: {
            'click #clearFilter': 'clearFilter',
            'click #applyFilter': 'applyFilter'
        },

        clearFilter: function () {
            this.ui.filterLastname.val('');
            this.ui.filterEmail.val('');
            this.ui.filterUsername.val(''); 
            this.ui.filterFirstname.val('');
            App.vent.trigger('users:clearfilter');
        },

        applyFilter: function () {
            var filterModel = new App.Users.Models.Filter({
                lastname: this.ui.filterLastname.val(),
                email: this.ui.filterEmail.val(),
                username: this.ui.filterUsername.val(), 
                firstname: this.ui.filterFirstname.val()
            });
            App.vent.trigger('users:applyfilter', filterModel);
        }
    });

    //CommandView for userlist
    Views.CommandViewUserNotSelected = Backbone.Marionette.ItemView.extend({
        template: '#users-commandview-usernotselected-template',
        className: 'roundborder padding-10px margin-bottom-10px',

        events: {
            'click #createnewuser': 'createNewUser'
        },

        createNewUser: function (e) {
            e.preventDefault();
            App.vent.trigger("users:createnewuser");
        }

    });
    Views.CommandViewUserSelected = Backbone.Marionette.ItemView.extend({
        template: '#users-commandview-userselected-template',
        className: 'roundborder padding-10px margin-bottom-10px',

        events: {
            'click #createnewuser': 'createNewUser',
            'click #editselecteduser': 'editSelectedUser',
            'click #deleteselecteduser': 'deleteSelectedUser'
        },

        createNewUser: function (e) {
            e.preventDefault();
            App.vent.trigger("users:createnewuser");
        },

        editSelectedUser: function (e) {
            e.preventDefault();
            App.vent.trigger("users:editselecteduser");
        },

        deleteSelectedUser: function (e) {
            e.preventDefault();
            App.vent.trigger("users:deleteselecteduser");
        }

    });

    Views.CommandViewCreateNewUser = Backbone.Marionette.ItemView.extend({
        template: '#users-commandview-createnewuser-template',
        className: 'roundborder padding-10px margin-bottom-10px',

        events: {
            'click #savenewuser': 'saveNewUser',
            'click #cancelchanges': 'cancelChanges'
        },

        saveNewUser: function (e) {
            App.vent.trigger("users:savenewuser");
        },

        cancelChanges: function (e) {
            App.vent.trigger("users:cancelsavingnewuser");
        }

    });

    Views.CommandViewEditUser = Backbone.Marionette.ItemView.extend({
        template: '#users-commandview-edituser-template',
        className: 'roundborder padding-10px margin-bottom-10px',

        events: {
            'click #saveuser': 'saveNewUser',
            'click #cancelchanges': 'cancelChanges'
        },

        saveNewUser: function (e) {
            App.vent.trigger("users:saveuser");
        },

        cancelChanges: function (e) {
            App.vent.trigger("users:cancelsavinguser");
        }

    });

    Views.CreateNewUserView = Backbone.Marionette.ItemView.extend({
        template: '#users-createnewuser-template',
        className: 'roundborder padding-10px',

        ui: {
            firstname: '#firstname',
            lastname: '#lastname',
            email: '#email',
            userid: '#userid',
            usertype: '#usertype',
            password: '#password',
            confirmpassword: '#confirmpassword'
        },

        getEnteredData: function () {
            return {
                firstname: this.ui.firstname.val(),
                lastname: this.ui.lastname.val(),
                email: this.ui.email.val(),
                userid: this.ui.userid.val(),
                usertype: this.ui.usertype.val(),
                password: this.ui.password.val(),
                confirmpassword: this.ui.confirmpassword.val()
            };
        }
    });

    Views.EditUserView = Backbone.Marionette.ItemView.extend({
        template: '#users-editwuser-template',
        className: 'roundborder padding-10px',

        ui: {
            firstname: '#firstname',
            lastname: '#lastname',
            email: '#email',
            usertype: '#usertype'
        },
        onRender: function () {
            if (this.model.get('roles') && this.model.get('roles').length > 0) {
                if (this.model.get('roles')[0].rolename === 'Admin')
                    this.ui.usertype.val('admin');
                else if (this.model.get('roles')[0].rolename === 'user')
                    this.ui.usertype.val('user');
            }

        },
        getEnteredData: function () {
            return {
                firstname: this.ui.firstname.val(),
                lastname: this.ui.lastname.val(),
                email: this.ui.email.val(),
                usertype: this.ui.usertype.val()
            };
        }
    });


});