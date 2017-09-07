import { Component, Input } from '@angular/core';
import { Noeud } from "./noeud";

@Component({
  selector: 'noeud',
  template: `
  <div *ngIf="noeud">
    <h2>{{noeud.nom}}</h2>
    <div><label>id: </label>{{noeud.id}}</div>
    <div>
      <label>nom: </label>
      <input [(ngModel)]="noeud.nom" placeholder="nom">
    </div>
    </div>
    <div *ngIf="!noeud">
    <h2>Noeud non initialisé</h2>
    </div>`
})
export class NoeudComponent {
    @Input() noeud : Noeud

}