var Leidos = window.Leidos || {};

Leidos.disableFieldEdit = function(context, fieldName)
{
    "use strict";
    context.getFormContext().getData().getEntity().attributes.forEach(function (attr) {
        if (attr.getName() === fieldName) {
            attr.controls.forEach(function (c) {
                c.setDisabled(true);
            })
        }
    });
}


Leidos.gridRowSelected = function (context) {
    "use strict";
    Leidos.disableFieldEdit(context, "leidos_missingscores");
}

Leidos.gridRowSelectedAnswer = function(context) {    
    "use strict";
    Leidos.disableFieldEdit(context, "leidos_previousratingvalue");
}
