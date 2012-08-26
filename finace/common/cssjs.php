<?php
  require_once("/yinghuo/o.php");
  $CSS_ARR=array("index"=>",finace/css/index.css","article"=>",finace/css/article.css");
  $CSS_PAGE=$CSS_ARR[$page];
 ?>	
<meta charset="UTF-8" />
<title><?=$title?></title>
<meta name="author" content="blog" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link type="image/x-icon" href="http://yinghuo.com/favicon.ico" rel="shortcut icon"/>		
<?php 
	$CSS_COMMON="http://yinghuo.com/??o/css/base.css,finace/css/common.css";
	$CSS=$CSS_COMMON.$CSS_PAGE;
	echo "<link rel=\"stylesheet\" href=\"$CSS\" />";
 ?>
<script type="text/javascript"  src="http://yinghuo.com/??s/yui/3.5.0/build/yui/yui-min.js,s/html5/html5.js,finace/js/config.js"></script>
<base target="_self" />