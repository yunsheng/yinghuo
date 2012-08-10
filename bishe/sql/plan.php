<?php
require_once("/yinghuo/o/sql/conn.php");
require_once("/yinghuo/bishe/sql/line.php");
class Plan
{
  private $userName;
  private $ADMINUSER='dongzhu';
  function __construct($name) {
        $this->userName=$name;
   }
	/**
	 * 添加计划
	 * @name add
	 * @param  &btsid 计划id
	 * @param  $agid 巡检员id
	 * @param $start 开始时间
	 * @param $end 结束时间
	 */
	public function add($btsid,$agid,$start,$end){
		$userName=$this->userName;
		$time = date("Y-m-d H:i:s");
		if($userName!=$this->ADMINUSER) {
			return 1001;
		}else{
			try{
				conn_query("INSERT INTO plan(BTS_ID,AG_ID,PA_START,PA_END) VALUES ('$btsid','$agid','$start','$end')");
				return 1000;
			}catch(Exception $e){
				return 1002;
			}
		}
	}
	
	/**
	 * 删除计划
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
				
				conn_query("delete from plan where PA_ID='$id'");
				return 1000;
			}catch(Exception $e){
				return 1002;
			}
		}
		
	}
	/**
	 * 执行计划
	 * @name done
	 * @param $id  
	 */
	public function done($id){
		$userName=$this->userName;
		$time = date("Y-m-d H:i:s");
		if($userName!=$this->ADMINUSER){
			return 1001;
		}else{
			try{
				conn_query("update  plan set PA_DONE=1 ,PA_TIME='$time' where PA_ID='$id'");
				$line=new Line($this->userName);
				$list=conn_select("SELECT plan.AG_ID,bts.BTS_LO,bts.BTS_LA,bts.BTS_ADDRESS FROM plan left join bts on plan.BTS_ID=bts.BTS_ID where plan.PA_ID='$id'");
				$name=$list[0]['AG_ID'];
				$x=$list[0]['BTS_LO']+0.0001;
				$y=$list[0]['BTS_LA']+0.0001;
				$address=$list[0]['BTS_ADDRESS'];
				
				$line->add($name, $x, $y, $time, $address);
				return 1000;
			}catch(Exception $e){
				return 1002;
			}
		}
		
	}
	/**
	 * 更新计划
	 * @name update
	 * @param $id 计划id
	 * @param &btsid 基站id
	 * @param $agid 巡检员id
	 * @param $start 开始时间
	 * @param $end 结束时间
	 */
	public function update($id,$btsid,$agid,$start,$end){
		$userName=$this->userName;
		$time = date("Y-m-d H:i:s");
		if($userName!=$this->ADMINUSER) {
			return 1001;
		}else{
			try{	
				conn_query("update plan set BTS_ID='$btsid',AG_ID='$agid',PA_START='$start',PA_END='$end' where PA_ID=$id");
				return 1000;
			}catch(Exception $e){
				return 1002;
			}
		}
		
	}
	
	/**
	 * 获取所有计划信息
	 * @name getList
	 */
	public function getList(){
		$logList = conn_select("SELECT * FROM plan");
		return $logList;
	}
	/**
	 * 获取某个计划信息
	 * @name getListById
	 */
	public function getListById(){
		$logList = conn_select("SELECT * FROM plan where PA_ID=$id");
		return $logList;
	}
	/**
	 * 获取某个基站的计划信息
	 * @name getListByPlan
	 * @param $id 
	 */
	public function getListByBts($id){
		$logList = conn_select("SELECT * FROM plan  where BTS_ID='$id'");
		return $logList;
	}
	/**
	 * 获取某个人的计划信息
	 * @name getListByPlan
	 * @param $id 
	 */
	public function getListByAg($id){
		$logList = conn_select("SELECT * FROM plan left join bts on plan.BTS_ID=bts.BTS_ID where AG_ID='$id' order by PA_DONE");
		return $logList;
	}
}

?>