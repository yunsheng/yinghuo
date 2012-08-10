<?php

class Friends
{
  private $userName;	
  private $ADMINUSER='dongzhu';
  function __construct($name) {
        $this->userName=$name;
   }
	/**
	 * 添加记录
	 * @name add
	 * @param  $name 用户名
	 * @param $tel 电话
	 * @param $email 邮箱
	 * @param $qq qq号
	 * @param $bz 备注
	 */
	public function add($name,$tel,$email,$qq,$bz){
		$userName=$this->userName;
		if($userName!=$this->ADMINUSER) {
			return 1001;
		}else{
			try{
				conn_query("INSERT INTO friends(name,tel,email,qq,bz) VALUES ('$name','$tel','$email','$qq','$bz')");
				return 1000;
			}catch(Exception $e){
				return 1002;
			}
		}
	}
	
	/**
	 * 删除记录
	 * @name del
	 * @param $id  
	 */
	public function del($id){
		$userName=$this->userName;
		if($userName!="dongzhu"){
			return 1001;
		}else{
			try{
				conn_query("delete from friends where id='$id'");
				return 1000;
			}catch(Exception $e){
				return 1002;
			}
		}
		
	}
	/**
	 * 更新记录
	 * @name update
	 * @param $id 记录条id
	 * @param $name 用户姓名
	 * @param $x
	 * @param $y
	 * @param $ctime
	 */
	public function update($id,$name,$tel,$email,$qq,$bz){
		$userName=$this->userName;
		$time = date("Y-m-d H:i:s");
		if($userName!=$this->ADMINUSER) {
			return 1001;
		}else{
			try{	
				conn_query("update friends set name='$name',tel='$tel',email='$email',qq='$qq',bz='$bz' $where id='$id'");
				return 1000;
			}catch(Exception $e){
				return 1002;
			}
		}
		
	}
	 /**
	 * 获取记录
	 * @name getList
	 */
	public function getList(){
		$logList = conn_select("select * from friends");
		return $logList;
		
	}
}

?>