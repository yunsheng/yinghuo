<?php
require_once("util/conn.php");
require_once("util/log.php");
$RootDir = $_SERVER['DOCUMENT_ROOT'];
$id = $_REQUEST["id"];
$author = $_REQUEST["author"];
$title = $_REQUEST["title"];
$folder = $_REQUEST["folder"];
$path = $_REQUEST["path"];
$source = $_REQUEST['source'];
$encode = $_REQUEST['encode'];
$datenow = date("Y-m-d H:i:s");
$agent = $_COOKIE["_nk_"];
$commentonly = $_REQUEST["commentonly"];
//是否只根据注释生成
if($commentonly=="1"){
	$paramn = " -n";
}else{
	$paramn = "";
}
//检查路径
function checkPath($p){
	if(!file_exists($p)){
		$error = "源文件路径错误！";
		return false;
	}else{
		return true;
	}
}
if(!$_REQUEST["id"]&&$author&&$title&&$folder&&checkPath($path)){
	$sql = "SELECT * FROM docitem WHERE folder like '$folder'";
	$result = conn_select($sql);
	if($result[0]){
		$error="项目代号已经被人用过啦，请返回修改一下吧！";
	}else{
		//保存数据
		$logItem=new LogItem();
		$logItem->addContent($agent,"添加了新项目：$title");
		conn_query("INSERT INTO docitem (author,title,folder,path,source,encode,date) VALUES ('$author','$title','$folder','$path','$source','$encode','$datenow')");
	}
}elseif($id&&$author&&$title&&$folder&&checkPath($path)){
	//编辑数据
	
	$logItem=new LogItem();
	$logItem->addContent($agent,"编辑了项目(id-$id)$title");
	conn_query("UPDATE docitem SET author='$author', title='$title', folder='$folder', path='$path', source='$source', encode='$encode', date='$datenow' WHERE id=$id");
}elseif($id){
	$sql = "SELECT * FROM docitem WHERE id=$id";
	$result = conn_select($sql);
	$row = $result[0];
	
	$title=$row['title'];
	$author = $row['author'];
	$path = $row['path'];
	$folder = $row['folder'];
	$source = $row['source'];
	$encode = $row['encode'];
	
}else{
	if($path&&!checkPath($path)){
		$error = "源文件路径错误！";
	}else{
		$error = "参数不全，请返回重填！";
	}
}

if(!$error&&$path&&$folder){
	$savePath = $RootDir."/doc/jsdoc/$folder";
	$jarPath=$RootDir."/s/tools/jsdoc/jsrun.jar";
	$runPath=$RootDir."/s/tools/jsdoc/app/run.js";
	$tempPath=$RootDir."/s/tools/jsdoc/templates/outline";
	if($source=="0"){
		$exclude = "-min.js$";
	}elseif($source=="1"){
		$exclude = "[^\.]{1}[\w]{6}\.js$|/[\w]{1,6}\.js$";
	}
	$logItem=new LogItem();
	$logItem->addContent($agent,"生成了项目 $title 的文档");
	//创建文档
	try{
			exec("java -jar $jarPath $runPath -a -r -e=$encode -E=\"$exclude\" -t=$tempPath $path -d=$savePath");
			$success = "生成成功，现在去<a href='http://yinghuo.com/doc/jsdoc/$folder/'>查看文档</a>吧！<br/>点击<a href='download.php?folder=".urlencode($folder)."'>这里下载文档</a>";
		}catch(Exception $e){
			$error="生成文档失败:".$e;
		}
}
include_once("layout/head.php");
?>
<div id="content" style="height: 200px; padding-top:40px; text-align: center; font-size: 16px;">
<div id="site-nav">
<ul class="clearfix">
		<li><a href="index.php">添加项目</a></li>
	<li><a href="list.php">项目列表</a></li>
	<li class="current"><a href="list.php?mylist=true">我的项目</a></li>
</ul>
</div>
<?php
if($success){
	echo $success;
}
if($error){
	echo $error;
}
?></div>
<?php
include_once("layout/foot.php");
?>