SAdmin.module('Apps.Views', function (Views, App, Backbone, Marionette, $, _) {

    // App Dropdown View
    // -------------------
    Views.AppsDropdownView = Backbone.Marionette.ItemView.extend({
        template: "#userdetails-appsdropdownitem-template",

        onRender: function () {
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
            this.$el = this.$el.children();
            this.setElement(this.$el);
        },

        events: {
            'change': 'selectedItemChange'
        },

        selectedItemChange: function () {
            var selectedText = $.trim($(this.$el).find(":selected").text());
            var selectedValue = $.trim($(this.$el).find(":selected").val());
            App.vent.trigger("userdetailsappsdropdown:selected", { text: selectedText, value: selectedValue });
        },

        getSelectedItem: function () {
            var selectedText = $.trim($(this.$el).find(":selected").text());
            var selectedValue = $.trim($(this.$el).find(":selected").val());
            return { text: selectedText, value: selectedValue };
        },

        selectItem: function (val) {
            $(this.$el).val(val);
        }
    });

    // Roles Dropdown View
    // -------------------
    Views.RolesDropdownView = Backbone.Marionette.ItemView.extend({
        template: "#userdetails-rolesdropdownitem-template", 
        onRender: function () { 
            // get rid of that pesky wrapping-div
            // assumes 1 child element.
            this.$el = this.$el.children();
            this.setElement(this.$el);
        },

        events: {
            'change': 'selectedItemChange'
        },

        selectedItemChange: function () {
            var selectedText = $.trim($(this.$el).find(":selected").text());
            var selectedValue = $.trim($(this.$el).find(":selected").val());
            App.vent.trigger("userdetailsrolesdropdown:selected", { text: selectedText, value: selectedValue });
        },

        getSelectedItem: function () {
            var selectedText = $.trim($(this.$el).find(":selected").text());
            var selectedValue = $.trim($(this.$el).find(":selected").val());
            return { text: selectedText, value: selectedValue };
        } 
    });
});