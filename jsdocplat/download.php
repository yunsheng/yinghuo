<?php

$folder = $_REQUEST["folder"];
$RootDir = $_SERVER['DOCUMENT_ROOT'];
$savePath = $RootDir."/doc/jsdoc/$folder";
if($folder && file_exists($savePath)){
	include_once("util/phpzip.php");
	$archive = new PHPZip();
	$archive->ZipAndDownload($savePath);
}
?>