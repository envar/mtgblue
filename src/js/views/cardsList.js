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

