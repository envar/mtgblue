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

