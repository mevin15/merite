"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tab = { "a": 1, "b": 2 };
console.log(tab["a"] !== undefined);
console.log(tab["c"] === undefined);
if (tab["a"]) {
    console.log("présence vaut true");
}
if (!tab["c"]) {
    console.log("absence vaut false");
}
//# sourceMappingURL=tableJSON.js.map