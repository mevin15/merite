import { Component } from '@angular/core';

import { noms, couleurs } from "../../commun/liste"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'la page unique';
  noms = JSON.stringify(noms);
  couleurs = JSON.stringify(couleurs);

}
