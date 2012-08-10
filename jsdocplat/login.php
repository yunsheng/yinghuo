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
                            <p class="input-box">
                            <label for="username">用户名：</label>
                             <input type="text" name="usrname" class="input"  />
                             <span class="input-tip"></span>
                                 <strong></strong>
                                </p>
                             <p class="input-box">
                            <label for="pwd">密码：</label>
                                <input type="password" name="pwd" class="input" />
                            </label>
                           <span class="input-tip"></span>
                                 <strong></strong>
                             </p> 
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
