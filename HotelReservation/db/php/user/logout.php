<?php
setcookie('username');
setcookie('type');
session_start();
session_unset();
session_destroy();

echo 'true';

?>