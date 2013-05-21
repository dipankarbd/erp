SAdmin.module('Tab.Views', function (Views, App, Backbone, Marionette, $, _) { 

    // Tab Item View
    // -------------------
    Views.ItemView = Backbone.Marionette.ItemView.extend({
        template: "#user-tab-header-item-template",
        tagName: 'li',
         
        modelEvents: {
            'change': 'render'
        },

        events: {
            'click': 'tabSelected'
        },

        onRender: function () { 
            if (this.model.get('active')) {
                this.$el.addClass('active');
            }
            else{
                this.$el.removeClass('active');
            }
        },

        tabSelected: function () {
            this.model.set({ 'active': true });
            App.vent.trigger("usertab:selected",this.model);
        }
    });

    // Tab View
    // -------------------
    Views.TabView = Backbone.Marionette.CollectionView.extend({
        itemView: Views.ItemView,
        tagName: 'ul',
        className: 'nav nav-tabs', 

        collectionEvents: { 
            "change" : "toggleSelection" 
        }, 

        toggleSelection: function (selectedModel) { 
            if (selectedModel.get('active')) {
                var otherSelectedModel = this.collection.find(function (model) {
                    return selectedModel !== model && model.get('active');
                });

                if (otherSelectedModel != null) {
                    otherSelectedModel.set({ 'active': false });
                }
            }
        }
    });

});