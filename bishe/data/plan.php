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
	   $btsid=$_POST['btsid'];
	   $agid=$_POST['agid'];
	   $start=$_POST['start'];
	   $end=$_POST['end'];
	   
	   /**
	     * @name addItem 添加计划
	     * @param  &btsid 计划id
		 * @param  $agid 巡检员id
		 * @param $start 开始时间
		 * @param $end 结束时间
	    */
	   function addItem($btsid,$agid,$start,$end){
	   		session_start();
			$loginUser=$_SESSION['_nk_'];
	   		$bts=new Plan($loginUser);
			$code=$bts->add($btsid,$agid,$start,$end);
			if($code=="1000"){
				echo ("{\"isSuccess\":true,\"result\":\"添加成功\"}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":\"$code\",\"result\":\"添加失败\"}");
			}
	   }
	   /**
	    * @name editItem 修改记录
	    * @param  &btsid 计划id
		* @param  $agid 巡检员id
		* @param $start 开始时间
		* @param $end 结束时间
	    */
	   function editItem($id,$btsid,$agid,$start,$end){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$bts=new Plan($loginUser);
		$code=$bts->update($id,$btsid,$agid,$start,$end);
		if($code=="1000"){
				echo ("{\"isSuccess\":true,\"result\":\"修改成功\"}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":$code,\"user\":\"loginUser\",\"result\":\"修改失败\"}");
			}
	   }
	   /**
	    * @name deleteItem 删除
	    * @param id id
	    */
	   function deleteItem($id){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$bts=new Plan($loginUser);	
		$code=$bts->del($id);
		if($code=="1000"){
				echo ("{\"isSuccess\":true,\"result\":\"删除成功\"}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":$code,\"user\":\"$loginUser\",\"result\":\"删除失败\"}");
			}
	   }
	   /**
	    * @name getAllList获取所有计划
	    */
	   function getAllList(){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$bts=new Plan($loginUser);	
		$list=$bts->getList();
		$result=json_encode($list);
		echo ("{\"isSuccess\":true,\"isUpdate\":true,\"result\":$result}");
			
	   }
	   
	   /**
	    * @name 
	    */
	   function getListByBts($id){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$bts=new Plan($loginUser);	
		$list=$bts->getListByBts($id);
		$result=json_encode($list);
		echo ("{\"isSuccess\":true,\"isUpdate\":true,\"result\":$result}");
			 
	   }
		 /**
	    * @name g
	    */
	   function getListByAg($id){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$bts=new Plan($loginUser);	
		$list=$bts->getListByAg($id);
		$result=json_encode($list);
		echo ("{\"isSuccess\":true,\"isUpdate\":true,\"result\":$result}");
			 
	   }
	   /**
	    * @param $id 执行计划id
	    */
	   function done($id){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$bts=new Plan($loginUser);	
		$code=$bts->done($id);
		if($code=="1000"){
				echo ("{\"isSuccess\":true,\"result\":\"巡检任务已完成\"}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":$code,\"user\":\"$loginUser\",\"result\":\"巡检为完成\"}");
			}
	   }
	   
	   switch($type){
	   	case "add":addItem($btsid,$agid,$start,$end);break;
		case "del":deleteItem($id);break;
		case "done":done($id);break;
		case "edit":editItem($id,$btsid,$agid,$start,$end);break;
		case "getbts":getListByBts($btsid);break;
		case "getag":getListByAg($agid);break;
		case "getid":getListById($id);break;
	   }
   }
   
?>