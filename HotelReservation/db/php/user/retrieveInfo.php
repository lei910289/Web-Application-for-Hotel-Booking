<?php
include "../../db/DbConnection.php";
include "../../db/DbOperation.php";
session_start();
try{
    $con = DbConnection::getConnection();
    if(isset($_COOKIE['username']))
        $username = $_COOKIE['username'];
    else
        $username = $_SESSION['username'];
    $sql="select* from userinfo where username = '$username'";
    echo DbOperation::search($con, $sql);

}
catch (Exception $e){
    echo $e->getMessage();
}
?>