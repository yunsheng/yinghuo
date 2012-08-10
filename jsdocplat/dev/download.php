<?php
include_once("util/phpzip.php");
$folder = $_REQUEST["folder"];
$savePath = "/var/www/doc/jsdoc/$folder";
if($folder){
	$archive = new PHPZip();
	$archive->ZipAndDownload($savePath);
}
?>