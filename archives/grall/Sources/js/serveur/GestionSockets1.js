//La list des objets SocketClient
	var clients = [];
	function Message_a_transmettre(){
	//Si le serveur reçoit un message, il vérifie sur touz les objets sockets les messages
	//à envoyer et il les transmet

		for(var i=0; i<clients.length; i++){
		//console.log("liste des clients :" + clients + "Nombre :  " + clients.length);
		
		
		//console.log("le client i="+i+" fait passer un message existant au " + clients[i].rec_cible[0]);
			//Si un message est disponible
			if (clients[i].rec_cible[0] !== undefined){
							if (clients[i].rec_cible[0] === "suivant"){
								var nvlCible = i+1;
								if(nvlCible >= clients.length){nvlCible=0;}
								if(nvlCible < 0){nvlCible=clients.length-1;}
								console.log("Le client "+clients[i].pseudo+" transmet un message existant au " + clients[i].rec_cible[0] +" donc le client " + clients[nvlCible].pseudo + " le message " + clients[i].rec_en_tete[0] + "  " + clients[i].rec_contenu[0]);
								clients[nvlCible].Element.emit('rec_en_tete', clients[i].rec_en_tete[0]);
								clients[nvlCible].Element.emit('rec_contenu', clients[i].rec_contenu[0]);
								clients[i].rec_cible.splice(0,1);
								clients[i].rec_en_tete.splice(0,1);
								clients[i].rec_contenu.splice(0,1);
							}//end if
							if (clients[i].rec_cible[0] === "precedent"){
								var nvlCible = i-1;
								if(nvlCible >= clients.length){nvlCible=0;}
								if(nvlCible < 0){nvlCible=clients.length-1;}
								console.log("Le client "+clients[i].pseudo+" transmet un message existant au "  + clients[i].rec_cible[0] +" donc le client " + clients[nvlCible].pseudo + " le message " + clients[i].rec_en_tete[0] + "  " + clients[i].rec_contenu[0]);
								clients[nvlCible].Element.emit('rec_en_tete', clients[i].rec_en_tete[0]);
								clients[nvlCible].Element.emit('rec_contenu', clients[i].rec_contenu[0]);
								clients[i].rec_cible.splice(0,1);
								clients[i].rec_en_tete.splice(0,1);
								clients[i].rec_contenu.splice(0,1);
							}//end if
			}//end if

			//Si un message a été crée
			if (clients[i].creer_cible[0] !== undefined){
							if (clients[i].creer_cible[0] === "suivant"){
								var nvlCible = i+1;
								if(nvlCible >= clients.length){nvlCible=0;}
								if(nvlCible < 0){nvlCible=clients.length-1;}
								console.log("Le client "+clients[i].pseudo+" envoie un msg créé au " + clients[i].creer_cible[0] +" donc le client " + clients[nvlCible].pseudo + " le message " + clients[i].creer_en_tete[0] + "  " + clients[i].creer_contenu[0]);
								clients[nvlCible].Element.emit('rec_en_tete', clients[i].creer_en_tete[0]);
								clients[nvlCible].Element.emit('rec_contenu', clients[i].creer_contenu[0]);
								clients[i].creer_cible.splice(0,1);
								clients[i].creer_en_tete.splice(0,1);
								clients[i].creer_contenu.splice(0,1);
							}//end if
							if (clients[i].creer_cible[0] === "precedent"){
								var nvlCible = i-1;
								if(nvlCible >= clients.length){nvlCible=0;}
								if(nvlCible < 0){nvlCible=clients.length-1;}
								console.log("Le client "+clients[i].pseudo+" envoie un msg créé au "  + clients[i].creer_cible[0] +" donc le client " + clients[nvlCible].pseudo + " le message " + clients[i].creer_en_tete[0] + "  " + clients[i].creer_contenu[0]);
								console.log(nvlCible);
								clients[nvlCible].Element.emit('rec_en_tete', clients[i].creer_en_tete[0]);
								clients[nvlCible].Element.emit('rec_contenu', clients[i].creer_contenu[0]);
								clients[i].creer_cible.splice(0,1);;
								clients[i].creer_en_tete.splice(0,1);
								clients[i].creer_contenu.splice(0,1);
							}//end if
			}//end if
		}//end for
	
	
	
	
	
	
	} //end function