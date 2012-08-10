<?php
	$isLoginType="bool";
	require_once("/yinghuo/o/islogin.php");
	
	if(!$isLoginResult){
		  echo ("{\"success\":false,\"code\":\"1003\",\"message\":\"ฮดตวยผ\"}");
	}else{
			 require_once("/yinghuo/o/common.php");
		 	 require_once("../sql/friends.php");
			 $name=decodeUriCompent($_POST["name"]);
			 $tel=$_POST["tel"];
			 $qq=$_POST["qq"];
			 $email=$_POST["email"];
			 $bz=decodeUriCompent($_POST["bz"]);
			 $friend=new Friends("d");
			 $friend->add($name, $tel, $email, $qq, $bz);
		 	 $success="true";
			 $result=json_encode($list);
	     	 $json="{\"success\":$success,\"result\":$result}";
		 }
	  echo $json;
?>