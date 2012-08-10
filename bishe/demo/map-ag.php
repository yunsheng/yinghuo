<?php
	session_start();
    $isLoginType="";
    require_once("/yinghuo/o/islogin.php");
	require_once("../util/option.php");
?>
<!DOCTYPE html>
<html >
	<head>
		<?php 
		$page="map";
		$title="巡检员实时跟踪";
		$menu=4;
		include("common/cssjs.php");
		?>	
	</head>
	<body>	
		<?php include("common/head.php");?>	
		<section id="content" class="clearfix">
			
			<form>
			 <div class="select-con">
			 	
			 	<?= $select;?>
			 	<input type="submit" value="查询" />
			 	<img src="http://yinghuo.com/q/jzdone.png" /><span>已巡检</span>
			 	<img src="http://yinghuo.com/q/jztodo.png" /><span>待巡检</span>
			 </div>
			 </form>
			 <h1 class="caption">巡检员<?=$name?>地理位置信息跟踪</h1>
			 <div id="map"></div>
			 
		</section>
		<?php include("common/foot.php");?>
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>	
		<script src="../js/mapag.js"></script>
	</body>
</html>