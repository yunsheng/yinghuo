<?php
  require_once("/yinghuo/o.php");
  require_once("util/login.php");	 
  $redirect=$_POST["redirect"];
  $callback=$_POST["callback"];
  $name=$_POST["username"];
  $pwd=$_POST["password"];
  $usrLogin=new Login();
  $result=$usrLogin->userLogin($name, $pwd);
  if($result==false){	
  	header(sprintf("Location: %s", $serverhost."/o/login.php?redirect=".$redirect."&callback=".$callback));	
  }else{
	if($redirect!=""){
		header(sprintf("Location: %s", $redirect));
	}else if($callback!=""){
		echo("<script>window.parent.".$callback."({\"isLogin\":true,\"name\":\"$name\"})</script>");
	}
  }
?>