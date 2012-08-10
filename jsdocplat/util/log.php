<?php
class LogItem
{
	public function addContent($name,$content){

		$time = date("Y-m-d H:i:s");
		conn_query("INSERT INTO logitem (time,name,content) VALUES ('$time','$name','$content')");
		//关闭数据库链接

	}
	public function getList($page,$limt){
        $start=$page*$limt;
		$logList = conn_select("SELECT * FROM logitem ORDER BY time DESC LIMIT $start, $limt");
		return $logList;
	}
}

  class User
{ 
	public function add($usrname,$pwd){

	    $logItem=new LogItem();
		$logItem->addContent($_COOKIE["_nk_"],"添加了新用户$usrname");
		conn_query("INSERT INTO usr (usrname,pwd) VALUES ('$usrname','$pwd')");

	}
	public function reg($usrname,$pwd){

	  	$logItem=new LogItem();
		$logItem->addContent($usrname,"用户 $usrname 注册并登录");
		setcookie("_nk_", "$usrname", time()+36000000,"/");
		conn_query("INSERT INTO usr (usrname,pwd) VALUES ('$usrname','$pwd')");

	}
	public function getList($page,$limt){
        $start=$page*$limt;
		$logList = conn_select("SELECT usrname FROM usr  LIMIT $start, $limt");
		return $logList;
	}
	public function del($usrname){
		$logItem=new LogItem();
		$logItem->addContent($_COOKIE["_nk_"],"删除了用户$usrname");
		conn_query("DELETE FROM usr WHERE usrname like '$usrname'");
	}
	public function changePwd($usrname,$pwd){
		$logItem=new LogItem();
		$logItem->addContent($_COOKIE["_nk_"],"修改了密码");
		conn_query("UPDATE usr SET pwd='$pwd' WHERE usrname like '$usrname'");
	}
}
?>