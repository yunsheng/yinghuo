/**
 * @author dongzhu
 */
KISSY.add("article",function(S){
	/**
	 * ����
	 * @class S.Article
	 * @param url ����ajax���������ַ
	 */
	function Article(){
		this._init.apply(this, arguments);
	};
	S.augment(Article,S.EventTarget,{
		_init:function(url ){
			var self=this;
			self.url=url;
			self.handleType={
				add:"add",
				edit:"edit",
				del:"del"
			}
		},
		/**
		 * �������
		 * @memberof S.Article
		 * @param title ���±���
		 * @param intro ���¼��
		 * @param text  ��������
		 * @param category ��������   Ĭ��Ϊ0
		 * onsuccess �ɹ��ص�����
		 */
		add:function(title,intro,text,category,onsuccess){
			var self=this,
			url=self.url,
			handleType=self.handleType["add"],
			title=title,
			text=text,
			type=type||0;
			S.io({
		 		url:url,
		 		type:"POST",
		 		data:{
		 			title:title,
		 			intro:intro,
		 			menuid:category,
		 			paragram:text,
		 			type:handleType
		 		},
		 		dataType:"json",
		 		success:onsuccess
		 	});
		},
		/**
		 * ɾ������
		 * @memberof S.Article
		 * @name del
		 * @param id ����id
		 * @param onsuccess �ɹ��ص�����
		 */
		del:function(id,onsuccess){
			var self=this,
			url=self.url,
			handleType=self.handleType["del"],
			id=id;
			S.io({
		 		url:url,
		 		type:"POST",
		 		data:{
		 			id:id,
		 			type:handleType
		 		},
		 		dataType:"json",
		 		success:onsuccess
		 	});
		},
		/**
		 * �޸�����
		 * @memberof S.Article
		 * @param id ����id
		 * @param title ���±���
		 * @param text  ��������
		 * @param category ��������   Ĭ��Ϊ0
		 * @param onsuccess �ɹ��ص�����
		 */
		edit:function(id,title,intro,text,category,onsuccess){
			var self=this,
			url=self.url,
			handleType=self.handleType["edit"],
			id=id,
			title=title,
			text=text,
			type=type;
			S.io({
		 		url:url,
		 		type:"POST",
		 		data:{
		 			id:id,
		 			title:title,
		 			intro:intro,
		 			menuid:category,
		 			paragram:text,
		 			type:handleType
		 		},
		 		dataType:"json",
		 		success:onsuccess
		 	});
		}
	});
	S.Article=Article;
	return Article;
});
