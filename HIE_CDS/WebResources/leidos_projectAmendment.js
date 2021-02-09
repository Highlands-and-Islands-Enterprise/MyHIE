var Leidos = window.Leidos || {};

Leidos.ShowProjectAmendmentError = function (error)
{
	"use strict";
	Xrm.Navigation.openErrorDialog({ errorCode:"Error", details:error.message, message:error.message }).then(
    function (success) {
        console.log(success);        
    },
    function (error) {
        console.log(error);
    });
}

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
    var delegatedAuthority = null;
    var amendmentsComplete = formContext.getAttribute('leidos_amendmentscomplete').getValue();

    if(currentStatus === '445260000'){ /* Draft */
		if (currentPath === '445260001') { /* Executive grade staff */
			delegatedAuthority = formContext.getAttribute('leidos_executivegradestaff').getValue();	
		} else if (currentPath === '445260000') { /* Grade E staff */
			delegatedAuthority = formContext.getAttribute('leidos_gradeestaff').getValue();	
		} else if (currentPath === '445260006') { /* Grade F staff */
			delegatedAuthority = formContext.getAttribute('leidos_gradefstaff').getValue();	
		} else if (currentPath === '445260003') { /* Leadership team */
			delegatedAuthority = formContext.getAttribute('leidos_leadershipteam').getValue();
		} else if (currentPath ==='445260005') { /* HIE Board */
			delegatedAuthority = formContext.getAttribute('leidos_hieboard').getValue();
		} else if (currentPath === '445260004') { /* HIE Chief Executive */
			delegatedAuthority = formContext.getAttribute('leidos_hiechiefexecutive').getValue();	
		} else if (currentPath === '445260002') { /* Finance */
			delegatedAuthority = formContext.getAttribute('leidos_finance').getValue();	
		}

		if(delegatedAuthority === null || typeof(delegatedAuthority) === 'undefined'){
                        formContext.getControl('leidos_submitprojectamendmentforapproval').setVisible(false);
			formContext.ui.clearFormNotification('DAMsg1');
		} else {
			if ( delegatedAuthority[0].name === currentUser){ /* hide submit button and display warning */
                                formContext.getControl('leidos_submitprojectamendmentforapproval').setVisible(false);
				formContext.ui.setFormNotification('Delegated Authority can not be yourself.  Please amend before submitting', 'ERROR', 'DAMsg1');
			} else { /* show submit button and clear warning */      
                                formContext.getControl('leidos_submitprojectamendmentforapproval').setVisible(true);
				formContext.ui.clearFormNotification('DAMsg1');
			}
		}
	}
}

Leidos.DelayedDACheck = function (executionContext) {
    "use strict";
    setTimeout(function() {
        Leidos.ValidateDelegatedAuthority(executionContext);
    }, 1000);
}

Leidos.refreshSave =  function (executionContext) {
    "use strict";
	var formContext = executionContext.getFormContext();
    formContext.data.refresh(true).then(function() {
        Leidos.ValidateDelegatedAuthority(executionContext);
    }, 
    function(error) {
        Leidos.ShowProjectAmendmentError(error);
    })
}

Leidos.ProjectFilterView = function (executionContext) {
    "use strict";
    var formContext = executionContext.getFormContext();  
    var amendmentType = formContext.getAttribute("leidos_amendmenttype").getValue();
    if (amendmentType === 445260003) { /* Revert to Claims Complete */      
        Leidos.setLookupViewId(executionContext, "leidos_project","{C8C594CF-D06A-EB11-A812-0022483F8BCB}");
    } else {
        Leidos.setLookupViewId(executionContext, "leidos_project","{F9F463C8-1DE2-456D-848B-9EEB0AAEDF3F}");
    }
}   