<?php
session_start();
if(isset($_COOKIE['type'])) {
    if($_COOKIE['type'] == 'a'){
        $_SESSION['type'] = 'a';
        echo '11';
    }
    else {
        $_SESSION['type'] = 'u';
        echo '00';
    }
}
else{
    if($_SESSION['type'] == 'a')
        echo '11';
    else
        echo '00';
}
   
?>