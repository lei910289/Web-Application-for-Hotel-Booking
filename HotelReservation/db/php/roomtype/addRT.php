<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $name = mysqli_real_escape_string($con,$_POST['name']);
    $price = mysqli_real_escape_string($con,$_POST['price']);
    $info = mysqli_real_escape_string($con,$_POST['info']);
    $h_id = mysqli_real_escape_string($con,$_POST['h_id']);

    $sql="insert into roomtype (name,price,info,h_id) values ('$name',$price,'$info',$h_id)";

    if(DbOperation::action($con, $sql))
        echo 'true';
    else
        echo 'false';

}
catch (Exception $e){
    echo $e->getMessage();
}

?>