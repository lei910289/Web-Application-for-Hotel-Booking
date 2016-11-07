function loadData() {
//	var path = phpLOC+"/objStream.php?fileName="+fileLOC;
//	var submitData = {"name" : 'Aloft Plano', "address" : 'N, 6853 Dallas Pkwy, Plano', "zipcode" : '75025' , "s_id" : '1', "c_id" : '1'  };
//	var submitData = {"nums" : "201,202,203,204", "rt_id" : '1', "h_id" : "1" };	
	var submitData = {"starttime" : "2015-11-18" , "endtime" : "2015-11-25" ,"total" : 100, "h_id" : 1,
			"email" : "", "phone" : "" , "username" : "", "description" : "" ,"ordernum" : "1"};
	$.ajax({
		 type: "post",
		 url: "./php/order/createOrder.php",
		 dataType: "text",
		 data: submitData,
		 success: function(data) {
		 	alert(data);

		 },
		 error: function() { alert("error loading data");  }
     });
}	
