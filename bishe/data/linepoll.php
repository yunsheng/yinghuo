<?php
    require_once("/yinghuo/o/common.php");
	$isLoginType="bool";
	require_once("/yinghuo/o/islogin.php");
	if(!$isLoginResult){
		  echo ("{\"isSuccess\":false,\"isLogin\":false,\"code\":\"1003\",\"result\":\"未登录\"}");
	}else{
		require_once("../sql/line.php");
		require_once("../sql/log.php");
		$log=new Log();
		
		$line=new Line("d");
		if(isset($_GET["agid"])){
			$agid=decodeUriCompent($_GET["agid"]);
		 }
		 if(isset($_GET["lasttime"])){
		 	$start=strtotime("now");
			$count=0;
		 	$timeout=$_GET["timeout"]+1;
		 	$lasttime=decodeUriCompent($_GET["lasttime"]); 						 	
			$isup=false;
			if(isset($agid)){	
			 		$isup= $log->isUpdatedByName($agid,$lasttime);
			 }else{
			 	$isup=$log->isUpdated($lasttime);
	 		}
				 
		 }else{
		 	$isup=true;
		 	
		 }
		  if($isup){
			 	$isUpdate="true";
			  if(isset($agid)){
				 $list=$line->getListByName($agid, "2012-04-01", "2015-09-30");
			 }else{
					 $list=$line->getListByTime("2012-04-01", "2015-09-30");
			 }
			 }else{
			 	$isUpdate="false";
				$list="\"没有更新内容\"";
			 }
		 $result=json_encode($list);
	 	 $success="true";
		 $newLast=$log->getLast();
     	 $json="{\"isSuccess\":$success,\"isUpdate\":$isUpdate,\"result\":$result,\"lasttime\":\"$newLast\"}";
	
	  echo $json;
	  }
?>