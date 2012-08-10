/**
 * @fileoverview  文档生成平台
 * @author diji
 */
/**
 * @class 平台相关功能
 * @static
 */
var DOC = {};
(function(S){
	var D = S.DOM, E = S.Event;
	/**
	 * 通过正则表达式验证表单
	 * @function validReg
	 * @param {String} name input的name值
	 * @param {Reg} reg 要验证的正则
	 * @param {DOM Node} form 所在表单对象
	 * @return {Boolean} 验证结果，通过为true
	 */
	DOC.validReg = function(name,reg,form){
		var input = D.get("input[name='"+name+"']",form);
		return reg.test(input.value);
	}
	
	/**
	 * 表单输入验证
	 * @function inputCheck
	 * @param name input的name属性
	 * @param reg 正则表达式
	 * @param form input所在form表单
	 * @mes 错误提示信息
	 */
	DOC.inputCheck=function(name,reg,form,mes){
		S.use("sizzle",function(){
		var _mes=mes,
			node=D.get("input[name='"+name+"']",form);
			// 获得焦点
			E.on(node,'focus',function(e){
				var target=e.currentTarget,
					inputBox=D.parent(target);
				DOC.resetInputBox(inputBox,'reset',_mes);
				D.addClass(target,'focus');
			});
			// 失去焦点
			E.on(node,'blur',function(e){
				var target=e.currentTarget,
					inputBox=D.parent(target),
					inputTip=D.get('.input-tip',inputBox),
					isValid=DOC.validReg(name,reg,form);					
				if(!isValid){
						DOC.resetInputBox(inputBox,'error',_mes);
					}else{
						DOC.resetInputBox(inputBox,'reset',_mes);
					}
				
				D.removeClass(target,'focus');
			});
		});
	}
	/*
	 * 改变input-box状态
	 * @function resetInputBox
	 * @param box input的parent
	 * @param action 表单状态
	 * @param mes  信息
	 */
	DOC.resetInputBox=function(box,action,mes){
	 
		var _box=box,
			_mes=mes,
			_inputTip=D.get('.input-tip',_box),
			error=function(){
				D.addClass(_box,'error-box');
				D.html(_inputTip,_mes);
			},
			right=function(){
				D.html(_inputTip,_mes);
				D.addClass(_box,'right-box');
			},
			reset=function(){
				D.removeClass(_box,'error-box');
				D.removeClass(_box,'right-box');
			};
		switch(action){
			case "error": 
				 	error(); break;
			case "right":
					right(); break;
			case "reset":
					reset(); break;
			default:
					reset(); break;
		}		 
	}
	/**
	 * 添加和编辑项目页表单验证
	 * @function editForm
	 */
	DOC.editForm = function(){
		S.use("sizzle",function(){
			var form = D.get("#J_addForm"),
				input=D.query(".input"),
				//项目名称
				otitle={
					name:'title',
					reg:/^[\u4e00-\u9fa5\da-zA-Z]{2,30}$/,
					mes:"项目名称格式有误"
				},
				//项目代号
				ofolder={
					name:'folder',
					reg:/^[a-zA-Z]+[a-zA-Z0-9_]+$/,
					mes:"项目代号格式有误"
				},
				//源文件路径
				opath={
					name:'path',
					reg:/^\//,
					mes:"源文件路径不合法"
				};		
				DOC.inputCheck(otitle.name,otitle.reg,form,otitle.mes);
				DOC.inputCheck(ofolder.name,ofolder.reg,form,ofolder.mes);
				DOC.inputCheck(opath.name,opath.reg,form,opath.mes);
			E.on(form,"submit",function(e){
				//项目名称
				var titleBox=D.parent(D.get("input[name='"+otitle.name+"']",form));
				if(!DOC.validReg(otitle.name,otitle.reg,form)){
					DOC.resetInputBox(titleBox,'error',otitle.mes);
					e.halt();
					 
				};
				//项目代号
				var folderBox=D.parent(D.get("input[name='"+ofolder.name+"']",form));
				if(!DOC.validReg(ofolder.name,ofolder.reg,form)){
					DOC.resetInputBox(folderBox,'error',ofolder.mes);
					e.halt();
					 
				};
				//源文件路径
				var pathBox=D.parent(D.get("input[name='"+opath.name+"']",form));
				if(!DOC.validReg(opath.name,opath.reg,form)){
					DOC.resetInputBox(pathBox,'error',opath.mes);
					e.halt();
					 
				};
			});
			
		});
	}
	/**
	 * 上传压缩文件
	 * @function uploadFile
	 */
	DOC.uploadFile = function(){
		S.use("sizzle",function(){
			var link = D.get("#J_uploadBtn"), 
				uploadForm=D.get("#J_hiddenFileForm"),
				uploadInput = D.get("input",uploadForm),
				pathInput=D.get("input[name='path']"),
				pathBox=D.parent(pathInput),
				ifr = D.create('<iframe id="J_tempIfr" name="J_tempIfr" class="hidden"/>');
			E.on(link,"click",function(e){
				e.halt();
				//uploadInput.focus();
				uploadInput.select();
			});
			//绑定选择文件动作
			E.on(uploadInput,"change",function(e){
				var tar = e.target,
					path;
				D.append(ifr,D.get("body"));
				D.attr(uploadForm,"target","J_tempIfr");
				//绑定回调事件	
				E.on(ifr,"load",function(e){
					var ifrDoc = ifr.contentWindow.document,
					txt = D.get("#J_path",ifrDoc);
					if(txt){
						path=txt.innerHTML;
						pathInput.value=path;
					}else{
						DOC.resetInputBox(pathBox,'error','上传文件失败');
						pathInput.value="";
					}
					E.remove(ifr);
				});
				uploadForm.submit();
			});
		});
	}
	/**
	 * 删除文档
	 * @function removeDoc
	 */
	DOC.removeDoc = function(){
		S.use("sizzle",function(){
			var dels = D.query("#J_itemList a.del");
			E.on(dels,"click",function(e){
				e.halt();
				if(confirm("真的要删除这个文档么？")){
					var del = this, 
						url=D.attr(del,"href"),
						li=D.parent(del,"li");
					S.io.get(url,function(){
						D.remove(li);
					});
				}	
			});
		});
	}
	/**
	 * 用户登录页面用的表单校验
	 * @function usrLogin
	 */
	DOC.usrLogin = function(){
		S.use("sizzle",function(){
			var form = D.get("#J_loginForm"), 
				name = D.get("input[name='usrname']",form), 
				nameBox=D.parent(name),
				pwd = D.get("input[name='pwd']",form),
				pwdBox=D.parent(pwd);
				DOC.inputCheck("usrname",/.+/,form,"用户名不能为空");
			 	DOC.inputCheck("pwd",/.+/,form,"密码不能为空");
			 	//检测用户名是否存在
			E.on(name,"blur",function(){
				if(!name.value){
					DOC.resetInputBox(nameBox,'error','用户名不能为空');
				}
				else{
					S.io.get(D.attr(form,"action"),
					{usrname:name.value,type:"checkname"},
					function(data){
						 data=S.JSON.parse(data);
						if(data.success){
							 DOC.resetInputBox(nameBox,'right','');
						}
						else{
						DOC.resetInputBox(nameBox,'error','用户名不存在');
						}
					});
				}
				
			});
			//表单提交
			E.on(form,"submit",function(e){
				e.halt();
				if(!name.value){
					DOC.resetInputBox(nameBox,'error','用户名不能为空');					
				}
				if(!pwd.value){
					DOC.resetInputBox(pwdBox,'error','密码不能为空');
				}
				if(name.value&&pwd.value){
					S.io.get(D.attr(form,"action"),
					{usrname:name.value,pwd:pwd.value,type:"login"},
					function(data){
						if(data.indexOf("fail")>-1){
							 DOC.resetInputBox(pwdBox,'error','密码错误');
						}
						else{
						 	location.href="index.php";
						}
					});
					
				}
			});
		});
	}
	/**
	 * 添加用户
	 * @function addUsr
	 * @param {Boolean} isReg 是否是注册
	 */
	DOC.addUsr = function(isReg){
		S.use("sizzle",function(){
			var form = D.get("#J_addusrForm"),
			 	name = D.get("input[name='usrname']",form),
			  	nameBox=D.parent(name),
				pwd = D.get("input[name='pwd']",form),
				pwdBox=D.parent(pwd);
				DOC.inputCheck("usrname",/.+/,form,"用户名不能为空");
			 	DOC.inputCheck("pwd",/.+/,form,"密码不能为空");
			//检测用户名是否存在
			E.on(name,"blur",function(){
				if(!name.value){
					DOC.resetInputBox(nameBox,'error','用户名不能为空');
				}
				else{
					S.io.get(D.attr(form,"action"),
					{usrname:name.value,type:"checkname"},
					function(data){
					    data=S.JSON.parse(data);
						if(data.success){
							DOC.resetInputBox(nameBox,'error',data.mes); 
						}
						else{
							DOC.resetInputBox(nameBox,'right',data.mes);
						}
					});
				}
				
			});
			//表单提交
			E.on(form,"submit",function(e){
				e.halt();
				if(!name.value){
					DOC.resetInputBox(nameBox,'error','用户名不能为空');
				}
				if(!pwd.value){
					DOC.resetInputBox(pwdBox,'error','密码不能为空');
				}
				if (name.value && pwd.value&&!isReg) {
					S.io.get(D.attr(form,"action"),
					{usrname:name.value,pwd:pwd.value,type:"add"},
					function(data){
						 data=S.JSON.parse(data);
						if(data.success){
							alert("添加成功！");
						}
						else{
						DOC.resetInputBox(nameBox,'error','用户名已存在,添加失败');
						}
					});
				}
				if (name.value && pwd.value&&isReg) {
					S.io.get(D.attr(form,"action"),
					{usrname:name.value,pwd:pwd.value,type:"reg"},
					function(data){
						 data=S.JSON.parse(data);
						if(data.success){
							alert("注册成功！");
							location.href="index.php";
						}
						else{
							DOC.resetInputBox(nameBox,'error','用户名已存在');
						}
					});
				}
			});
		});
	}
	/**
	 * 删除用户
	 * @function deleteUsr
	 */
	DOC.deleteUsr = function(){
		S.use("sizzle",function(){
			var form = D.get("#J_deleteusrForm"),
				name = D.get("input[name='usrname']",form);
			E.on(form,"submit",function(e){
				if(!name.value)alert("请输入用户名！");
				e.halt();
				if (name.value && confirm("真的要删除用户"+name.value)) {
					S.io.get(D.attr(form,"action"),
					{usrname:name.value,type:"delete"},
					function(data){
						data=S.JSON.parse(data);
						if(data.success){
							alert("删除成功！");
						}else{
							alert('该用户不存在');
						}
					});
				}
			});
		});
	}
	/**
	 * 修改密码
	 * @function changePwd
	 */
	DOC.changePwd = function(){
		S.use("sizzle",function(){
			var form = D.get("#J_pwdForm"), 
				old = D.get("input[name='oldpwd']",form),
				oldInputBox=D.parent(old),
			 	pwd = D.get("input[name='pwd']",form),
			 	pwdInputBox=D.parent(pwd);
			 	DOC.inputCheck("oldpwd",/.+/,form,"旧密码不能为空");
			 	DOC.inputCheck("pwd",/.+/,form,"新密码不能为空");
			E.on(form,"submit",function(e){
				e.halt();
				if(!old.value){
					DOC.resetInputBox(oldInputBox,'error',"旧密码不能为空");
				};
				if(!pwd.value){
					DOC.resetInputBox(pwdInputBox,'error',"新密码不能为空");
				};
				
				if (old.value&&pwd.value) {
					S.io.get(D.attr(form,"action"),
					{oldpwd:old.value,pwd:pwd.value,type:"changepwd"},
					function(data){
						data=S.JSON.parse(data);
						if(data.success){
							D.html(form,"密码修改成功");
						}else{
							DOC.resetInputBox(oldInputBox,'error',"旧密码错误");
						}
					});
				}
			});
		});
	};
	
})(KISSY);
