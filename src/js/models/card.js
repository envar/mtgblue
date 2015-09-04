Card = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
        name: '',
        imageurl: '/images/cardback.hq.jpg',
    },
})
