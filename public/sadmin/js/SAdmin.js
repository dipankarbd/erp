var SAdmin = new Backbone.Marionette.Application();

SAdmin.addRegions({
    container: '#container'
});

SAdmin.on('initialize:after', function() {
    Backbone.history.start();
});