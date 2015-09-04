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
