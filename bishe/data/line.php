<?php
	$isLoginType="bool";
	require_once("/yinghuo/o/islogin.php");
	if(!$isLoginResult){
		  echo ("{\"isSuccess\":false,\"isLogin\":false,\"code\":\"1003\",\"result\":\"未登录\"}");
	}else{
	   require_once("/yinghuo/o/common.php");
	   require_once("../sql/line.php");
	   $type=$_POST['type'];
	   $name=urldecode($_POST["name"]);
	   $x=$_POST['x'];
	   $y=$_POST['y'];
	   $ctime=$_POST['ctime'];
	   $address=urldecode($_POST['address']);
	   /**
	    * @name addItem 添加记录
	    * @param $name 巡检员姓名
	    * @param $x
	    * @param $y
	    * @param $ctime
	    */
	   function addItem($name, $x, $y, $ctime,$address){
	   		session_start();
			$loginUser=$_SESSION['_nk_'];
	   		$line=new Line($loginUser);
			$code=$line->add($name, $x, $y, $ctime,$address);
			if($code=="1000"){
				echo ("{\"isSuccess\":true,\"message\":\"添加成功\"}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":\"$code\",\"message\":\"添加失败\"}");
			}
	   }
	   /**
	    * @name editItem 修改记录
	    * @param $id
	    * @param $name 巡检员姓名
	    * @param $x
	    * @param $y
	    * @param $ctime
	    */
	   function editItem($id, $name, $x, $y, $ctime,$address){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$line=new Line($loginUser);
		$code=$line->update($id, $name, $x, $y, $ctime,$address);
		if($code=="1000"){
				echo ("{\"isSuccess\":true,\"message\":\"修改成功\"}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":$code,\"user\":\"loginUser\",\"message\":\"修改失败\"}");
			}
	   }
	   /**
	    * @name deleteItem 删除文章
	    * @param id 文章id
	    */
	   function deleteItem($id){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$line=new Line($loginUser);	
		$code=$line->del($id);
		if($code=="1000"){
				echo ("{\"isSuccess\":true,\"message\":\"删除成功\"}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":$code,\"user\":\"$loginUser\",\"message\":\"删除失败\"}");
			}
	   }
	   
	   switch($type){
	   	case "add":addItem($name,$x,$y,$ctime,$address);break;
		case "del":deleteItem($id);break;
		case "edit":editItem($id,$name,$x,$y,$ctime,$address);break;
		default: echo ("{\"isSuccess\":false,\"code\":\"1005\",\"message\":\"参数错误\"}");
	   }
   }
   
?>