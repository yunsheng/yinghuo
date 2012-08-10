<?php
require_once("util/conn.php");
require_once("util/islogin.php");
include_once("layout/head.php");
if($_REQUEST["id"]){
	$id = $_REQUEST["id"];

	//读取数据
	$sql = "SELECT * FROM docitem WHERE id=$id";
	$result = conn_select($sql);
	$row = $result[0];
	$did=$_REQUEST["id"];
	$author = $row['author'];
	$title = $row['title'];
	$folder = $row['folder'];
	$path = $row['path'];
	$source = $row['source'];
	$encode = $row['encode'];
	

}else{
	$author = $_COOKIE["_nk_"];
}
?>
         
            <div id="content">
                <div id="site-nav">
                    <ul class="clearfix">
                        <li class="current">
                            <a href="index.php">添加项目</a>
                        </li>
                        <li>
                            <a href="list.php">项目列表</a>
                        </li>
                        <li>
                <a href="list.php?mylist=true">我的项目</a>
            </li>
                    </ul>
                </div>
                <div class="add-form">
                    <form id="J_addForm">
                        <input type="hidden" id="id" name="id" value='<?php echo $did?>' />
                        <fieldset>
                            <legend>
                                项目基本信息
                            </legend>
                            <p>
                                <span>创建者：</span>
                                <input type="text"  id="author" class="txt" value='<?php echo $author?>' disabled="true" />
                                <input type="hidden" name="author" class="txt" value='<?php echo $author?>' /><strong></strong>
                            </p>
                            <p>
                                <span>项目名称：</span>
                                <input type="text" id="title" name="title" class="txt" value='<?php echo $title?>' />
                            </p>
                            <p>
                                <span>项目代号：</span>
                                <input type="text" id="folder" name="folder" class="txt" value='<?php echo $folder?>' /><strong>用于存放该项目文档的文件夹名称,只能是字母数字或下划线，如xinpin_v1</strong>
                            </p>
                            <p>
                                <span>源文件路径：</span>
                                <input type="text" id="path" name="path" class="txt" value='<?php echo $path?>' /> <a href="#" id="J_uploadBtn">上传本地文件</a>
                                <strong>js源文件存放在开发机上的绝对路径，一般为/home/xxx(用户名)/..或/home/a.tbcdn.cn/...<br/>
                                可上传zip文件
                                </strong>
                            </p>
                            <p>
                                <span>&nbsp;</span>
                                <input type="checkbox" id="commentonly" name="commentonly" checked value="1" /> 只根据注释生成
                            </p>
                            <p>
                                <span>源文件后辍：</span>
                                <select name="source" id="source">
                                	<option value="0" <?php if($source=="0"){echo "selected";}?>>.js</option>
                                	<option value="1" <?php if($source=="1"){echo "selected";}?>>.source.js</option>
                                </select>
                                <strong>.source.js或.js，若选择.js会排除-min.js文件</strong>
                            </p>
                            <p>
                                <span>文件编码：</span>
                                <select name="encode" id="encode">
                                	<option value="gbk" <?php if($encode=="gbk"){echo "selected";}?>>gbk</option>
                                	<option value="utf-8" <?php if($encode=="utf-8"){echo "selected";}?>>utf-8</option>
                                </select>
                            </p>
                        </fieldset>
                        <?php 
                        	if($id){
                        ?>
                        <fieldset>
                            <legend>
                                文档信息
                            </legend>
                            <p>
                                <span>文档地址：</span><em id="J_docPath">http://bj.ued.taobao.net/doc/jsdoc/<?php echo $folder?>/ <a href="http://bj.ued.taobao.net/doc/jsdoc/<?php echo $folder?>/" target="_blank">查看文档</a></em>
                            </p>
                        </fieldset>
                        <?php 
                        	}
                        ?>
                        <div class="op-area">
                            <input class="btn" type="submit" value="保存并生成文档">
                        </div>
                    </form>
                </div>
			</div>
            <form enctype="multipart/form-data"  action="actions/files.php?type=upload" id="J_hiddenFileForm" class="upload-file" method="post">
            	<input type="file" name="file" id="J_uploadInput"/>
            </form>
           
            <script>
            	DOC.uploadFile();
            </script>

<?php include_once("layout/foot.php");?>
