<?php
require_once("util/conn.php");
require_once("util/log.php");
$id = $_REQUEST["id"];

if($id){
	$result = conn_select("SELECT * FROM docitem WHERE id=$id");
	$row=$result[0];
	
	$title=$row['title'];
	
	$agent = $_COOKIE["_nk_"];
	$logItem=new LogItem();
	$logItem->addContent($agent,"删除了项目(id-$id)$title");
	
	conn_query("DELETE FROM docitem WHERE id=$id");

	
}
?>