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
	needs: 'treetable',

	isExpanded: false,
	checked: false,

	willDestroy: function() {
		App.TreeNodeController.degisterNodeController(this.get('content'));
	},

	toggle: function() {
		this.set('isExpanded', !this.get('isExpanded'));
	},

	allExpandedDidChange: function() {
		this.set('isExpanded', this.get('controllers.treetable.allExpanded'));
	}.observes('controllers.treetable.allExpanded'),

	contentDidChange: function() {
		var node = this.get('content');
		App.TreeNodeController.registerNodeController(node, this);
		this.set('checked', App.get('selectedNodes').contains(node));
	}.observes('content'),

	/**
	 * Observer function for checked value. When checked is changed, cascade and bubble appropriately
	 * @return void
	 */
	checkedDidChange: function() {
		// We always want to bubble
		this.bubbleChecked(this.get('content.parent'));

		// We only want to cascade IF all the children are checked - otherwise our recursion will overwrite previous checking
		if(this.get('checked') == true || this.allChildrenChecked(this.get('content'))) {
			this.cascadeChecked(this.get('content'), this.get('checked'));
		} else {
			var selectedNodes = App.get('selectedNodes');
			selectedNodes.removeObject(this.get('content'));
		}
	}.observes('checked'),

	/**
	 * Bubbles up checks where appropriate - checks the parent to see if all children are checked, in which case it checks the parent
	 * @param  {object} node The parent
	 * @return void
	 */
	bubbleChecked: function(node) {
		var controller = App.TreeNodeController.controllerForNode(node);
		if (!controller) {
			return; //We've reached root
		}

		controller.set('checked', this.allChildrenChecked(node));
	},

	/**
	 * Cascades down the tree from this node, checking/unchecking and adding/removing to list of selected nodes
	 * @param  {object} node    The parent
	 * @param  {bool}   checked The value we're setting checked
	 * @return void
	 */
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
	},

	/**
	 * This function checks if all children of a node are checked
	 * @param  {object} node The parent node
	 * @return {bool}		 True/false - are the children all checked or not
	 */
	allChildrenChecked: function(node) {
		var allChecked = true;
		Ember.get(node, 'children').forEach(function(child) {
			var childController = App.TreeNodeController.controllerForNode(child);
			if(childController && Ember.get(childController, 'checked') == false) {
				allChecked = false;
			}
		});
		return allChecked;
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

App.set('treeRoot', setParentsOnTree({
	text: 'Root',
	children: [
		{
			text: 'People',
			children: [
				{
					text: 'Basketball players',
					children: [
						{
							text: 'Lebron James',
							children: []
						},
						{
							text: 'Kobe Bryant',
							children: []
						}
					]
				},
				{
					text: 'Astronauts',
					children: [
						{
							text: 'Neil Armstrong',
							children: []
						},
						{
							text: 'Yuri Gagarin',
							children: []
						}
					]
				}
			]
		},
		{
			text: 'Fruits',
			children: [
				{
					text: 'Banana',
					children: []
				},
				{
					text: 'Pineapple',
					children: []
				},
				{
					text: 'Orange',
					children: []
				}
			]
		},
		{
			text: 'Clothes',
			children: [
				{
					text: 'Women',
					children: [
						{
							text: 'Dresses',
							children: []
						},
						{
							text: 'Tops',
							children: []
						}
					]
				},
				{
					text: 'Men',
					children: [
						{
							text: 'Jeans',
							children: []
						},
						{
							text: 'Shirts',
							children: []
						}
					]
				}
			]
		}
	]
}));