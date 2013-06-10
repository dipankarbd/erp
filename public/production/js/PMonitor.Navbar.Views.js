PMonitor.module('Navbar.Views', function (Views, App, Backbone, Marionette, $, _) {

    // Navbar View
    // -------------------
    Views.NavbarView = Backbone.Marionette.ItemView.extend({
        template: '#navbar-template',
        className: 'navbar-inner',

        initialize: function () {
            this.listenTo(App.vent, "navbar:selected", this.updateNavSelection, this);
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
                case 'buyers':
                    this.model.set({ 'navselected': 'Buyers' });
                    break;
                default:
                    break;
            }
            this.render();
        }
    });
});