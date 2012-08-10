<!DOCTYPE html>
<html lang="zh-cn">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<title>迟伤</title>
		<meta name="description" content="" />
		<meta name="generator" content="Studio 3 http://aptana.com/" />
		<meta name="author" content="dongzhu" />
		<meta name="viewport" content="width=device-width; initial-scale=1.0" />
		<link rel="shortcut icon" href="http://chishang.github.com/img/favicon.ico" />
		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
		<link rel="stylesheet" href="../css/base.css" />
		<link rel="stylesheet" href="../css/jsdoc.css" />
		<base target="_blank" />
	</head>
	<body>
		 <div id="jsdoc-page">
		 	<header>jsdoc 文档生成</header>
		 	<section>
		 		<form action="action/createdoc.php" method="post">
		 			<fieldset>
                            <legend>
                                	文档基本信息
                            </legend>
                            
                            <p class="input-box">
                                <label>文档名称：</label>
                                <input type="text" name="title" class="input" value='<?php echo $title?>' />
                                <span class="input-tip"></span>
                                <strong>（2~30个字符）只能是数字、字母或汉字组成</strong>
                            </p>
                           
                            <p class="input-box">
                                <label>上传文件：</label>
                                <input type="text" name="path" class="input" value='<?php echo $path?>' />  
                                <span class="input-tip path-tip"></span>
                                <strong>点击”本地文件“按钮上传，上传前需将js文件打包成zip格式（可包涵多个js文件）</strong>
                            </p>
                         
                            <p class="input-box">
                                <label>源文件后辍：</label>
                                <select name="source">
                                	<option value="0" <?php if($source=="0"){echo "selected";}?>>.js</option>
                                	<option value="1" <?php if($source=="1"){echo "selected";}?>>.source.js</option>
                                </select>
                                <strong>.source.js或.js，若选择.js会排除-min.js文件</strong>
                            </p>
                            <p class="input-box">
                                <label>文件编码：</label> 
                                <select name="encode">
                                	<option value="utf-8" <?php if($encode=="utf-8"){echo "selected";}?>>utf-8</option>
                                	<option value="gbk" <?php if($encode=="gbk"){echo "selected";}?>>gbk</option>
                                  </select>
                            </p>
                            <p class="input-box">
                                <label>&nbsp;</label>
                                <input type="checkbox" name="commentonly" checked value="1" /> 只根据注释生成
                            </p>
                        </fieldset>
                         <div class="op-area">
                            <input class="btn" type="submit" value="保存并生成文档">
                        </div>
		 		</form>
		 	</section>
		 	 <form enctype="multipart/form-data"  action="files.php?type=upload" id="J_hiddenFileForm" class="upload-file" method="post">
            	 <label id="J_uploadBtn" for="file">上传本地文件</label><input type="file" name="file" id="J_uploadInput" hidefocus="true"/>
            </form>
		 </div>
	</body>
</html>