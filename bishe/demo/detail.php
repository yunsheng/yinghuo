<?php 
  session_start();
  $isLoginType="";
  $menu=22;
  require_once("/yinghuo/o/islogin.php");
?>
<!DOCTYPE html>
<html >
	<head>
		<?php 
		$page="detail";
		$title="巡检详情";
		include("common/cssjs.php");
		?>	
	</head>
	<body>	
		<?php include("common/head.php");?>	
		<section id="content" class="clearfix">
			
			<div class="affirm-win mb20">
				<dl class="bd">
					<dt class="moneysTip">
						本次巡检 <span class="orange">成功</span> 
					</dt>
					<dd class="other-info">
						巡检员：刘超武
					</dd>
					<dd class="other-info">
						巡检时间：<span class="blue">2012-06-18 11:10:29</span>
					</dd>
					<dd class="other-info">
						巡检表单：<a href="">点击下载</a>
					</dd>
					<dd class="other-info mt20">
						<a class="succeed-btn" href="http://www.baidu.com"></a>
					</dd>
				</dl>
			</div>
		

		</section>
		<?php include("common/foot.php");?>	
	
	</body>
</html>



