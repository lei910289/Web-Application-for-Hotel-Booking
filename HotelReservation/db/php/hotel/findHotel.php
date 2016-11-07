<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $search_htn = mysqli_real_escape_string($con,$_POST['search_htn']); //format
    $search_zip = mysqli_real_escape_string($con,$_POST['search_zip']);  //format
    
    $sql = "SELECT * FROM hotelreservation.hotel where hotel.name = '$search_htn' and hotel.zipcode=$search_zip";
	$result = mysqli_query($con,$sql);
	if (mysqli_num_rows($result) > 0) {
		$row = mysqli_fetch_assoc($result);
		$hadd = $row['address'];
		$h_id = $row['h_id'];
		$ar = array($hadd, $h_id);
		echo json_encode($ar);
	}else{
		echo "false";
	}
	
}
catch (Exception $e){
    echo $e->getMessage();
}

?>