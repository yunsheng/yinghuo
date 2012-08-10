/**
 * @author dongzhu
 */
KISSY.add("record",function(S){
	/**
	 * @class Record
	 */
	function Record(){
		this._init.apply(this,arguments);
	}
	S.augment(Record,S.EventTarget,{
		_init:function(){
			var self=this;
			self.line=new S.Line("../data/line.php"),
			self.editWin=null;
			self.tForm='<form id="J_ValidForm" method="post" action="../data/line.php"  class="ks-tdform">'+
						'<div class="input-content default">'+
							'<label class="input-label" for="name" >测试人员：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Name input-text" value="{{name}}" id="name" name="name"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="xcoord" >经度：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Xcoord input-text" value="{{xcoord}}" id="xcoord" name="xcoord"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="ycoord" >纬度：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Ycoord input-text" value="{{ycoord}}" id="ycoord" name="ycoord"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="ycoord" >检测地点：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Address input-text" value="{{address}}" id="address" name="address"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="ctime" >创建时间：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_Ctime input-text" value="{{ctime}}" id="ctime" name="ctime"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<input type="button" class="{{button}} sub button" style="margin-left:245px" value="提交" />'+
					'</form>';

		},
	/**
	 * 添加文章
	 * @param name  巡检员名称
	 * @param x 北纬
	 * @param y 东经
	 * @param ctime 创建时间
	 * @param address  地址
	 * @param onsuccess
	 * @param o 上下文
	 */
	add:function(name,x,y,ctime,address,onsuccess,o){
		var self=this,
		tForm=self.tForm;
		var winContent=S.Template(tForm).render({
			name:name||'请输入检测员ID',
			xcoord:x||'0.0',
			ycoord:y||'0.0',
			address:address||"请输入检测地点",
			ctime:ctime||S.Date.format(new Date(),"yyyy-mm-dd HH:MM:ss"),
			button:'J_AddSubBtn'
		});
		self.editWin=new S.Win("#J_Edit_win",{
			width:500,
			height:280,
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
	edit:function(id,name,x,y,ctime,address,onsuccess,o){
		var self=this,
		tForm=self.tForm;
		var winContent=S.Template(tForm).render({
			name:name,
			xcoord:x,
			ycoord:y,
			address:address,
			ctime:ctime,
			button:'J_EditSubBtn'
		});
		self.editWin=new S.Win("#J_Edit_win",{
			width:500,
			height:280,
			content:winContent
		});
		self.editWin.show();
		self.valid(id,onsuccess,o);
	},
	/**
	 * 删除文章
	 * @param id 被编辑文章的id
	 * @param onsuccess
	 * @param o 上下文
	 */
	del:function(id,onsuccess,o){
		var self=this,
		line=self.line;
		 S.Win.confirm("您确定要删除本条记录信息吗？","警告",function(){
		 	line.del(id,function(data){
		 		if (data.isSuccess) {
		 			S.Win.inform("成功删除"); 
		 			onsuccess.call(o);
		 			
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
		line=self.line,
		formvalid=new S.Validation("#J_ValidForm",{
		 		list:[{
		 			node:".J_Name",
		 			defVal:"请输入检测员ID",
		 			allowNull:false
		 		},{
		 			node:".J_Xcoord",
		 			defVal:"0.0",
		 			allowNull:false,
		 			checkObj:{
		 				reg:/.{1,20}/,
		 				rightMes:"",
		 				errorMes:"请输入合理坐标"
		 			}
		 		},{
		 			node:".J_Ycoord",
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
		 		},{
		 			node:".J_Ctime",
		 			defVal:"2012-01-01 00:00:00",
		 			allowNull:true
		 		}]
		 }),
		calendar=self.calendar('#ctime'),
		nEditSubBtn=S.one(".J_EditSubBtn"),
		nAddSubBtn=S.one(".J_AddSubBtn"),
		nNewname=S.one(".J_Name"),
		nXcoord=S.one(".J_Xcoord"),
		nYcoord=S.one(".J_Ycoord"),
		nAddress=S.one(".J_Address"),
		nCtime=S.one(".J_Ctime"),
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
				var name=nNewname.val(),
					x=nXcoord.val(),
					y=nYcoord.val(),
					ctime=nCtime.val(),
					address=S.Common.handleStr(nAddress.val(),{
						"trim":true,
						"uri":true
					});
					line.edit(id,name,x,y,ctime,address,editSuccess);
				}
		});
		nAddSubBtn&&nAddSubBtn.on("click",function(e){
			if(formvalid.valid()){
				var name=nNewname.val(),
					x=nXcoord.val(),
					y=nYcoord.val(),
					ctime=nCtime.val(),
					address=S.Common.handleStr(nAddress.val(),{
						"trim":true,
						"uri":true
					});
				line.add(name,x,y,ctime,address,addSuccess);
			}
		});
		editWin.on("hide",function(){
			calendar.destroy();
		});
	},
        /**
    	 * 日历控件绑定
    	 * @function
    	 * @name CourseAdd#calendar
    	 * @required gallery-calendar
    	 * @param {string} id 表单ID
    	 */
        calendar: function (id) {
            var _time = new S.Calendar(id, {
                popup: true,
                showTime: true,
                action: ['click']
            });
            _time.on('timeSelect', function (e) {
                var o = e.date,
                formatTime=S.Date.format(o,"yyyy-mm-dd HH:MM:ss");
                S.one(id).val(formatTime);
                _time.hide();
            });
            _time.destroy=function(){
            	_time.con.remove();
				_time=null;
            }
            return _time;
        }
		
	});
	S.Record=Record;
	return Record;
	
},{
	attach:false,
	requires:['line','win','validation','common','template',"calendar", "calendar/assets/base.css",'code']
});
