/**
 * @author DZ
 */
var LOGIN_BACK;
KISSY.use("map,top,comet,btshandle,areaselect",function(S){
	//处理登陆判断及回调函数
	//@param:callback:回调函数
	//@param:obj：上下文
    var handleLogin=function(callback,args,obj){
    	 LOGIN_BACK=function(data){
			sucFun(data,true);
		};
		var sucFun=function(data,isLoginback){
			if(data&&data.isLogin){
				if(isLoginback){
					S.Common.loginBack(data);
				}
				obj&&S.isObject(obj)?callback.apply(obj,args):callback(args);
			}
		},
		failFun=function(){
			S.Common.userLogin(true,"LOGIN_BACK");
		};
		S.Common.isLogin(sucFun,failFun);
    },
    latlng = new google.maps.LatLng(38.51, 115.30),
	mapCanvas=document.getElementById("map"),
	myOptions={
      zoom: 10,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    href=new S.Common.href(),
     name=href.get("name")||"d",
    cfg={
    	node:mapCanvas,
    	options:myOptions,
    	rightclick:function(e){
    		var latlng=e.latLng;
    		 comet.stop();
    		 handleLogin(btsHandle.add,["","",latlng["ab"],latlng["$a"],"","","","",comet.start,comet],btsHandle);
    	}
    },
    btsHandle=new S.BtsHandle(),
    map=new S.Map(cfg),
    comet=new S.Comet({
		url:'../data/bts.php',
		interval:600,
		timeout:5,
		type:"post",
		data:{
			name:name,
			timeout:5,
			type:"getall"
		},
		success:function(data){
			var dataLen=data.length,
			lastIndex=dataLen-1,
			group=map.group.bts={
				path:[],
				infoWin:[],
				mark:[]
			};
			//重新绘制marker
			S.each(data,function(val,index,o){
				 var position=[val["BTS_LA"],val["BTS_LO"]],
				 id=val["BTS_ID"],
				 title=val["BTS_NAME"],
				 address=val["BTS_ADDRESS"]||"",
				 content='<h1>'+title+'</h1>'+"位于"+address+"<p  style='color:#ccc;cursor:pointer;margin-top:10px;'><a style='color:red;' target='_blank' href='plan.php?btsid="+id+"'>查看基站维护记录</a></p>",
				 opt={
				 	position:position,
				 	title:title,
				 	group:group,
				 	icon:"http://yinghuo.com/q/jzall.png",
				 	infoWin:{
				 		content:content,
				 		later:2000,
				 		group:group,
				 		open:function(win,index){
				 			
				 		}
				 	},
				 	handle:function(m,e){
				 		var latlng=e.latLng;
				 		map.center(latlng);
				 		map.larger();
				 	}
				 };
				 //添加锚点
				 map.addMark(opt);
				
			});
			 //让地图显示在最后一个锚点
			  //如果有记录，让地图显示在最后一个锚点
			 if(group.mark.length!=0){
			 	 var lastMark=group.mark[0],
				 lastLat=lastMark.getPosition();
				 map.center(lastLat);
			 }
		},
		fail:function(mes){
			if(mes=="未登录"){
				LOGIN_BACK=function(data){
					S.Common.loginBack(data);
					comet.start();
				}
				S.Common.userLogin(true,"LOGIN_BACK");
				comet.stop();
			}
		}
	});
    comet.start();
   
});
