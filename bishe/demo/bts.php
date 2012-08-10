<?php 
  session_start();
  $isLoginType="";
  require_once("/yinghuo/o/islogin.php");
  
?>
<!DOCTYPE html>
<html >
	<head>
		<?php 
		$page="grid";
		$title="基站管理";
		$menu=0;
		include("common/cssjs.php");
		?>	
	</head>
	<body>	
		<?php include("common/head.php");?>	
		<section id="content" class="clearfix">
			 <h1 class="caption">基站信息管理表</h1>
			 <div id="J_async_grid"></div>
		</section>
		<?php include("common/foot.php");?>	
		<script src="http://yinghuo.com/widdget/area/area.js"></script>
		<script src="../js/btspage.js"></script>	
		
	</body>
</html>



