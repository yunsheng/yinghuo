<?php  foreach ($articleList as $row){ ?>
			 <article class="article">
			 	<aside class="J_operate operate">
					
					<a class="J_Trigger trigger"></a>
					<div class="con"><a class="J_Del  button " pageid="<?=$row['id'];?>">删除</a></div>
				</aside>
			 	<header class="hd">
			 		<h1 class="title"><a href="article.php?id=<?=$row['id'];?>&type=<?=$row['type'];?>" ><?=$row['title'];?></a></h1>
			 		<time class="time">
			 			<?=substr($row['time'],0,7);?>
			 			<span class="date">
			 				<?=substr($row['time'],8,2);?>
			 			</span>
			 			<span class="hm">
			 				<?=substr($row['time'],11,5);?>
			 			</span>
			 			</time>
			 	</header>
			 	<section class="bd">
                  <div class="intro"><?=$row['intro']?><a href="article.php?id=<?=$row['id'];?>&type=<?=$row['type'];?>" class="more">&gt;&gt;阅读全文</a></div>
			 	</section>
			 	
			 </article>
<?php }?>
<!-- 文章列表-->
