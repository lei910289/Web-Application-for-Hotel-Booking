<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $rt_id = mysqli_real_escape_string($con,$_POST['rt_id']);
    $sql="delete from roomtype where rt_id = $rt_id";
     if(DbOperation::action($con, $sql))
        echo 'true';
    else
        echo 'false';

}
catch (Exception $e){
    echo $e->getMessage();
}

?>