/**
 * @author dongzhu
 */
KISSY.add("line",function(S){
	/**
	 * 文章
	 * @class S.Line
	 * @param url 足迹记录ajax处理请求地址
	 */
	function Line(){
		this._init.apply(this, arguments);
	};
	S.augment(Line,S.EventTarget,{
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
		 * 添加记录
		 * @memberof S.Line
		 * @param name  巡检员名称
		 * @param x x坐标
		 * @param y y坐标
		 * @param ctime 创建时间
		 * @param onsuccess 成功回调函数
		 */
		add:function(name,x,y,ctime,address,onsuccess){
			var self=this,
			url=self.url,
			handleType=self.handleType["add"];
			S.io({
		 		url:url,
		 		type:"POST",
		 		data:{
		 			name:name,
		 			x:x,
		 			y:y,
		 			ctime:ctime,
		 			address:address,
		 			type:handleType
		 		},
		 		dataType:"json",
		 		success:onsuccess
		 	});
		},
		/**
		 * 删除文章
		 * @memberof S.Line
		 * @name del
		 * @param id 记录id
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
		 * 修改记录
		 * @memberof S.Line
		 * @param id 记录id
		 * @param name  巡检员名称
		 * @param x x坐标
		 * @param y y坐标
		 * @param ctime 创建时间
		 * @param onsuccess 成功回调函数
		 */
		edit:function(id,name,x,y,ctime,address,onsuccess){
			var self=this,
			url=self.url,
			handleType=self.handleType["edit"],
			id=id,
			title=title,
			address=address,
			text=text,
			type=type;
			S.io({
		 		url:url,
		 		type:"POST",
		 		data:{
		 			id:id,
		 			name:name,
		 			x:x,
		 			y:y,
		 			ctime:ctime,
		 			address:address,
		 			type:handleType
		 		},
		 		dataType:"json",
		 		success:onsuccess
		 	});
		}
	});
	S.Line=Line;
	return Line;
});
