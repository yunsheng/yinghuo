<?php
require("../util/conn.php");
require("../util/log.php");
//重定向跳转
if($_REQUEST["redirect"]){
	$redirect = $_REQUEST["redirect"];
}else{
	$redirect = "../index.php";
}
/**
 * 用户登录
 */
if($_REQUEST["type"]=="login"){
	$usrname = $_REQUEST["usrname"];
	$pwd = $_REQUEST["pwd"];
	$result = conn_select("SELECT * FROM usr WHERE usrname like '$usrname' AND pwd like '$pwd'");
	if(count($result)>0){
		$logItem=new LogItem();
		$logItem->addContent($usrname,"用户 $usrname 登录系统");
		setcookie("_nk_", "$usrname", time()+36000000,"/");
		header(sprintf("Location: %s", $redirect));
	}else{
		header(sprintf("Location: %s", "../login.php"));
	}
}
/**
 * 用户登出
 */
if($_REQUEST["type"]=="logout"){
	setcookie("_nk_", "", time()-3600,"/");	
	header(sprintf("Location: %s", "../login.php"));	
}
/**
 * 添加新用户
 */
if($_REQUEST["type"]=="add"){
	$usrname = $_REQUEST["usrname"];
	$pwd = $_REQUEST["pwd"];
	$result = conn_select("SELECT * FROM usr WHERE usrname like '$usrname'");
	if(count($result)>0){
		echo "{\"fail\":\"该用户已存在\"}";
	}else{
		$logItem=new LogItem();
		$logItem->addContent($_COOKIE["_nk_"],"添加了新用户$usrname");
		conn_query("INSERT INTO usr (usrname,pwd) VALUES ('$usrname','$pwd')");
		echo "success";
	}
}
/**
 * 注册
 */
if($_REQUEST["type"]=="reg"){
	$usrname = $_REQUEST["usrname"];
	$pwd = $_REQUEST["pwd"];
	$result = conn_select("SELECT * FROM usr WHERE usrname like '$usrname'");
	if(count($result)>0){
		echo "{\"fail\":\"该用户已存在\"}";
	}else{
		$logItem=new LogItem();
		$logItem->addContent($usrname,"用户 $usrname 注册并登录");
		setcookie("_nk_", "$usrname", time()+36000000,"/");
		conn_query("INSERT INTO usr (usrname,pwd) VALUES ('$usrname','$pwd')");
		echo "success";
	}
}
/**
 * 删除用户
 */
if($_REQUEST["type"]=="delete"){
	$usrname = $_REQUEST["usrname"];
	$result = conn_select("SELECT * FROM usr WHERE usrname like '$usrname'");
	if(count($result)==0){
		echo "{\"fail\":\"该用户不存在\"}";
	}else{
		$logItem=new LogItem();
		$logItem->addContent($_COOKIE["_nk_"],"删除了用户$usrname");
		conn_query("DELETE FROM usr WHERE usrname like '$usrname'");
		echo "success";
	}
}
/**
 * 修改密码
 */
if($_REQUEST["type"]=="changepwd"){
	$usrname = $_COOKIE["_nk_"];
	$oldpwd = $_REQUEST["oldpwd"];
	$pwd = $REQUEST["pwd"];
	$result = conn_select("SELECT * FROM usr WHERE usrname like '$usrname' AND pwd like '$oldpwd'");
	if(count($result)==0){
		echo "{\"fail\":\"该用户不存在或旧密码错误\"}";
	}else{
		$logItem=new LogItem();
		$logItem->addContent($_COOKIE["_nk_"],"修改了密码");
		conn_query("UPDATE usr SET pwd='$pwd' WHERE usrname like '$usrname'");
		echo "success";
	}
}
?>