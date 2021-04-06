var Leidos = window.Leidos || {};

Leidos.ProgrammeFilterView = function (executionContext) {
    "use strict";
    var formContext = executionContext.getFormContext();  
    var amendmentType = formContext.getAttribute("leidos_amendmenttype").getValue();
    if (amendmentType === 445260003) { /* Revert to Claims Complete */      
        Leidos.setLookupViewId(executionContext, "leidos_programme","{7184A646-EA96-EB11-B1AC-002248413AC9}");
    } else {
        Leidos.setLookupViewId(executionContext, "leidos_programme","{8FA3FB14-60BF-EA11-A812-000D3A7FEDBE}");
    }
} 