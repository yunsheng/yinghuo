YUI({
	combine:true,
	comboBase:'http://a.tbcdn.cn/??',
	root:"s/yui/3.3.0/build/",
	charset: 'gbk',
	filter:{
				'searchExp':'&',
				'replaceStr':','
	},
	modules : {
		//进度条
		'gallery-progress-bar' : {
			fullpath : 'http://bj.ued.taobao.net/jsdocplat/dev/assets/widget/progress-bar/progress-bar.js',
			//fullpath:'http://a.tbcdn.cn/jsdoc-new/jsdoc_dev/assets/widget/progress-bar/progress-bar.js',
			requires : ['widget','base-build','anim','substitute']
		},
		//提示框
		'box-skin':{
			fullpath: 'http://bj.ued.taobao.net/jsdocplat/dev/assets/widget/box/box.css',
			type: 'css'
		},
		//提示框皮肤
		'box':{
			fullpath: 'http://bj.ued.taobao.net/jsdocplat/dev/assets/widget/box/box.js',
			requires: ['box-skin','node','overlay','dd-plugin']
		}
	}
}).use("io-base", "node", 'gallery-progress-bar','box',function(Y) {
		Y.on('domready',function(){
			var pb1;//声明进度条变量
			var AUTHOR,TITLE,FOLDER,PATH,ID,ENCODE,SOURCE,COMMENTONLY;
			var title = "确定";//can be modified
			var sUrl;//请求的页面
			var div;//
			//请求成功
			var handleSuccess = function(ioId, o){
				pb1.update(100);					 
				if(o.responseText !== undefined){
					var s = o.responseText;
					div.set("innerHTML", s);
				}
			};
			//请求失败
			var handleFailure = function(ioId, o){
				if(o.responseText !== undefined){
					var s ="请求失败~";
					div.set("innerHTML", s);
				}
			};
			//描述IO请求的全局变量
			Y.on('io:success', handleSuccess);
			Y.on('io:failure', handleFailure);
			

            //创建Box的
			function createBox(){
				var body_html = '<div id="box_body">'+
									'<div id="box_content">'+
									'<img src="assets/images/jsdoc-toolkit.png" alt="jsdoc-toolkit"></img><p>地址：<a href="http://code.google.com/p/jsdoc-toolkit/" target="_blank">http://code.google.com/p/jsdoc-toolkit/</a></p></div>'+
									'<div id="progressbars"></div>'+
								'</div>';
				var box = new Y.Box({
					head:'<a class="close closebtn"><img src="assets/images/close.png" border=0></a>',
					body:body_html,//can be modified
					width:'500px',//can be modified
					height:'300px',//can be modified
					onload: function(box){
						//can be modified
						try{
							Y.one('.closebtn').setStyle('cursor','pointer');
							Y.one('.closebtn').on('click',function(e){
								e.halt();
								box.close();
							});
						}catch(e){}
					}
				});
				box.render();
			}
			
			//点下按钮后发送异步请求的函数
			function makeRequest(e,refresh,id){
			
				e.halt();
				createBox();
				div = Y.one('#box_content');
				pb1 = new Y.ProgressBar({
						render: '#progressbars' , 
						layout : '<div class="{labelClass}"></div><div class="{sliderClass}"></div>'
					});
				pb1.setLabelAt(50, 'Initializing');
				pb1.setLabelTemplateAt(1, pb1.get('labelTemplate.0'));
				pb1.setLabelTemplateAt(0, '{label}');
				pb1.setLabelTemplateAt(100, '{progress} :: {label}');
                var cfg;
				if(refresh){
					sUrl = Y.one('.refresh').get('href');
					cfg = {
						method: "POST",
					};
				}
				else{
					sUrl = "createdoc.php";//请求的页面
					//发送请求参数配置
					cfg = {
						method: "POST",
						data: "id="+ID+"&author="+AUTHOR+"&title="+TITLE+"&path="+PATH+"&folder="+FOLDER+"&source="+SOURCE+"&encode="+ENCODE+"&commentonly="+COMMENTONLY,
					};
				}
				
				//发送请求
				var request = Y.io(sUrl, cfg);
				//进度条执行到80%
				(function upIt() {
					if(pb1.get('progress') < 80) {
						Y.later(500, this, function(e){
							pb1.increment(20);
							upIt();
						});
					}
				})();
			}
	        //表单验证
			var form = Y.one("#J_addForm");
			//项目名称
			var reg1 = /^[\u4e00-\u9fa5\da-zA-Z]{2,30}$/;
			//项目代号
			var reg2 = /^[a-zA-Z]+[a-zA-Z0-9_]+$/;
			//源文件路径
			var reg3 = /^\//;
			function validate_required(field,reg){
				with (field){
					return(reg.test(value));
				}
			}
			function validate_form(form,e){
				var _form=Y.Node.getDOMNode(form);
				with (_form){		
					  if(validate_required(title,reg1) == false){
							alert("项目名称不合法,只能是中文,英文和数字");
							e.halt();
					  }
					  else if(validate_required(folder,reg2) == false){
							alert("项目代号不合法,只能是字母数字和下划线,以字母开头");
							e.halt();
					  }
					  else if(validate_required(path,reg3)== false){
							alert("源文件路径不合法");
							e.halt();
					  }
					  else{
						    AUTHOR = Y.one('#author').get('value');
							TITLE = Y.one('#title').get('value');
							FOLDER = Y.one('#folder').get('value');
							PATH = Y.one('#path').get('value');
							ID = Y.one('#id').get('value');
							ENCODE = Y.one('#encode').get('value');
							SOURCE = Y.one('#source').get('value');
							COMMENTONLY = Y.one('#commentonly').get('value');
							
							makeRequest(e,false);
					  }
				}
			}
			
			Y.on('click',function(e){e.halt();validate_form(form,e);},'.btn');	
			Y.on('click',function(e){e.halt();makeRequest(e,true);},'.refresh');	
			
	});						
});

