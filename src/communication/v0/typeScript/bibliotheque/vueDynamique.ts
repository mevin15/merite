export function elementSaisieEnvoi(idSaisie : string, idBoutonEnvoi: string, msg : string) : string {
    return '<input type="text" id="' + idSaisie + '">' 
        + '<input class="button" type="button" id="' + idBoutonEnvoi + '" value="' + msg +'" >';
}