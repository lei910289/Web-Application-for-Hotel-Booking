<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $h_id = mysqli_real_escape_string($con,$_POST['h_id']);
//     $h_id = 1;
    $sql="select * from roomtype where h_id = $h_id";
    
    echo DbOperation::search($con, $sql);
   

}
catch (Exception $e){
    echo $e->getMessage();
}

?>