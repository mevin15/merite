function Ligne(nombreCases = 13, largeurCase = "23px", hauteurCase = "23px", cocherCase = true, tdId = null, trId = null){
// -------------------------------------------- ATTRIBUTS --------------------------------------------------------------
	// Attributs relatifs aux cases de la Trame
		this.nombreCases = nombreCases;
		this.largeurCase = largeurCase;
		this.hauteurCase = hauteurCase;
		this.elementTd = []; //Tableau contenant les objets des td
		this.tdId = tdId; //Attribut pour nommer les ID des td (id = textId + i)
		this.trId = trId; //Attribut pour nommer l'ID de la ligne 'tr'
		this.etatsCases = []; //Tableau contenant les char '0' et '1' de la trame
		
		//Un string des etatscases
		var initetats = Array(this.nombreCases);
		fill_0(initetats);
		this.stringEtats = initetats.join("");
		
	// Attributs relatifs aux évènements
		this.cocherCase = cocherCase;
		
	// Attribut a utiliser pour selectionner l'element ligne
		this.Element;
		
		var gref=this;
	
//init
createTd(this);
create_states(this);
createTr(this);
create_event_buttons(this);
// -------------------------------------------- METHODES --------------------------------------------------------------
this.afficherMessage = function(string){
	this.etatsCases = string.split('');
	set_color(gref);
}

this.fill_0 = function(){
		this.etatsCases.fill('0');
		set_color(gref);
	}
	
// -------------------------------------------- FONCTIONS --------------------------------------------------------------
	
	function createTd(ref){
		var new_id = "txt";
		var array_td = [];
		for (var i=0; i<ref.nombreCases; i++)
		{
			//Creation des élements Td et Td.id
			array_td[i] = document.createElement('td');
			if (ref.tdId != null && typeof(ref.tdId) === 'string'){
				new_id = ref.tdId + i.toString();
				array_td[i].id = new_id;
			} //end if
			
			//Applquer un css à chaque case
			set_style_td(array_td[i], ref.largeurCase, ref.hauteurCase);
		} //end for
		ref.elementTd = array_td;
	} //end function

	function create_states(ref){
		ref.etatsCases.length = ref.nombreCases;
		fill_0(ref.etatsCases);
	} //end function
	
	function create_event_buttons(ref){
		if (ref.cocherCase === true){
			for (var i=0; i<ref.nombreCases; i++){
			ref.elementTd[i].addEventListener('click', function(e){change_states(e, ref);});
			ref.elementTd[i].addEventListener('mouseover', change_cursor);
			} //end for
		} //end if
	} //end function

	function fill_0(ref){
		ref.fill('0');
	}

	function change_states(e, ref){
		for (var i=0; i<ref.nombreCases; i++){
				if (ref.elementTd[i] == e.currentTarget){
					if (ref.etatsCases[i] == '0'){
						ref.etatsCases[i] = '1';
					}//end if
					else if (ref.etatsCases[i] == '1'){
						ref.etatsCases[i] = '0';
					}// end else if
				}//end if
			}//end for*/
	set_color(ref);
	}

function set_color(ref){
	for (var i=0; i<ref.nombreCases; i++){
		if ( ref.etatsCases[i] == '0'){
			ref.elementTd[i].style.backgroundColor = "white";
		}//end if
		if ( ref.etatsCases[i] == '1'){
			ref.elementTd[i].style.backgroundColor = "Black";
		}//end if
	}//end for
	ref.stringEtats = ref.etatsCases.join("");
}

function change_cursor(e){
this.style.cursor='pointer';
	}

function createTr(ref){
		var ligne = document.createElement('tr');
		for (var i=0; i<ref.nombreCases; i++){
			ligne.appendChild(ref.elementTd[i]);
		}//end for
		if (ref.trId != null && typeof(ref.trId) === 'string'){
			ligne.id = ref.trId;
		}// end if
	ref.Element = ligne;
	}//end function

} //end objet

