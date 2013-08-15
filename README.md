git-ember-treetable
===================

An ember approach to treetables that includes checkboxes (which cascade and bubble properly), 'Expand/Collapse all' functionality, and reveal a node (e.g. open all parents of a node) from outside the table.

NOTE: Code largely based on approach outlined by Sebastian Seilund at http://dev.billysbilling.com/blog/How-to-implement-a-tree-in-Ember-js


### Problems with this approach
It turns out that Ember slows your app down significantly when inserting hundreds of controllers and view in a split second (Angular suffers from the same problem,
[read more here](http://discuss.emberjs.com/t/ember-is-very-slow-at-rendering-lists/1643)). This flaw is crippling - as such, I have created
a lightweight jQuery treetable solution with the same functionality at [https://github.com/jadekler/git-jquery-treetable](https://github.com/jadekler/git-jquery-treetable).
