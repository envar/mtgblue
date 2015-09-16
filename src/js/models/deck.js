var Deck = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
        name: '',
        cards: [],
    },
    urlRoot: '/api/decks',
});
