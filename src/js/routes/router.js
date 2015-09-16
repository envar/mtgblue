var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'deckbuilder': 'deckbuilder',
        '*notFound': 'notFound',
    },
    initialize: function() {},
    start: function() {
        Backbone.history.start({pushState: true});
    },
    index: function() {
    },
    deckbuilder: function() {
        App.deckBuilderView = new DeckBuilderView({el: $('#app')});
        App.deckBuilderView.render();
    },
    notFound: function() {
        var errorView = new ErrorView({el: $('#app')});
    },
});
