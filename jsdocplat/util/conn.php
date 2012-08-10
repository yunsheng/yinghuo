<?php
function conn(){
	$con = mysql_connect("localhost","root","1234");
	if (!$con){
		die('Could not connect: ' . mysql_error());
	}
	mysql_select_db("docplat", $con);
	mysql_query("set names utf-8");
	return $con;
}
function conn_query($sql){
	$con = conn();
	mysql_query($sql);
	mysql_close($con);
}
function conn_select($sql){
	$con = conn();
	$result = mysql_query($sql);
	$resultArr = array();
	while($row = mysql_fetch_array($result)){
		$resultArr[]=$row;
	}
	mysql_close($con);
	return $resultArr;
}
?>