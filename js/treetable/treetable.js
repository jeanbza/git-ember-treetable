App = Ember.Application.create();

App.ApplicationController = Ember.Controller.extend({
    expandRandomItem: function() {
        App.TreeNodeController.controllerForNodeById(10).bubbleExpanded();
    }
});