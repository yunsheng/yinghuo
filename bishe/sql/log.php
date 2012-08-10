<?php
require_once("/yinghuo/o/sql/conn.php");
class Log
{
	/**
	 *  
	 * @name add
	 * @param $type 
	 * @param $name  
	 */
	public function add($type,$name){
	    $time = date("Y-m-d H:i:s");
		$this->del($name);
		conn_query("INSERT INTO uplog(type,usr,time) VALUES ('$type','$name','$time')");
	}
	/**
	 *  
	 * @name del
	 * @param $name  
	 */
	private function del($name){
		conn_query("DELETE FROM uplog where usr='$name'");
		
	}
	/**
	 *  判断是否有更新
	 * @name isUpdate
	 */
	public function isUpdated($last){
       $select="SELECT * FROM uplog where time > '$last' ORDER BY time desc";
	   $logList=conn_select($select);
	   if(sizeof($logList)==0){
				$result=false;
		}else{
			$result=$logList[0]['time'];
		}
		return $result;	
	}
	/**
	 *  判断某人记录是否有更新
	 * @name isUpdate
	 */
	public function isUpdatedByName($name,$last){
       $select="SELECT * FROM uplog where usr='$name'and time > '$last' ORDER BY time desc";
	    $logList=conn_select($select);
	   if(sizeof($logList)==0){
				$result=false;
		}else{
			$result=$logList[0]['time'];
		}
		return $result;	
	}
	/**
	 *  获取最后记录
	 * @name isUpdate
	 */
	public function getLast(){
       $select="SELECT * FROM uplog ORDER BY time desc LIMIT 1";
	   $logList=conn_select($select);
	   $result=$logList[0]['time'];
	   return $result;		
	}
	/**
	 *  获取某用户最后记录
	 * @name isUpdate
	 */
	public function getLastByName($name){
       $select="SELECT * FROM uplog where usr='$name' ORDER BY time desc LIMIT 1";
	   $logList=conn_select($select);
	   $result=$logList[0]['time'];
	   return $result;		
	}
}

?>