<?php
  $CSS_ARR=array("index"=>",bishe/css/index.css","grid"=>",bishe/css/grid.css","detail"=>",bishe/css/detail.css","map"=>",bishe/css/map.css");
  $CSS_PAGE=$CSS_ARR[$page];
 ?>	
<title>荧惑-毕业设计-<?=$title?></title>		
<meta charset="UTF-8" />
<meta name="author" content="dongzhu" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
<link type="image/x-icon" href="http://yinghuo.com/favicon.ico" rel="shortcut icon"/>		
<?php 
	$CSS_COMMON="http://yinghuo.com/??o/css/base.css,bishe/css/common.css";
	$CSS=$CSS_COMMON.$CSS_PAGE;
	echo "<link rel=\"stylesheet\" href=\"$CSS\" />";
 ?>
<script type="text/javascript"  src="http://yinghuo.com/??s/kissy/1.2.0/kissy-min.js,s/html5/html5.js,s/html5/respond.min.js,bishe/js/config.js"></script>
