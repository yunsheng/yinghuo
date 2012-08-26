<?php 
	session_start();
	$isLoginType="bool";
	require_once("/yinghuo/o/islogin.php");
?>	
<!DOCTYPE html>
<html >
	<head>
		
		<?php $page="index"; include("common/cssjs.php");?>	
	</head>
	<body class="yui3-skin-sam" id="yhpage">	
		<script type="text/javascript">
			YTRIP.use('index',function(){
				
			});
		</script>
	</body>
</html>



