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
	<script type="text/javascript" src="js/app.js"></script>
<meta charset=utf-8 />
<title>Ember.js Tree Example</title>
</head>
<body>
    
<script data-template-name="application" type="text/x-handlebars">
    <div {{action expandAll}}>Expand all</div>
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
    {{/if}}
</script>
  
</body>
</html>