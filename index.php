<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="css/app.css">

<script type="text/javascript">
	window.ENV = window.ENV || {};
	ENV.EXPERIMENTAL_CONTROL_HELPER = true;
</script>
<script type="text/javascript" src="js/jquery/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui/ui/jquery-ui.js"></script>
	<script type="text/javascript" src="js/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/ember/handlebars-1.0.0-rc.4.js"></script>
	<script type="text/javascript" src="js/ember/ember-1.0.0-rc.6.js"></script>
	
    <script type="text/javascript" src="js/treetable/treetable.js"></script>
    <script type="text/javascript" src="js/treetable/controller/treeTableController.js"></script>
    <script type="text/javascript" src="js/treetable/controller/treeBranchController.js"></script>
    <script type="text/javascript" src="js/treetable/controller/treeNodeController.js"></script>
    <script type="text/javascript" src="js/treetable/model/model.js"></script>
    <script type="text/javascript" src="js/treetable/view/treeTableView.js"></script>
    <script type="text/javascript" src="js/treetable/view/treeBranchView.js"></script>
    <script type="text/javascript" src="js/treetable/view/treeNodeView.js"></script>


<meta charset=utf-8 />
<title>Ember.js Tree Example</title>
</head>
<body>

<script type="text/x-handlebars" dat>
    {{render "treetable" Webapp.TreetableController}}
</script>

<script data-template-name="tree-application" type="text/x-handlebars">
    <div {{action toggleAllExpanded}} class="expand-all">
        {{#if controllers.treetable.allExpanded}}
            Collapse All
        {{else}}
            Expand All
        {{/if}}
    </div>

    {{control "treeBranch" App.treeRoot}}
    {{#if App.selectedNodes.length}}
        <p>You have selected:</p>
        <ul>
            {{#each node in App.selectedNodes}}
                <li>{{node.text}}</li>
            {{/each}}
        </ul>
    {{else}}
        <p>Select something</p>
    {{/if}}
</script>

<script data-template-name="tree" type="text/x-handlebars">
    {{control "treeBranch" content}}
</script>

<script data-template-name="tree-branch" type="text/x-handlebars">
    {{each children itemController="treeNode" itemViewClass="App.TreeNodeView"}}
</script>

<script data-template-name="tree-node" type="text/x-handlebars">
    <span {{bindAttr class=":toggle-icon children.length::leaf"}} {{action toggle}}>
        {{#if isExpanded}}
            &#x25BC;
        {{else}}
            &#x25B6;
        {{/if}}
    </span>
    
    {{view Ember.Checkbox checkedBinding="checked"}}
    {{text}}
    
    {{#if isExpanded}}
        {{control "treeBranch" content}}
    {{else}}
        {{#if controllers.treetable.allExpanded}}
            {{control "treeBranch" content}}
        {{/if}}
    {{/if}}
</script>
  
</body>
</html>