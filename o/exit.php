<?php
  require_once("util/login.php");	 
  $redirect=$_POST["redirect"];
  $usrLogin=new Login();
  $result=$usrLogin->userExit();
  header(sprintf("Location: %s", "http://yinghuo.com/o/login.php?redirect=".$redirect));	
?>