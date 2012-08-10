<?php
	$isLoginType="bool";
	require_once("/yinghuo/o/islogin.php");
	if(!$isLoginResult){
		  echo ("{\"isSuccess\":false,\"isLogin\":false,\"code\":\"1003\",\"result\":\"未登录\"}");
	}else{
	   require_once("/yinghuo/o/common.php");
	   require_once("../sql/plan.php");
	   $type=$_POST['type'];
	   $id=$_POST["id"];
	   $planid=$_POST['planid'];
	   $agid=$_POST['agid'];
	   $start=$_POST['start'];
	   $end=$_POST['end'];
	   
	   
	   /**
	    * @name getAllList获取所有计划
	    */
	   function getAllList(){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$plan=new Plan($loginUser);
		$list=$plan->getList();
		$result=json_encode($list);
		echo ("{\"isSuccess\":true,\"isUpdate\":true,\"result\":$result}");
			
	   }
	   
	   /**
	    * 获取某人计划内的巡检基站
	    * @name getListByAg
	    */
	   function getListByAg($agid){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$plan=new Plan($loginUser);	
		$list=$plan->getListByAg($agid);
		$result=json_encode($list);
		echo ("{\"isSuccess\":true,\"isUpdate\":true,\"result\":$result}");
			 
	   }
		
	   /**
	    * @param $id 执行计划id
	    */
	   function done($id){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$plan=new Plan($loginUser);	
		$code=$plan->done($id);
		if($code=="1000"){
				echo ("{\"isSuccess\":true,\"result\":\"巡检任务已完成\"}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":$code,\"user\":\"$loginUser\",\"result\":\"巡检为完成\"}");
			}
	   }
	   
	   switch($type){
	   	case "add":addItem($id,$agid,$start,$end);break;
		case "del":deleteItem($id);break;
		case "done":done($id);break;
		case "edit":editItem($id,$btsid,$agid,$start,$end);break;
		case "getbts":getListByBts($btsid);break;
		case "getag":getListByAg($agid);break;
		case "getid":getListById($id);break;
		default:  echo("{\"isSuccess\":false,\"code\":\"1005\",\"message\":\"参数错误\"}"); break;
	   }
   }
   
?>