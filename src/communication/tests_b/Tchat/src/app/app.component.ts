import { Component } from '@angular/core';

var tablMessages = [];
tablMessages.push({emetteur:"Pseudo2", contenu:"je suis le pseudo 2" });
tablMessages.push({emetteur:"moi", contenu:"je suis moi" });
tablMessages.push({emetteur:"Pseudo4", contenu:"je suis le pseudo 4" });
tablMessages.push({emetteur:"Pseudo2", contenu:"je suis le pseudo 2" });

var pseudos = ["moi", "Pseudo1", "Pseudo2","Pseudo3","Pseudo4"];
var boutonDropdown = "Selectionner un pseudo";
var couleur;
var classCouleur = ["yellow", "red", "blue", "grey", "pink"];


@Component({
  selector: 'app-root', 
  template:`
  <h1 class="well text-center"> Tchat : </h1>

  <div class="row col-xs-offset-2 col-xs-8 zoneChat">
            <li *ngFor="let message of tablMessages" style="list-style-type: none;">
                  {{quelPseudo(message.emetteur)}}
                  <div [style.background-color]="yellow" >
                  <dd>{{message.emetteur}}</dd>
                  <dt>{{message.contenu}}</dt>
                  </div>
            </li>
  </div>

    <div class="row col-xs-offset-2 col-xs-3">
          <input class="form-control form-group" placeholder="Envoyer un nouveau message">
    </div>

    <div class="row col-xs-4">
          &nbsp;
          <button class="btn btn-primary dropdown-toggle glyphicon glyphicon-user" data-toggle="dropdown">
          {{boutonDropdown}}
          <span class="caret"></span></button>
          <ul class="dropdown-menu">
            <li *ngFor="let pseudo of pseudos"  class="dropdown-item" (click)="selectionnerPseudo(pseudo)">
              <a href="#">{{pseudo}}</a>
            </li>
          </ul>

      <button class="btn btn-primary glyphicon glyphicon-envelope"> Envoyer</button>
    </div>

  `,
  styles: [`
    .zoneChat {
      background:#f3e8ff;
      position:absolute;
      top:28%;
      height:60%;
      border-radius:15px;
      border-style: solid;
      border-width: 5px;
      border-color: #D9CEF8;
      border-top-left-radius:15px;
      border-bottom-left-radius:15px;
      overflow-y:scroll;
      padding:5px;
    }
`]
})

export class AppComponent {
  title = 'app';
  pseudos=pseudos;
  boutonDropdown=boutonDropdown;
  tablMessages=tablMessages;
  couleur = couleur;
  classCouleur = classCouleur;

  quelPseudo(pseudo:string):void {
      for (var i = 0; i<pseudos.length; i++){
        if(pseudo === pseudos[i])
          {
            this.couleur = classCouleur[i];
            
          }//endif
      }//endfor
  }

  selectionnerPseudo(pseudo:string):void {
    this.boutonDropdown = pseudo;
  }

}

/*

*/