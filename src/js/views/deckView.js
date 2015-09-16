var DeckView = Backbone.View.extend({
    initialize: function(options) {
        this.pubSub = options.pubSub;
        this.listenTo(this.pubSub, 'add:card', this.addCard);
        this.listenTo(this.pubSub, 'select:deck', this.selectDeck);
        this.model.on('change', this.render, this);
        this.model.on('all', function(eventname) { console.log(eventname) }),
        this.render();
    },
    template: App.templates.deckView,
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        console.log('rendering');
    },
    addCard: function(card) {
        cards = this.model.get('cards');
        cards.push(card);
        this.model.save({cards: cards});
    },
    selectDeck: function(deck) {
        this.model.set(deck.toJSON());
    }
});
