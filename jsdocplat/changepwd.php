<?php
require_once("util/conn.php");
include_once("layout/head.php");
?>

            <div id="content">
                <div id="site-nav">
                    <ul class="clearfix">
                        <li >
                            <a href="index.php">添加项目</a>
                        </li>
                        <li>
                            <a href="list.php">项目列表</a>
                        </li>
                        <li><a href="list.php?mylist=true">我的项目</a></li>
                    </ul>
                </div>
                <div class="add-form">
                    <form id="J_pwdForm" action="actions/usr.php" method="post">
                    	<input type="hidden" name="type" value="changepwd"/>
                        <fieldset>
                            <legend>
                                	修改密码
                            </legend>
                             <p class="input-box">
                            
                                <label for="oldpwd">旧密码：</label>
                                <input type="password" name="oldpwd" class="input" />
                                <span class="input-tip"></span>
                                 <strong></strong>
                            </p>
                            <p class="input-box">
                                <label for="pwd">密码：</label>
                                <input type="password" name="pwd" class="input" />
                                <span class="input-tip"></span>
                                 <strong></strong>
                            </p>
                            
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
<?php include_once("layout/foot.php");?>
