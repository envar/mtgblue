DeckBuilderView = Backbone.View.extend({
    collections: {},
    views: {},
    initialize: function(options) {
        this.collections.cardsCollection = new CardsCollection();
        this.collections.decksCollection = new DecksCollection();
        this.render();
    },
    template: App.templates.deckbuilder,
    render: function() {
        this.$el.html(this.template());

        this.views.cardsView = new CardsView({
            collection: this.collections.cardsCollection,
            el: $('#cards-view'),
        });

        this.views.decksView = new DecksView({
            collection: this.collections.decksCollection,
            el: $('#decks-view'),
        });

    }
});

