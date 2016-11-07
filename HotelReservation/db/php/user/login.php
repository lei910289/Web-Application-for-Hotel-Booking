<?php
session_start();
include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $username = mysqli_real_escape_string($con,$_POST['username']);
    $password = mysqli_real_escape_string($con,$_POST['password']);
//     $username = 'zwj1991';
//     $password = 'zwj1991';
    $sql="select* from userinfo where username = '$username' and password = '$password'";
    
    $arrayAll = json_decode(DbOperation::search($con, $sql),true);
    $_SESSION['username'] = $arrayAll[0]['username'];
    $_SESSION['type'] = $arrayAll[0]['type'];
    setcookie("username", $arrayAll[0]['username'], time()+3600);
    setcookie("type", $arrayAll[0]['type'], time()+3600);
    session_write_close();
    echo json_encode($arrayAll);

}
catch (Exception $e){
    echo $e->getMessage();
}

?>