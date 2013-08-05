var recursiveDepth = 5;
var maxChildrenPerParent = 5;

App.set('selectedNodes', Em.A()); //Start with an empty array

function setParentsOnTree(node, parent) {
    Ember.set(node, 'parent', parent);
    node.children.forEach(function(child) {
        setParentsOnTree(child, node);
    });
    return node;
}

function getRandomWord() {
    var randomWords = ['Rock', 'Paper', 'Scissor'];
    return randomWords[Math.floor(Math.random()*randomWords.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function recursivelyCreateHierarchicalTree(recursiveDepth, maxChildrenPerParent) {
    var children = new Array();

    if(recursiveDepth > 0) {
        for(var x = 0; x < getRandomNumber(1, maxChildrenPerParent); x++) {
            var newChild = recursivelyCreateHierarchicalTree(recursiveDepth-1, maxChildrenPerParent);
            children.push(newChild);
        }
    }

    return {text: getRandomWord(), children: children};
}

App.set('treeRoot', setParentsOnTree(recursivelyCreateHierarchicalTree(recursiveDepth, maxChildrenPerParent)));