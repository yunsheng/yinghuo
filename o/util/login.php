<?php
   require_once("user.php");
     
   class Login{
   	  /**
	   * �û���¼
	   * @param $name �û���
	   * @param $pwd �û�����
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
	   * �û��˳�
	   */
	  public function userExit(){
	  		session_start();
			$_SESSION['_nk_']="";
			setcookie('_nk_',"",time()-3600);
   	  }
	  /**
	   * �Ƿ��¼�ж�
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
			// �ǵ�¼״̬��ִ�жԷǵ�¼�Ĵ���������������ص���¼ҳ��
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