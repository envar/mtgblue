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

