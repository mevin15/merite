export function elementParId(id : string) : HTMLElement {
    return document.getElementById(id);
}

export function entreeParId(id : string) : HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

export function recupererEntree(id : string) : string {
    return entreeParId(id).value;
}

export function initialiserEntree(id : string, val : string) : void {
    entreeParId(id).value = val;
}


export function contenuBalise(doc: Document, champ: string): string {
    return doc.getElementById(champ).innerHTML;
}

export function poster(id : string, val: string): void {
    document.getElementById(id).innerHTML += val;
}

export function posterNL(id: string, val: string): void {
    poster(id, val + "<br>");
}

export function gererEvenementDocument(type: string, gestionnaire: (e: Event) => void) {
    console.log("- Document : enregistrement d'un gestionnaire pour l'événement " + type);
    document.addEventListener(type, <EventListenerOrEventListenerObject>gestionnaire);
}


export function gererEvenementElement(id: string, type: string, gestionnaire: (e: Event) => void) {
    document.getElementById(id).addEventListener(type, <EventListenerOrEventListenerObject>gestionnaire);
}

export function elementSaisieEnvoi(idSaisie : string, idBoutonEnvoi: string, msg : string) : string {
    return '<input type="text" id="' + idSaisie + '">' 
        + '<input class="button" type="button" id="' + idBoutonEnvoi + '" value="' + msg +'" >';
}