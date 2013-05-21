SAdmin.module('Tab.Models', function (Models, App, Backbone, Marionette, $, _) {
    
    // Header Model
    // ----------
    Models.HeaderItem = Backbone.Model.extend({
        defaults:{
            active: false
        }
    });

    // Header Items Model
    // ----------
     Models.HeaderItems = Backbone.Collection.extend({
        model: Models.HeaderItem,

        resetSelection: function () {
            this.at(0).set('active',true);
            this.at(1).set('active',false);
        }
    });

});