var DecksCollection = Backbone.Collection.extend({
    model: Deck,
    url: '/api/decks',
});
