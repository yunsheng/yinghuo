<?php

class Friends
{
  private $userName;	
  private $ADMINUSER='dongzhu';
  function __construct($name) {
        $this->userName=$name;
   }
	/**
	 * ��Ӽ�¼
	 * @name add
	 * @param  $name �û���
	 * @param $tel �绰
	 * @param $email ����
	 * @param $qq qq��
	 * @param $bz ��ע
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
	 * ɾ����¼
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
	 * ���¼�¼
	 * @name update
	 * @param $id ��¼��id
	 * @param $name �û�����
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
	 * ��ȡ��¼
	 * @name getList
	 */
	public function getList(){
		$logList = conn_select("select * from friends");
		return $logList;
		
	}
}

?>