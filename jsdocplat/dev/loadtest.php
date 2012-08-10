<?php
$page = file_get_contents(__FILE__,"r");
preg_match_all("/(?<={{JS:).*(?=}})/U",$page,$result);
foreach($result[0] as $jf){
	$jsfiles .= ",$jf";
}
?>
