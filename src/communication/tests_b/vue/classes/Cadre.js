function Cadre(tableId = null, largeurCadre = null, hauteurCadre = null, posX = "0px", posY = "0px"){

// -------------------------------------------- ATTRIBUTS --------------------------------------------------------------
	// Attributs relatifs aux dimensions du cadre
		this.largeurCadre = largeurCadre;
		this.hauteurCadre = hauteurCadre;
		
	// Attributs relatifs à la position du cadre
		this.posX = posX;
		this.posY = posY;
		
	// Attributs relatifs au cadre
		this.elementTable = [];
		this.elementBouton = [];
		this.div;
		this.div_largeur;
		this.div_hauteur;
		this.div_border = "0px";

	// Attribut a utiliser pour selectionner l'element div
		this.Element; //Le cadre est un div
		var gref = this;
		
//init
create_cadre(this);
create_div(this);

// -------------------------------------------- METHODES --------------------------------------------------------------
this.addTableau = function(Tableau){ //ajouter un tableau
	this.div.appendChild(Tableau);
	this.elementTable.push(Tableau);
	
	document.body.appendChild(gref.div);
	gref.div_largeur = gref.div.offsetWidth;
	gref.div_hauteur = gref.div.offsetHeight;
	gref.div.remove(gref.div.selectedIndex);
	gref.Element.appendChild(gref.div);
}

this.addBouton = function(Bouton){ //ajouter un bouton
	gref.Element.appendChild(Bouton.Element);
	gref.elementBouton.push(Bouton.Element);
	if (Bouton.position == "bas-gauche"){
	Bouton.Element.style.top = parseFloat(gref.posY) + parseFloat(gref.div_hauteur) + parseFloat(Bouton.deltaY)- parseFloat(gref.div_border) + "px";
	Bouton.Element.style.left = parseFloat(gref.posX) + parseFloat(Bouton.deltaX) - parseFloat(gref.div_border)+ "px";
	}

	if (Bouton.position == "bas-droite"){
	Bouton.Element.style.top = parseFloat(gref.posY) + parseFloat(gref.div_hauteur) + parseFloat(Bouton.deltaY)- parseFloat(gref.div_border) + "px";
	Bouton.Element.style.left = parseFloat(gref.posX) + parseFloat(gref.div_largeur) - parseFloat(gref.div_border)+ parseFloat(Bouton.deltaX) + "px";
	
	}



	
	if (Bouton.largeur != null){Bouton.Element.style.width = Bouton.largeur;}
	if (Bouton.hauteur != null){Bouton.Element.style.height = Bouton.hauteur;}
}
// -------------------------------------------- FONCTIONS --------------------------------------------------------------

	function create_div(ref){
		ref.div = document.createElement('div');
		ref.Element.appendChild(ref.div);
		set_style_div(ref.div);
		ref.div.style.top = ref.posY;
		ref.div.style.left = ref.posX;
		ref.div_border = window.getComputedStyle(ref.div).getPropertyValue('border-bottom-width');
	}
	
	function create_cadre(ref){
		ref.Element = document.createElement('div');
		document.body.appendChild(ref.Element);
		ref.Element.style.top = ref.posY;
		ref.Element.style.left = ref.posX;
	}
}//end objet


	