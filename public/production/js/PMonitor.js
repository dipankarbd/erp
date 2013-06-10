var PMonitor = new Backbone.Marionette.Application();

PMonitor.addRegions({
    navbar: '#navbar',
    alert: '#alert',
    container: '#container'
});

PMonitor.on('initialize:after', function () {
    Backbone.history.start();
});