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
		$page="grid";
		$title="基站巡检安排";
		include("common/cssjs.php");
		?>	
	</head>
	<body>	
		<?php include("common/head.php");?>	
		<section id="content" class="clearfix">
			 <form>
			 <div class="select-con">
			 	<?php 
			 	echo $select;
			 	?>
				 <input type="submit" value="查询" />	
			 </div>
			 </form>
			 <h1 class="caption"><?=$name?>巡检安排表</h1>
			 <div id="J_async_grid"></div>
			

		</section>
		<?php include("common/foot.php");?>	
		<script src="http://yinghuo.com/widdget/area/area.js"></script>
		<script src="../js/planpage.js"></script>	
		
	</body>
</html>



