var Leidos = window.Leidos || {};


Leidos.MigrateFromFilterview = function(executionContext) {
    "use strict";

    var formContext = executionContext.getFormContext();   
    var viewId = formContext.getControl("leidos_previousfunding").getDefaultView();
    var entityName = "leidos_projectfunding";
    var viewDisplayName = "Similar Funding"; //rename view so that we can see it in advanced options
	
    var projectId = null;
    var sourceId = null;
    var detailsId = null;
    var fundingRef = null;
	var thisFundingLineRef = 'xxx'; //dummy funding ref to ensure that a new funding line has a funding reference that won't match
	
	//read all of the relevant fields from the form
    var fundingSourceField = formContext.getAttribute("leidos_fundingsource");
    var fundDetailField = formContext.getAttribute("leidos_funddetails");
    var projectField = formContext.getAttribute("leidos_parentproject");
    var fundingRefField = formContext.getAttribute("leidos_projectfundingreference");

	if ((fundingSourceField != null) && (fundDetailField != null) && (projectField != null))
	{
		//if all fields are populated, read the values
		var fundingSourceValue = fundingSourceField.getValue();
		var fundDetailValue = fundDetailField.getValue();
		var projectValue = projectField.getValue();

		if ((fundingSourceValue != null) && (fundDetailValue != null) && (projectValue != null))
		{
			//retrieve the Ids from the lookups
			projectId = projectValue[0].id;
			sourceId = fundingSourceValue[0].id;
			detailsId = fundDetailValue[0].id;

			if (fundingRefField != null){
				var FundingRefValue = fundingRefField.getValue();
				if (FundingRefValue != null){
					thisFundingLineRef = FundingRefValue;
				}
				
			}

			var fetchData = {
				statuscode: "2",
				leidos_fundingRef: thisFundingLineRef, //string value
				leidos_projectid: projectId,
				leidos_sourceid: sourceId,
				leidos_detailsid: detailsId,
				leidos_spendprofilerequired: "1"
			};

			//retrieve all funding lines:
			// 1) in this project
			// 2) exclude the current one
			// 3) Where the funding source is the same
			// 4) Where the fund details are the same
			// 5) Funding line is not deleted
			var fetchXml = [
			"<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>",
			"  <entity name='leidos_projectfunding'>",
			"    <attribute name='leidos_name' />",
			"    <attribute name='leidos_projectfundingreference' />",
			"    <attribute name='leidos_parentprojectcost' />",
			"    <attribute name='leidos_projectfundingid' />",
			"    <attribute name='leidos_fundingsource' />" ,
			"    <attribute name='leidos_funddetails' />" ,
			"    <order attribute='leidos_name' descending='false' />",
			"    <filter type='and'>",
			"      <condition attribute='leidos_projectfundingreference' operator='ne' value='", fetchData.leidos_fundingRef, "'/>",
			"      <condition attribute='statuscode' operator='ne' value='", fetchData.statuscode, "'/>",
			"      <condition attribute='leidos_fundingsource' operator='eq' value='", fetchData.leidos_sourceid, "'/>",
			"      <condition attribute='leidos_funddetails' operator='eq' value='", fetchData.leidos_detailsid, "'/>",
			"    </filter>",
			"    <link-entity name='leidos_project' from='leidos_projectid' to='leidos_parentproject' link-type='inner' alias='proj'>",
			"      <attribute name='leidos_ownhandproject' />" ,
			"        <filter type='and'>",
			"          <condition attribute='leidos_projectid' operator='eq' value='", fetchData.leidos_projectid, "'/>",
			"        </filter>",
			"    </link-entity>",
			"  </entity>",
			"</fetch>",
			].join("");

		}
	}

	var layoutXml = "<grid name='resultset' object='10178' jump='leidos_name' select='1' icon='1' preview='1'>"
	+"<row name='result' id='leidos_projectfundingid'>"
	+"<cell name='leidos_name' width='200' />"
	+"<cell name='leidos_projectfundingreference' width='100'/>"
	+"<cell name='leidos_fundingsource' width='100'/>"
	+"<cell name='leidos_funddetails' width='100'/>"
	+"<cell name='leidos_parentprojectcost' width='100'/>"
	+"<cell name='proj.leidos_ownhandproject' width='100'/>"
	+"</row></grid>";

    setTimeout(function() {formContext.getControl("leidos_previousfunding").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true)}, 1000);
}

function setValsForQuickCreate(eContext) {
'use strict';
    var formContext = eContext.getFormContext(); // get Form Context
    if (formContext.ui.getFormType() == 1) {
        if (formContext.getAttribute("leidos_parentproject").getValue() !== null)
        {
            window.top.attributename = formContext.getAttribute("leidos_parentproject").getValue()[0];
        }
    }
}