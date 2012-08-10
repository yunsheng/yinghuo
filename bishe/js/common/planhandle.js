/**
 * @author dongzhu
 */
KISSY.add("planhandle",function(S){
	/**
	 * @class PlanHandle
	 */
	function PlanHandle(){
		this._init.apply(this,arguments);
	}
	S.augment(PlanHandle,S.EventTarget,{
		_init:function(){
			var self=this;
			self.plan=new S.Plan("../data/plan.php"),
			self.editWin=null;
			self.tForm='<form id="J_ValidForm" method="post"   class="ks-tdform">'+
						'<input type="hidden" class="J_Id" value="{{id}}" id="id" name="id"/>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="btsid" >基站ID：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_BtsId input-text" value="{{btsid}}" id="id" name="btsid"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="agid" >巡检员ID：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" class="J_AgId input-text" value="{{agid}}" id="agid" name="agid"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="start" >开始时间：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" id="start" class="J_Start input-text" value="{{start}}" id="start" name="start"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<div class="input-content default">'+
							'<label class="input-label" for="end" >结束时间：</label>'+
							'<div class="input-wrap">'+
								'<span class="input-border">'+
									'<input type="text" id="end" class="J_End input-text" value="{{end}}" id="end" name="end"/>'+
								'</span>'+
							'</div>'+
							'<span class="input-tip"></span>'+
						'</div>'+
						'<input type="button" class="{{button}} sub button" style="margin-left:245px" value="提交" />'+
					'</form>';

		},
	/**
	 * 添加基站
	 * @memberof S.PlanHandle
	 * @param  btsid 基站id
	 * @param agid 巡检员id
	 * @param start 开始时间
	 * @param end 结束时间
	 * @param onsuccess
	 * @param o 上下文
	 */
	add:function(id,btsid,agid,start,end,onsuccess,o){
		var self=this,
		tForm=self.tForm;
		var winContent=S.Template(tForm).render({
			id:id||"",
			btsid:btsid||"",
			agid:agid||"",
			start:"",
			end:"",
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
	 * 编辑计划
	 * @param id 计划id
	 ** @param  btsid 基站id
	 * @param agid 巡检员id
	 * @param start 开始时间
	 * @param end 结束时间
	 * @param onsuccess
	 */
	edit:function(id,btsid,agid,start,end,onsuccess,o){
		var self=this,
		tForm=self.tForm;
		var winContent=S.Template(tForm).render({
			id:id||"",
			btsid:btsid||"",
			agid:agid||"",
			start:start||"",
			end:end||"",
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
	 * 删除计划
	 * @param id 被编辑计划的id
	 */
	del:function(id,onsuccess,o){
		var self=this,
		plan=self.plan;
		 S.Win.confirm("您确定要删除本条计划信息吗？","警告",function(){
		 	plan.del(id,function(data){
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
	 * 执行计划
	 * @param id 编辑计划的id
	 * @param onsuccess 回调函数
	 */
	done:function(id,onsuccess){
		var self=this,
		plan=self.plan;
		plan.done(id,onsuccess);
	},
	/**
	 * 表单处理
	 * @param id 编辑计划的id
	 * @param onsuccess 回调函数
	 */
	valid:function(id,onsuccess,o){
		var self=this,
		editWin=self.editWin,
		plan=self.plan,
		formvalid=new S.Validation("#J_ValidForm",{
		 		list:[{
		 			node:".J_BtsId",
		 			defVal:"请输入基站id",
		 			allowNull:false
		 		},{
		 			node:".J_AgId",
		 			defVal:"请输入巡检员id",
		 			allowNull:false
		 		},{
		 			node:".J_Start",
		 			allowNull:true
		 		},{
		 			node:".J_End",
		 			allowNull:true
		 		}]
		 }),
		startCalendar=self.calendar('#start'),
		nStart=S.one(".J_Start"),
		endCalendar=self.calendar('#end'),
		nEnd=S.one(".J_End"),
		nEditSubBtn=S.one(".J_EditSubBtn"),
		nAddSubBtn=S.one(".J_AddSubBtn"),
		nId=S.one(".J_PaId"),
		nBtsId=S.one(".J_BtsId"),
		nAgId=S.one(".J_AgId"),
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
				btsid=nBtsId.val(),
				agid=nAgId.val(),
				start=nStart.val(),
				end=nEnd.val();
				plan.edit(id,btsid,agid,start,end,editSuccess);
				}
		});
		nAddSubBtn&&nAddSubBtn.on("click",function(e){
			if(formvalid.valid()){
				var btsid=nBtsId.val(),
				agid=nAgId.val(),
				start=nStart.val(),
				end=nEnd.val();
				plan.add(btsid,agid,start,end,addSuccess);
			}
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
	S.PlanHandle=PlanHandle;
	return PlanHandle;
	
},{
	attach:false,
	requires:['plan','win','validation','common','template',"calendar", "calendar/assets/base.css",'code']
});
