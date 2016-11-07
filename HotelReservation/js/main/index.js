function load(){
	validateLogin();
	validateSignup();
	$("#signup-usr").parent().append("<span></span>");
	$("#signup-usr").parent().find("span").hide();
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
				if(data == 'a')
					$("#myaccount").attr('onclick',"location.href='administrator.html'")
			}
		 },
		 error: function() { alert("error loading data");  }
   });
	

	
	
}

function checkUsername(){
		var username = $("#signup-usr").val();
		var submitData = {"username" : username};
		if(username.length == 0){
			$("#signup-usr").parent().find("span").removeClass("error info ok");
			$("#signup-usr").parent().find("span").empty();
			$("#signup-usr").parent().find("span").hide();
		}
		else{
			//Not Empty
			//Ok
			if(/^[a-zA-Z][a-zA-Z0-9]*$/.test($("#signup-usr").val())){
				$.ajax({
					 type: "post",
					 url: "./php/user/checkUsername.php",
					 dataType: "text",
					 data: submitData,
					 success: function(data) {
						if(data == 1){
							$("#signup-usr").parent().find("span").show();
							$("#signup-usr").parent().find("span").removeClass("ok info").addClass("error");
							$("#signup-usr").parent().find("span").text("username is already exist");
							
						}
						else{
							$("#signup-usr").parent().find("span").show();
							$("#signup-usr").parent().find("span").removeClass("error info").addClass("ok");
							$("#signup-usr").parent().find("span").text("OK");
						}
					 },
					 error: function() { alert("error loading data");  }
			    });
			}
			else{
				//Error
				$("#signup-usr").parent().find("span").show();
				$("#signup-usr").parent().find("span").removeClass("ok info").addClass("error");
				$("#signup-usr").parent().find("span").text("username should contain only alphanumeric characters and starts with alphabet.");
			}
		}
		
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
function validateSignup(){

		validateField(
			$("#signup-pwd"), 
			"password should be at least 6 characters long", 
			function(){
				var passLength = $("#signup-pwd").val().length;
				if(passLength >= 6){
					return true;
				}
				else{
					return false;
				}
			});
		
		validateField(
				$("#signup-email"),
				"Enter a valid email address",
				function(){
					var atpos = $("#signup-email").val().indexOf("@");
				    //var dotpos = $("#email").val().lastIndexOf(".");
				    if (atpos< 1) {
				    	return false;
				    }
				    else{
				    	return true;
				    }
				});
		
		validateField(
				$("#signup-phone"), 
				"phone should  contain only numbers and must be 10 digits", 
				function(){
					return /^[0-9]+$/.test($("#signup-phone").val()) && $("#signup-phone").val().length == 10;
				});
		
		validateField(
				$("#signup-name"), 
				"name should contain only alphabet", 
				function(){
					return  /^[a-zA-Z][ a-zA-Z]+$/.test($("#signup-name").val());
				});
}
function validateLogin(){
	validateField(
			$("#login-usr"),
			"username should contain only alphanumeric characters and starts with alphabet.",
			function(){
				return /^[a-zA-Z][a-zA-Z0-9]*$/.test($("#login-usr").val());
			});

		validateField(
			$("#login-pwd"), 
			"password should be at least 6 characters long", 
			function(){
				var passLength = $("#login-pwd").val().length;
				if(passLength >= 6){
					return true;
				}
				else{
					return false;
				}
			});
		

}

function validateLoginForm(){
	var count = 0;
	$("#login").find("span").each(function(){
		if($(this).css('display') == "none" && $(this).parent().find("input").val() == ""){
			$(this).parent().find("span").show();
			$(this).parent().find("span").removeClass("ok info").addClass("error");
			$(this).parent().find("span").text("filed is mandatory");
		}			
		if($(this).attr('class') == 'error' || $(this).attr('class') == 'info' )
			count++;
	});
	if(count == 0)
		login();
	else
		alert("some filed are not correct");
}



function searchHotel(){
	 var s_id = $("#search-state option:selected").val(); 
	 if(s_id == ""){
		 alert("please select a state");
		 return;
	 }		 
	 var c_id = $("#search-city option:selected").val();
	 if( c_id == "" || c_id == null){
		 alert("please select a city");
		 return;
	 }
	 var checkin = $("#checkin").val();
	 var checkinFormat = checkin.split("/");
	 checkin = checkinFormat[2]+"-"+checkinFormat[1]+"-"+checkinFormat[0];
	 var checkout = $("#checkout").val();
	 var checkoutFormat = checkout.split("/");
	 checkout = checkoutFormat[2]+"-"+checkoutFormat[1]+"-"+checkoutFormat[0];
	 var price=$('input:radio[name="price"]:checked').val();
	 var dd = new Date(); 
	 dd.setDate(dd.getDate());//获取AddDayCount天后的日期 
	 var y = dd.getFullYear(); 
	 var m = dd.getMonth()+1;//获取当前月份的日期 
	 var d = dd.getDate();
	 if( d < 10)
		 d = "0"+d;
	 var now = y+"-"+m+"-"+d;
	 var hotelName = $("#search-hotel_name").val();
	 if(now > checkin){
		 alert("checkin date must be today or later");
		 return;
	 }
	 if(checkin >= checkout)
	 {
		 alert("checkin date must be no later than checkout");
		 return;
	 }
	 var submitdata = {"s_id" : s_id,"c_id" :c_id,"starttime" : checkin,"endtime" : checkout, "price" : price, "hotelName" :hotelName};
	 $.ajax({
		 type: "post",
		 url: "./php/hotel/searchHotel.php",
		 dataType: "json",
		 data: submitdata,
		 success: function(data) {
			 $("#tableResult tbody").html("");
			 data.forEach(function(e){ 
				 var hName = "<td>" + e.name + "</td>";
				 var address = "<td>" + e.address +"   "+e.zipcode + "</td>";
				 var rtname = "<td>" + e.rtname + "</td>";
				 var info = "<td>" + e.info + "</td>";
				 var total = "<td>" + e.price + "</td>";
			     var button = "<td> <button type='button' class='btn btn-primary' data-toggle='modal' data-target='#signout' onclick=gotoBooking("+e.s_id+") >book</button> </td>";
			    var input = "<input type='hidden' value ='"+e.name+"-"+e.address+"   "+e.zipcode+"-"+e.price+"-"+e.h_id+"' id='"+e.s_id+"'/>"
			     $("#tableResult tbody").append("<tr>"+hName+address+rtname+info+total+button+input+"</tr>");				 
				}) 

		 },
		 error: function() { alert("error loading data");  }
   });
		 
}

function gotoBooking(id){
	var format = $("#"+id).val().split("-");
	var name = format[0];
	var addr = format[1];
	var price = format[2];
	var h_id = format[3];
//	alert(name);
//	alert(addr);
//	alert(price);
	var checkin = $("#checkin").val();
	 var checkinFormat = checkin.split("/");
	 checkin = checkinFormat[2]+"-"+checkinFormat[1]+"-"+checkinFormat[0];
	 var checkout = $("#checkout").val();
	 var checkoutFormat = checkout.split("/");
	 checkout = checkoutFormat[2]+"-"+checkoutFormat[1]+"-"+checkoutFormat[0];
//	 alert(checkin);
//	 alert(checkout);
	location.href='booking.html?name='+name+"&addr="+addr+"&price="+price+"&checkin="+checkin+"&checkout="+checkout+"&r_id="+id+"&h_id="+h_id;
}

function login(){
	var username = $("#login-usr").val();
	var password = $("#login-pwd").val();
	var submitdata = {"username" : username,"password" : password};
	$.ajax({
		 type: "post",
		 url: "./php/user/login.php",
		 dataType: "json",
		 data: submitdata,
		 success: function(data) {
			if(data.length > 0){
				$("#loginClose").click();
				$("#s_signout").attr('disabled',false);
				$("#myaccount").attr('disabled',false);
				$("#s_login").attr('disabled',true); 
				$("#s_signup").attr('disabled',true); 
				if(data[0].type == 'a')
					$("#myaccount").attr('onclick',"location.href='administrator.html'");
				alert("Login Success");
				return true;
			}				
			else
				return false;
		 },
		 error: function() { alert("some filed are not correct");  }
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
		 },
		 error: function() { alert("error loading data");  }
 });
}
function validateSignupForm(){
	var count = 0;
	$("#signup").find("span").each(function(){
		if($(this).css('display') == "none" && $(this).parent().find("input").val() == ""){
			$(this).parent().find("span").show();
			$(this).parent().find("span").removeClass("ok info").addClass("error");
			$(this).parent().find("span").text("filed is mandatory");
		}			
		if($(this).attr('class') == 'error' || $(this).attr('class') == 'info' )
			count++;
	});
	if(count == 0){
		if(signup())
			return true;
	}		
	else{
		alert("error");
		return false;
	}		
}

function signup(){
	var username = $("#signup-usr").val();
	var password = $("#signup-pwd").val();
	var email = $("#signup-email").val();
	var phone = $("#signup-phone").val();
	var name = $("#signup-name").val();
	var submitdata = {"username" : username,"password" : password,"email" : email, "phone" : phone, "name" : name};
	
	$.ajax({
		 type: "post",
		 url: "./php/user/signup.php",
		 dataType: "text",
		 data: submitdata,
		 success: function(data) {
			if(data == 'true'){
				$("#sigupClose").click();
				$("#s_signout").attr('disabled',false);
				$("#myaccount").attr('disabled',false);
				$("#s_login").attr('disabled',true); 
				$("#s_signup").attr('disabled',true); 
				alert("Signup Success");
				return true;
			}				
			else
				return false;
		 },
		 error: function() { alert("error loading data");  }
   });
}





