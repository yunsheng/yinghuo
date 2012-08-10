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
		if(isset($_GET["name"])){
			$name=decodeUriCompent($_GET["name"]);
		 }
		 if(isset($_GET["lasttime"])){
		 	$start=strtotime("now");
			$count=0;
		 	$timeout=$_GET["timeout"]+1;
		 	$lasttime=decodeUriCompent($_GET["lasttime"]); 						 	
			$isup=false;
			while($isup==false && $count!=$timeout){
				 if(isset($name)){	
				 		$isup= $log->isUpdatedByName($name,$lasttime);
				 }else{
				 	$isup=$log->isUpdated($lasttime);
		 		}
				 if($isup!=false){
				 	break;
				 }else{
				 	sleep(1);
				 	$end=strtotime("now");
		            $count=$end-$start;
				 }
			}

		 }
		 if(isset($name)){
				 $list=$line->getListByName($name, "2012-04-01", "2015-09-30");
			}else{
				 $list=$line->getListByTime("2012-04-01", "2012-09-30");
		 }
		 $result=json_encode($list);
	 	 $success="true";
		 $newLast=$log->getLast();
     	 $json="{\"isSuccess\":$success,\"isUpdate\":true,\"result\":$result,\"lasttime\":\"$newLast\"}";
	
	  echo $json;
	  }
?>