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
