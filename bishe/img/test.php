<?php
  require_once("/yinghuo/o/sql/conn.php");
  
  conn_query("update agency set AG_NAME='许文' where AG_ID=1001");
?>