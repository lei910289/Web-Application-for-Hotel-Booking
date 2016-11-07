<?php
include "./db/DbConnection.php";
include "./db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
        $sql="select* from BabyNames";
        
    echo DbOperation::search($con, $sql);
    
}
catch (Exception $e){
    echo $e->getMessage();
}


?>
