SuperAdminApp = new Backbone.Marionette.Application();
SuperAdminApp.addRegions({
  container: "#container"
});


User = Backbone.Model.extend({
    defaults:{
        isSelected: false
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

// Show the "layout" in the "container" region
layout = new MainLayout();
SuperAdminApp.container.show(layout);

TopView = Backbone.Marionette.ItemView.extend({
  template: "#topview-template"
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
    modelEvents : {
        'change': 'render'
    },
    events: {
        'click': 'showUserDetails'
    },
    showUserDetails: function () {
        this.model.set({'isSelected': true});
        SuperAdminApp.vent.trigger("user:selected",this.model);
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
        if(user.get('isSelected')) {  
            var otherSelectedUser = this.collection.find(function(model) {
                return user !== model && model.get('isSelected');
            });

            if(otherSelectedUser != null) { 
                otherSelectedUser.set({'isSelected': false});
            }
        }
    }
});



UserTabHeaderItem = Backbone.Model.extend({
    defaults:{
        isActive: false
    }
});

UserTabHeaderItems = Backbone.Collection.extend({
    model: UserTabHeaderItem
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
        if (this.model.get('isActive')) {
            this.$el.addClass('active');
        }
        else{
            this.$el.removeClass('active');
        }
    },
    tabSelected: function () {
        this.model.set({ 'isActive': true });
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
        if (selectedModel.get('isActive')) {
            var otherSelectedModel = this.collection.find(function (model) {
                return selectedModel !== model && model.get('isActive');
            });

            if (otherSelectedModel != null) {
                otherSelectedModel.set({ 'isActive': false });
            }
        }
    }
});

 

// and show the views in the layout
layout.top.show(new TopView());
layout.left.show(new LeftView());
layout.center.show(new CenterView());


$(document).ready(function () {

    var users = new Users([
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
        collection: users
    });
    layout.left.show(usersView);

    var tabItems = new UserTabHeaderItems([new UserTabHeaderItem({text:'User Details', index: 0, isActive: true}) ,new UserTabHeaderItem({text:'Apps', index: 1})]);
    var usertabHeaderView = new UserTabHeaderView({
        collection: tabItems
    });
    layout.center.show(usertabHeaderView);
});