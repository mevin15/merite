// --------------------------------------- Style functions ----------------------------------------------------------
	function set_style_td(refTd, refLargeurCase, refHauteurCase){
		refTd.style.backgroundColor = 'white';
		refTd.style.border = "1px solid black";
		refTd.style.width = refLargeurCase;
		refTd.style.height= refHauteurCase;
	}
	
	function set_style_div(ref_div){
		ref_div.style.position = 'absolute';
		ref_div.style.backgroundColor = '#D5D0AA';
		ref_div.style.border = "3px #FAF2EF solid";
		ref_div.style.borderRadius = "10px";
	}
	
	function set_style_button(ref_button){
		ref_button.style.position = "absolute";
		ref_button.style.backgroundColor = "#FF6004";
		ref_button.style.borderBottomLeftRadius="10px";
		ref_button.style.borderBottomRightRadius="10px";
		ref_button.style.border = "3px #FAF2EF solid";
		ref_button.style.fontSize= "75%";
		ref_button.style.lineHeight= 1.5;
		ref_button.style.color = "white";
		ref_button.style.fontWeight = "bold";

	}
	
	function set_style_table(table_object){
			table_object.style.padding = "10px";
	}
	
	function set_style_caption(table_object){
			table_object.caption.style.backgroundColor = '#51493C';
			table_object.caption.style.borderTopRightRadius = "7px";
			table_object.caption.style.borderTopLeftRadius = "7px";
			table_object.caption.style.fontSize = "120%";
			table_object.caption.style.lineHeight = 1.7;
			table_object.caption.style.color = 'white';
			table_object.caption.style.borderBottom = "3px #FAF2EF solid";
			table_object.caption.style.textAlign = "left";
			table_object.caption.style.textIndent = "9px";
			table_object.style.whiteSpace = "nowrap";
	}