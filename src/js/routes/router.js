var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        'deckbuilder': 'deckbuilder',
        '*notFound': 'notFound',
    },
    index: function() {
        console.log("going to index");
    },
    deckbuilder: function() {
        console.log("going to deckbuilder");
        var deckBuilderView = new DeckBuilderView({el: $('#app')});
    },
    notFound: function() {
        console.log("notFound");
        var errorView = new ErrorView({el: $('#app')});
    },
});
