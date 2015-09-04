Card = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
        name: '',
        imageurl: '/images/cardback.hq.jpg',
    },
})

var Deck = Backbone.Model.extend({
    idAttribute: '_id',
    defaults: {
        name: '',
    },
});

User = Backbone.Model.extend({
    urlRoot: '/api/user/',
    defaults: {
        email: '',
    },
})


var CardsCollection = Backbone.Collection.extend({
    model: Card,
    url: '/api/cards',
});

var DecksCollection = Backbone.Collection.extend({
    model: Deck,
    url: '/api/decks',
});

CardView = Backbone.View.extend({
    initialize: function(options) {
        options.pubSub.events.on('card:selected', this.selectCard);
        this.render();
    },
    selectCard: function(card) {
        console.log(card);
        this.model = card;
    },
    render: function() {
        var template = App.templates.card(this.model.toJSON());
        this.$el.html(template);
    }
});

var CardsView = Backbone.View.extend({
    collection: null,
    events: {
        'change input#cards-query': 'search',
    },
    search: function(e) {
        var query = $(e.currentTarget).val();
        console.log(query);
        this.collection.fetch({
            data: {
                name: query,
            },
            reset: true,
        });
    },
    initialize: function(options) {
        var vm = this;
        this.collection = options.collection;
        this.collection.fetch({
            success: function() {
                vm.render();
            },
        });
        this.listenTo(this.collection, 'reset', this.render);
    },
    template: App.templates.cards,
    render: function() {
        console.log(this.collection);
        this.$el.html(this.template({
            cards: this.collection.toJSON()
        }));
    },
});


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


var DecksView = Backbone.View.extend({
    collection: null,
    initialize: function(options) {
        var vm = this
        this.collection = options.collection;
        this.collection.fetch({
            success: function() {
                vm.render();
            },
        });
    },
    template: App.templates.decks,
    render: function() {
        this.$el.html(this.template({
            decks: this.collection.toJSON()
        }));
    },
});


var ErrorView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    template: App.templates.error,
    render: function() {
        this.$el.html(this.template());
    },
});

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

$(function() {
    var router = new Router();
    Backbone.history.start({pushState: true});
});

