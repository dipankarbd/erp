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
});