<?php
	require_once("/yinghuo/o/sql/conn.php");
	class User
	{
		
	  function __construct($name) {
	  		
	        $this->id=$name;
	   }
	  
	  	/**
		 * 查询用户登录
		 * @name check
		 * @param  $name 用户名
		 * @param $pwd 密码
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
		 * 添加用户
		 * @name add
		 * @param  $name 用户名
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
		 * 删除用户
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
		 * 更新用户
		 * @name update
		 * @param $id 用户id
		 * @param $name 用户姓名
		 
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