<?php
	
	$isLoginType="bool";
	require_once("/yinghuo/o/islogin.php");
	if(!$isLoginResult){
		  echo ("{\"isSuccess\":false,\"code\":\"1003\",\"message\":\"ddd\"}");
	}else{
		require_once("/yinghuo/o/common.php");
		require_once("../sql/article.php");
	   $type=$_POST['type'];
	   $title=decodeUriCompent($_POST["title"]);
	   $intro=decodeUriCompent($_POST["intro"]);
	   $id=$_POST['id'];
	   $menuid=$_POST['menuid'];
	   $paragram=decodeUriCompent($_POST["paragram"]);
	   /**
	    * @name addItem 
	    * @param $titles
	    * @param $param 
	    * @param $menuid 
	    */
	   function addItem($title,$intro,$param,$menuid){
	   	$article=new Article();
	   	$article->add($title,$intro,$param,$menuid);
		echo ("{\"isSuccess\":true,\"type\":\"$menuid\"}");
	   }
	   /**
	    * @name editItem
	    * @param $title 
	    * @param $param 
	    * @param $id
	    */
	   function editItem($id,$title,$intro,$param,$menuid){
	   	$article=new Article();
	   	$article->update($id,$title,$intro,$param,$menuid);
		echo ("{\"isSuccess\":true,\"type\":\"$menuid\"}");
	   }
	   /**
	    * @name deleteItem 
	    * @param id 
	    */
	   function deleteItem($id){
	   	$article=new Article();
	   	$article->del($id);
		echo ("{\"isSuccess\":true,\"type\":\"$menuid\"}");
	   }
	   switch($type){
	   	case "add":addItem($title,$intro,$paragram,$menuid);break;
		case "del":deleteItem($id);break;
		case "edit":editItem($id,$title,$intro,$paragram,$menuid);break;
	   }
   }
   
?>