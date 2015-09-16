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
