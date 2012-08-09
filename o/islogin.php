<?php
     require_once("util/login.php");
	 if(isset($_REQUEST["result"])){
	 	$isLoginType=$_REQUEST["result"];
	 }  
	 $isLogin=new Login();	
	 $isLoginResult=$isLogin->isLogin($isLoginType);
	 if($isLoginType=="json"){
	 	echo  $isLoginResult;
	 }
?>