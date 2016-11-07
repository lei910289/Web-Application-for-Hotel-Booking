<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $nums = mysqli_real_escape_string($con,$_POST['nums']);
    $rt_id = mysqli_real_escape_string($con,$_POST['rt_id']);
    $h_id = mysqli_real_escape_string($con,$_POST['h_id']);
//     $nums = "201,202,203,204";
//     $rt_id = 1;
//     $h_id = 1;
    $numsArray = explode(",",$nums);
//     print_r($numsArray);
    foreach($numsArray as $value){
        $sql="insert into room (num,rt_id,h_id) values ($value,$rt_id,$h_id)";
        DbOperation::action($con, $sql);
    }

}
catch (Exception $e){
    echo $e->getMessage();
}

?>