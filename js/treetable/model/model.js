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
                        {text: 'Lebron James',children: []},
                        {text: 'Kobe Bryant',children: []}
                    ]
                },
                {
                    text: 'Astronauts',
                    children: [
                        {text: 'Neil Armstrong',children: []},
                        {text: 'Yuri Gagarin',children: []}
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
                    text: 'Pineapple',children: []},
                {text: 'Orange',children: []}
            ]
        },
        {
            text: 'Clothes',
            children: [
                {
                    text: 'Women',
                    children: [
                        {text: 'Dresses',children: []},
                        {text: 'Tops',children: []}
                    ]
                },
                {
                    text: 'Men',
                    children: [
                        {text: 'Jeans',children: []},
                        {text: 'Shirts',children: []}
                    ]
                }
            ]
        }
    ]
}));