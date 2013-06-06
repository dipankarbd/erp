PMonitor.module('Navbar.Views', function (Views, App, Backbone, Marionette, $, _) {

    // Navbar View
    // -------------------
    Views.NavbarView = Backbone.Marionette.ItemView.extend({
        template: '#navbar-template',
        className: 'navbar-inner',

        initialize: function () {
            this.listenTo(App.vent, "navbar:selected", this.updateNavSelection, this);
        },
        events: {
            'click a': 'navItemClicked'
        },

        navItemClicked: function (e) {
            switch ($(e.target).attr('href')) {
                case '#dashboard':
                    App.vent.trigger("navbar:selected", 'dashboard');
                    break;
                case '#orders':
                    App.vent.trigger("navbar:selected", 'orders');
                    break;
                case '#users':
                    App.vent.trigger("navbar:selected", 'users');
                    break;
                default:
                    break;
            }

        },

        updateNavSelection: function (selectedItem) {
            switch (selectedItem) {
                case 'dashboard':
                    this.model.set({ 'navselected': 'Dashboard' });
                    break;
                case 'orders':
                    this.model.set({ 'navselected': 'Orders' });
                    break;
                case 'users':
                    this.model.set({ 'navselected': 'Users' });
                    break;
                default:
                    break;
            }
            this.render();
        }
    });
});