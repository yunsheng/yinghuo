<?php
include_once("util/conn.php");
require_once("util/islogin.php");
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
                                添加用户
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
                            <input class="btn" type="submit" value="添加">
                        </div>
                    </form>
                    <form id="J_deleteusrForm" action="actions/usr.php" method="get">
                    	<input type="hidden" name="type" value="add"/>
                        <fieldset>
                            <legend>
                                删除用户
                            </legend>
                           <p class="input-box">
                            <label>用户名： </label>
                                <input type="text" name="usrname" class="input"  />
                            <span class="input-tip"></span>
                                 <strong></strong>
                            </p>
                            
                        </fieldset>
                        
                        <div class="op-area">
                            <input class="btn" type="submit" value="删除">
                        </div>
                    </form>
                </div>
            </div>
            <script>
            	DOC.addUsr();
            	DOC.deleteUsr();
            </script>
<?php include_once("layout/foot.php");?>
