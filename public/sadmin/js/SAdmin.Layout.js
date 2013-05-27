SAdmin.module('Layout', function (Layout, App, Backbone, Marionette, $, _) {

    // Main Layout
    // ------------------
    Layout.Main  = Backbone.Marionette.Layout.extend({
        template: "#main-layout",

        regions: {
            alert: "#messagebar-region",
            top: "#top-region",
            left: "#left-region",
            center: "#center-region"
        }
    });

    // Details Layout
    // ------------------
    Layout.Details = Backbone.Marionette.Layout.extend({
        template: "#details-layout",

        regions: {
            tabheader: "#tabheader-region",
            tabpane: "#tabpane-region" 
        }
    });

    // Apps Layout
    // ------------------
    Layout.Apps = Backbone.Marionette.Layout.extend({
        template: "#apps-layout",

        regions: {
            applist: "#apps-list",
            apps: ".apps" ,
            roles: ".roles"
        }
    });

});