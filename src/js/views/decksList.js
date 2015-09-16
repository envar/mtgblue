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
