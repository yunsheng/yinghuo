/**
 * @author dongzhu
 */
KISSY.add("article",function(S){
	/**
	 * 文章
	 * @class S.Article
	 * @param url 文章ajax处理请求地址
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
		 * 添加文章
		 * @memberof S.Article
		 * @param title 文章标题
		 * @param intro 文章简介
		 * @param text  文章内容
		 * @param category 文章类型   默认为0
		 * onsuccess 成功回调函数
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
		 * 删除文章
		 * @memberof S.Article
		 * @name del
		 * @param id 文章id
		 * @param onsuccess 成功回调函数
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
		 * 修改文章
		 * @memberof S.Article
		 * @param id 文章id
		 * @param title 文章标题
		 * @param text  文章内容
		 * @param category 文章类型   默认为0
		 * @param onsuccess 成功回调函数
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
