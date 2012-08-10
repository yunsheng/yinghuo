<?php
require_once("util/conn.php");
require_once("util/log.php");
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

$successvalidate = "success";//用于验证文档是否生成成功

//检查路径
function checkPath($p){
	if(!file_exists($p)){
		$error = "源文件路径错误！";
		$successvalidate = "wrong";
		return false;
	}else{
		return true;
	}
}


//是否只根据注释生成
if($commentonly=="1"){
		$paramn = " -n";
	}else{
		$paramn = "";
	
}

//创建、编辑、直接生成三种情况的检查
if(!$_REQUEST["id"]&&$author&&$title&&$folder&&checkPath($path)){
	$sql = "SELECT * FROM docitem WHERE folder like '$folder'";
	$result = conn_select($sql);
	if($result[0]){
		$error="项目代号已经被人用过啦，请返回修改一下吧！";
		$successvalidate = "wrong";
	}else{
		//保存数据
		$logItem=new LogItem();
		$logItem->addContent($agent,"添加了新项目：$title");
		conn_query("INSERT INTO docitem (author,title,folder,path,source,encode,date) VALUES ('$author','$title','$folder','$path','$source','$encode','$datenow')");
	}
		
}
else if($id&&$author&&$title&&$folder&&checkPath($path)){
	
	$sql = "SELECT * FROM docitem WHERE folder like '$folder'";
	$result = conn_select($sql);
	$row = $result[0];
	$newid = $row['id'];
   
	if($result[0] && $newid!=$id){
		$error="项目代号已被人用过啦，请返回修改一下吧！";
		$successvalidate = "wrong";
	}else{	
		$logItem=new LogItem();
		$logItem->addContent($agent,"编辑了项目(id-$id)$title");
		conn_query("UPDATE docitem SET author='$author', title='$title', folder='$folder', path='$path', source='$source', encode='$encode', date='$datenow' WHERE id=$id");
	}
	
}
else if($id){
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
		$successvalidate = "wrong";
	}else{
		$error = "参数不全，请返回重填！";
		$successvalidate = "wrong";
	}
}

//生成文档
if(!$error&&$path&&$folder){
	$savePath = "/var/www/doc/jsdoc/$folder";
	if($source=="0"){
		$exclude = "-min.js$";
	}elseif($source=="1"){
		$exclude = "[^\.]{1}[\w]{6}\.js$|/[\w]{1,6}\.js$";
	}
	$logItem=new LogItem();
	$logItem->addContent($agent,"生成了项目 $title 的文档");
	//创建文档
	
	exec("java -jar /usr/local/lib/jsdoc-toolkit/jsrun.jar /usr/local/lib/jsdoc-toolkit/app/run.js -a -r$paramn -e=$encode -E=\"$exclude\" -t=/usr/local/lib/jsdoc-toolkit/templates/outline $path -d=$savePath");
	 
	$success = "生成成功，现在去<a href='http://bj.ued.taobao.net/doc/jsdoc/$folder/'>查看文档</a>吧！<br/>点击<a href='download.php?folder=".urlencode($folder)."'>这里下载文档</a>";
	$successvalidate = "success";
}
?>
 
<div class="<?php echo $successvalidate ?>">
<?php
if($success){
	echo $success;
}
if($error){
	echo $error;
}
?>
</div>
