<?php
  require_once("/yinghuo/o/sql/conn.php");  
    class Agency{
    	public function getList(){
    		$logList = conn_select("SELECT * FROM agency ");
			return $logList;
    	}
		public function getName($id){
    		$logList = conn_select("SELECT name FROM agency where AG_ID='$id'");
			return $logList;
    	}
    }
?>