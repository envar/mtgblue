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
        cards: [],
    },
    urlRoot: '/api/decks',
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

var CardItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item clickable',
    events: {
        'click': 'selectCard',
        'dblclick': 'addCard',
        'remove': 'remove',
    },
    template: App.templates.cardItem,
    initialize: function(options) {
        this.pubSub = options.pubSub;
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    selectCard: function() {
        this.pubSub.trigger('select:card', this.model);
    },
    addCard: function() {
        this.pubSub.trigger('add:card', this.model);
    },
});

CardPreviewView = Backbone.View.extend({
    initialize: function(options) {
        this.pubSub = options.pubSub;
        this.listenTo(this.pubSub, 'select:card', this.selectCard);
        this.model.on('change', this.render, this);
        this.render();
    },
    template: App.templates.cardPreview,
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
    },
    selectCard: function(card) {
        this.model.set(card.toJSON());
    },
});

var CardsListView = Backbone.View.extend({
    events: {
        'change input#cards-query': 'search',
    },
    initialize: function(options) {
        var vm = this;
        vm.collection = options.collection;
        vm.pubSub = options.pubSub;
        this.listenTo(this.collection, 'add', this.addOne);
        this.listenTo(this.collection, 'reset', this.render);
    },
    template: App.templates.cardsListView,
    render: function() {
        this.$el.html(this.template());
        this.addAll();
    },
    search: function(e) {
        console.log('search triggered');
        var query = $(e.currentTarget).val();
        this.collection.fetch({
            data: {
                name: query,
            },
            reset: true,
        });
    },
    addOne: function(card) {
        var view = new CardItemView({
            model: card,
            pubSub: this.pubSub,
        });
        this.$('#cards-list').append(view.render().el);
    },
    addAll: function() {
        this.collection.forEach(this.addOne, this);
    },
});


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


var DeckItemView = Backbone.View.extend({
    tagName: 'li',
    className: 'list-group-item clickable',
    events: {
        'click': 'selectDeck',
        'click button.close': 'destroy',
    },
    template: App.templates.deckItem,
    initialize: function(options) {
        this.pubSub = options.pubSub;
        this.model.on('destroy', this.remove, this);
        this.model.on('change', this.render, this);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    selectDeck: function() {
        this.pubSub.trigger('select:deck', this.model);
    },
    destroy: function() {
        this.model.destroy();
    },
    remove: function() {
        this.$el.remove();
    },
});

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

var DecksListView = Backbone.View.extend({
    events: {
        'change input#decks-query': 'search',
        'click #new-deck': 'create',
    },
    initialize: function(options) {
        this.collection = options.collection;
        this.pubSub = options.pubSub;
        this.listenTo(this.collection, 'reset', this.addAll);
        this.listenTo(this.collection, 'add', this.addOne)
    },
    template: App.templates.decksListView,
    render: function() {
        this.$el.html(this.template());
        this.addAll();
    },
    search: function(e) {
        var query = $(e.currentTarget).val();
        this.collection.fetch({
            data: {
                name: query,
            },
            reset: true,
        });
    },
    addOne: function(deck) {
        var view = new DeckItemView({
            model: deck,
            pubSub: this.pubSub,
        });
        this.$('#decks-list').append(view.render().el);
    },
    addAll: function() {
        this.collection.forEach(this.addOne, this);
    },
    create: function() {
        this.collection.create({name: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)});
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

$(function() {
    var router = new Router();
    router.start();
});

