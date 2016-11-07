<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $username = mysqli_real_escape_string($con,$_POST['username']);
//     $username = 'zwj11991';
    $sql="select username from userinfo where username ='$username'";

   $arrayAll = json_decode(DbOperation::search($con, $sql));
//   print_r(count($arrayAll));
    if(count($arrayAll) > 0)
        echo '1';
    else
        echo '0';
}
catch (Exception $e){
    echo $e->getMessage();
}
?>