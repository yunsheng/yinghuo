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
		$title="长链接";
		include("common/cssjs.php");
		?>	
	</head>
	<body>	
		<?php include("common/head.php");?>	
		<section id="content" class="clearfix">
			 
			 <div id="J_async_grid"></div>
			 
		</section>
		<?php include("common/foot.php");?>	
		<script src="../js/comet.js"></script>		
	</body>
</html>



