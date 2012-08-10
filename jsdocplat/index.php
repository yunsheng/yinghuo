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
                    <form id="J_addForm" action="createdoc.php" method="post">
                        <input type="hidden" name="id" value='<?php echo $did?>' />
                        <fieldset>
                            <legend>
                                	项目基本信息
                            </legend>
                            <p class="input-box">
                                <label>创建者：</label>
								<?php echo $author?>
                                <input type="hidden" name="author" class="input" value='<?php echo $author?>' />
                                <strong></strong>
                                
                            </p>
                            <p class="input-box">
                                <label>项目名称：</label>
                                <input type="text" name="title" class="input" value='<?php echo $title?>' />
                                <span class="input-tip"></span>
                                <strong>（2~30个字符）只能是数字、字母或汉字组成</strong>
                            </p>
                            <p class="input-box">
                                <label>项目代号：</label>
                                <input type="text" name="folder" class="input" value='<?php echo $folder?>' />
                                <span class="input-tip"></span>
                                <strong>（2个以上字符）用于存放该项目文档的文件夹名称,只能是字母数字或下划线，如xinpin_v1</strong>                          
                            </p>
                            <p class="input-box">
                                <label>源文件路径：</label>
                                <input type="text" name="path" class="input" value='<?php echo $path?>' />  
                                <span class="input-tip path-tip"></span>
                                <strong>方案1（开发机文件）：输入js源文件存放在开发机上的绝对路径，如 /home/xxx(用户名)/..或/home/a.tbcdn.cn/...</strong>
                                <strong>方案2（本地文件）：点击”本地文件“按钮上传，上传前需将js文件打包成zip格式（可包涵多个js文件）</strong>
                            </p>
                         
                            <p class="input-box">
                                <label>源文件后辍：</label>
                                <select name="source">
                                	<option value="0" <?php if($source=="0"){echo "selected";}?>>.js</option>
                                	<option value="1" <?php if($source=="1"){echo "selected";}?>>.source.js</option>
                                </select>
                                <strong>.source.js或.js，若选择.js会排除-min.js文件</strong>
                            </p>
                            <p class="input-box">
                                <label>文件编码：</label> 
                                <select name="encode">
                                	<option value="gbk" <?php if($encode=="gbk"){echo "selected";}?>>gbk</option>
                                	<option value="utf-8" <?php if($encode=="utf-8"){echo "selected";}?>>utf-8</option>
                                </select>
                            </p>
                            <p class="input-box">
                                <label>&nbsp;</label>
                                <input type="checkbox" name="commentonly" checked value="1" /> 只根据注释生成
                            </p>
                        </fieldset>
                        <?php 
                        	if($id){
                        ?>
                        <fieldset>
                            <legend>
                                文档信息
                            </legend>
                            <p >
                                <span>文档地址：</span><em id="J_docPath">http://bj.ued.taobao.net/doc/jsdoc/<?php echo $folder?>/ <a href="http://yinghuo.com/doc/<?php echo $folder?>/" target="_blank">查看文档</a></em>
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
            	 <label id="J_uploadBtn" for="file">上传本地文件</label><input type="file" name="file" id="J_uploadInput" hidefocus="true"/>
            </form>
         
            <script>
            	DOC.editForm();
            	DOC.uploadFile();
            </script>
<?php include_once("layout/foot.php");?>
