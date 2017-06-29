function Sablier(){
//Crée un sablier de 24px * 24px
// -------------------------------------------- ATTRIBUTS --------------------------------------------------------------
		this.canvas = document.createElement('canvas');
		this.context = this.canvas.getContext('2d');
		this.etat = "activer"; //activer ou desactiver l'animation
		this.afficher = "montrer";
		this.loadImage = "notLoad"; //Indique si l'image a été chargé ou pas encore
		
		this.indexOfFrame = 0;
		this.sourceX = 0;
		this.sourceY = 0;
		this.destX = 500;
		this.destY = 500;
		this.width = 30;
		this.height = 40;
		this.timestampStart; //timestamp de depart
		this.timestampActually; //timestamp actuel

		var gref = this;
		var img_Sablier = new Image();

//init
this.canvas.width = 1000;
this.canvas.height = 1000;
document.body.appendChild(this.canvas);
lancerAnimation(10);
 /* -----------------------------------------------------------*/

// -------------------------------------------- METHODES --------------------------------------------------------------
this.changerAffichage = function(afficher){ //active ou desactive l'animation du sablier + son affichage
	if (afficher === "montrer"){
	this.afficher = "montrer";
	document.body.appendChild(this.canvas);
	lancerAnimation();
	} //end if
	
	if (afficher === "cacher"){
	this.afficher = "cacher";
	this.canvas.remove(this.canvas);
	stopperAnimation();
	} //end if
	
	if (afficher !== "montrer" || "afficher"){
		alert("Debug : Sablier.changerAffichage(afficher) --- Afficher est différent de [montrer] et [cacher]");
	}	//end if
}

// -------------------------------------------- FONCTIONS --------------------------------------------------------------
	function chargerSablier(){
		img_Sablier.src = 'sablier_sprite.png';
		img_Sablier.addEventListener('load', function(){
		gref.loadImage = "load";
		lancerAnimation(10);}//end function
		)//end event definition
	}; //end function chargerSablier
		
	function lancerAnimation(tempsSecondes){
		if (gref.loadImage === "load"){ //si les sprites sont chargés

			//On prend la valeur du timestamp si l'animation est activée
			if (gref.etat === "activer"){
				//gref.timestampStart = new Date().getTime();
				gref.indexOfFrame = 0;
				gref.etat = "desactiver";
				//gref.timestampActually = 0;
			}//end if

			
			//var t = tempsSecondes*1000;
		//if( t> gref.timestampActually){
			gref.context.clearRect(0, 0, gref.canvas.width, gref.canvas.height); //on efface le canvas integralement
			gref.sourceX = gref.indexOfFrame * gref.width;
			//alert(gref.sourceX);

			gref.indexOfFrame += 1;
			//gref.timestampActually = new Date().getTime();
			//gref.timestampActually =  gref.timestampActually - gref.timestampStart;

			if (gref.indexOfFrame == 13){
						gref.indexOfFrame = 0;
						setTimeout(function(){lancerAnimation(10);},100);
			}
		//} //end if
		} //end if
		
		if (gref.loadImage === "notLoad"){
			chargerSablier();
		} //end if
	}//end function lancerAnimation
}//end objet Sablier



