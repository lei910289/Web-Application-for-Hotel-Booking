<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $name = mysqli_real_escape_string($con,$_POST['name']);
    $address = mysqli_real_escape_string($con,$_POST['address']);
    $zipcode = mysqli_real_escape_string($con,$_POST['zipcode']);
    $s_id = mysqli_real_escape_string($con,$_POST['s_id']);
    $c_id = mysqli_real_escape_string($con,$_POST['c_id']);
    $array = json_decode(stripslashes($_POST['arr']));

    $sql="insert into hotel (name,address,zipcode,s_id,c_id) values ('$name','$address',$zipcode,$s_id,$c_id)";
    
    if(DbOperation::action($con, $sql)){
       
        $sql="SELECT hotel.h_id from hotel where hotel.name = '$name' and hotel.zipcode = $zipcode";
        $result = mysqli_query($con,$sql);
        $row = mysqli_fetch_assoc($result);
        $h_id = $row["h_id"];
        foreach($array as $d){
            $roomType = $d[0];
            $price = $d[1];
            $info = $d[2];
            $number = $d[3];
            $room_num = explode(',', $number);
            $i = count($room_num);
            $sql="insert into roomtype(h_id, name, price, info) values ( $h_id, '$roomType', $price, '$info')";
            if(!DbOperation::action($con, $sql)){
               echo "false";
            }else{
                $sql="SELECT roomtype.rt_id from roomtype where roomtype.name = '$roomType' and roomtype.price = $price and roomtype.info = '$info' and roomtype.h_id = $h_id";
                $result = mysqli_query($con,$sql);
                $row = mysqli_fetch_assoc($result);
                $rt_id = $row["rt_id"];
                for($j=0; $j<$i; $j++){
                    $sql = "insert into room (num,rt_id,h_id) values ('$room_num[$j]','$rt_id',$h_id)";
                    DbOperation::action($con, $sql);
                }
            }
        }
        echo "true";
    }
    else{
        echo 'false';
    }

}
catch (Exception $e){
    echo $e->getMessage();
}
?>