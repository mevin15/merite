import { Component, OnInit } from '@angular/core';

import { Noeud } from "./noeud";
import { NoeudService } from "./noeud.service";


@Component({
  selector: 'appli',
  styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .reseau {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .reseau li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .reseau li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .reseau li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .reseau .text {
    position: relative;
    top: -3px;
  }
  .reseau .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
  `],
  template: `
    <h1>{{titre}}</h1>
    <h2>Le réseau</h2>
    <ul class="reseau">
      <li *ngFor="let n of reseau" [class.selected]="n === noeudCourant" (click)="selectionner(n)">
        <!-- chaque noeud du réseau -->
        <span class="badge">{{n.id}}</span> {{n.nom}}
      </li>
    </ul>
    <noeud [noeud]="noeudCourant"></noeud>
  `,
  providers: [NoeudService]
})
export class AppComponent implements OnInit {
  titre = 'Tchact via Angular';
  noeudCourant: Noeud;
  /*{ = 
    id: 0,
    nom: 'description du noeud'
  };
  */
  reseau: Noeud[];

  constructor(private serviceNoeuds: NoeudService) {

  }

  getReseau(): void {
    this.serviceNoeuds.getNoeudsLentement().then(r => {this.reseau = r;})
  }

  selectionner(n: Noeud): void {
    console.log("noeud : " + n.nom)
    this.noeudCourant = n;
  }

  ngOnInit() : void {
    this.getReseau();
  }

}
