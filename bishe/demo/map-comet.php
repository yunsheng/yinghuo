<?php
	session_start();
    $isLoginType="";
    require_once("/yinghuo/o/islogin.php");
?>
<!DOCTYPE html>
<html >
	<head>
		<?php 
		$page="map";
		$title="实时跟踪-长链接";
		include("common/cssjs.php");
		?>	
	</head>
	<body>	
		<?php include("common/head.php");?>	
		<section id="content" class="clearfix">
			<form>
			 <div class="select-con">
			 	<label>监测人员：</label>
			 	<select name="name">
			 		<option>d</option>
			 		<option>r</option>
			 		<option>y</option>
			 		<option>z</option>
			 	</select>
			 	<label>时间段:</label>
			 	<input id="J_StartTime" type="datetime-local" name="startime" />~<input id="J_EndTime" name="endtime" type="datetime-local" />
			 	<input type="submit" value="查询" />
			 </div>
			 </form>
			 <div id="map"></div>
			 
		</section>
		<?php include("common/foot.php");?>
		<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>	
		<script src="../js/mapcommet.js"></script>
	</body>
</html>