import { Unite } from "../bibliotheque/types";

let tab: { [cle: string]: number } = { "a": 1, "b": 2 };

console.log(tab["a"] !== undefined);
console.log(tab["c"] === undefined);
if (tab["a"]) {
    console.log("présence vaut true");
}
if (!tab["c"]) {
    console.log("absence vaut false");
}