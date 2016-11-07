<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $name = mysqli_real_escape_string($con,$_POST['name']);
    $price = mysqli_real_escape_string($con,$_POST['price']);
    $info = mysqli_real_escape_string($con,$_POST['info']);
    $rt_id = mysqli_real_escape_string($con,$_POST['rt_id']);
    
    $sql="update roomtype set name = '$name', price = $price, info = '$info' where rt_id = $rt_id";
    if(DbOperation::action($con, $sql))
        echo 'true';
    else
        echo 'false';

}
catch (Exception $e){
    echo $e->getMessage();
}


?>