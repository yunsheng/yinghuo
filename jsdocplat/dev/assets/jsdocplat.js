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
		return reg.test(input.value)
	}
	/**
	 * 添加和编辑项目页表单验证
	 * @function editForm
	 */
	DOC.editForm = function(){
		S.use("sizzle",function(){
			var form = D.get("#J_addForm");
			E.on(form,"submit",function(e){
				//项目名称
				var reg1 = /^[\u4e00-\u9fa5\da-zA-Z]{2,30}$/;
				if(!DOC.validReg("title",reg1,form)){
					alert("项目名称不合法,只能是中文,英文和数字");
					e.halt();
					return;
				}
				//项目代号
				var reg2 = /^[a-zA-Z]+[a-zA-Z0-9_]+$/;
				if(!DOC.validReg("folder",reg2,form)){
					alert("项目代号不合法,只能是字母数字和下划线,以字母开头");
					e.halt();
					return;
				}
				//源文件路径
				var reg3 = /^\//;
				if(!DOC.validReg("path",reg3,form)){
					alert("源文件路径不合法");
					e.halt();
					return;
				}
			})
			
		});
	}
	/**
	 * 上传压缩文件
	 * @function uploadFile
	 */
	DOC.uploadFile = function(){
		S.use("sizzle",function(){
			var link = D.get("#J_uploadBtn"), uploadForm=D.get("#J_hiddenFileForm"),
			 uploadInput = D.get("input",uploadForm),ifr = D.create('<iframe id="J_tempIfr" name="J_tempIfr" class="hidden"/>');
			E.on(link,"click",function(e){
				e.halt();
				uploadInput.focus();
			});
			//绑定选择文件动作
			E.on(uploadInput,"change",function(e){
				var tar = e.target,path;
				D.append(ifr,D.get("body"));
				D.attr(uploadForm,"target","J_tempIfr");
				//绑定回调事件
				
				E.on(ifr,"load",function(e){
					var ifrDoc = ifr.contentWindow.document,
					txt = D.get("#J_path",ifrDoc);
					if(txt){
						path=txt.innerHTML;
						D.get("input[name='path']").value=path;
					}else{
						alert("上传失败！")
						D.get("input[name='path']").value="";
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
					var del = this, url=D.attr(del,"href"),li=D.parent(del,"li");
					S.io.get(url,function(){
						D.remove(li);
					});
				}	
			})
		})
	}
	/**
	 * 用户登录页面用的表单校验
	 * @function usrLogin
	 */
	DOC.usrLogin = function(){
		S.use("sizzle",function(){
			var form = D.get("#J_loginForm"), name = D.get("input[name='usrname']",form), pwd = D.get("input[name='pwd']",form);
			E.on(form,"submit",function(e){
				if(!name.value)alert("请输入用户名！");
				if(!pwd.value)alert("请输入密码！");
				if(!name.value||!pwd.value)e.halt();
			})
		})
	}
	/**
	 * 添加用户
	 * @function addUsr
	 * @param {Boolean} isReg 是否是注册
	 */
	DOC.addUsr = function(isReg){
		S.use("sizzle",function(){
			var form = D.get("#J_addusrForm"), name = D.get("input[name='usrname']",form), pwd = D.get("input[name='pwd']",form);
			E.on(form,"submit",function(e){
				if(!name.value)alert("请输入用户名！");
				if(!pwd.value)alert("请输入密码！");
				e.halt();
				if (name.value && pwd.value&&!isReg) {
					S.io.get(D.attr(form,"action"),
					{usrname:name.value,pwd:pwd.value,type:"add"},
					function(data){
						if(data.indexOf("success")>-1){
							alert("添加成功！");
						}
						if(data.indexOf("已存在")>-1){
							alert("该用户已存在");
						}
					})
				}
				if (name.value && pwd.value&&isReg) {
					S.io.get(D.attr(form,"action"),
					{usrname:name.value,pwd:pwd.value,type:"reg"},
					function(data){
						if(data.indexOf("success")>-1){
							alert("注册成功！");
							location.href="index.php";
						}
						if(data.indexOf("已存在")>-1){
							alert("该用户已存在");
						}
					})
				}
			})
		})
	}
	/**
	 * 删除用户
	 * @function deleteUsr
	 */
	DOC.deleteUsr = function(){
		S.use("sizzle",function(){
			var form = D.get("#J_deleteusrForm"), name = D.get("input[name='usrname']",form);
			E.on(form,"submit",function(e){
				if(!name.value)alert("请输入用户名！");
				e.halt();
				if (name.value && confirm("真的要删除用户"+name.value)) {
					S.io.get(D.attr(form,"action"),
					{usrname:name.value,type:"delete"},
					function(data){
						if(data.indexOf("success")>-1){
							alert("删除成功！");
						}else{
							alert('该用户不存在');
						}
					})
				}
			})
		})
	}
	/**
	 * 修改密码
	 * @function changePwd
	 */
	DOC.changePwd = function(){
		S.use("sizzle",function(){
			var form = D.get("#J_pwdForm"), old = D.get("input[name='oldpwd']",form), pwd = D.get("input[name='pwd']",form);
			E.on(form,"submit",function(e){
				if(!old.value)alert("请输入旧密码！");
				if(!pwd.value)alert("请输入新密码！");
				e.halt();
				if (old.value&&pwd.value) {
					S.io.get(D.attr(form,"action"),
					{oldpwd:old.value,pwd:pwd.value,type:"changepwd"},
					function(data){
						if(data.indexOf("success")>-1){
							alert("修改成功！");
						}else{
							alert('该用户不存在或密码错误');
						}
					})
				}
			})
		})
	}
	
})(KISSY)
