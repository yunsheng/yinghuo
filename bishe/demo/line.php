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
		$title="巡检员足迹";
		$menu="5";
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
			 	
			 </div>
			 </form>
			 <h1 class="caption">巡检员 <?=$name?> 的足迹管理</h1>
			 <div id="J_async_grid"></div>
			

		</section>
		<?php include("common/foot.php");?>	
		<script src="../js/linepage.js"></script>	
		
	</body>
</html>



