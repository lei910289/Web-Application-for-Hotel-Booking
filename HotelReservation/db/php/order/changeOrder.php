<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $email = mysqli_real_escape_string($con,$_POST['email']);
    $phone = mysqli_real_escape_string($con,$_POST['phone']);
    $description = mysqli_real_escape_string($con,$_POST['description']);
    $ordernum = mysqli_real_escape_string($con,$_POST['ordernum']);
        $sql="update order set email = '$email',phone = '$phone',
            description = '$description' where ordernum = '$ordernum'";
        if(DbOperation::action($con, $sql))
            echo 'true';
        else
            echo 'false';
    
   

}
catch (Exception $e){
    echo $e->getMessage();
}

?>