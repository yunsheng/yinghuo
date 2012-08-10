/**
 * @author dongzhu
 */
KISSY.add("comet",function(S){
	/**
	 * 轮询
	 * @constructor
	 * @class S.Comet
	 * @param cfg 
	 * <br/>-url {url } 轮询地址
	 * <br/>-data  {object} 轮询参数
	 * <br/>-timeout {number} 超时时间（单位：秒）
	 * <br/>-interval {number}  时间间隔（单位：秒）
	 * <br/>-success {function} 成功回调函数
	 * <br/>-fail {function} 失败回调函数
	 */
	function Comet(){
		this._init.apply(this,arguments);
	};
	S.augment(Comet,S.EventTarget,{
		_init:function(cfg){
			var self=this,
			NOOP=function(){},
			config=cfg;
			self.cometUrl=config.url;
			self.type=config.type||"get";
			self.interval=config.interval===0?0:config.interval*1000||3000;
			self.timeout=config.timeout||30;
			self.data=config.data||{},
			self.success=config.success||NOOP,
			self.state=false;
			self.fail=config.fail||NOOP;
		},
		/**
		 * 发送ajax请求
		 * @memberOf S.Comet
		 */
		send:function(){
			var self=this,
			url=self.cometUrl,
			timeout=self.timeout,
			type=self.type,
			data=self.data,
			cfg={
				url:url,
				type:type,
				dataType:'json',
				data:data,
				cache:false,
				timeout:timeout,
				success:function(data){
					var isSuccess=data.isSuccess,
					isUpdate=data.isUpdate,
					lasttime=data.lasttime;
					result=data.result;
					if(lasttime){
						S.log("lasttime:"+lasttime);
						self.data.lasttime=lasttime;
					}
					isSuccess&&isUpdate?self._sucFn(result):self._failFn(result);
				},
				error:function(o,textStatus){
					self._failFn(textStatus);
				}
			};
			self.fire("beginsend");
			if(self.state){
				S.log("a new comet is sending,please wait");
				S.Common.ajax(cfg);
			}
			 return this;
		},
		/**
		 * 成功回调函数
		 * @private
		 */
		_sucFn:function(data){
			S.log("ok,the comet succeed!");
			var self=this,
			secs=self.interval,
			success=self.success;
			
			self.fire("success",{
				result:data
			});
			success(data);
			self.state&&S.later(self.send,secs,false,self);
		},
		_failFn:function(errMess){
			S.log("sorry,but the comet failed becase of "+errMess+"!");
			var self=this,
			secs=self.interval,
			fail=self.fail;
			self.fire("error",{
				result:errMess
			});
			fail(errMess);
			self.state&&S.later(self.send,secs,false,self);
		},
		stop:function(){
			var self=this,
			state=self.state;
			//state标志，以便于系统判断是否要发送请求
			if(state){
				self.state=false;
				S.log("comet is stoped!");
				self.fire("stop");
			}
			return this;
		},
		start:function(){
			var self=this,
			state=self.state;
			//state标志，以便于系统判断是否要发送请求
			if(!state){
				self.state=true;
				S.log("comet is started!");
				self.fire("start");
				self.send();
			}
			return this;
		}
		
	});
	S.Comet=Comet;
	return Comet;
},{
	attach:false,
	requires:['sizzle','common']
})
