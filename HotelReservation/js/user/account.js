function load(){
	validateAccount();	
	$.ajax({
		 type: "post",
		 url: "./php/user/retrieveInfo.php",
		 dataType: "json",
		 success: function(data) {
			 if(data.length > 0 ){
					
				 if(data[0].type == 'a' && window.location.pathname=='/HotelReservation/account.html'){
					 location.href = "./administrator.html";
				 }
				 else
					 {
					 $("#account-name").val(data[0].name);
						$("#account-email").val(data[0].email);
						$("#account-phone").val(data[0].phone);
						$("#account-pwd").val(data[0].password);
					 }
					
			 }
			 else
				 location.href = "./index.html";
						
		 },
		 error: function() { location.href = "./index.html";  }
   });
	
}

function signout(){
	$.ajax({
		 type: "post",
		 url: "./php/user/logout.php",
		 success: function(data) {
				$("#loginClose").click();
				$("#s_signout").attr('disabled',true);
				$("#myaccount").attr('disabled',true);
				$("#s_login").attr('disabled',false); 
				$("#s_signup").attr('disabled',false); 
				location.href = "./index.html";
		 },
		 error: function() { location.href = "./index.html";  }
 });
}

function validateAdmin(){
	$.ajax({
		 type: "post",
		 url: "./php/user/checkAdmin.php",
		 dataType: "text",
		 success: function(data) {			
			 if(data == '00')
				 location.href = "./account.html";
			 else
				 load();
		 },
		 error: function() { location.href = "./index.html";  }
 });
	
}

function validateAccountForm(){
	var length = $("#profile").find("span").length;
	if(length != 0){
		var count = 0;
		$("#profile").find("span").each(function(){
			if($(this).css('display') == "none" && $(this).parent().find("input").val() == ""){
				$(this).parent().find("span").show();
				$(this).parent().find("span").removeClass("ok info").addClass("error");
				$(this).parent().find("span").text("filed is mandatory");
			}	
			if($(this).attr('class') == 'error' || $(this).attr('class') == 'info' )
				count++;
		});
		if(count == 0){
			$("#account-form").attr("action", "./php/user/updateUser.php");
			$("#account-form").submit();
		}
			
		else{
			$("#account-form").attr("action", "");
			alert("some filed are not correct");
		}		
	}
}
function validateAccount(){
	
	validateField(
			$("#account-email"),
			"Enter a valid email address",
			function(){
				var atpos = $("#account-email").val().indexOf("@");
			    //var dotpos = $("#email").val().lastIndexOf(".");
			    if (atpos< 1) {
			    	return false;
			    }
			    else{
			    	return true;
			    }
			});
	
	validateField(
			$("#account-phone"), 
			"phone should  contain only numbers and must be 10 digits", 
			function(){
				return /^[0-9]+$/.test($("#account-phone").val()) && $("#account-phone").val().length == 10;
			});
	
	validateField(
			$("#account-name"), 
			"name should contain only alphabet", 
			function(){
				return /^[a-zA-Z][ a-zA-Z]+$/.test($("#account-name").val());
			});
	
	validateField(
			$("#account-pwd"), 
			"password should be at least 6 characters long", 
			function(){
				var passLength = $("#account-pwd").val().length;
				if(passLength >= 6){
					return true;
				}
				else{
					return false;
				}
			});
}