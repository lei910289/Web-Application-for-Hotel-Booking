<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $edit_htn = mysqli_real_escape_string($con,$_POST['edit_htn']); //format
    $edit_addr = mysqli_real_escape_string($con,$_POST['edit_addr']);  //format
    $edit_zip = mysqli_real_escape_string($con,$_POST['edit_zip']);
    $edit_id = mysqli_real_escape_string($con,$_POST['edit_id']);

    $sql="update hotel set name = '$edit_htn',address = '$edit_addr',
            zipcode = '$edit_zip' where h_id = $edit_id";
        if(DbOperation::action($con, $sql))
            echo 'true';
        else
            echo 'false';
            
    
	
}
catch (Exception $e){
    echo $e->getMessage();
}

?>