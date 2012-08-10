<?php
	$isLoginType="bool";
	require_once("/yinghuo/o/islogin.php");
	if(!$isLoginResult){
		  echo ("{\"isSuccess\":false,\"isLogin\":false,\"code\":\"1003\",\"result\":\"未登录\"}");
	}else{
	   require_once("/yinghuo/o/common.php");
	   require_once("../sql/bts.php");
	   $type=$_POST['type'];
	   $id=urldecode($_POST["id"]);
	   $longtitude=$_POST['longtitude'];
	   $latitude=$_POST['latitude'];
	   $name=urldecode($_POST['name']);
	   $prov=urldecode($_POST['prov']);
	   $city=urldecode($_POST['city']);
	   $county=urldecode($_POST['county']);
	   $address=urldecode($_POST['address']);
	   
	   /**
	     * @name addItem 添加基站
	     * @param  $id 基站id
	   	 * @param $name 基站名称
		 * @param $longtitude 经度
		 * @param $latitude 纬度
		 * @param $prov 省份名称
		 * @param $city 城市名称
		 * @param $county 城市名称
		 * @param $address 站址
	    */
	   function addItem($id,$name,$longtitude,$latitude,$prov,$city,$county,$address){
	   		session_start();
			$loginUser=$_SESSION['_nk_'];
	   		$bts=new BTS($loginUser);
			$code=$bts->add($id,$name,$longtitude,$latitude,$prov,$city,$county,$address);
			if($code=="1000"){
				echo ("{\"isSuccess\":true,\"result\":\"添加成功\"}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":\"$code\",\"result\":\"添加失败\"}");
			}
	   }
	   /**
	    * @name editItem 修改记录
	    * @param  $id 基站id
	   	 * @param $name 基站名称
		 * @param $longtitude 经度
		 * @param $latitude 纬度
		 * @param $prov 省份名称
		 * @param $city 城市名称
		 * @param $county 城市名称
		 * @param $address 站址
	    */
	   function editItem($id,$name,$longtitude,$latitude,$prov,$city,$county,$address){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$bts=new BTS($loginUser);
		$code=$bts->update($id,$name,$longtitude,$latitude,$prov,$city,$county,$address);
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
		$bts=new BTS($loginUser);	
		$code=$bts->del($id);
		if($code=="1000"){
				echo ("{\"isSuccess\":true,\"result\":\"删除成功\"}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":$code,\"user\":\"$loginUser\",\"result\":\"删除失败\"}");
			}
	   }
	   /**
	    * @name getAllList获取所有基站
	    */
	   function getAllList(){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$bts=new BTS($loginUser);	
		$list=$bts->getList();
		$result=json_encode($list);
		echo ("{\"isSuccess\":true,\"isUpdate\":true,\"result\":$result}");
			
	   }
	   
	   /**
	    * @name getProvList获取所有基站
	    */
	   function getProvList($prov){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$bts=new BTS($loginUser);	
		$code=$bts->getListByProv($prov);
		if($code=="1000"){
				echo ("{\"isSuccess\":true,\"isUpdate\":true}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":$code,\"user\":\"$loginUser\",\"result\":\"获取基站信息失败\"}");
			}
	   }
	   /**
	    * @name getCityList获取所有基站
	    */
	   function getCityList($prov, $city){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$bts=new BTS($loginUser);	
		$code=$bts->getListByCity($prov, $city);
		if($code=="1000"){
				echo ("{\"isSuccess\":true,\"isUpdate\":true}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":$code,\"user\":\"$loginUser\",\"result\":\"获取基站信息失败\"}");
			}
	   }
	    /**
	    * @name getCountyList获取所有基站
	    */
	   function getCountyList($prov, $city, $county){
	   	session_start();
		$loginUser=$_SESSION['_nk_'];
		$bts=new BTS($loginUser);	
		$code=$bts->getListByCounty($prov, $city, $county);
		if($code=="1000"){
				echo ("{\"isSuccess\":true,\"isUpdate\":true}");
			}else{
				echo ("{\"isSuccess\":false,\"code\":$code,\"user\":\"$loginUser\",\"result\":\"获取基站信息失败\"}");
			}
	   }
	   switch($type){
	   	case "add":addItem($id,$name,$longtitude,$latitude,$prov,$city,$county,$address);break;
		case "del":deleteItem($id);break;
		case "edit":editItem($id,$name,$longtitude,$latitude,$prov,$city,$county,$address);break;
		case "getall":getAllList();break;
		case "getprov":getProvList($prov);break;
		case "getcity":getProvList($prov,$city);break;
		case "getcounty":getProvList($prov,$city,$county);break;
		default: echo ("{\"isSuccess\":false,\"code\":\"1005\",\"result\":\"参数错误\"}");
	   }
   }
   
?>