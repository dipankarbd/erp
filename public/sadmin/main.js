User = Backbone.Model.extend();
Users = Backbone.Collection.extend({
    model: User
});

container = new Backbone.Marionette.Region({
  el: "#container"
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
container.show(layout);

TopView = Backbone.Marionette.ItemView.extend({
  template: "#topview-template"
});
LeftView = Backbone.Marionette.ItemView.extend({
  template: "#leftview-template"
});
CenterView = Backbone.Marionette.ItemView.extend({
  template: "#centerview-template"
});

UserView = Backbone.Marionette.ItemView.extend({ 
    template: "#useritemview-template",
    tagName: 'li',
    className:'user'
});
UsersView = Backbone.Marionette.CollectionView.extend({
  itemView: UserView,
  tagName: 'ul',
  className:'userlist'
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