/**
 * @author dongzhu
 */
KISSY.add("bts",function(S){
	/**
	 * 基站
	 * @class S.Bts
	 * @param url 足迹基站ajax处理请求地址
	 */
	function Bts(){
		this._init.apply(this, arguments);
	};
	S.augment(Bts,S.EventTarget,{
		_init:function(url ){
			var self=this;
			self.url=url;
			self.handleType={
				add:"add",
				edit:"edit",
				del:"del",
				all:"getall",
				prov:"getprov",
				city:"getcity",
				county:"getcounty"
			}
		},
		/**
		 * 添加基站
		 * @memberof S.Bts
		 * @param  id 基站id
		 * @param name 基站名称
		 * @param longtitude 经度
		 * @param latitude 纬度
		 * @param prov 省份名称
		 * @param city 城市名称
		 * @param county 城市名称
		 * @param address 站址
		 * @param onsuccess 成功回调函数
		 */
		add:function(id,name,longtitude,latitude,prov,city,county,address,onsuccess){
			var self=this,
			url=self.url,
			handleType=self.handleType["add"];
			S.io({
		 		url:url,
		 		type:"POST",
		 		data:{
		 			id:id,
		 			name:name,
		 			longtitude:longtitude,
		 			latitude:latitude,
		 			prov:prov,
		 			county:county,
		 			city:city,
		 			address:address,
		 			type:handleType
		 		},
		 		dataType:"json",
		 		success:onsuccess
		 	});
		},
		/**
		 * 删除基站
		 * @memberof S.Bts
		 * @name del
		 * @param id 基站id
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
		 * 修改基站
		 * @memberof S.Bts
		 * @param  id 基站id
		 * @param name 基站名称
		 * @param longtitude 经度
		 * @param latitude 纬度
		 * @param prov 省份名称
		 * @param city 城市名称
		 * @param county 城市名称
		 * @param address 站址
		 * @param onsuccess 成功回调函数
		 */
		edit:function(id,name,longtitude,latitude,prov,city,county,address,onsuccess){
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
		 			longtitude:longtitude,
		 			latitude:latitude,
		 			prov:prov,
		 			county:county,
		 			city:city,
		 			address:address,
		 			type:handleType
		 		},
		 		dataType:"json",
		 		success:onsuccess
		 	});
		}
	});
	S.Bts=Bts;
	return Bts;
});
