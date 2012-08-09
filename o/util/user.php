<?php
	require_once("/yinghuo/o/sql/conn.php");
	class User
	{
		
	  function __construct($name) {
	  		
	        $this->id=$name;
	   }
	  
	  	/**
		 * ��ѯ�û���¼
		 * @name check
		 * @param  $name �û���
		 * @param $pwd ����
		 */
		public function check($name,$pwd){
			
			if($name==""||$pwd==""){
				return false;
			}else{
				$arr=conn_select("select * from user where name='$name' and pwd='$pwd'");
				if(count($arr)==1){
					return true;
				}else{
					return false;
				}
			}
		}
		
		/**
		 * ����û�
		 * @name add
		 * @param  $name �û���
		 */
		public function add($name){
			$userid=$this->id;
			if($userid!=1) {
				return 1001;
			}else{
				try{
					conn_query("INSERT INTO user(name) VALUES ('$name')");
					return 1000;
				}catch(Exception $e){
					return 1002;
				}
			}
		}
		
		/**
		 * ɾ���û�
		 * @name del
		 * @param $id  
		 */
		public function del($id){
			$userid=$this->id;
			if($userid!=1&&$userid!=id){
				return 1001;
			}else{
				try{
					conn_query("delete from user where userid='$id'");
					return 1000;
				}catch(Exception $e){
					return 1002;
				}
			}
			
		}
		/**
		 * �����û�
		 * @name update
		 * @param $id �û�id
		 * @param $name �û�����
		 
		 */
		public function update($id,$name){
			$userid=$this->id;
			if($userid!=1&&$userid!=id){
				return 1001;
			}else{
				try{
					$updateTime = date("Y-m-d H:i:s");
					conn_query("update user set name='$name' $where userid='$id'");
					return 1000;
				}catch(Exception $e){
					return 1002;
				}
			}
		}
		 
	}
?>