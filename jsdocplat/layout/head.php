<!doctype html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>JSDoc文档管理平台</title>
        <script type="text/javascript" src="http://yinghuo.com/??s/kissy/1.1.7/kissy-min.js">
        </script>
        <script type="text/javascript" src="assets/jsdocplat.js">
        </script>
        <link rel="stylesheet" type="text/css" href="assets/jsdocplat.css" />
    </head>
    <body>
        <div class="page-wrap">
            <div id="header">
                <a href="index.php"><h1 id="logo">JSDoc文档管理平台</h1></a>
                <?php
                	if($_COOKIE["_nk_"]){
                ?>
                	HI! <?php echo $_COOKIE["_nk_"];?>
                <?php
                	}
                ?>
				<?php 
                	if($_COOKIE["_nk_"]=="yh"){
                ?>
                	<a href="addusr.php">编辑用户</a>
                	<a href="showlog.php">查看日志</a>
                <?php
                	}
                	if($_COOKIE["_nk_"]){
                ?>
                	<a href="changepwd.php">修改密码</a>
                	<a href="actions/usr.php?type=logout">退出</a>
                <?php
                	}
                ?>
            </div>

                
