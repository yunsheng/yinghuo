<?php 
 require_once("/yinghuo/o/common.php");
 $isLoginType="str";
 require_once("/yinghuo/o/islogin.php");
 $redirect=curPageURL();
?>
<header id="header">
	<form action="/o/exit.php" method="post">
		<input type="hidden" name="redirect" value="<?=$redirect?>" />
	 <span class="name">
	 	<?php if($isLoginResult) {?>
	 	<strong class="J_UserName" ><?=$isLoginResult?></strong>
	 	<input type="submit" class="J_UserExit exit" value="[注销]"/>
	 	<a class="J_UserLogin dn">login</a>
	 	<?php }else{?>
	 	<a class="J_UserName dn"></a>
	 	<input type="submit" class="J_UserExit exit dn" value="[注销]"/>
	 	<a class="J_UserLogin">login</a>
	 	<?php }?>
	 </span>
	 <a href="/blog/demo/article.php?type=1&id=26" target="_blank" class="more">More details on blog</a>
	 <div class="weibo"><a class="twitter-share-button" data-count="horizontal" data-via="joelambert">@微博:</a><a target="_blank" class="weiboname" href="http://weibo.com/u/2377446567">荧_惑</a></div>
 	</form>
 </header>
<script src="/bishe/js/common/head.js"></script>
<nav id="nav">
	 <a <?php if($menu==0){ ?>
                    class="selected"
                    <?php } ?> href="bts.php">基站信息管理</a>
	 <a href="plan.php?btsid=3888" <?php if($menu==1){ ?>
                    class="selected"
                    <?php } ?>>基站巡检安排</a>
	 <a href="plan.php?agid=1000&type=getag" <?php if($menu==2){ ?>
                    class="selected"
                    <?php } ?>>巡检员巡检安排</a>
	 
      <a href="line.php?agid=1000&type=getag" <?php if($menu==5){ ?>
                    class="selected"
                    <?php } ?>>巡检员足迹管理</a>
      <a href="map-bts.php" <?php if($menu==3){ ?>
                    class="selected"
                    <?php } ?>>基站分布图</a>
	 <a href="map-ag.php?agid=1000&type=getag" <?php if($menu==4){ ?>
                    class="selected"
                    <?php } ?>>巡检员实时跟踪</a>
</nav>
