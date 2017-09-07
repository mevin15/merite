import { Injectable } from '@angular/core';

import { Noeud } from "./noeud";
import { RESEAU } from "./liste-noeuds";

@Injectable()
export class NoeudService {
    getNoeuds(): Promise<Noeud[]> {
        return Promise.resolve(RESEAU);
    }
    getNoeudsLentement(): Promise<Noeud[]> {
        return new Promise(resolve => {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(this.getNoeuds()), 2000);
        });
    }
}