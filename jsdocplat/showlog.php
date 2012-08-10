<?php
require_once("util/conn.php");
require_once("util/islogin.php");
require_once("util/log.php");

$logItem = new LogItem();
$logList = $logItem->getList(0,40);

include_once("layout/head.php");
?>
<div id="content">
<table width="95%" style="margin:0 auto;">
	<tr><td>时间&操作</td><td>用户信息</td></tr>
	<?php 
	foreach($logList as $log){
	?>
	<tr>
		<td style="border-top:solid 1px #ccc; padding:3px;"><?php echo $log["time"];?><br/><?php echo $log["content"];?></td>
		<td style="border-top:solid 1px #ccc; padding:3px;"><?php echo $log["name"];?></td>
	</tr>	
	<?php
	}
	?>	
</table>

</div>


<?php 
include_once("layout/foot.php");

?>