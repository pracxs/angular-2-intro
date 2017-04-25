System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var EditMode;
    return {
        setters: [],
        execute: function () {
            (function (EditMode) {
                EditMode[EditMode["VIEW"] = 0] = "VIEW";
                EditMode[EditMode["ADD"] = 1] = "ADD";
                EditMode[EditMode["EDIT"] = 2] = "EDIT";
            })(EditMode || (EditMode = {}));
            exports_1("EditMode", EditMode);
        }
    };
});
//# sourceMappingURL=edit-mode.enum.js.map