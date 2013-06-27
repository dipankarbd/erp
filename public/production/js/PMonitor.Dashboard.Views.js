PMonitor.module('Dashboard.Views', function (Views, App, Backbone, Marionette, $, _) {

    //Dashboard Item View
    Views.DashboardItemView = Backbone.Marionette.ItemView.extend({
        template: '#admin-dashboarditemview-template',
        tagName: 'tr',
        modelEvents: {
            'change': 'render'
        }
    });

    //Dasboard View
    Views.DashboardView = Backbone.Marionette.CompositeView.extend({
        template: '#admin-dashboardview-template',
        tagName: 'table',
        className: "table table-striped table-bordered",
        itemView: Views.DashboardItemView,

        events: {
            'click #refresh': 'refreshDashboard'
        },

        refreshDashboard: function () {
            App.vent.trigger("dashboard:refresh");
        },

        appendHtml: function (collectionView, itemView) {
            collectionView.$("tbody").append(itemView.el);
        }
    });

});