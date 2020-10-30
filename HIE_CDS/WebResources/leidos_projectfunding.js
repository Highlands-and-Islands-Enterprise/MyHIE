function setValsForQuickCreate(eContext) {

    var formContext = eContext.getFormContext(); // get Form Context

    if (formContext.getAttribute("leidos_parentproject").getValue() != null)
    {
        window.top.attributename = formContext.getAttribute("leidos_parentproject").getValue()[0];
    }

}