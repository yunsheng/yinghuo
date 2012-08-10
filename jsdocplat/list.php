<?php
require_once("util/conn.php");
require_once("util/islogin.php");
include_once("layout/head.php");

$section = $_REQUEST["section"];
$content = $_REQUEST["content"];
$mylist = $_REQUEST["mylist"];
$order=$_REQUEST["order"];
$asc="ASC";
if(!$order){
	$order="date";
	$asc="DESC";
}
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
//排序
$sql.=" ORDER BY $order $asc";
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
  <div class="search ">
        <form>
        	 <input class="input fl" name="content" type="text"/>
              <span class=" select fl">
                	<select name="section" >
                <?php 
                	if(!$mylist){
                ?>
                <option value="author">创建者</option>
                <?php }?>
                
                <option value="title">项目名称</option>
                <option value="folder">项目代号</option>
                <option value="path">项目路径</option>
                </select>
               </span>
			  <input type="submit" class="btn fl" value="查询" />
           
         
        </form>
</div>
    <div class="item-list" id="J_itemList">
        <ul>
        	<li class="hd">
        		<span class="title item-first"><a href="list.php?order=title">项目名称</a></span>       		
        		<span class="folder"><a href="list.php?order=folder">代号</a></span>
        		<span class="author"><a href="list.php?order=author">创建人</a></span>
        		<span class="date"><a href="list.php">创建时间</a></span>
        		<span class="operation item-last">操作</span>
        	</li>
        	<?php 
        	foreach ($result as $row){
        	?>
        	<li>
              <span  class="title item-first"><a href="index.php?id=<?php echo $row['id'];?>"><?php echo $row['title'];?></a></span>  
              <span class="folder">
                    <?php echo $row['folder'];?>
                </span>
                
                <span class="author">
                   <?php echo $row['author'];?>
                </span>
                <span class="date">
                   <?php echo $row['date'];?>
                </span>
                <span class="operation item-last">
                <a href="http://yinghuo.com/doc/<?php echo $row['folder'];?>/" class="view" >查看文档</a>
                <a href="createdoc.php?id=<?php echo $row['id'];?>" class="refresh">生成</a>
                <a href='download.php?folder=<?php echo urlencode($row['folder'])?>'>下载</a>
                <a href="index.php?id=<?php echo $row['id'];?>" class="edit">编辑</a>
                <?php 
                	if($mylist){
                ?>
                <a href="deletedoc.php?id=<?php echo $row['id'];?>" class="del">删除</a>
                <?php }?>
                </span>
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
