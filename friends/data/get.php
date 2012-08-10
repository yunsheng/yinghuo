<?php
	$isLoginType="bool";
	require_once("/yinghuo/o/islogin.php");
	if(!$isLoginResult){
		  echo ("{\"success\":false,\"code\":\"1003\",\"message\":\"ฮดตวยผ\"}");
	}else{
			 require_once("../sql/friends.php");
			 $name="";
			 $friend=new Friends("d");
			 $list=$friend->getList();
			 $result=json_encode($list);
		 	 $success="true";
	     	 $json="{\"success\":$success,\"data\":$result}";
	  		 echo $json;
	  }
?>