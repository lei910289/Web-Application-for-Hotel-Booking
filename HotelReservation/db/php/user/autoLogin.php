<?php
       session_start();
        if(isset($_COOKIE['username']) && $_COOKIE['username']!=""){
            $_SESSION['username'] = $_COOKIE['username'];
            $_SESSION['type'] = $_COOKIE['type'];
            echo $_SESSION['type'];
        }          
        else if (isset($_SESSION['username']))
            echo $_SESSION['type'];
        else
            echo '00';


?>