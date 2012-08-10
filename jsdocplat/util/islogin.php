<?php
$loginusr=$_COOKIE["_nk_"];
if(!$loginusr){
	$url = "login.php?redirect=".$_SERVER['REQUEST'];
	header(sprintf("Location: %s", $url));	
}

?>