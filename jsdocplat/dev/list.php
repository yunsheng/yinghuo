<?php
require_once("util/conn.php");
require_once("util/islogin.php");
include_once("layout/head.php");

$section = $_REQUEST["section"];
$content = $_REQUEST["content"];
$mylist = $_REQUEST["mylist"];


$sql = "SELECT * FROM docitem";
if($content&&!$mylist){
	$sql.=" WHERE $section like '%$content%'";
}
if($mylist){
	$sql.=" WHERE author like '".$_COOKIE['_nk_']."'";
}
if($content&&$mylist){
	$sql.=" AND $section like '%$content%'";
}
//读取数据
$result = conn_select($sql);

?>
<div id="content">
    <div id="site-nav">
        <ul class="clearfix">
            <li>
                <a href="index.php">添加项目</a>
            </li>
            <li <?php if(!$mylist){?>class="current"<?php }?>>
                <a href="list.php">项目列表</a>
            </li>
            <li <?php if($mylist){?>class="current"<?php }?>>
                <a href="list.php?mylist=true">我的项目</a>
            </li>
        </ul>
    </div>
    <div class="search clearfix">
        <form>
            <label>
                <span><select name="section">
                <?php 
                	if(!$mylist){
                ?>
                <option value="author">创建者</option>
                <?php }?>
                
                <option value="title">项目名称</option>
                <option value="folder">项目代号</option>
                <option value="path">项目路径</option>
                </select></span>
              </label><label>
                <input class="txt" name="content" type="text"/>
            </label>
            
            <label>
                <input type="submit" class="btn" value="查询" />
            </label>
        </form>
    </div>
    <div class="item-list" id="J_itemList">
        <ul>
        	<?php 
        	foreach ($result as $row){
        	?>
        	<li>
                <a href="index.php?id=<?php echo $row['id'];?>" class="title"><?php echo $row['title'];?></a>
                <div class="folder hidden">
                    项目代号：<?php echo $row['folder'];?>
                </div>
                
                <div class="author">
                    创建人：<?php echo $row['author'];?>
                </div>
                <div class="date">
                   <?php echo $row['date'];?>
                </div>
                <a href="http://bj.ued.taobao.net/doc/jsdoc/<?php echo $row['folder'];?>/" class="view">查看文档</a>
                <a href="createdoc.php?id=<?php echo $row['id'];?>" class="refresh">生成</a>
                <a href='download.php?folder=<?php echo urlencode($row['folder'])?>'>下载</a>
                <a href="index.php?id=<?php echo $row['id'];?>" class="edit">编辑</a>
                <?php 
                	if($mylist){
                ?>
                <a href="deletedoc.php?id=<?php echo $row['id'];?>" class="del">删除</a>
                <?php }?>
            </li>
			
        	<?php 
        	}
        	?>
	
        </ul>
		
    </div>
</div>
<script>
DOC.removeDoc();
</script>
<?php include_once("layout/foot.php");?>
