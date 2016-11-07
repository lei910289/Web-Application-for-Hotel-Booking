<?php
include "../../db/DbConnection.php";
include "../../db/DbOperation.php";
session_start();
try{
    $con = DbConnection::getConnection();
    $username = $_SESSION["username"];
    $sql="select *from orders where username = '$username' order by status desc";
    $arrayAll = json_decode(DbOperation::search($con, $sql),true);
    
    for ($i= 0;$i< count($arrayAll); $i++){
        $h_id =  $arrayAll[$i]['h_id'];
        $sql="select *from hotel where h_id = '$h_id'";
        $array1 = json_decode(DbOperation::search($con, $sql),true);
        $arrayAll[$i]['h_id'] = $array1[0]['name']."(".$array1[0]['address'] .")";
    }
    echo json_encode($arrayAll);

     

}
catch (Exception $e){
    echo $e->getMessage();
}

?>