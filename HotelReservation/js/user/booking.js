var r_id;
var h_id;
function load(){
	validateCreateOrder();
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
	var name = GetQueryString('name');
	var addr = GetQueryString('addr');
	var price = GetQueryString('price');
    var checkin = GetQueryString('checkin');
    var checkout = GetQueryString('checkout');
    r_id = GetQueryString('r_id');
    h_id = GetQueryString('h_id');
    $("#booking-hname").val(name);
    $("#booking-hname").attr("disabled","true");
    $("#booking-addr").val(addr);
    $("#booking-addr").attr("disabled","true");
    $("#booking-price").val(price);
    $("#booking-price").attr("disabled","true");
    $("#checkin").val(checkin);
    $("#checkin").attr("disabled","true");
    $("#checkout").val(checkout);
    $("#checkout").attr("disabled","true");
}

function validateCreateOrder(){
	validateField(
			$("#booking-name"),
			"name should contain only alphanumeric characters and starts with alphabet.",
			function(){
				return  /^[a-zA-Z][ a-zA-Z]+$/.test($("#booking-name").val());
			});

		validateField(
			$("#booking-phone"), 
			"phone should be 10 characters long", 
			function(){
				return /^[0-9]+$/.test($("#booking-phone").val()) && $("#booking-phone").val().length == 10;
			});
		

}

function validateCreateOrderForm(){
	var count = 0;
	$("#bookingForm").find("span").each(function(){
		if($(this).css('display') == "none" && $(this).parent().find("input").val() == ""){
			$(this).parent().find("span").show();
			$(this).parent().find("span").removeClass("ok info").addClass("error");
			$(this).parent().find("span").text("filed is mandatory");
		}			
		if($(this).attr('class') == 'error' || $(this).attr('class') == 'info' )
			count++;
	});
	if(count == 0)
		createOrder();
	else
		alert("some filed are not correct");
}

function createOrder(){
    var price = $("#booking-price").val();
    var starttime = $("#checkin").val();
    var endtime = $("#checkout").val();
    var email = $("#booking-email").val();
    var phone = $("#booking-phone").val();
    var name = $("#booking-name").val();
    var description = $("#booking-requirement").val();
    var submitdata = {"total" : price,"name" : name,"starttime" : starttime,"endtime" : endtime,"email" : email, "phone" : phone, "description" : description,"h_id" : h_id,"r_id" : r_id};
    $.ajax({
		 type: "post",
		 url: "./php/order/createOrder.php",
		 dataType: "text",
		 data: submitdata,
		 success: function(data) {
		 	if(data == 'true'){
		 		alert("order success");
			$("#booking-phone").attr("disabled","true");
			$("#booking-email").attr("disabled","true");
			$("#booking-name").attr("disabled","true");
			$("#booking-requirement").attr("disabled","true");
			$("#booking-submit").attr("disabled","true");
			$("#subtitle").html("Summary");	
		 	}
		 	else
		 		alert("order fail");
			
		 },
		 error: function() { alert("order error");  }
 });
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}