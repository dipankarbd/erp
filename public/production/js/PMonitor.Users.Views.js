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
        className: 'roundborder padding-10px margin-bottom-10px'
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

});