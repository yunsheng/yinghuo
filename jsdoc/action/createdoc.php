<?php
$RootDir = $_SERVER['DOCUMENT_ROOT'];
$folder = $_REQUEST["folder"];
$path = $_REQUEST["path"];
$encode = $_REQUEST['encode'];
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

	$savePath = $RootDir."/doc/jsdoc/$folder";
	$jarPath=$RootDir."/jar/jsrun.jar";
	$runPath=$RootDir."/jar/app/run.js";
	$tempPath=$RootDir."/jar/templates/outline";
	//创建文档
	try{
			exec("java -jar $jarPath $runPath -a -r -e=$encode -E=\"$exclude\" -t=$tempPath $path -d=$savePath");
			$success = "生成成功，现在去<a href='doc/$folder/'>查看文档</a>吧！<br/>点击<a href='download.php?folder=".urlencode($folder)."'>这里下载文档</a>";
		}catch(Exception $e){
			$error="生成文档失败:".$e;
		}
?>
