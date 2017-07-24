import * as chai from 'chai';
import * as mocha from 'mocha';

import { Identifiant, FormatMessage, Message, TableNoeuds } from "../../../bibliotheque/communication";
import {
    creerMessageErreurConnexion, creerMessageRetourErreur, creerMessageTransit, creerMessageAR,
    TypeMessageChat, FormatMessageChat, MessageChat, creerAnneauChat, FormatSommetChat
} from '../../../chat/commun/chat';



const anneau: TableNoeuds<FormatSommetChat> = creerAnneauChat(["titi", "toto", "coco", "sissi"]);

let noeuds = anneau.noeuds();

for (let cle in noeuds) {
    const cleC = cle;
    describe('fonction creerAnneauChat', () => {
        describe('méthode TableNoeuds.possedeNoeud ', () => {
            it('renvoie true', () => {
                let result = anneau.possedeNoeud(cle);
                chai.expect(result).to.equal(true);
            });
        })
    });
}

describe('fonction creerAnneauChat', () => {
    let cle = "mauvaise";
    describe('méthode TableNoeuds.possedeNoeud ', () => {
        it('renvoie false', () => {
            let result = anneau.possedeNoeud(cle);
            chai.expect(result).to.equal(false);
        });
    })
});

for (let cle in noeuds) {
    const cleC = cle;
    describe('fonction creerAnneauChat', () => {
        describe('méthode TableNoeuds.noeuds ', () => {
            let result = noeuds[cleC].centre().enJSON().id;
            it('renvoie true', () => {
                chai.expect(result).to.equal(cleC);
            });
        })
    });
}
