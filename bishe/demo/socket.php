<!DOCTYPE html>
<html >
	<head>
		<?php 
		$page="index";
		$title="webSocket";
		include("common/cssjs.php");
		?>	
	</head>
	<body>	
		<?php include("common/head.php");?>	
		<section id="content" class="clearfix">
			 
			 <div id="J_async_grid"></div>
			 
		</section>
		<?php include("common/foot.php");?>	
		<script>
			KISSY.use("socket",function(S){
				
			});
		</script>
		
		
	</body>
</html>