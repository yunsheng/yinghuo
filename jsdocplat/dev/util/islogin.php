<?php
if(!$_COOKIE["_nk_"]){
	$url = "login.php?redirect=".$_SERVER['REQUEST_URI'];
	header(sprintf("Location: %s", $url));	
}

?>