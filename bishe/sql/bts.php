<?php
require_once("/yinghuo/o/sql/conn.php");
class BTS
{
  private $userName;
  private $ADMINUSER='dongzhu';
  function __construct($name) {
        $this->userName=$name;
   }
	/**
	 * 添加基站
	 * @name add
	 * @param  $id 基站id
	 * @param $name 基站名称
	 * @param $longtitude 经度
	 * @param $latitude 纬度
	 * @param $prov 省份名称
	 * @param $city 城市名称
	 * @param $county 城市名称
	 * @param $address 站址
	 */
	public function add($id,$name,$longtitude,$latitude,$prov,$city,$county,$address){
		$userName=$this->userName;
		$time = date("Y-m-d H:i:s");
		if($userName!=$this->ADMINUSER) {
			return 1001;
		}else{
			try{
				conn_query("INSERT INTO bts(BTS_ID,BTS_NAME,BTS_LO,BTS_LA,BTS_PROV,BTS_CITY,BTS_COUNTY,BTS_ADDRESS) VALUES ('$id','$name','$longtitude','$latitude','$prov','$city','$county','$address')");
				return 1000;
			}catch(Exception $e){
				return 1002;
			}
		}
	}
	
	/**
	 * 删除基站
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
				
				conn_query("delete from bts where BTS_ID='$id'");
				return 1000;
			}catch(Exception $e){
				return 1002;
			}
		}
		
	}
	/**
	 * 更新基站
	 * @name update
	  * @param  $id 基站id
	 * @param $name 基站名称
	 * @param $longtitude 经度
	 * @param $latitude 纬度
	 * @param $prov 省份名称
	 * @param $city 城市名称
	 * @param $county 城市名称
	 * @param $address 站址
	 */
	public function update($id,$name,$longtitude,$latitude,$prov,$city,$county,$address){
		$userName=$this->userName;
		$time = date("Y-m-d H:i:s");
		if($userName!=$this->ADMINUSER) {
			return 1001;
		}else{
			try{	
				conn_query("update bts set BTS_NAME='$name',BTS_LO='$longtitude',BTS_LA='$latitude',BTS_PROV='$prov',BTS_CITY='$city',BTS_COUNTY='$county',BTS_ADDRESS='$address' where BTS_ID=$id");
				return 1000;
			}catch(Exception $e){
				return 1002;
			}
		}
		
	}
	
	/**
	 * 获取所有基站信息
	 * @name getList
	 */
	public function getList(){
		$logList = conn_select("SELECT * FROM bts");
		return $logList;
	}
	/**
	 * 获取某个省的基站信息
	 * @name getListByProv
	 * @param $prov 省份名称
	 */
	public function getListByProv($prov){
		$logList = conn_select("SELECT * FROM bts where BTS_PROV='$prov'");
		return $logList;
	}
	/**
	 * 获取某个市的基站信息
	 * @name getListByCity
	 * @param $prov 省份名称
	 * @param $city 城市名称
	 */
	public function getListByCity($prov,$city){
		$logList = conn_select("SELECT * FROM bts  where BTS_PROV='$prov' and BTS_CITY='$city'");
		return $logList;
	}
	/**
	 * 获取某个县的基站信息
	 * @name getListByCity
	 * @param $prov 省份名称
	 * @param $city 城市名称
	 * @param $county 城市名称
	 */
	public function getListByCounty($prov,$city,$county){
		$logList = conn_select("SELECT * FROM bts  where BTS_PROV='$prov' and BTS_CITY='$city'  and BTS_COUNTY='$county'");
		return $logList;
	}
}

?>