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
                    <form id="J_loginForm" action="actions/usr.php" method="get">
                    	<input type="hidden" name="type" value="login"/>
                    	<input type="hidden" name="redirect" value="<?php echo $_REQUEST["redirect"];?>"/>
                        <fieldset>
                            <legend>
                                用户登录
                            </legend>
                            <label>
                                <span>用户名：</span>
                                <input type="text" name="usrname" class="txt"  />
                            </label>
                            <label>
                                <span>密码：</span>
                                <input type="password" name="pwd" class="txt" />
                            </label>
                            
                        </fieldset>
                        
                        <div class="op-area">
                            <input class="btn" type="submit" value="登录"> <a href="reg.php">注册新用户</a>
                        </div>
                    </form>
                </div>
            </div>
            <script>
            	DOC.usrLogin();
            </script>
<?php include_once("layout/foot.php");?>
