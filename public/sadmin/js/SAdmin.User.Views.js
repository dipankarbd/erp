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
            App.selectedUser = this.model; // need more improvement
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
            if(user.get('selected')) {  
                var otherSelectedUser = this.collection.find(function(model) {
                    return user !== model && model.get('selected');
                });

                if(otherSelectedUser != null) { 
                    otherSelectedUser.set({'selected': false});
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
            App.vent.trigger("user:delete", this.model);
        }
    });

    // Edit View
    // --------------------------
    Views.EditView = Backbone.Marionette.ItemView.extend({
        template: "#user-details-editview-template" ,

        events: {
            'click #saveuserdetails': 'saveUser',
            'click #cancelsavinguserdetails': 'cancelUser'
        },

        saveUser: function () {
            App.vent.trigger("user:save", this.model);
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
            App.users.create({ // need improvement
                firstname: this.ui.firstname.val(),
                lastname: this.ui.lastname.val(),
                email: this.ui.email.val(),
                username: this.ui.userid.val(),
                password: this.ui.password.val(),
                password_confirmation: this.ui.confirmpassword.val()
            },{
                wait:true,
                success : function(resp){
                    App.vent.trigger("user:created", this.model);
                } 
            });
       
        },

        cancelUser: function () {
            App.vent.trigger("user:cancel", this.model);
        }
    });

});