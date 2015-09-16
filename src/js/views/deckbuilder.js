DeckBuilderView = Backbone.View.extend({
    collections: {},
    views: {},
    initialize: function(options) {
        this.pubSub = _.extend({}, Backbone.Events);
        this.collections.cardsCollection = new CardsCollection();
        this.collections.decksCollection = new DecksCollection();
        this.collections.cardsCollection.fetch();
        this.collections.decksCollection.fetch();
    },
    template: App.templates.deckBuilder,
    render: function() {
        this.$el.html(this.template());

        this.views.cardsListView = new CardsListView({
            collection: this.collections.cardsCollection,
            el: $('#cardsView'),
            pubSub: this.pubSub,
        });
        this.views.cardsListView.render();

        this.views.decksListView = new DecksListView({
            collection: this.collections.decksCollection,
            el: $('#decksView'),
            pubSub: this.pubSub,
        });
        this.views.decksListView.render();

        this.views.cardPreviewView = new CardPreviewView({
            model: new Card(),
            el: $('#cardPreview'),
            pubSub: this.pubSub,
        });

        this.views.deckView = new DeckView({
            model: new Deck({name: 'No deck selected'}),
            el: $('#deckView'),
            pubSub: this.pubSub,
        });
    },
});

