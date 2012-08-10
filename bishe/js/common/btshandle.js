/**
 * @author dongzhu
 */
KISSY.add("btshandle",function(S){
	/**
	 * @class BtsHandle
	 */
	function BtsHandle(){
		this._init.apply(this,arguments);
	}
	S.augment(BtsHandle,S.EventTarget,{
		_init:function(){
			var self=this;
			self.bts=new S.Bts("../data/bts.php"),
			self.editWin=null;
			self.tForm='<form id="J_ValidForm" method="post" action="../data/bts.php"  class="ks-tdform">'+
						'<div class="input-content default">'+
							'<label class="input-label" for="id" >基站ID：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Id input-text" value="{{id}}" id="id" name="id"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="name" >基站名称：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Name input-text" value="{{name}}" id="name" name="name"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="longtitude" >经度：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Longtitude input-text" value="{{longtitude}}" id="longtitude" name="longtitude"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="latitude" >纬度：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Latitude input-text" value="{{latitude}}" id="latitude" name="latitude"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content  J_AreaSelect default">'+
                        	'<label  class="input-label" >'+
                               	'基站地址：'+
                            '</label>'+
                            '<select class="J_Prov">'+
							'<option value="110000">北京</option><option value="120000">天津</option><option value="130000">河北省</option><option value="140000">山西省</option><option value="150000">内蒙古自治区</option><option value="210000">辽宁省</option><option value="220000">吉林省</option><option value="230000">黑龙江省</option><option value="310000">上海</option><option value="320000">江苏省</option><option value="330000">浙江省</option><option value="340000">安徽省</option><option value="350000">福建省</option><option value="360000">江西省</option><option value="370000">山东省</option><option value="410000">河南省</option><option value="420000">湖北省</option><option value="430000">湖南省</option><option value="440000">广东省</option><option value="450000">广西壮族自治区</option><option value="460000">海南省</option><option value="500000">重庆</option><option value="510000">四川省</option><option value="520000">贵州省</option><option value="530000">云南省</option><option value="540000">西藏自治区</option><option value="610000">陕西省</option><option value="620000">甘肃省</option><option value="630000">青海省</option><option value="640000">宁夏回族自治区</option><option value="650000">新疆维吾尔自治区</option><option value="710000">台湾省</option><option value="810000">香港特别行政区</option><option value="820000">澳门特别行政区</option><option value="990000">海外</option>'+
							'</select>'+
							'<select class="J_City">'+
								'<option>请选择</option>'+
							'</select>'+
							'<select class="J_Area">'+
								'<option>请选择</option>'+
							'</select>'+
                        '</div>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="address" >基站详细地址：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Address input-text" value="{{address}}" id="address" name="address"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<input type="button" class="{{button}} sub button" style="margin-left:245px" value="提交" />'+
					'</form>';

		},
	/**
	 * 添加基站
	 * @memberof S.BtsHandle
	 * @param  id 基站id
	 * @param name 基站名称
	 * @param longtitude 经度
	 * @param latitude 纬度
	 * @param prov 省份名称
	 * @param city 城市名称
	 * @param county 城市名称
	 * @param address 站址
	 * @param onsuccess
	 * @param o 上下文
	 */
	add:function(id,name,longtitude,latitude,prov,city,county,address,onsuccess,o){
		var self=this,
		tForm=self.tForm;
		var winContent=S.Template(tForm).render({
			id:id||"请输入基站id",
			name:name||'请输入基站名',
			longtitude:longtitude||'0.0',
			latitude:latitude||'0.0',
			address:address||"请输入检测地点",
			address:address,
			button:'J_AddSubBtn'
		});
		self.editWin=new S.Win("#J_Edit_win",{
			width:500,
			height:320,
			content:winContent
		});
		self.editWin.show();
		self.valid("",onsuccess,o);
	},
	/**
	 * 编辑记录
	 * @param id 记录id
	 * @param name  巡检员名称
	 * @param x x坐标
	 * @param y y坐标
	 * @param ctime 创建时间
	 * @param address  地址
	 * @param onsuccess
	 */
	edit:function(id,name,longtitude,latitude,prov,city,county,address,onsuccess,o){
		var self=this,
		tForm=self.tForm;
		var winContent=S.Template(tForm).render({
			id:id,
			name:name||'请输入检测员姓名',
			longtitude:longtitude||'0.0',
			latitude:latitude||'0.0',
			address:address||"请输入检测地点",
			address:address,
			button:'J_EditSubBtn'
		});
		self.editWin=new S.Win("#J_Edit_win",{
			width:500,
			height:320,
			content:winContent
		});
		self.editWin.show();
		self.valid(id,onsuccess,o);
	},
	/**
	 * 删除文章
	 * @param id 被编辑文章的id
	 */
	del:function(id){
		var self=this,
		bts=self.bts;
		 S.Win.confirm("您确定要删除本条记录信息吗？","警告",function(){
		 	bts.del(id,function(data){
		 		if (data.isSuccess) {
		 			S.Win.inform("成功删除"); 
		 		} else{
		 			S.Win.warn(data.message,"删除失败");
		 		};
		 	});
		 });
	},
	/**
	 * 表单处理
	 * @param id 编辑文章的id
	 * @param onsuccess 回调函数
	 */
	valid:function(id,onsuccess,o){
		var self=this,
		editWin=self.editWin,
		bts=self.bts,
		formvalid=new S.Validation("#J_AddWin",{
		 		list:[{
		 			node:".J_Name",
		 			defVal:"请输入基站名",
		 			allowNull:false
		 		},{
		 			node:".J_Id",
		 			defVal:"请输入基站id",
		 			allowNull:false,
		 			checkObj:{
		 				reg:/^[0-9]{4}$/,
		 				rightMes:"",
		 				errorMes:"基站ID只能是4位数字"
		 			}
		 		},{
		 			node:".J_Longtitude",
		 			defVal:"0.0",
		 			allowNull:false,
		 			checkObj:{
		 				reg:/.{1,20}/,
		 				rightMes:"",
		 				errorMes:"请输入合理坐标"
		 			}
		 		},{
		 			node:".J_Latitude",
		 			defVal:"0.0",
		 			allowNull:false,
		 			checkObj:{
		 				reg:/.{1,20}/,
		 				rightMes:"",
		 				errorMes:"请输入合理坐标"
		 			}
		 		},{
		 			node:".J_Address",
		 			defVal:"请输入检测地点",
		 			allowNull:false,
		 			checkObj:{
		 				reg:/.{1,100}/,
		 				rightMes:"",
		 				errorMes:"地址不能超过50个字"
		 			}
		 		}]
		 }),
		select=new S.AreaSelect(".J_AreaSelect"),
		nEditSubBtn=S.one(".J_EditSubBtn"),
		nAddSubBtn=S.one(".J_AddSubBtn"),
		nNewname=S.one(".J_Name"),
		nLongtitude=S.one(".J_Longtitude"),
		nLatitude=S.one(".J_Latitude"),
		nAddress=S.one(".J_Address"),
		nId=S.one(".J_Id"),
		editSuccess=function(data){
			editWin.hide();
			if (data.isSuccess) {
				S.Win.inform(data.message||"操作成功！");
				onsuccess.call(o);
				
			}else{
				var code=data.code,
					mes=S.ERRORCODE[code];
				S.Win.warn(mes,"修改失败");
			};
		},
		addSuccess=function(data){
			editWin.hide();
			if (data.isSuccess) {
				S.Win.inform(data.message||"添加成功");
				onsuccess.call(o);
			}else{
				var code=data.code,
					mes=S.ERRORCODE[code];
				S.Win.warn(mes,"添加失败");
			};
		};
		nEditSubBtn&&nEditSubBtn.on("click",function(e){
			if(formvalid.valid()){
				var id=nId.val(),
				name=nNewname.val(),
				x=nLongtitude.val(),
				y=nLatitude.val(),
				area=select.getAddress(),
				prov=area.sProv,
				city=area.sCity,
				county=area.sArea,
				address=S.Common.handleStr(nAddress.val(),{
					"trim":true,
					"uri":true
				});
				bts.edit(id,name,x,y,prov,city,county,address,editSuccess);
				}
		});
		nAddSubBtn&&nAddSubBtn.on("click",function(e){
			if(formvalid.valid()){
				var id=nId.val(),
				name=nNewname.val(),
				x=nLongtitude.val(),
				y=nLatitude.val(),
				area=select.getAddress(),
				prov=area.sProv,
				city=area.sCity,
				county=area.sArea,
				address=S.Common.handleStr(nAddress.val(),{
					"trim":true,
					"uri":true
				});
				bts.add(id,name,x,y,prov,city,county,address,addSuccess);
			}
		});
		
	}	
	});
	S.BtsHandle=BtsHandle;
	return BtsHandle;
	
},{
	attach:false,
	requires:['bts','win','validation','common','template','code','areaselect']
});
