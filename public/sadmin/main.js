SuperAdminApp = new Backbone.Marionette.Application();
SuperAdminApp.addRegions({
  container: "#container"
});


User = Backbone.Model.extend({ 
    defaults: {
        selected: false
    } 
});
Users = Backbone.Collection.extend({ 
    model: User
});

 
MainLayout = Backbone.Marionette.Layout.extend({
  template: "#main-layout",

  regions: {
    top: "#top-region",
    left: "#left-region",
    center: "#center-region"
  }
});

DetailsLayout = Backbone.Marionette.Layout.extend({
  template: "#details-layout",

  regions: {
    tabheader: "#tabheader-region",
    tabpane: "#tabpane-region" 
  }
});
AppsLayout = Backbone.Marionette.Layout.extend({
  template: "#apps-layout",

  regions: {
    applist: "#apps-list",
    details: "#apps-details" 
  }
});


// Show the "layout" in the "container" region
layout = new MainLayout();
SuperAdminApp.container.show(layout);

detailsLayout = new DetailsLayout();
appsLayout = new AppsLayout();

TopView = Backbone.Marionette.ItemView.extend({
    template: "#topview-template",
    className: "well well-small",
    events: {
        'click #createuser': 'createNewUser'
    },
    createNewUser: function () { 
         SuperAdminApp.vent.trigger("user:createnew");
    }
});
LeftView = Backbone.Marionette.ItemView.extend({
  template: "#leftview-template"
});
CenterView = Backbone.Marionette.ItemView.extend({
  template: "#centerview-template"
});


NoUsersView = Backbone.Marionette.ItemView.extend({
  template: "#no-users-template",
  tagName: 'li'
});

UserView = Backbone.Marionette.ItemView.extend({
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
        SuperAdminApp.selectedUser = this.model; 
        SuperAdminApp.vent.trigger("user:selected", this.model);
    }
});
UsersView = Backbone.Marionette.CollectionView.extend({
    itemView: UserView,
    emptyView: NoUsersView,
    tagName: 'ul',
    className: 'userlist', 
    initialize: function () {
        var self = this;
        SuperAdminApp.vent.on("user:selected", function (user) { self.toggleSelection(user); });
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



UserTabHeaderItem = Backbone.Model.extend({
    defaults:{
        active: false
    }
});

UserTabHeaderItems = Backbone.Collection.extend({
    model: UserTabHeaderItem,
    resetSelection: function () {
        this.at(0).set('active',true);
        this.at(1).set('active',false);
    }
});

UserTabHeaderItemView = Backbone.Marionette.ItemView.extend({
    template: "#user-tab-header-item-template",
    tagName: 'li', 
    modelEvents: {
        'change': 'render'
    },
    events: {
        'click': 'tabSelected'
    },
    onRender: function () { 
        if (this.model.get('active')) {
            this.$el.addClass('active');
        }
        else{
            this.$el.removeClass('active');
        }
    },
    tabSelected: function () {
        this.model.set({ 'active': true });
        SuperAdminApp.vent.trigger("usertab:selected",this.model);
    }
});
UserTabHeaderView = Backbone.Marionette.CollectionView.extend({
    itemView: UserTabHeaderItemView,
    tagName: 'ul',
    className: 'nav nav-tabs', 
    collectionEvents: { 
        "change" : "toggleSelection" 
    }, 
    toggleSelection: function (selectedModel) { 
        if (selectedModel.get('active')) {
            var otherSelectedModel = this.collection.find(function (model) {
                return selectedModel !== model && model.get('active');
            });

            if (otherSelectedModel != null) {
                otherSelectedModel.set({ 'active': false });
            }
        }
    }
});
UserDetailsItemView = Backbone.Marionette.ItemView.extend({
    template: "#user-details-view-template",
    events: {
        'click #edituser': 'editUser',
        'click #deleteuser': 'deleteUser'
    },
    editUser: function () {
        SuperAdminApp.vent.trigger("user:edit", this.model);
    },
    deleteUser: function () {
        SuperAdminApp.vent.trigger("user:delete", this.model);
    }
});
UserDetailsItemEditView = Backbone.Marionette.ItemView.extend({
    template: "#user-details-editview-template" ,
    events: {
        'click #saveuserdetails': 'saveUser',
        'click #cancelsavinguserdetails': 'cancelUser'
    },
    saveUser: function () {
        SuperAdminApp.vent.trigger("user:save", this.model);
    },
    cancelUser: function () {
        SuperAdminApp.vent.trigger("user:cancel", this.model);
    }
});
UserDetailsItemCreateView = Backbone.Marionette.ItemView.extend({
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
        SuperAdminApp.users.create({
            'firstname': this.ui.firstname,
            'lastname':this.ui.lastname,
            'email':this.ui.email,
            'username':this.ui.userid,
            'password':this.ui.password
        });
        //SuperAdminApp.vent.trigger("user:created", this.model);
    },
    cancelUser: function () {
        SuperAdminApp.vent.trigger("user:cancel", this.model);
    }
});
 

// and show the views in the layout
layout.top.show(new TopView());
layout.left.show(new LeftView());
layout.center.show(detailsLayout);


showUserDetailsView = function () {
    if (SuperAdminApp.selectedUser) {
        detailsLayout.tabpane.show(new UserDetailsItemView({ model: SuperAdminApp.selectedUser }));
    }
    else {
        detailsLayout.tabpane.close();
    }
}

$(document).ready(function () {

    SuperAdminApp.users = new Users([
        new User({ username: 'dipankarbd', firstname: 'Dipankar', lastname: 'Biswas', email: 'dipankar_cse@yahoo.com' }),
        new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
         new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
          new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
           new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
                   new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
         new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
          new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
           new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
                   new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
         new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
          new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
           new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
                   new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
         new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
          new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
           new User({ username: 'user1', firstname: 'User', lastname: '1', email: 'usr1@yahoo.com' }),
        new User({ username: 'user2', firstname: 'User', lastname: '2', email: 'usr2@yahoo.com' })
    ]);

    var usersView = new UsersView({
        collection: SuperAdminApp.users
    });
    layout.left.show(usersView);


    var tabItems = new UserTabHeaderItems([new UserTabHeaderItem({ text: 'User Details', index: 0, active: true }), new UserTabHeaderItem({ text: 'Apps', index: 1 })]);
    var usertabHeaderView = new UserTabHeaderView({
        collection: tabItems
    });
    detailsLayout.tabheader.show(usertabHeaderView);



    SuperAdminApp.vent.on("usertab:selected", function (model) {
        if (model.get('index') === 0) {
            showUserDetailsView();
        }
        else if (model.get('index') === 1) {
            detailsLayout.tabpane.show(appsLayout);
        }
    });


    SuperAdminApp.vent.on("user:selected", function (user) {
        //reset user details
        tabItems.resetSelection();
        showUserDetailsView();
    });
    SuperAdminApp.vent.on("user:edit", function (user) {
        detailsLayout.tabpane.show(new UserDetailsItemEditView({ model: user }));
    });
    SuperAdminApp.vent.on("user:delete", function (user) {
        detailsLayout.tabpane.close();
    });
    SuperAdminApp.vent.on("user:save", function (user) {
        showUserDetailsView();
    });
    SuperAdminApp.vent.on("user:cancel", function (user) {
        showUserDetailsView();
    });
    SuperAdminApp.vent.on("user:createnew", function () { 
        detailsLayout.tabpane.show(new UserDetailsItemCreateView());
    });



});