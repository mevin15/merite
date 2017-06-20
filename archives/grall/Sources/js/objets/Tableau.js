function Tableau(titre = "sans titre", tableId = null){

// -------------------------------------------- ATTRIBUTS --------------------------------------------------------------
	// Attributs relatifs au tableau
	this.title = titre;
	this.tableId = tableId;
	this.elementTr = []; //Tableau contenant les objets des tr
	this.caption; //Objet caption du tableau
	
	// Attribut a utiliser pour selectionner l'element tableau
	this.Element;
	
//init
create_table(this);

// -------------------------------------------- METHODES --------------------------------------------------------------
this.addLigne = function(Ligne){ //ajouter une ligne
	this.Element.appendChild(Ligne);
	this.elementTr.push(Ligne);
}

this.changerTitre = function(titre){ //changer le titre du tableau
	this.caption.innerHTML = titre;
}

// -------------------------------------------- FONCTIONS --------------------------------------------------------------
	function create_table(ref){
		ref.Element = document.createElement('table');
		if (ref.tableId != null && typeof(ref.tableId) === 'string'){
			ref.Element.id = ref.tableId;
		}
		
		ref.caption = document.createElement('caption');
		ref.Element.appendChild(ref.caption);
		ref.caption.innerHTML = ref.title;
		set_style_table(ref.Element);
		set_style_caption(ref.Element);
	}
		
		
		
		
		
		
		
		
		
		
		
		
		
}//end objet