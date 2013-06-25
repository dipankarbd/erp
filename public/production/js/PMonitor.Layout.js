PMonitor.module('Layout', function (Layout, App, Backbone, Marionette, $, _) {

    // Container Layout
    // ------------------
    Layout.ContainerLayout  = Backbone.Marionette.Layout.extend({
        template: "#container-layout",

        regions: {
            mainpanel: "#leftpanel",
            filterpanel: "#filterpanel",
            commandpanel: "#commandpanel" 
        }
    }); 

    
    // Container Layout
    // ------------------
    Layout.OrderDetailsLayout  = Backbone.Marionette.Layout.extend({
        template: "#order-details-layout",

        regions: {
            firstpanel: "#firstpanel",
            secondpanel: "#secondpanel" 
        }
    }); 
   
});