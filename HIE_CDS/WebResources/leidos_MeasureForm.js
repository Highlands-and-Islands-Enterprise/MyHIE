var Leidos = window.Leidos || {};



Leidos.StrategicPriorityFilterview = function(executionContext) {
    "use strict";

    var formContext = executionContext.getFormContext();   
    var viewId = formContext.getControl("leidos_strategicpriority").getDefaultView();
    var entityName = "leidos_projectmeasure";
    var viewDisplayName = "Strategic Priorities from Project";
    var parentProject = formContext.getAttribute("leidos_parentproject").getValue()[0].id;
    /* var id = formContext.data.entity.getId(); */


    var fetchData = {
		leidos_parentproject: parentProject
	};
	var fetchXml = [
"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>",
"  <entity name='leidos_strategicpriority'>",
"    <attribute name='leidos_strategicpriorityid' />",
"    <attribute name='leidos_strategicpriority' />",
"    <order attribute='leidos_strategicpriority' descending='false' />",
"    <link-entity name='leidos_projectstrategicpriority' from='leidos_strategicpriority' to='leidos_strategicpriorityid' link-type='inner' alias='al'>",
"      <filter type='and'>",
"        <condition attribute='leidos_parentproject' operator='eq' value='", fetchData.leidos_parentproject, "'/>",
"      </filter>",
"    </link-entity>",
"  </entity>",
"</fetch>",
	].join("");
   
    var layoutXml = "<grid name='leidos_strategicpriorities' object='10181 jump='leidos_strategicpriority' select='1' icon='1' preview='1' >" 
    +"<row name='result' id='leidos_strategicpriorityid' >"
    +"<cell name='leidos_strategicpriority' width='300' />"
    +"</row></grid>";



    setTimeout(function() {formContext.getControl("leidos_strategicpriority").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true)}, 1000);
}

