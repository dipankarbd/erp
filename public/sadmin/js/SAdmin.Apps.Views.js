SAdmin.module('Apps.Views', function (Views, App, Backbone, Marionette, $, _) {

    // User Apps  item
    // -------------------
    Views.UserApp = Backbone.Marionette.CompositeView.extend({
        template: "#userappitem-template",
        tagName: "tr",

        modelEvents: {
            'change': 'render'
        },

        onRender: function () {
            if (this.model.get('selected')) {
                $(this.el).addClass('info');
            }
            else {
                $(this.el).removeClass('info');
            }
        },
        events: {
            'click': 'selectUserApp'
        },

        selectUserApp: function () {
            this.model.set({ 'selected': true });
            App.vent.trigger("userapp:selected", this.model);
        }

    });

    // User Apps 
    // -------------------
    Views.UserApps = Backbone.Marionette.CompositeView.extend({
        template: "#userapplist-template",
        tagName: "table",
        className: "table table-striped table-bordered",
        itemView: Views.UserApp,

        initialize: function () {
            this.listenTo(App.vent, "userapp:selected", this.toggleSelection, this);
        },

        toggleSelection: function (userapp) { 
            if (userapp.get('selected')) {
                var otherSelectedUserApp = this.collection.find(function (model) {
                    return userapp !== model && model.get('selected');
                });

                if (otherSelectedUserApp != null) {
                    otherSelectedUserApp.set({ 'selected': false });
                }
            }
        },

        appendHtml: function (collectionView, itemView) {
            collectionView.$("tbody").append(itemView.el);
        }
    });

    // User App Details
    // -------------------
    Views.UserAppDetails = Backbone.Marionette.ItemView.extend({
        template: "#userappdetails-template"
    });

     // User App Create Button
    // -------------------
    Views.UserAppCreateButton = Backbone.Marionette.ItemView.extend({
        template: "#userapp-create-button-template"
    });
});