
<!--��������-->
 <article class="article article_min">
 	<aside class="J_operate operate operate2">			
		<a class="J_Trigger trigger"></a>
		<div class="con">
			<a class="J_Edit  button " pageid="<?=$id;?>">�޸�</a>
			<a class="J_Del  button " pageid="<?=$id;?>">ɾ��</a>
			</div>
	</aside>
 	<header class="hd">
 		<h1 class="title"><?=$title;?></h1>
 		<div class="intro dn"><?=$articleItem['intro']?></div>
 		
 		<time class="time">
 			<?=substr($articleItem['time'],0,7);?>
 			<span class="date">
 				<?=substr($articleItem['time'],8,2);?>
 			</span>
 			<span class="hm">
 				<?=substr($articleItem['time'],11,5);?>
 			</span>
 			</time>
 	</header>
 	<section class="bd">
       <?=$articleItem['paragram'];?>
 	</section>
 	 
 </article>
 <!-- ��������-->
