<?php

include "../../db/DbConnection.php";
include "../../db/DbOperation.php";

try{
    $con = DbConnection::getConnection();
    $starttime = mysqli_real_escape_string($con,$_POST['starttime']); //format
    $endtime = mysqli_real_escape_string($con,$_POST['endtime']);  //format
    $s_id = mysqli_real_escape_string($con,$_POST['s_id']); 
    $c_id = mysqli_real_escape_string($con,$_POST['c_id']);  
    $hotelName = mysqli_real_escape_string($con,$_POST['hotelName'] == null?"%": "%".$_POST['hotelName']."%");  
    $pricefilter =  mysqli_real_escape_string($con,$_POST['price'] == 1?"asc": "desc");

//     $starttime = "2015-11-24"; //format
//         $endtime = "2015-11-26";  //format
//         $s_id = 1;
//         $c_id = 1;
//         $hotelName = "%";
//         $pricefilter = "desc";
    date_default_timezone_set("PRC");
    $sql = "select h.name,h.address,h.s_id,h.h_id,h.zipcode,rt.rt_id,rt.name rtname,rt.price,rt.info from hotel h,roomtype rt where s_id = $s_id and c_id = $c_id and rt.h_id = h.h_id and h.name like '$hotelName' order by rt.price $pricefilter" ;
    $arrayAll = json_decode(DbOperation::search($con, $sql),true);
    $arrayHotel = array();
    for($i = 0; $i<count($arrayAll);$i++){
         $days=abs((strtotime($starttime)-strtotime($endtime))/86400);
         $arrayAll[$i]['price'] = $arrayAll[$i]['price']*$days;
        $h_id_tmp = $arrayAll[$i]['h_id'];
        $rt_id_tmp = $arrayAll[$i]['rt_id'];
        $sql = "select r_id from room r,roomtype rt where r.h_id = $h_id_tmp and r.rt_id = $rt_id_tmp  and r_id not in(".
            "select r_id from `orders` where (starttime <= '" .$starttime."' and ".
            "endtime > '".$starttime."') or ".
            "(starttime < '".$endtime."' and ".
            "endtime >= '".$endtime."') or ".
            "(starttime >= '".$starttime."' and ".
            "endtime <= '".$endtime."') and `status` != 'cancelled' ) ";
        $array = json_decode(DbOperation::search($con, $sql),true);
        if(count($array) > 0){
            $arrayAll[$i]['s_id'] = $array[0]['r_id'];
            array_push($arrayHotel, $arrayAll[$i]);
        }
            
    }
    echo json_encode($arrayHotel);

}
catch (Exception $e){
    echo $e->getMessage();
}

?>