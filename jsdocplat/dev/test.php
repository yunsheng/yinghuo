<?php 

require_once("util/conn.php");
require_once("util/log.php");
$sql = "SELECT * FROM docitem WHERE folder like 'baoxianPostip'";
$result = conn_select($sql);
    
echo $result[0];
$row = $result[0];
$f = $row['folder'];
$id = $row['id'];
echo $f;
echo $id;
?>
