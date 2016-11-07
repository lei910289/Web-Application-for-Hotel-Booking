<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $username = mysqli_real_escape_string($con,$_POST['username']);
    $password = mysqli_real_escape_string($con,$_POST['password']);
    $email = mysqli_real_escape_string($con,$_POST['email']);
    $phone = mysqli_real_escape_string($con,$_POST['phone']);
    $name = mysqli_real_escape_string($con,$_POST['name']);
// $username = 'gaolei';
// $password = 'gaolei';
// $email = 'gaolei@qq.com';
// $phone = '1234567890';
// $name = 'gaolei';
    $sql="insert into userinfo (email,phone,name,username,password) values ('$email','$phone','$name','$username','$password')";

    if(DbOperation::action($con, $sql)){
        session_start();
        $_SESSION['username'] =$username;
        setcookie("username",$username, time()+3600);
        $sql  = "select type from userinfo where username = $username";
        $arrayAll = json_decode(DbOperation::search($con, $sql),true);
        $_SESSION['type'] = $arrayAll[0]['type'];
        setcookie("type",$arrayAll[0]['type'], time()+3600);
        session_write_close();
        echo 'true';
    }       
    else
        echo 'false';

}
catch (Exception $e){
    echo $e->getMessage();
}

?>
