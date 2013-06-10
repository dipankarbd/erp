PMonitor.module('Controllers', function (Controllers, App, Backbone, Marionette, $, _) {

    //navbar controller
    Controllers.UsersController = Marionette.Controller.extend({
        initialize: function (options) {
            console.log('initializing users controller');
        },

        start: function () {
            console.log('starting users controller');

            this.containerLayout = new App.Layout.ContainerLayout();
            App.container.show(this.containerLayout);


            this.users = new App.Users.Models.UserList();
            this.users.fetch();

            this.showUsersView();
        },

        onClose: function () {
            console.log('closing users controller');
            App.container.close();
        },

        showUsersView: function () {
            this.usersView = new App.Users.Views.UsersView({ collection: this.users });
            this.containerLayout.mainpanel.show(this.usersView);
        }
    });

}); 