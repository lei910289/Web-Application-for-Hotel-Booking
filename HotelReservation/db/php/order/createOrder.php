<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";
session_start();
try{
    $con = DbConnection::getConnection();
    $username = $_SESSION['username']==null?"":$_SESSION['username'];
    $email = mysqli_real_escape_string($con,$_POST['email']);
    $phone = mysqli_real_escape_string($con,$_POST['phone']);
    $total = mysqli_real_escape_string($con,$_POST['total']);
    $name = mysqli_real_escape_string($con,$_POST['name']);
    $description = mysqli_real_escape_string($con,$_POST['description']);
    $starttime = mysqli_real_escape_string($con,$_POST['starttime']); //format
    $endtime = mysqli_real_escape_string($con,$_POST['endtime']);  //format
    $orderNum = $username == ""? 'guest'. uniqid("", true) : $username. uniqid("",true);
    $status = 'confirmed';
    $h_id = mysqli_real_escape_string($con,$_POST['h_id']);
    $r_id = mysqli_real_escape_string($con,$_POST['r_id']);
   
        $sql="insert into orders (username,email,phone,total,description,ordernum,`status`,starttime,endtime,r_id,h_id,`name`)".
            "values".
            "('$username','$email','$phone',$total,'$description','$orderNum','$status','$starttime','$endtime',$r_id,$h_id,'$name')";
        if(DbOperation::action($con, $sql))
            echo 'true';
        else
            echo 'false';
    
   

}
catch (Exception $e){
    echo $e->getMessage();
}

?>