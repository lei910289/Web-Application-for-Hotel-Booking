<?php

class DbConnection{
    
    private static $con = null;
    
    private function __construct() {
    
    }

    public static function getConnection() {
        if (is_null(self::$con)) {
            $url = "localhost";
            $username = "root";
            $pwd = "root";
            $db = "hotelreservation";
            self::$con= mysqli_connect($url,$username,$pwd,$db);
            if (mysqli_connect_errno()){
                throw new Exception("DataBase connection error");
            }
        }
    
        return self::$con;
    }
}

?>