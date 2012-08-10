<?php
require_once("util/conn.php");
include_once("layout/head.php");
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
                    </ul>
                </div>
                <div class="add-form">
                    <form id="J_pwdForm" action="actions/usr.php" method="get">
                    	<input type="hidden" name="type" value="changepwd"/>
                        <fieldset>
                            <legend>
                                修改密码
                            </legend>
                            <label>
                                <span>旧密码：</span>
                                <input type="password" name="oldpwd" class="txt"  />
                            </label>
                            <label>
                                <span>密码：</span>
                                <input type="password" name="pwd" class="txt" />
                            </label>
                            
                        </fieldset>
                        
                        <div class="op-area">
                            <input class="btn" type="submit" value="确定修改">
                        </div>
                    </form>
                </div>
            </div>
            <script>
            	DOC.changePwd();
            </script>
<?php include_once("foot.php");?>
