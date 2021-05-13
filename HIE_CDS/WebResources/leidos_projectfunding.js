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