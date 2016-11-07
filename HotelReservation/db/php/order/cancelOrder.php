<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $ordernum = mysqli_real_escape_string($con,$_POST['ordernum']);
        $sql="update orders set status = 'cancelled' where ordernum = '$ordernum'";
        if(DbOperation::action($con, $sql))
            echo '1';
        else
            echo '0';
    
   

}
catch (Exception $e){
    echo $e->getMessage();
}

?>

