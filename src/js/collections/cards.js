var CardsCollection = Backbone.Collection.extend({
    model: Card,
    url: '/api/cards',
});
