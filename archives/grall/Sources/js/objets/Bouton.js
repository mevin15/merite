function Bouton( titre = "sans titre", deltaX = "0px", deltaY = "0px", position = "", largeur = null, hauteur = null ){

// -------------------------------------------- ATTRIBUTS --------------------------------------------------------------
	// Attributs relatifs au bouton
	this.title = titre;
	this.largeur = largeur;
	this.hauteur = hauteur;
	this.position = position; //defini l'axe par rapport au delta "bas" "droite"
	
	// Attributs relatifs à la position du bouton
	this.deltaX = deltaX;
	this.deltaY = deltaY;
	
	// Attribut a utiliser pour selectionner l'element tableau
	this.Element;
	
//init
this.Element = document.createElement('button');
this.Element.innerHTML = titre;
set_style_button(this.Element);

// -------------------------------------------- METHODES --------------------------------------------------------------
this.addFunctionOnclick = function(fonctionEvent){ //ajouter une ligne
	this.Element.addEventListener('click', fonctionEvent);
} //end addevent
}//end objet