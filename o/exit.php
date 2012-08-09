<?php
  require_once("util/login.php");	 
  $redirect=$_POST["redirect"];
  $usrLogin=new Login();
  $result=$usrLogin->userExit();
  header(sprintf("Location: %s", "$serverhost./o/login.php?redirect=".$redirect));	
?>