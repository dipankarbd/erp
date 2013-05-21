var SAdmin = new Backbone.Marionette.Application();

SAdmin.addRegions({
    header: '#container'
});

SAdmin.on('initialize:after', function() {
    Backbone.history.start();
});