/**
 * @author dongzhu
 */
KISSY.add("detail",function(S){
	/**
	 * @class Detail
	 * @param menuid 文章类型
	 */
	function Detail(){
		this._init.apply(this,arguments);
	}
	S.augment(Detail,S.EventTarget,{
		_init:function(menuid){
			var self=this;
			self.menuid=menuid;
			self.article=new S.Article("../data/article.php"),
			self.editWin=null;
			self.tForm='<form id="J_ValidForm" method="post" action="../data/article.php"  class="ks-tdform">'+
						'<div class="input-content default">'+
							'<label class="input-label" for="title" >文章标题：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Title input-text" value="{{title}}" name="title"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label"  >文章类型：</label>'+
							'<select id="J_Type" class="input-select" >'+
							'{{#each options as option}}<option value="{{option.value}}" {{#if option.selected}}selected="true"{{/if}}">{{option.name}}</option>{{/each}}'+
							'</select>'+
						'</div>'+
						'<div class="input-content default intro-con">'+
							'<label class="input-label" for="intro" >文章简介：</label>'+
							'<textarea class="J_Intro paragram intro default" name="intro">'+
								'{{intro}}'+
							'</textarea>'+
							'<span class="number-con">'+
								'您还可输入<span class="J_IntroNumber number" ">'+
									'{{intromax}}'+
								'</span>字'+
							'</span>'+
						'</div>'+
						'<div class="input-content default paragram-con">'+
							'<label class="input-label" for="paragram" >文章内容：</label>'+
							'<textarea class="J_Paragram paragram default" name="paragram">'+
								'{{paragram}}'+
							'</textarea>'+
							'<span class="number-con">'+
								'您还可输入<span class="J_ParaNumber number" ">'+
									'{{paramax}}'+
								'</span>字'+
							'</span>'+
						'</div>'+
						'<input type="button" class="{{button}} sub button" value="提交" />'+
							
					'</form>';
			S.getScript("../js/common/articletype.js");
			self._bind();
		},
		_bind:function(){
			var self=this,
			nTitle=S.one(".article .title"),
			nIntro=S.one(".article .intro"),
			nParagram=S.one(".article .bd"),
			nOperate=S.all(".J_operate"),
			nEditBtn=S.all(".J_Edit"),
			nDelBtn=S.all(".J_Del"),
			nAddBtn=S.all(".J_Add");
			//修改文章按钮点击事件
			nEditBtn&&nEditBtn.on("click",function(e){
				var nTarget=S.one(e.currentTarget),
				title=S.Common.handleStr(nTitle.html(),{
					"trim":true
				}),
				intro=S.Common.handleStr(nIntro.html(),{
					"trim":true
				}),
				paragram=S.Common.handleStr(nParagram.html(),{
					"trim":true
				}),
				id=nTarget.attr("pageid");
				self.edit(id,title,intro,paragram);
			});
			//删除文章事件绑定
			nDelBtn&&nDelBtn.on('click',function(e){
				var nTarget=S.one(e.currentTarget),
				id=nTarget.attr("pageid");
				self.del(id);
			});
			//添加文章事件绑定
			nAddBtn&&nAddBtn.on("click",function(e){
				var nTarget=S.one(e.currentTarget);
				self.add();
			});
			//显示操作按钮
			nOperate&&nOperate.on("mouseenter",function(e){
				var nTarget=S.one(e.currentTarget),
				nContent=nTarget.one(".con");
				nContent.show();
			});
			nOperate&&nOperate.on("mouseleave",function(e){
				var nTarget=S.one(e.currentTarget),
				nContent=nTarget.one(".con");
				nContent.fadeOut(0.5);
			});
		},
	/**
	 * 编辑文章
	 * @param id 被编辑文章的id
	 * @param title 文章编辑前的标题
	 * @param paragram 文章编辑前的内容
	 */
	edit:function(id,title,intro,paragram){
		var self=this,
		tForm=self.tForm,
		menuid=self.menuid;
		S.each(DZ_ARTICLE_TYPE,function(index){
			var value=index.value;
			if(menuid==value){
				DZ_ARTICLE_TYPE[value]["selected"]=true;
			}else{
				DZ_ARTICLE_TYPE[value]["selected"]=false;
			}
		});
		
		var winContent=S.Template(tForm).render({
			title:title,
			intro:intro,
			intromax:500-intro.length,
			paragram:paragram,
			paramax:20000000000-paragram.length,
			button:'J_EditSubBtn',
			options:DZ_ARTICLE_TYPE
		});
		self.editWin=new S.Win("#J_Edit_win",{
			width:500,
			height:450,
			content:winContent
		});
		self.editWin.show();
		self.valid(id);
	},
	/**
	 * 删除文章
	 * @param id 被编辑文章的id
	 * @param title 文章编辑前的标题
	 * @param paragram 文章编辑前的内容
	 */
	del:function(id){
		var self=this,
		type=self.menuid,
		article=self.article;
		 S.Win.confirm("您确定要删除本篇文章吗？","警告",function(){
		 	article.del(id,function(data){
		 		if (data.isSuccess) {
		 			S.Win.inform("成功删除"); 
					setTimeout(function(){
						window.location.href="article.php?type="+type+"&stamp="+Math.random();
					},500);
		 		} else{
		 			S.Win.warn(data.message,"删除失败");
		 		};
		 	});
		 });
	},
	/**
	 * 添加文章
	 */
	add:function(){
		var self=this,
		tForm=self.tForm,
		menuid=self.menuid;
		S.each(DZ_ARTICLE_TYPE,function(index){
			var value=index.value;
			if(menuid==value){
				DZ_ARTICLE_TYPE[value]["selected"]=true;
			}else{
				DZ_ARTICLE_TYPE[value]["selected"]=false;
			}
		});
		var winContent=S.Template(tForm).render({
			title:'请输入文章标题',
			intro:'',
			intromax:500,
			paragram:'',
			paramax:20000000000,
			button:'J_AddSubBtn',
			options:DZ_ARTICLE_TYPE
		});
		self.editWin=new S.Win("#J_Edit_win",{
			width:500,
			height:450,
			content:winContent
		});
		self.editWin.show();
		self.valid();
	},
	/**
	 * 表单处理
	 * @param id 编辑文章的id
	 */
	valid:function(id){
		var self=this,
		editWin=self.editWin,
		article=self.article;
		var formvalid=new S.Validation("#J_ValidForm",{
				 		list:[{
				 			node:".J_Title",
				 			defVal:"请输入文章标题",
				 			allowNull:false,
				 			checkObj:{
				 				reg:/.{1,20}/,
				 				rightMes:"标题合法",
				 				errorMes:"文章标题不能超过20个字符"
				 			}
				 		}]
				 }),
		cparagram=new S.Comment(".J_Paragram",{
			number:S.one(".J_ParaNumber"),
			max:20000000000
		}),
		cintro=new S.Comment(".J_Intro",{
			number:S.one(".J_IntroNumber"),
			max:500
		}),
		nEidtSubBtn=S.one(".J_EditSubBtn"),
		nAddSubBtn=S.one(".J_AddSubBtn"),
		nNewTitle=S.one(".J_Title"),
		nNewIntro=S.one(".J_Intro"),
		nNewParagram=S.one(".J_Paragram"),
		nType=document.getElementById("J_Type"),
		editSuccess=function(data){

			editWin.hide();
			if (data.isSuccess) {
				S.Win.inform("操作成功,页面将重新加载！");
				setTimeout(function(){
					window.location.href="article.php?type="+data.type+"&id="+id+"&stamp="+Math.random();
				},500);
			}else{
				S.Win.warn(data.message,"修改失败");
			};
		},
		addSuccess=function(data){
			editWin.hide();
			if (data.isSuccess) {
				S.Win.inform("添加成功");
				setTimeout(function(){
					window.location.href="article.php?type="+data.type+"&stamp="+Math.random();
				},500);
			}else{
				S.Win.warn(data.message,"添加失败");
			};
		};
		nEidtSubBtn&&nEidtSubBtn.on("click",function(e){
			var vtitle=nNewTitle.val()
			title=S.Common.handleStr(vtitle,{
				"trim":true,
				"uri":true
			}),
			vparagram=nNewParagram.val(),
			paragram=S.Common.handleStr(vparagram,{
				"trim":true,
				"uri":true
			}),
			vintro=nNewIntro.val(),
			intro=S.Common.handleStr(vintro,{
				"trim":true,
				"uri":true
			}),
			type=nType.selectedIndex;
			if(formvalid.valid()){	
				article.edit(id,title,intro,paragram,type,editSuccess);
			}
			
		});
		nAddSubBtn&&nAddSubBtn.on("click",function(e){
			var vtitle=nNewTitle.val()
			title=S.Common.handleStr(vtitle,{
				"trim":true,
				"uri":true
			}),
			vparagram=nNewParagram.val(),
			paragram=S.Common.handleStr(vparagram,{
				"trim":true,
				"uri":true
			}),
			vintro=nNewIntro.val(),
			intro=S.Common.handleStr(vintro,{
				"trim":true,
				"uri":true
			}),
			type=nType.selectedIndex;
			if(formvalid.valid()){
			article.add(title,intro,paragram,type,addSuccess);
			}
		});
	}
		
	});
	S.Detail=Detail;
	return Detail;

	
},{
	attach:false,
	requires:['article','win','validation','common','comment','template']
});
