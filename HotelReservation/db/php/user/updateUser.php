<?php
include "../../db/DbConnection.php";
include "../../db/DbOperation.php";
session_start();
try{
    $con = DbConnection::getConnection();
    $username = $_SESSION['username'];
    $password = mysqli_real_escape_string($con,$_POST['password']);
    $email = mysqli_real_escape_string($con,$_POST['email']);
    $phone = mysqli_real_escape_string($con,$_POST['phone']);
    $name = mysqli_real_escape_string($con,$_POST['name']);
    $sql="update userinfo set password = '$password' , email = '$email' , phone = '$phone' , name = '$name' where username = '$username'";
    DbOperation::action($con, $sql);
    $type = $_SESSION['type'];
    if($type == 'u')
        header("Location: ../../account.html");
    else 
        header("Location: ../../administrator.html");
}
catch (Exception $e){
    echo $e->getMessage();
}
?>