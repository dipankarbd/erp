SAdmin.module('Main', function (Main, App, Backbone, Marionette, $, _) {

    // Main Router
    // ---------------
    Main.Router = Marionette.AppRouter.extend({
    });

    // Main Controller (Mediator)
    Main.Controller = function () {
        this.userlist = new App.User.Models.UserList();
        this.tabheaderlist = new App.Tab.Models.HeaderItems([new App.Tab.Models.HeaderItem({ text: 'User Details', index: 0, active: true }), new App.Tab.Models.HeaderItem({ text: 'Apps', index: 1 })]);
        this.mainlayout = new App.Layout.Main();
        this.detailslayout = new App.Layout.Details();
        this.appslayout = new App.Layout.Apps();
    };


    _.extend(Main.Controller.prototype, {
        start: function () {
            this.userlist.fetch();
            this.showMainLayout();
            this.showDetailsLayout();
            this.showFilterView();
            this.showUserlistView();
            this.showTabHeaderView();
        },

        showMainLayout: function () {
            App.container.show(this.mainlayout);
        },

        showDetailsLayout: function () {
            this.mainlayout.center.show(this.detailslayout);
        },

        showFilterView: function () {
            this.mainlayout.top.show(new App.Filter.Views.FilterView());
        },

        showUserlistView: function () {
            this.mainlayout.left.show(new App.User.Views.ListView({ collection: this.userlist }));
        },

        showTabHeaderView: function () {
            this.detailslayout.tabheader.show(new App.Tab.Views.TabView({ collection: this.tabheaderlist }));
        }
    });

    // Main Initializer
    // -------------------- 
    Main.addInitializer(function () {
        var controller = new Main.Controller();
        new Main.Router({
            controller: controller
        });

        controller.start();
    });
});