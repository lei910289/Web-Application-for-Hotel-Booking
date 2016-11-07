function loadstate(){
	validateAdd();
	validateSearch();
	$.ajax({
		 type: "post",
		 url: "./php/stateCity/searchState.php",
		 dataType: "json",
		 success: function(data) {
			 $("#search-state").empty();
			 $("#search-state").append("<option value=''></option>");
			 data.forEach(function(e){ 
				 var option = "<option value='"+e.s_id+"'>"+e.name+"</option>";
				 $("#search-state").append(option);
				}) 

		 },
		 error: function() { alert("error loading data");  }
    });
	
	$.ajax({
		 type: "post",
		 url: "./php/user/autoLogin.php",
		 dataType: "text",
		 success: function(data) {
			if(data!= '00'){
				$("#s_signout").attr('disabled',false);
				$("#myaccount").attr('disabled',false);
				$("#s_login").attr('disabled',true); 
				$("#s_signup").attr('disabled',true);
			}
		 },
		 error: function() { alert("error loading data");  }
   });
}


function loadCity(){
	var state = $("#search-state option:selected").val();
	if(state == "")
		state = "0";
		var submitData = {"s_id" : state};
	$.ajax({
		 type: "post",
		 url: "./php/stateCity/searchCity.php",
		 dataType: "json",
		 data: submitData,
		 success: function(data) {
			 $("#search-city").empty();
			 data.forEach(function(e){ 
				 var option = "<option value='"+e.c_id+"'>"+e.name+"</option>";
				 $("#search-city").append(option);
				}) 

		 },
		 error: function() { alert("error loading data");  }
   });
}

function validateAdd(){

		validateField(
			$("#admin-htn"), 
			"please enter hotel name", 
			function(){
				var passLength = $("#admin-htn").val().length;
				if(passLength >= 1){
					return true;
				}
				else{
					return false;
				}
			});
		validateField(
			$("#search-state"), 
			"please choose one state", 
			function(){
				var passLength = $("#search-state").val().length;
				if(passLength >= 1){
					return true;
				}
				else{
					return false;
				}
			});
		validateField(
			$("#search-city"), 
			"please choose one city", 
			function(){
				var passLength = $("#search-city").val().length;
				if(passLength >= 1){
					return true;
				}
				else{
					return false;
				}
			});
		validateField(
			$("#admin-zip"), 
			"the zipcode should have 5 digits", 
			function(){
				var passLength = $("#admin-zip").val().length;
				if(passLength == 5){
					return true;
				}
				else{
					return false;
				}
			});

		validateField(
			$("#admin-addr"), 
			"please enter address", 
			function(){
				var passLength = $("#admin-addr").val().length;
				if(passLength >= 1){
					return true;
				}
				else{
					return false;
				}
			});
		
		
}

function validateSearch(){

		validateField(
			$("#admin-search-htn"), 
			"please enter hotel name", 
			function(){
				var passLength = $("#admin-search-htn").val().length;
				if(passLength >= 1){
					return true;
				}
				else{
					return false;
				}
			});
		validateField(
			$("#admin-search-zip"), 
			"the zipcode should have 5 digits", 
			function(){
				var passLength = $("#admin-search-zip").val().length;
				if(passLength == 5){
					return true;
				}
				else{
					return false;
				}
			});

}

function validateSearchForm(){
	var length = $("#edit-content").find("span").length;
	var count = 0;
	$("#edit-content").find("span").each(function(){
		if($(this).attr('class') == 'ok')
			count++;
	});
	
	if(count == length && length!=0){
		if(search())
			return true;
	}		
	else{
		alert("error");
		return false;
	}		
}
function search(){
	var search_htn = $("#admin-search-htn").val();
	var search_zip = $("#admin-search-zip").val(); 
	
	var submitdata = {"search_htn" : search_htn,"search_zip" : search_zip};
	$.ajax({
		 type: "post",
		 url: "./php/hotel/findHotel.php",
		 dataType: "text",
		 data: submitdata,
		 success: function(data) {
		 	if(data == 'false'){
		 		alert("no such hotel");
		 	}else{
		 		var arr = JSON.parse(data);
		 		var testcase = "<table id='search_result' class='table table-hover' ><thead><tr><th>Hotel Name</th><th>Address</th><th>Zipcode</th><th></th></tr></thead><tbody><tr><td><input type='htn' class='form-control' id='admin-edit-htn' placeholder='"+search_htn+"'></td><td><input type='addr' class='form-control' id='admin-edit-addr' placeholder='"+arr[0]+"'></td><td><input type='zip' class='form-control' id='admin-edit-zip' placeholder='"+search_zip+"'></td><td><button class='btn btn-default' onclick=edit()>Edit</button><td><button class='btn btn-default' onclick=del()>Delete</button></td></tr><tr id='hide'><td><input type='id' class='form-control' id='admin-edit-id' placeholder='"+arr[1]+"'></td></tr></tbody></table>";
		 		var myNode = document.getElementById("search-hotel");
				myNode.innerHTML = '';
				$("#search-hotel").append(testcase);
				document.getElementById("admin-edit-addr").value = arr[0];
				document.getElementById("admin-edit-id").value = arr[1];
				document.getElementById("admin-edit-zip").value = search_zip;
				document.getElementById("admin-edit-htn").value = search_htn;
				return true;
		 	}
			
		 },
		 error: function() { alert("error loading data");  }
   });
}

