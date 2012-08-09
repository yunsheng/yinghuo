<?php
   require_once("user.php");
     
   class Login{
   	  /**
	   * 用户登录
	   * @param $name 用户名
	   * @param $pwd 用户密码
	   */
	  public function userLogin($name ,$pwd){
	  	$commetUser=new User("");
		$checkLogin=$commetUser->check($name, $pwd);
   	  	 if($checkLogin){
   	  	    session_start();
			$_SESSION['_nk_']=$name;
			setcookie('_nk_',$name,time()+3600);
   	  	 	return true;
   	  	 }else{
			return false;
   	  	 }
   	  }
	  
	  /**
	   * 用户退出
	   */
	  public function userExit(){
	  		session_start();
			$_SESSION['_nk_']="";
			setcookie('_nk_',"",time()-3600);
   	  }
	  /**
	   * 是否登录判断
	   */
   	  public function isLogin($result){
   	  	 session_start();
		 $session=$_SESSION['_nk_'];
		  if( $session!=""&&$session!=null){
		   	 if($result=="json"){
		   	  	return ("{\"isLogin\":true,\"name\":\"$session\",\"code\":1000}");
			 }else if($result="str"){
			 	return $session;
			 }
		}else{
			// 非登录状态，执行对非登录的处理操作，例如跳回到登录页面
		   	  if($result=="json"){
		   	  	return ("{\"isLogin\":false,\"code\":1003}");
		   	  }else if($result=="bool"){
		   	  	return false;
		   	  }else{
		   	    $url = "http://yinghuo.com/o/login.php?redirect=".$_SERVER['REQUEST_URI'];
				 header(sprintf("Location: %s", $url));	
			 }
		}
   	  }
   }
?>