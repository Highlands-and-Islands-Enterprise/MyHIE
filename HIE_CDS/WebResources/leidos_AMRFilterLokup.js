var Leidos = window.Leidos || {};

Leidos.filterSegmentationLookup = function(executionContext) {
  "use strict";
  var formContext = executionContext.getFormContext();
  //Check if the control exist on the form
  if (formContext.getControl("header_process_leidos_proposedsegmentation") !== null) {
    // add the event handler for PreSearch Event
    formContext.getControl("header_process_leidos_proposedsegmentation").addPreSearch(Leidos.addFilter);
  }
}

Leidos.addFilter = function(executionContext) {
  "use strict";
  var formContext = executionContext.getFormContext();
  var parentId = null;
  var parentlookup;
  var fetchQuery;
  try {
    //Check if control exist on form
    if (formContext.getControl("leidos_businessorsocialenterprise") !== null && formContext.getControl("leidos_businessorsocialenterprise").getAttribute().getValue() !== null) {
      //Get Account lookup value
      parentlookup = formContext.getControl("leidos_businessorsocialenterprise").getAttribute().getValue();
      //Get the account id
      parentId = parentlookup[0].id;
    }
    //Build fetch
    if (parentId !== null || parentId !== undefined) {
      fetchQuery = "<filter type='and'>" +
        "<condition attribute='statecode' operator='eq' value='0' />" +
        "<condition attribute='leidos_businessorsocialenterprise' operator='eq' value='" + parentId + "' />" +
        "</filter>";
      //add custom filter
      formContext.getControl("header_process_leidos_proposedsegmentation").addCustomFilter(fetchQuery);
    }
  } catch (e) {
    Xrm.Navigation.openAlertDialog("addFilter Error: " + (e.description || e.message));
  }
}
