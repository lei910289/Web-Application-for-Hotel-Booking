<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $s_id = mysqli_real_escape_string($con,$_POST['s_id']);
//     $h_id = 1;
    $sql="select * from city where s_id = $s_id";
    
    echo DbOperation::search($con, $sql);
   

}
catch (Exception $e){
    echo $e->getMessage();
}

?>