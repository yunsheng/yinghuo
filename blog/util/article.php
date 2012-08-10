<?php
	require_once("../sql/article.php");
	$ARTICLETYPE=array("0"=>"养生保健","1"=>"网事悠游","2"=>"信手撷珍","3"=>"流水淙淙");
	$article=new Article();
	$articleList=null;
	$articleItem=null;
	$article_id=$_GET['id'];
	$article_type=$_GET['type'];
	if($article_id!=""){
		$articleItem=$article->getArticleById($article_id);
	}else{
		$articleList=$article->getListByType(0,5,$article_type);
	}
	if($articleList){
		$title=$ARTICLETYPE[$article_type];		
		//加载文章列表
		$mods="mods/article/list.php";
	}else if($articleItem){
		//加载文章详情
		$title=$articleItem['title'];
		$mods="mods/article/detail.php";
	}else{
		$mods="mods/article/error.php";
	}
 ?>