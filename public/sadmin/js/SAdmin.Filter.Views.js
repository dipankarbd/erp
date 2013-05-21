SAdmin.module('Filter.Views', function (Views, App, Backbone, Marionette, $, _) {

    // Filterview
    // -------------------
    Views.ItemView = Backbone.Marionette.ItemView.extend({
        template: "#topview-template",
        className: "well well-small",
        events: {
            'click #createuser': 'createNewUser'
        },
        createNewUser: function () { 
             App.vent.trigger("user:createnew");
        }
    }); 

});