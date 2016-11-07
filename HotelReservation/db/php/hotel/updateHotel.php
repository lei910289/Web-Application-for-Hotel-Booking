<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $h_id = mysqli_real_escape_string($con,$_POST['h_id']);
    $name = mysqli_real_escape_string($con,$_POST['name']);
    $address = mysqli_real_escape_string($con,$_POST['address']);
    $zipcode = mysqli_real_escape_string($con,$_POST['zipcode']);
    
    $sql="update hotel set name = '$name', address = '$address', zipcode = $zipcode where h_id = $h_id";

    if(DbOperation::action($con, $sql))
        echo 'true';
    else
        echo 'false';

}
catch (Exception $e){
    echo $e->getMessage();
}


?>