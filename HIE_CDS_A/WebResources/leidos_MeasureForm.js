var Leidos = window.Leidos || {};



Leidos.StrategicPriorityFilterview = function(executionContext) {
    "use strict";

    var formContext = executionContext.getFormContext();   
    var viewId = formContext.getControl("leidos_strategicpriority").getDefaultView();
    var entityName = "leidos_strategicpriority";
    var viewDisplayName = "Strategic Priorities List";
    var parentProject = formContext.getAttribute("leidos_parentproject").getValue()[0].id;
    /* var id = formContext.data.entity.getId(); */

    var fetchData = {
		statuscode: "2",
		leidos_projectid: parentProject
	};
	var fetchXml = [
"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>",
"  <entity name='leidos_strategicpriority'>",
"    <attribute name='leidos_strategicpriorityid' />",
"    <attribute name='leidos_strategicpriority' />",
"    <order attribute='leidos_strategicpriority' descending='false' />",
"    <link-entity name='leidos_projectstrategicpriority' from='leidos_strategicpriority' to='leidos_strategicpriorityid' link-type='inner' alias='ah'>",
"      <filter type='and'>",
"        <condition attribute='statuscode' operator='ne' value='", fetchData.statuscode, "'/>",
"      </filter>",
"      <link-entity name='leidos_project' from='leidos_projectid' to='leidos_parentproject' link-type='inner' alias='ai'>",
"        <filter type='and'>",
"          <condition attribute='leidos_projectid' operator='eq' value='", fetchData.leidos_projectid, "'/>",
"        </filter>",
"      </link-entity>",
"    </link-entity>",
"  </entity>",
"</fetch>",
	].join("");
   
    var layoutXml = "<grid name='resultset' object='10181' jump='leidos_name' select='1' icon='1' preview='1' >" 
    +"<row name='result' id='leidos_strategicpriorityd' >"
    +"<cell name='leidos_strategicpriority' width='300' />"
    +"</row></grid>";



    setTimeout(function() {formContext.getControl("leidos_strategicpriority").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true)}, 1000);
}