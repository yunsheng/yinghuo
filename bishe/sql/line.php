<?php
require_once("/yinghuo/o/sql/conn.php");
require_once("log.php");
class Line
{
  private $userName;
  private $uplog;	
  private $ADMINUSER='dongzhu';
  

  function __construct($name) {
        $this->userName=$name;
		$this->uplog=new Log();
   }
	/**
	 * 添加记录
	 * @name add
	 * @param  $name 用户名
	 * @param $x
	 * @param $y
	 * @param $ctime
	 */
	public function add($name,$x,$y,$ctime,$address){
		$userName=$this->userName;
		$time = date("Y-m-d H:i:s");
		if($userName!=$this->ADMINUSER) {
			return 1001;
		}else{
			try{
				conn_query("INSERT INTO line(name,x,y,ctime,utime,address) VALUES ('$name','$x','$y','$ctime','$time','$address')");
				$this->uplog->add('add', $name);
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
		$time = date("Y-m-d H:i:s");
		if($userName!=$this->ADMINUSER){
			return 1001;
		}else{
			try{
				$list= conn_select("SELECT name FROM line where id='$id'");
				$name=$list[0]["name"];
				conn_query("delete from line where id='$id'");
				$this->uplog->add('del', $name);
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
	public function update($id,$name,$x,$y,$ctime,$address){
		$userName=$this->userName;
		$time = date("Y-m-d H:i:s");
		if($userName!=$this->ADMINUSER) {
			return 1001;
		}else{
			try{	
				conn_query("update line set name='$name',x='$x',y='$y',ctime='$ctime',utime='$time',address='$address' where id=$id");
				$this->uplog->add('up', $name);
				return 1000;
			}catch(Exception $e){
				return 1002;
			}
		}
	}
	
	/**
	 * 获取某人某时间段类的足迹
	 * @name getListByNameAndTime
	 * @param $start 开始时间
	 * @param $end 结束时间
	 */
	public function getListByName($name,$start,$end){
        $userName=$this->userName;
		$logList = conn_select("SELECT * FROM line where name='$name' ORDER BY ctime");
		return $logList;
	}
	/**
	 * 获取某时间段类所有人的足迹
	 * @name getListByTime
	 * @param $start 开始时间
	 * @param $end 结束时间
	 */
	public function getListByTime($start,$end){
        $userName=$this->userName;
		$logList = conn_select("SELECT * FROM line  ORDER BY ctime");
		return $logList;
	}
}

?>