<header id="header">
	<form action="/o/exit.php" method="post">
		<input type="hidden" name="redirect" value="<?=$redirect?>" />
	 <span class="name">
	 	<?php if($isLoginResult) {?>
	 	<strong class="J_UserName" ><?=$isLoginResult?></strong>
	 	<input type="submit" class="J_UserExit exit" value="[×¢Ïú]"/>
	 	<a class="J_UserLogin dn">login</a>
	 	<?php }else{?>
	 	<a class="J_UserName dn"></a>
	 	<input type="submit" class="J_UserExit exit dn" value="[×¢Ïú]"/>
	 	<a class="J_UserLogin">login</a>
	 	<?php }?>
	 </span>
	 <!-- <a href="http://yinghuo.com/dongzhu/demo/article.php?" target="_blank" class="more">More details on blog</a> -->
	 <div class="weibo"><a class="twitter-share-button" data-count="horizontal" data-via="joelambert">@Î¢²©:</a><a target="_blank" class="weiboname" href="http://weibo.com/u/2377446567">Ó«_»ó</a></div>
 	</form>
 </header>
<script src="/o/js/head.js"></script>