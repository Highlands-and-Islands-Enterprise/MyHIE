var formContext = null;
var lastModifiedOn = null;

function OnLoad(executionContext)
{
   "use strict";
  formContext = executionContext.getFormContext(); //get Form Context
  if(formContext.ui.getFormType() === 2){
    Xrm.WebApi.retrieveRecord(formContext.data.entity.getEntityName(), formContext.data.entity.getId(), "?$select=modifiedon").then(onRetrieveModifiedOn);
  }
}

function onFormSave()
{
   "use strict";
	//Not to refresh on save
	lastModifiedOn = null;
}

function onSubgridLoad(executionContext)
{
   "use strict";
   Xrm.WebApi.retrieveRecord(formContext.data.entity.getEntityName(), formContext.data.entity.getId(), "?$select=modifiedon").then(onRetrieveModifiedOn);
}

function onRetrieveModifiedOn(result)
{
   "use strict";
	if(lastModifiedOn !== result.modifiedon)
	{
		debugger;
		var doRefresh = false;
		if(lastModifiedOn === null){
			formContext.getControl("CostFunding").addOnLoad(onSubgridLoad);
		}
		else{
			doRefresh = true;
		}
		lastModifiedOn = result.modifiedon;
		if(doRefresh) formContext.data.refresh();
	}
}