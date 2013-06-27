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

    
    // OrderDetails  Layout
    // ------------------
    Layout.OrderDetailsLayout  = Backbone.Marionette.Layout.extend({
        template: "#order-details-layout",

        regions: {
            firstpanel: "#firstpanel",
            secondpanel: "#secondpanel" 
        }
    }); 
   
     // Container 2 column Layout
    // ------------------
    Layout.Container2ColumnLayout  = Backbone.Marionette.Layout.extend({
        template: "#container-2column-layout",

        regions: {
            mainpanel: "#leftpanel",
            filterpanel: "#rightpanel"   
        }
    }); 
});