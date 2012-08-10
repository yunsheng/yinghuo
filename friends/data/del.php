<?php
	header("Content-Type:text/html;charset=gbk");
	$isLoginType="bool";
	require_once("/yinghuo/o/islogin.php");
	if(!$isLoginResult){
		  echo ("{\"success\":false,\"code\":\"1003\",\"message\":\"ฮดตวยผ\"}");
	}else{
			 require_once("/yinghuo/o/common.php");
		 	 require_once("../sql/friends.php");
			 $data=$_POST["data"];
			 $friend=new Friends("d");
			 $friend->del($id);
		 	 $success="false";
			 $result=json_encode($list);
	     	 $json="{\"success\":$success,\"result\":$result,\"message\":\"ษพณýำรปงสงฐÜ\"}";
		 }
	  echo $json;
?>