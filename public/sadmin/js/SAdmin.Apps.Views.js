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
        template: "#userappdetails-template",
        className: "row",

        modelEvents: {
            'change': 'render'
        },

      
        ui: {
            apps: '#userdetailsappsdropdown',
            roles: '#userdetailsrolesdropdown'
        },

        onRender: function () {
            console.log('rendering user app details view ...'); 
        },

        events: {
            'change #userdetailsappsdropdown': 'appsSelectionChanged'
        },
  
        appsSelectionChanged: function () {
            var selectedAppId = parseInt(this.ui.apps.val());

            var selectedApp = this.model.get('apps').find(function (model) {
                return selectedAppId === model.get('id');
            });

            var roles = selectedApp.get('roles');

            var roleId = 0;
            if (roles.length > 0) roleid = roles[0].id;

            this.model.set({ appid: selectedAppId,roleid: roleId, roles : roles});
        }
    });

    // User App Create Button
    // -------------------
    Views.UserAppCreateButton = Backbone.Marionette.ItemView.extend({
        template: "#userapp-create-button-template",

        events:{
            'click #createuserapp' :'createUserApp'
        },

        createUserApp: function(){
             App.vent.trigger("userapp:create", this.model);
        }
    });
});