function add(){

	var name = $("#admin-htn").val();
	var s_id = $("#search-state").val(); 
	var c_id = $("#search-city").val();
	var zipcode = $("#admin-zip").val();
	var address = $("#admin-addr").val();
	var arr = [];
	var i;
	for(i = 0; i < type_index + 1; i ++){
		var arr_row = [];
		arr_row[0] = $("#admin-roomtype"+i).val();
		arr_row[1] = $("#admin-price"+i).val();
		arr_row[2] = $("#admin-info"+i).val();
		arr_row[3] = $("#admin-roonnum"+i).val();
		arr[i] = arr_row;
	}
	var jsonString = JSON.stringify(arr);
	

	var submitdata = {"name" : name,"s_id" : s_id,"c_id" : c_id, "zipcode" : zipcode, "address" : address, "arr" : jsonString};
	$.ajax({
		 type: "post",
		 url: "./php/hotel/addHotel.php",
		 dataType: "text",
		 data: submitdata,
		 success: function(data) {
			if(data == 'true'){ 
				alert("Add Success");
				location.href="administrator.html";
				return true;
			}				
			else
				return false;
		 },
		 error: function() { alert("error loading data");  }
   });
}



function validateAddForm(){
	var length = $("#add").find("span").length;
	var count = 0;
	$("#add").find("span").each(function(){
		if($(this).attr('class') == 'ok')
			count++;
	});
	if(count == length && length!=0){
		if(add())
			return true;
	}		
	else{
		alert("error");
		return false;
	}		
}

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

function del(){
	var h_id = $("#admin-edit-id").val();
	var submitdata = {"h_id" : h_id};
	$.ajax({
		 type: "post",
		 url: "./php/hotel/delHotel.php",
		 dataType: "text",
		 data: submitdata,
		 success: function(data) {
			if(data == 'true'){ 
				$("#search_result").remove();
				alert("Delete Success");
				return true;
			}				
			else
				return false;
		 },
		 error: function() { alert("error loading data");  }
   });
}

function edit(){
	var edit_htn = $("#admin-edit-htn").val();
	var edit_addr = $("#admin-edit-addr").val(); 
	var edit_zip = $("#admin-edit-zip").val();
	var edit_id = $("#admin-edit-id").val();
	var submitdata = {"edit_htn" : edit_htn,"edit_addr" : edit_addr,"edit_zip" : edit_zip,"edit_id" : edit_id};
	$.ajax({
		 type: "post",
		 url: "./php/hotel/editHotel.php",
		 dataType: "text",
		 data: submitdata,
		 success: function(data) {
			if(data == 'true'){ 
				alert("Edit Success");
				return true;
			}				
			else
				return false;
		 },
		 error: function() { alert("error loading data");  }
   });
}

var type_index = 0;
	function addRoomType(){
		type_index++;
		var string = "<tr><td><input type='roomty' class='form-control' id='admin-roomtype"+type_index+"' placeholder='Enter root type'></td><td><input type='price' class='form-control' id='admin-price"+type_index+"' placeholder='Enter price'></td><td><input type='info' class='form-control' id='admin-info"+type_index+"' placeholder='Enter information'></td><td><input type='info' class='form-control' id='admin-roonnum"+type_index+"' placeholder='Enter room number'></td></tr>";
		$("#type").append(string);
		
	}
