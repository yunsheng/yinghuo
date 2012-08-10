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
                    <form id="J_addusrForm" action="actions/usr.php" method="get">
                    	<input type="hidden" name="type" value="add"/>
                        <fieldset>
                            <legend>
                                	注册用户
                            </legend>
                            <p class="input-box">
                            <label>用户名： </label>
                                <input type="text" name="usrname" class="input"  />
                            <span class="input-tip"></span>
                                 <strong></strong>
                            </p>
                          
                            <p class="input-box">
                                  <label>密码：</label>
                                <input type="password" name="pwd" class="input" />
                             <span class="input-tip"></span>
                                 <strong></strong>
                            </p>
                            
                       
                          </fieldset>
                        <div class="op-area">
                            <input class="btn" type="submit" value="注册">
                        </div>
                       
                    </form>
                </div>
            </div>
            <script>
            	DOC.addUsr(true);
            </script>
<?php include_once("layout/foot.php");?>
