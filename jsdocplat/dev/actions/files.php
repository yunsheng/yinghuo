<?php
require("../util/conn.php");
require("../util/log.php");
if($_REQUEST["type"]=="upload"){
	$logItem=new LogItem();
	$logItem->addContent($_COOKIE["_nk_"],"上传了文件".$_FILES["file"]["name"]);
	if (($_FILES["file"]["type"] == "application/zip")
	&& ($_FILES["file"]["size"] < 2000000))
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
			
			$uploadPath = "/var/www/jsdocplat/uploads/".time().".zip";
			$extraPath = "/var/www/jsdocplat/temp/".time();
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
