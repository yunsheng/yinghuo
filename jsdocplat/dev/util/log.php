<?php
class LogItem
{
	public function addContent($name,$content){

		$time = date("Y-m-d H:i:s");
		conn_query("INSERT INTO logitem (time,name,content) VALUES ('$time','$name','$content')");
		//关闭数据库链接

	}
	public function getList(){

		$logList = conn_select("SELECT * FROM logitem ORDER BY time DESC");
		return $logList;
	}
}

?>