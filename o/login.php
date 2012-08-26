<?php  require_once("/yinghuo/o.php"); ?>
<!DOCTYPE html>
<html>  
    <head>
        <meta charset="utf-8">
        <title>登陆</title>
        <link rel="stylesheet" href="<?=$serverhost?>/o/css/login.css">
    </head>
    
    <body>
        <div id="page2">
            <div id="content">
                <div id="J_LoginBox" class="login-box simple no-longlogin no-dynamic  no-reg module-static">
                    <div class="bd">
                        <div id="J_Message" style="display:none;" class="login-msg msg">
                            <p class="error">
                            </p>
                        </div>
                        <!--登录的错误信息结束-->
                        <!--标准登录框-->
                        <div id="J_Static" class="static safe_login">
                           
                            <form id="J_StaticForm" action="<?=$serverhost?>/o/loginback.php"
                            method="post">
                                <div class="field">
                                    <label for="username_1">
                                       	 账户名
                                    </label>
                                    <span class="ph-label">
                                       
                                    </span>
                                    <input name="username" id="username_1" class="login-text J_UserName" value="" maxlength="32" tabindex="1" type="text">
                                </div>
                                <div class="field">
                                    <label id="password-label">
                                       		 密　码
                                    </label>
                                   
                                        <input aria-labelledby="password-label" name="password" id="password_1" class="login-text" maxlength="10000" tabindex="2" type="password">
                                    
                                    
                                    
                                </div>
                                
                             <div class="submit">
                                 <input type="hidden" name="redirect" value="<?=$_GET["redirect"]?>">
                                 <input type="hidden" name="callback" value="<?=$_GET["callback"]?>">
                                    <button type="submit" class="J_Submit" tabindex="5">
                                      	  登录
                                    </button>
                               </div>
                            </form>
                        </div>
                        <!--登录脚本-->
                    </div>
                </div>
            </div>
        </div>
    </body>

</html>