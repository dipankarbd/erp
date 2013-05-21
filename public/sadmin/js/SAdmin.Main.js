SAdmin.module('Main', function (Main, App, Backbone, Marionette, $, _) {

    // Main Router
    // ---------------
    Main.Router = Marionette.AppRouter.extend({
    });

    // Main Controller (Mediator)
    Main.Controller = function() {
        this.userlist = new App.User.Models.UserList();
    };


    _.extend(Main.Controller.prototype, {  
        start: function(){ 
            this.userlist.fetch();
        }
    });

    // Main Initializer
    // -------------------- 
    Main.addInitializer(function() {
        var controller = new Main.Controller();
        new Main.Router({
            controller: controller
        });

        controller.start();
    }); 
});