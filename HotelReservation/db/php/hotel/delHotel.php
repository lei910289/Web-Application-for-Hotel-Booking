<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $h_id = mysqli_real_escape_string($con,$_POST['h_id']);
    $sql="delete from hotel where h_id = $h_id";
     if(DbOperation::action($con, $sql))
        echo 'true';
    else
        echo 'false';

}
catch (Exception $e){
    echo $e->getMessage();
}

?>