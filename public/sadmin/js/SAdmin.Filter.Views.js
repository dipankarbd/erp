SAdmin.module('Filter.Views', function (Views, App, Backbone, Marionette, $, _) {

    // Filterview
    // -------------------
    Views.FilterView = Backbone.Marionette.ItemView.extend({
        template: "#topview-template",
        className: "well well-small",

        ui: {
            firstname: '#filterfirstname',
            lastname: '#filterlastname',
            email: '#filterusername',
            username: '#filteremail',
            app: '#filterapps'
        },

        events: {
            'click #createuser': 'createNewUser',
            'click #applyfilter': 'applyFilter',
            'click #clearfilter': 'clearFilter'
        },

        applyFilter: function () {
            this.model.set({
                firstname: this.ui.firstname.val(),
                lastname: this.ui.lastname.val(),
                email: this.ui.email.val(),
                username: this.ui.username.val(),
                app: this.ui.app.val()
            });
            App.vent.trigger("filter:apply", this.model);
        },

        clearFilter: function () {
            this.ui.firstname.val('');
            this.ui.lastname.val('');
            this.ui.email.val('');
            this.ui.username.val('');
            this.ui.app.val('0');
            App.vent.trigger("filter:clear");
        },

        createNewUser: function () {
            App.vent.trigger("user:createnew");
        }
    });

});