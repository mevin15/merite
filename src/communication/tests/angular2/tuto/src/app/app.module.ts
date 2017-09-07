import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel 


import { AppComponent }  from './app.component';
import { NoeudComponent }  from './noeud.component';


@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, NoeudComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
