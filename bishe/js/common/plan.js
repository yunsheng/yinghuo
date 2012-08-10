/**
 * @author dongzhu
 */
KISSY.add("plan",function(S){
	/**
	 * 计划
	 * @class S.Plan
	 * @param url 足迹计划ajax处理请求地址
	 */
	function Plan(){
		this._init.apply(this, arguments);
	};
	S.augment(Plan,S.EventTarget,{
		_init:function(url ){
			var self=this;
			self.url=url;
			self.handleType={
				add:"add",
				edit:"edit",
				del:"del",
				done:"done",
				all:"getall",
				prov:"getprov",
				city:"getcity",
				county:"getcounty"
			}
		},
		/**
		 * 添加计划
		 * @memberof S.Plan
		 * @param  btsid 基站id
		 * @param agid 巡检员id
		 * @param start 开始时间
		 * @param end 结束时间
		 * @param address 站址
		 * @param onsuccess 成功回调函数
		 */
		add:function(btsid,agid,start,end,onsuccess){
			var self=this,
			url=self.url,
			handleType=self.handleType["add"];
			S.io({
		 		url:url,
		 		type:"POST",
		 		data:{
		 			btsid:btsid,
		 			agid:agid,
		 			start:start,
		 			end:end,
		 			type:handleType
		 		},
		 		dataType:"json",
		 		success:onsuccess
		 	});
		},
		/**
		 * 删除计划
		 * @memberof S.Plan
		 * @name del
		 * @param id 计划id
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
	 * 执行计划
	 * @param id 编辑计划的id
	 * @param onsuccess 回调函数
	 */
	done:function(id,onsuccess){
		var self=this,
		url=self.url,
		handleType=self.handleType["done"];
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
		 * 修改计划
		 * @memberof S.Plan
		 * @param  id 计划id
		 * @param  btsid 基站id
		 * @param agid 巡检员id
		 * @param start 开始时间
		 * @param end 结束时间
		 * @param onsuccess 成功回调函数
		 */
		edit:function(id,btsid,agid,start,end,onsuccess){
			var self=this,
			url=self.url,
			handleType=self.handleType["edit"];
			S.io({
		 		url:url,
		 		type:"POST",
		 		data:{
		 			id:id,
		 			btsid:btsid,
		 			agid:agid,
		 			start:start,
		 			end:end,
		 			type:handleType
		 		},
		 		dataType:"json",
		 		success:onsuccess
		 	});
		}
	});
	S.Plan=Plan;
	return Plan;
});
