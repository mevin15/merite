let tab : ((cle : string) => string)[] = [];

let obj = {
    "a" : 1,
    "b" : 2
};

for(let c in obj){
    tab.push((x => c));
}

console.log(tab[0]("coco"));
console.log(tab[1]("coco"));

tab = [];

for(const c in obj){
    tab.push((x => c));
}

console.log(tab[0]("coco"));
console.log(tab[1]("coco"));

tab = [];

// problème
let c : string;
for(c in obj){
    tab.push((x => c ));
}

console.log(tab[0]("coco"));
console.log(tab[1]("coco"));

