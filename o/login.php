<?php  require_once("/yinghuo/o.php"); ?>
<!DOCTYPE html>
<html>  
    <head>
        <meta charset="gbk">
        <title>��½</title>
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
                        <!--��¼�Ĵ�����Ϣ����-->
                        <!--��׼��¼��-->
                        <div id="J_Static" class="static safe_login">
                           
                            <form id="J_StaticForm" action="<?=$serverhost?>/o/loginback.php"
                            method="post">
                                <div class="field">
                                    <label for="username_1">
                                       	 �˻���
                                    </label>
                                    <span class="ph-label">
                                       
                                    </span>
                                    <input name="username" id="username_1" class="login-text J_UserName" value="" maxlength="32" tabindex="1" type="text">
                                </div>
                                <div class="field">
                                    <label id="password-label">
                                       		 �ܡ���
                                    </label>
                                   
                                        <input aria-labelledby="password-label" name="password" id="password_1" class="login-text" maxlength="10000" tabindex="2" type="password">
                                    
                                    
                                    
                                </div>
                                
                             <div class="submit">
                                 <input type="hidden" name="redirect" value="<?=$_GET["redirect"]?>">
                                 <input type="hidden" name="callback" value="<?=$_GET["callback"]?>">
                                    <button type="submit" class="J_Submit" tabindex="5">
                                      	  ��¼
                                    </button>
                               </div>
                            </form>
                        </div>
                        <!--��¼�ű�-->
                    </div>
                </div>
            </div>
        </div>
    </body>

</html>