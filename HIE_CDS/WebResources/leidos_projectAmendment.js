var Leidos = window.Leidos || {};

Leidos.SetProjectAmendmentPathControlViews = function (executionContext) {
   "use strict";
    Leidos.setLookupViewId(executionContext, "header_process_leidos_gradeestaff","{aa3f26b8-b6bb-ea11-a812-000d3a7f1bbb}");
    Leidos.setLookupViewId(executionContext, "header_process_leidos_gradefstaff","{da8a1bc4-b6bb-ea11-a812-000d3a7f1bbb}");
    Leidos.setLookupViewId(executionContext, "header_process_leidos_executivegradestaff","{AB53A03A-B7BB-EA11-A812-000D3A7FEDBE}");
    Leidos.setLookupViewId(executionContext, "header_process_leidos_leadershipteam","{21C34315-32BC-EA11-A812-000D3A7FEDBE}");
    Leidos.setLookupViewId(executionContext, "header_process_leidos_hiechiefexecutive","{78B7A846-B7BB-EA11-A812-000D3A7FEDBE}");
    Leidos.setLookupViewId(executionContext, "header_process_leidos_hieboard","{1359B25E-B7BB-EA11-A812-000D3A7FEDBE}");
}

Leidos.ValidateDelegatedAuthority = function(executionContext) {
    "use strict";
    var formContext = executionContext.getFormContext();
    var currentPath = formContext.getAttribute('leidos_projectamendmentpath').getValue();
    var currentUser  = Xrm.Utility.getGlobalContext().userSettings.userName;
    var currentStatus = formContext.getAttribute('statuscode').getValue();

    if(currentStatus = '445260000'){ /* Draft */
		if (currentPath == '445260001') { /* Executive grade staff */
			var delegatedAuthority = formContext.getAttribute('leidos_executivegradestaff').getValue();	
		} else if (currentPath == '445260000') { /* Grade E staff */
			var delegatedAuthority = formContext.getAttribute('leidos_gradeestaff').getValue();	
		} else if (currentPath == '445260006') { /* Grade F staff */
			var delegatedAuthority = formContext.getAttribute('leidos_gradefstaff').getValue();	
		} else if (currentPath == '445260003') { /* Leadership team */
			var delegatedAuthority = formContext.getAttribute('leidos_leadershipteam').getValue();
		} else if (currentPath == '445260005') { /* HIE Board */
			var delegatedAuthority = formContext.getAttribute('leidos_hieboard').getValue();
		} else if (currentPath == '44526004') { /* HIE Chief Executive */
			var delegatedAuthority = formContext.getAttribute('leidos_hiechiefexecutive').getValue();	
		} else if (currentPath == '445260002') { /* Finance */
			var delegatedAuthority = formContext.getAttribute('leidos_finance').getValue();	
		} else {
			var delegatedAuthority = '';
		}
		
		if(delegatedAuthority == null){
			formContext.getControl('leidos_submitprojectamendmentforapproval').setVisible(true);
			formContext.ui.clearFormNotification('DAMsg1');
		} else {
			if ( delegatedAuthority[0].name == currentUser){ /* hide submit button and display warning */
				formContext.getControl('leidos_submitprojectamendmentforapproval').setVisible(false);
				formContext.ui.setFormNotification('Delegated Authority can not yourself.  Please amend before submitting', 'ERROR', 'DAMsg1');
			} else { /*show submit button and clear warning when status reason = draft*/       
				formContext.getControl('leidos_submitprojectamendmentforapproval').setVisible(true);
				formContext.ui.clearFormNotification('DAMsg1');
			}
		}
	}
}