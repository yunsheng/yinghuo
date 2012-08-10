/**
 * @author dongzhu
 */
KISSY.add("detail",function(S){
	/**
	 * @class Detail
	 * @param menuid ��������
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
							'<label class="input-label" for="title" >���±��⣺</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Title input-text" value="{{title}}" name="title"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label"  >�������ͣ�</label>'+
							'<select id="J_Type" class="input-select" >'+
							'{{#each options as option}}<option value="{{option.value}}" {{#if option.selected}}selected="true"{{/if}}">{{option.name}}</option>{{/each}}'+
							'</select>'+
						'</div>'+
						'<div class="input-content default intro-con">'+
							'<label class="input-label" for="intro" >���¼�飺</label>'+
							'<textarea class="J_Intro paragram intro default" name="intro">'+
								'{{intro}}'+
							'</textarea>'+
							'<span class="number-con">'+
								'����������<span class="J_IntroNumber number" ">'+
									'{{intromax}}'+
								'</span>��'+
							'</span>'+
						'</div>'+
						'<div class="input-content default paragram-con">'+
							'<label class="input-label" for="paragram" >�������ݣ�</label>'+
							'<textarea class="J_Paragram paragram default" name="paragram">'+
								'{{paragram}}'+
							'</textarea>'+
							'<span class="number-con">'+
								'����������<span class="J_ParaNumber number" ">'+
									'{{paramax}}'+
								'</span>��'+
							'</span>'+
						'</div>'+
						'<input type="button" class="{{button}} sub button" value="�ύ" />'+
							
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
			//�޸����°�ť����¼�
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
			//ɾ�������¼���
			nDelBtn&&nDelBtn.on('click',function(e){
				var nTarget=S.one(e.currentTarget),
				id=nTarget.attr("pageid");
				self.del(id);
			});
			//��������¼���
			nAddBtn&&nAddBtn.on("click",function(e){
				var nTarget=S.one(e.currentTarget);
				self.add();
			});
			//��ʾ������ť
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
	 * �༭����
	 * @param id ���༭���µ�id
	 * @param title ���±༭ǰ�ı���
	 * @param paragram ���±༭ǰ������
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
	 * ɾ������
	 * @param id ���༭���µ�id
	 * @param title ���±༭ǰ�ı���
	 * @param paragram ���±༭ǰ������
	 */
	del:function(id){
		var self=this,
		type=self.menuid,
		article=self.article;
		 S.Win.confirm("��ȷ��Ҫɾ����ƪ������","����",function(){
		 	article.del(id,function(data){
		 		if (data.isSuccess) {
		 			S.Win.inform("�ɹ�ɾ��"); 
					setTimeout(function(){
						window.location.href="article.php?type="+type+"&stamp="+Math.random();
					},500);
		 		} else{
		 			S.Win.warn(data.message,"ɾ��ʧ��");
		 		};
		 	});
		 });
	},
	/**
	 * �������
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
			title:'���������±���',
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
	 * ������
	 * @param id �༭���µ�id
	 */
	valid:function(id){
		var self=this,
		editWin=self.editWin,
		article=self.article;
		var formvalid=new S.Validation("#J_ValidForm",{
				 		list:[{
				 			node:".J_Title",
				 			defVal:"���������±���",
				 			allowNull:false,
				 			checkObj:{
				 				reg:/.{1,20}/,
				 				rightMes:"����Ϸ�",
				 				errorMes:"���±��ⲻ�ܳ���20���ַ�"
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
				S.Win.inform("�����ɹ�,ҳ�潫���¼��أ�");
				setTimeout(function(){
					window.location.href="article.php?type="+data.type+"&id="+id+"&stamp="+Math.random();
				},500);
			}else{
				S.Win.warn(data.message,"�޸�ʧ��");
			};
		},
		addSuccess=function(data){
			editWin.hide();
			if (data.isSuccess) {
				S.Win.inform("��ӳɹ�");
				setTimeout(function(){
					window.location.href="article.php?type="+data.type+"&stamp="+Math.random();
				},500);
			}else{
				S.Win.warn(data.message,"���ʧ��");
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
