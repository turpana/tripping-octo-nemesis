// Backbone Views
var ActionLink = Backbone.View.extend({
  // listeners
  runAction: function() {
    console.log(this.model.get('name'));
  },
  tagName: "a",
  className: "action",
  events: {
    "click .action": "runAction"
  },
  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },
  render: function () {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
  template: _.template(
   '<a href="#<%= name %>" class="action"><%= name %></a><br />'
   )
});
var AppView = Backbone.View.extend({
  renderAction: function(action) {
    var view = new ActionLink({model: action});
    this.$mainActions.append(view.render().el);
  },
  model: MyApp,
  el: $('#tripping-octo-nemesis'),
  render: function() {
    this.mainActions.each(this.renderAction, this);
  },
  initialize: function(mainActions) {
    this.mainActions = mainActions;
    this.$mainActions = $('#main-actions');
    this.$mainActions.append('<h4>Main Actions</h4>');
    this.render();
  }
});
