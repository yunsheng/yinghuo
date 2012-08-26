<?php 
	session_start();
	$isLoginType="bool";
	require_once("/yinghuo/o/islogin.php");
	$page="article";
	require_once("../util/article.php");		
?>	
<!DOCTYPE html>
<html >
	<head>
		<?php include("common/cssjs.php");?>	
	</head>
	<body>	
		<?php include("common/head.php");?>	
		
		<section id="content" class="clearfix">
			<?php include($mods) ?>
  
		</section>
		<?php include("common/foot.php");?>	
		
		<script>
			KISSY.use("detail",function(S){
				 var detail=new S.Detail("<?=$menuid?>");
			});
			
		</script>
	</body>
</html>



