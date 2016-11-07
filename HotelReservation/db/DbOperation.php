<?php

class DbOperation{
    
    private function __construct() {
    
    }
    
    public static function action($con, $sql) {
        $result = mysqli_query($con,$sql);
        if($result)
            return true;
        else
            return false;
    }

    public static function search($con,$sql){
        $result = mysqli_query($con,$sql);
        $arrayAll = array();
        while ($row = mysqli_fetch_assoc($result)) {
           array_push($arrayAll,$row);
        }
        return json_encode($arrayAll);
    }
}


?>
