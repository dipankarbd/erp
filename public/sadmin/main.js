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

// and show the views in the layout
layout.top.show(new TopView());
layout.left.show(new LeftView());
layout.center.show(new CenterView());