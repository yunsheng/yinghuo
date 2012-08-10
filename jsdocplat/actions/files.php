<?php
require("../util/conn.php");
require("../util/log.php");
 if($_REQUEST["type"]=="upload"){
	$logItem=new LogItem();
	$logItem->addContent($_COOKIE["_nk_"],"上传了文件".$_FILES["file"]["name"]);
	echo "Upload: " . $_FILES["file"]["name"] . "<br />";
    echo "Type: " . $_FILES["file"]["type"] . "<br />";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
    echo "Stored in: " . $_FILES["file"]["tmp_name"];
	if ($_FILES["file"]["size"] < 2000000)
	{
		
		if ($_FILES["file"]["error"] > 0)
		{
			echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
			exit;
		}
		else
		{
			/**
			 * 保存并解压缩文件
			 */
			
			$uploadPath ="/yinghuo/doc/upload/".time().".zip";
			$extraPath = "/yinghuo/doc/temp/".time();
			copy($_FILES["file"]["tmp_name"],$uploadPath);
			$zip = new ZipArchive();
			$rs = $zip->open($uploadPath);
			$zip->extractTo($extraPath);
			$zip->close();
			if(file_exists($extraPath)){
				echo "<div id='J_path'>$extraPath</div>";
			}else{
				echo "fail";
			}
		}
	}
	else
	{
		echo "failzip";
		exit;
	}
}
/**/
?>
