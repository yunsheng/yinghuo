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
		$line=new Line("dongzhu");
		if(isset($_GET["agid"])){
			$agid=$_GET["agid"];
		 }
		 if(isset($_GET["lasttime"])){
		 	$start=strtotime("now");
			$count=0;
		 	$timeout=$_GET["timeout"]+1;
		 	$lasttime=$_GET["lasttime"]; 						 	
			$isup=false;
			while($isup==false && $count<$timeout){
				 if(isset($agid)){	
				 		$isup= $log->isUpdatedByName($agid,$lasttime);
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
		 if(isset($agid)){
				 $list=$line->getListByName($agid, "2012-04-01", "2015-09-30");
			}else{
				 $list=$line->getListByTime("2012-04-01", "2015-09-30");
		 }
		 $result=json_encode($list);
	 	 $success="true";
		 $newLast=$log->getLast();
     	 $json="{\"isSuccess\":$success,\"isUpdate\":true,\"result\":$result,\"lasttime\":\"$newLast\"}";
	
	  echo $json;
	  }
?>