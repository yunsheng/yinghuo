<?php
require("../util/conn.php");
require("../util/log.php");
//重定向跳转
if($_REQUEST["redirect"]){
	$redirect = $_REQUEST["redirect"];
}else{
	$redirect = "../index.php";
}
//获取用户名
$type=$_REQUEST["type"];

$usr=new User();
/**
 * 用户登录
 */
if($type=="login"){	
	$pwd = $_REQUEST["pwd"];
	$result = conn_select("SELECT * FROM usr WHERE usrname like '$usrname' AND pwd like '$pwd'");
	if(count($result)>0){
		$logItem=new LogItem();
		$logItem->addContent($usrname,"用户 $usrname 登录系统");
		setcookie("_nk_", "$usrname", time()+36000000,"/");
		 echo("success");
	}else{
		 echo("fail");
	}
}
/**
 * 用户退出
 */
if($type=="logout"){
	setcookie("_nk_", "", time()-3600,"/");	
	header(sprintf("Location: %s", "../login.php"));	
}
/**
 * 添加新用户
 */
if($type=="add"){	
	$pwd = $_REQUEST["pwd"];
	$result = conn_select("SELECT * FROM usr WHERE usrname like '$usrname'");
	if(count($result)>0){
		echo "{\"fail\":\"该用户已存在\"}";
	}else{
		$usr->add($usrname,$pwd);
		echo "{\"success\":true,\"mes\":\"添加用户成功\"}";
	}
}
/**
 * 判断用户名是否已存在
 */
if($type=="checkname"){
	 
	$result = conn_select("SELECT * FROM usr WHERE usrname like '$usrname'");
	if(count($result)>0){
		echo "{\"success\":true,\"mes\":\"该用户已存在\"}";
	}else{
		echo "{\"success\":false,\"mes\":\"用户名可用\"}";
	}
}
/**
 * 注册
 */
if($type=="reg"){	
	$pwd = $_REQUEST["pwd"];
	$result = conn_select("SELECT * FROM usr WHERE usrname like '$usrname'");
	if(count($result)>0){
		echo "{\"success\":false,\"mes\":\"用户名已存在\"}";
	}else{
		$usr->reg($usrname,$pwd);
		echo "{\"success\":true,\"mes\":\"注册成功\"}";
	}
}

/**
 * 删除用户
 */
if($type=="delete"){	
	$result = conn_select("SELECT * FROM usr WHERE usrname like '$usrname'");
	if(count($result)==0){
		echo "{\"success\":false,\"mes\":\"用户名不存在\"}";
	}else{
		$usr->del($usrname);
		echo "{\"success\":true,\"mes\":\"删除用户成功\"}";
	}
}
/**
 * 修改密码
 */
if($type=="changepwd"){
	$usrname = $_COOKIE["_nk_"];
	$oldpwd = $_REQUEST["oldpwd"];
	$pwd = $_REQUEST["pwd"];
	$result = conn_select("SELECT * FROM usr WHERE usrname like '$usrname' AND pwd like '$oldpwd'");
	if(count($result)==0){
		echo "{\"success\":false,\"mes\":\"原密码错误\"}";
	}else{
		$usr->changePwd($usrname,$pwd);
		echo "{\"success\":true,\"mes\":\"用户密码修改成功\"}";
	}
}
?>