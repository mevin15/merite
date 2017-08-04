function recupererElementHTML(id : string) : HTMLElement{
    let r = document.getElementById(id); 
    if(typeof r === "undefined"){
        throw new Error(`[Erreur : elementParId(${id}) non défini.]`);
    }
    return <HTMLElement>r;
}

export function elementParId(id : string) : HTMLElement {
    return recupererElementHTML(id);
}

export function entreeParId(id : string) : HTMLInputElement {
    return <HTMLInputElement>recupererElementHTML(id);
}

export function recupererEntree(id : string) : string {
    return entreeParId(id).value;
}

export function initialiserEntree(id : string, val : string) : void {
    entreeParId(id).value = val;
}

export function initialiserDocument(contenu : string){
    document.write(contenu);
}

export function contenuBalise(champ: string): string {
    let r = recupererElementHTML(champ);
    return r.innerHTML;
}

export function poster(id : string, val: string): void {
    let r = recupererElementHTML(id);
    r.innerHTML += val;
}

export function posterNL(id: string, val: string): void {
    poster(id, val + "<br>");
}

export function gererEvenementDocument(type: string, gestionnaire: (e: Event) => void) {
    console.log("- Document : enregistrement d'un gestionnaire pour l'événement " + type);
    document.addEventListener(type, <EventListenerOrEventListenerObject>gestionnaire);
}


export function gererEvenementElement(id: string, type: string, gestionnaire: (e: Event) => void) {
    let r = recupererElementHTML(id);
    r.addEventListener(type, <EventListenerOrEventListenerObject>gestionnaire);
}

export function elementSaisieEnvoi(idSaisie : string, idBoutonEnvoi: string, msg : string) : string {
    return '<input type="text" id="' + idSaisie + '">' 
        + '<input class="button" type="button" id="' + idBoutonEnvoi + '" value="' + msg +'" >';
}