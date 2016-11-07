function orders(){
	$.ajax({
		 type: "post",
		 url: "./php/order/searchOrders.php",
		 dataType: "json",
		 success: function(data) {
			 $("#example tbody").html("");
			 data.forEach(function(e){ 
				 var hName = "<td>" + e.h_id + "</td>";
				 var time = "<td>" + e.starttime +" to " +e.endtime + "</td>";
				 var name = "<td>" + e.name + "</td>";
				 var phone = "<td>" + e.phone + "</td>";
				 var total = "<td>" + e.total + "</td>";
				 var status = "<td>" + e.status + "</td>";
				 if(e.status == "confirmed")
					 var button = "<td> <button type='button' class='btn btn-primary' data-toggle='modal' data-target='#signout' onclick=cancel('"+e.ordernum+"') >Cancel</button> </td>";
				 else
					 var button = "<td> <button type='button' class='btn btn-primary' data-toggle='modal' data-target='#signout' disabled=true>Cancel</button> </td>";
				 $("#example tbody").append("<tr>"+hName+time+name+phone+total+status+button+"</tr>");				 
				}) 			
		 },
		 error: function() { alert("error loading data");  }
  });
}

function cancel(ordernum){
	if(confirm("confirm to cancel??")){
		var submitdata = {"ordernum" : ordernum};
		$.ajax({
			 type: "post",
			 url: "./php/order/cancelOrder.php",
			 dataType: "text",
			 data: submitdata,
			 success: function(data) {
				if(data==1)
					orders();
				else
					alert("something wrong, can not cancelled!");
			 },
			 error: function() { alert("error loading data");  }
	 });
	}
	
}