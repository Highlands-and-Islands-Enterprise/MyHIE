function setParentProject(eContext) {

    try {
        var formContext = eContext.getFormContext(); // get Form Context
        var parentProject = window.top.attributename; // get Parent Project

        // Set Parent Project on quick create form
        if (parentProject != null) {
            var lookup = new Array();
            lookup[0] = new Object;
            lookup[0].id = parentProject.id;
            lookup[0].name = parentProject.name;
            lookup[0].entityType = parentProject.entityType;
            formContext.getAttribute("leidos_parentprojectid").setValue(lookup);
        }

    } catch (e) {

        alert(e.message);

    }

}

function onLoad(eContext) {

    setParentProject(eContext);

}