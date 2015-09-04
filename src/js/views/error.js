var ErrorView = Backbone.View.extend({
    initialize: function() {
        this.render();
    },
    template: App.templates.error,
    render: function() {
        this.$el.html(this.template());
    },
});
