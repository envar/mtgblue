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
