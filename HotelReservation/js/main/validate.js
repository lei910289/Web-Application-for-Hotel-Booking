function validateField(fieldElem, infoMessage, validateFn) {
	// TODO: Implement validateField.
	fieldElem.parent().append("<span></span>");
	fieldElem.parent().find("span").hide();
	
	//Edited
	//Info
	fieldElem.focus(function(){
		fieldElem.parent().find("span").show();
		fieldElem.parent().find("span").removeClass("error ok").addClass("info");
		fieldElem.parent().find("span").text(infoMessage);
	});

	//Not Edited
	//Empty
	fieldElem.blur(function(){
		if(fieldElem.val().length == 0){
			fieldElem.parent().find("span").removeClass("error info ok");
			fieldElem.parent().find("span").empty();
			fieldElem.parent().find("span").hide();
		}
		else{
			//Not Empty
			//Ok
			if(validateFn()){
				fieldElem.parent().find("span").show();
				fieldElem.parent().find("span").removeClass("error info").addClass("ok");
				fieldElem.parent().find("span").text("OK");
			}
			else{
				//Error
				fieldElem.parent().find("span").show();
				fieldElem.parent().find("span").removeClass("ok info").addClass("error");
				fieldElem.parent().find("span").text(infoMessage);
			}
		}
	});
	
}