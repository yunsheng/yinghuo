<?php
    require_once("/yinghuo/o/common.php");
	   require_once("../sql/agency.php");
	   require_once("../sql/bts.php");
	   $type=$_GET['type'];
	   $id=$_GET["id"];
	   $btsid=$_GET['btsid'];
	   $agid=$_GET['agid'];
	   $select="";
	   if($type=="getag"){
	   	   $menu=2;
	   	   $agoption=new Agency();
		   $agoptionList=$agoption->getList();
		   $select='<label>巡检员ID：</label><input type="hidden" name="type" value="getag"/><select name="agid">';
		    foreach ($agoptionList as $row){
		    	if($row["AG_ID"]==$agid){
		    		$optonItem='<option selected="true">'.$row["AG_ID"].'</option>';
					$name=$row["AG_NAME"];
		    	}else{
		    		$optonItem='<option >'.$row["AG_ID"].'</option>';
		    	}
		    	$select=$select.$optonItem;
		    }
			$select=$select.'</select>';
	   }else{
	   	 	$menu=1;
	   		$btsoption=new Bts("");
		    $btsoptionList=$btsoption->getList();
		    $select='<label>基站ID：</label><select name="btsid">';
			    foreach ($btsoptionList as $row){
			    if($row["BTS_ID"]==$btsid){
		    		$optonItem='<option selected="true">'.$row["BTS_ID"].'</option>';
					$name=$row["BTS_NAME"];
		    	}else{
		    		$optonItem='<option >'.$row["BTS_ID"].'</option>';
		    	}
		    	$select=$select.$optonItem;
			    }
			$select=$select.'</select>';
	   }
?>