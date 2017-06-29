function Sprite(lienSprite, nmbFrames, dureeAnim, largeur, hauteur, contextCanvas = null, posX=0, posY=0){
// -------------------------------------------- ATTRIBUTS --------------------------------------------------------------
	//À définir par l'utilisateur
	this.lienSprite = lienSprite;
	this.FrameHauteur = hauteur;
	this.FrameLargeur = largeur;
	this.nmbFrames = nmbFrames;
	this.dureeAnim = dureeAnim; //durée en milisec
	this.posX = posX;
	this.posY = posY;
	
	//Attributs de fonctionnement
	this.canvas;
	this.context;
	this.imgSprite;
	this.indexOfFrame = 0;
	this.sourceX = 0;
	this.sourceY = 0;
	this.destX = 0;
	this.destY = 0;
	this.width = largeur;
	this.height = hauteur;
	this.afficher = "montrer";
	this.loadImage = "notLoad";
	this.dureeFrame;
	gref = this;
	
	var img = new Image();
	var relancer = 'non';
	
//init
	chargerImg();
	if (contextCanvas === null){ //Si aucun context 2d de Canvas n'est donné, alors le créer
		gref.canvas = document.createElement('canvas');
		gref.contextCanvas = gref.canvas.getContext('2d');
				gref.canvas.width = gref.FrameLargeur;
		gref.canvas.height = gref.FrameHauteur;
		var a = parseFloat(gref.posX) +"px";
		gref.canvas.style.position = "absolute";
		gref.canvas.style.top = parseFloat(gref.posY) +"px"; 
		alert(a);
		gref.canvas.style.left = parseFloat(gref.posX) + "px";
		document.body.appendChild(gref.canvas);
	} //end if
	else {
		gref.contextCanvas = contextCanvas;
	} //end else
	
	dureeFrame(); //Calcul le temps de l'affichage d'une frame
	
// -------------------------------------------- METHODES --------------------------------------------------------------
	this.jouer = function(){
		if (gref.loadImage === "load"){ //Si l'image est chargée
		gref.indexOfFrame =0; //On remet la frame à 0
		runAnimation();
		}//end if
		if (gref.loadImage === "notLoad"){ //Si l'image n'est pas encore chargée, on attend avant de relancer la fonction
			relancer = 'oui';
		}//end if
	}//end function jouer

	this.changerAffichage = function(afficher){ //Montrer ou cacher le sprite
		if (afficher === "montrer"){
		this.afficher = "montrer";
		document.body.appendChild(this.canvas);
		} //end if
		
		if (afficher === "cacher"){
		this.afficher = "cacher";
		this.canvas.remove(this.canvas);
		} //end if
		
		if (afficher !== "montrer" || "afficher"){
		} //end if
	}
// -------------------------------------------- FONCTIONS --------------------------------------------------------------
	function chargerImg(){
		img.src = gref.lienSprite;
		img.addEventListener('load', function(){
		gref.loadImage = "load";
		if (relancer === "oui"){gref.jouer();} //end if
		}//end function
		)//end event definition
	}; //end function chargerSablier

	function dureeFrame(){
		gref.dureeFrame = gref.dureeAnim/gref.nmbFrames;
	}
	
	function runAnimation(){
		////// JOUER ANIMATION DU SPRITE
		gref.contextCanvas.clearRect(0, 0, gref.canvas.width, gref.canvas.height); //on efface le canvas integralement
		gref.sourceX = gref.indexOfFrame * gref.FrameLargeur;
		gref.contextCanvas.drawImage(img,gref.sourceX,gref.sourceY,gref.width,gref.height,gref.destX,gref.destY,gref.width,gref.height); //on affiche le sprite
		gref.indexOfFrame += 1;
		if (gref.indexOfFrame < gref.nmbFrames){ //l'animation n'est pas terminée, ce n'est pas la dernière frame
			setTimeout(function(){runAnimation();},gref.dureeFrame); //on relance la fonction
		}//end if
	}//end function runAnimation
}//end object sprite