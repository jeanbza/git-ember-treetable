App = Ember.Application.create();

App.TreeBranchController = Ember.ObjectController.extend({
});
App.register('controller:treeBranch', App.TreeBranchController, {singleton: false});

App.TreeBranchView = Ember.View.extend({
	tagName: 'ul',
	templateName: 'tree-branch',
	classNames: ['tree-branch']
});

App.TreeNodeController = Ember.ObjectController.extend({
	isExpanded: false,
	checked: false,

	willDestroy: function() {
		App.TreeNodeController.degisterNodeController(this.get('content'));
	},

	contentDidChange: function() {
		var node = this.get('content');
		App.TreeNodeController.registerNodeController(node, this);
		this.set('checked', App.get('selectedNodes').contains(node));
	}.observes('content'),

	toggle: function() {
		this.set('isExpanded', !this.get('isExpanded'));
	},

	checkedDidChange: function() {
		this.bubbleChecked(this.get('content.parent'));

		if(this.get('checked') == true) {
			this.cascadeChecked(this.get('content'), this.get('checked'));
		} else {
			var selectedNodes = App.get('selectedNodes');
			selectedNodes.removeObject(this.get('content'));
		}
	}.observes('checked'),

	bubbleChecked: function(node) {
		var controller = App.TreeNodeController.controllerForNode(node);
		if (!controller) {
			return; //We've reached root
		}

		var allChecked = true;
		Ember.get(node, 'children').forEach(function(child) {
			var childController = App.TreeNodeController.controllerForNode(child);
			if(Ember.get(childController, 'checked') == false) {
				allChecked = false;
			}
		});

		controller.set('checked', allChecked);
	},

	cascadeChecked: function(node, checked) {
		var selectedNodes = App.get('selectedNodes');
		if (checked) {
			selectedNodes.addObject(node);
		} else {
			selectedNodes.removeObject(node);
		}

		var controller = App.TreeNodeController.controllerForNode(node);
		if (controller) {
			controller.set('checked', checked);
		}

		Ember.get(node, 'children').forEach(function(child) {
			this.cascadeChecked(child, checked);
		}, this);
	}
});
App.register('controller:treeNode', App.TreeNodeController, {singleton: false});

App.TreeNodeController.reopenClass({
	nodeControllers: {},
	registerNodeController: function(node, controller) {
		this.nodeControllers[Ember.guidFor(node)] = controller;
	},
	unregisterNodeController: function(node, controller) {
		delete this.nodeControllers[Ember.guidFor(node)];
	},
	controllerForNode: function(node) {
		return this.nodeControllers[Ember.guidFor(node)];
	}
});

App.TreeNodeView = Ember.View.extend({
	tagName: 'li',
	templateName: 'tree-node',
	classNames: ['tree-node']
});

App.set('selectedNodes', Em.A()); //Start with an empty array

function setParentsOnTree(node, parent) {
	Ember.set(node, 'parent', parent);
	node.children.forEach(function(child) {
		setParentsOnTree(child, node);
	});
	return node;
}

$.ajax({
	url: "get_ccd_json.php",
	async: false,
	success: function(data) {
		var parsedData = $.parseJSON(data);
		parsedData = {
			description: 'Root',
			children: [parsedData]
		};
		App.set('treeRoot', setParentsOnTree(parsedData));
	}
});