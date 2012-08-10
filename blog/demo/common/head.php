<?php 
 require_once("/yinghuo/o/common.php");
 $isLoginType="str";
 require_once("/yinghuo/o/islogin.php");
 $redirect=curPageURL();
 $menuid=$_GET['type'];
	if(!$menuid){
		$menuid='0';
	}
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
	 <!-- <a href="http://yinghuo.com/dongzhu/demo/article.php?" target="_blank" class="more">More details on blog</a> -->
	 <div class="weibo"><a class="twitter-share-button" data-count="horizontal" data-via="joelambert">@微博:</a><a target="_blank" class="weiboname" href="http://weibo.com/u/2377446567">荧_惑</a></div>
 	</form>
 </header>
<script src="/bishe/js/common/head.js"></script>
<nav id="nav">
	<a  class="fav <?php if($menuid=='0'){ echo 'actived';}?>" href="article.php?type=0"><span class="text">养生保健</span></span></a>
	<a class="web <?php if($menuid=='1'){ echo 'actived';}?> " href="article.php?type=1"><span class="text">网事悠游</span></span></a>
	<a class="des <?php if($menuid=='2'){ echo 'actived';}?> " href="article.php?type=2"><span class="text">信手撷珍</span></span></a>
	<a class="time <?php if($menuid=='3'){ echo 'actived';}?>" href="article.php?type=3"><span class="text">流水淙淙</span></span></a>		 
</nav>