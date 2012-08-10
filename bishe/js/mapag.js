/**
 * @author DZ
 */
var LOGIN_BACK;
KISSY.use("map,top,comet,record,planhandle",function(S){
	var latlng = new google.maps.LatLng(38.51, 115.30),
	mapCanvas=document.getElementById("map"),
	myOptions={
      zoom: 10,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    href=new S.Common.href(),
    agid=href.get("agid")||"1000",
    tInfoContent='<div class="infoWin">{{con}}</div><span class="J_InfoPrev">上一地点</span><span class="J_InfoNext">下一地点</span>',
    cfg={
    	node:mapCanvas,
    	options:myOptions,
    	rightclick:function(e){
    		comet2.stop();
    		var latlng=e.latLng;
    		record.add(agid,latlng["$a"],latlng["ab"],null,null,comet2.start,comet2);
    	}
    },
    request=new S.Common.href(),
    agid=request.get("agid")||1000,
    map=new S.Map(cfg),
    comet1=new S.Comet({
		url:'../data/agency.php',
		interval:0,
		timeout:60,
		type:"post",
		data:{
			agid:agid,
			timeout:60,
			type:"getag",
			agid:agid
		},
		success:function(data){
			var dataLen=data.length,
			lastIndex=dataLen-1;
			var group=map.addGroup("bts");
			var btsarr={};
			//重新绘制marker
			S.each(data,function(val,index,o){
				 var position=[val["BTS_LA"],val["BTS_LO"]],
				 btsid=val["BTS_ID"],
				 paid=val["PA_ID"],
				 title=val["BTS_NAME"],
				 isDone=val["PA_DONE"],
				 start=val["PA_START"],
				 end=val["PA_END"],
				 time=val["PA_TIME"],
				 icon=isDone==="1"?"http://yinghuo.com/q/jzdone.png":"http://yinghuo.com/q/jztodo.png",
				 address=val["BTS_ADDRESS"]||"",
				 content=isDone==="1"?(function(){
				 	var string='<h1>'+title+'</h1>'+
				 	"位于"+address+
				 	'<p>'+'上次巡检时间：'+time+'</p>'+
				 	"<p  style='margin-top:10px;'><a style='color:red;' target='_blank' href='plan.php?btsid="+btsid+"'>查看基站维护记录</a></p>";
				 	return string;
				 })():(function(){
				 	var string='<h1>'+title+'</h1>'+
				 	"<p>位于"+address+'</p>'+
				 	'<p>计划巡检时间：'+start+'~'+end+'</p>'+
				 	'<a class="J_Todo" style="color:green; cursor:pointer" paid="'+paid+'">现在去巡检</a>'+
				 	"<p  style='color:#ccc;cursor:pointer;margin-top:10px;'><a style='color:red;' target='_blank' href='plan.php?btsid="+btsid+"'>查看基站维护记录</a></p>";
					return string;
				})(),
				 opt={
				 	position:position,
				 	title:title,
				 	icon:icon,
				 	group:group,
				 	infoWin:{
				 		content:content,
				 		group:group,
				 		later:2000,
				 		open:function(win,index){
				 			var todoBtn=S.all(".J_Todo");
				 			todoBtn&&todoBtn.on("click",function(e){
			 					comet2.stop();
							    var tar=S.one(e.currentTarget),
							    id=tar.attr("paid");
							    S.Win.confirm("您确定要现在派遣巡检员执行任务吗？","警告",function(){
							    		var planHandle=new S.PlanHandle();
									 	planHandle.done(id,function(data){
									 		if (data.isSuccess) {
									 			S.Win.inform("巡检完毕"); 
									 			comet2.start();
									 		} else{
									 			S.Win.warn(data.message,"未完成巡检");
										 	};
									 	});
									 });
							  });
				 		}
				 	},
				 	handle:function(m,e){
				 		var latlng=e.latLng;
				 		map.center(latlng);
				 		map.larger();
				 	}
				 };
				 if(btsid in btsarr){
				 	
				 }else{
				 	btsarr[btsid]=btsid;
					 //添加锚点
					map.addMark(opt);
				 }
				 
			});			
			
		},
		fail:function(mes){
			if(mes=="未登录"){
				LOGIN_BACK=function(data){
					S.Common.loginBack(data);
				}
				S.Common.userLogin(true,"LOGIN_BACK");
			}
		}
	}),
	comet2=new S.Comet({
		url:'../data/linecomet.php',
		interval:0,
		timeout:30,
		data:{
			agid:agid,
			timeout:30,
		},
		success:function(data){
			var dataLen=data.length,
			lastIndex=dataLen-1;
			var group=map.addGroup("line");
			comet1.start().stop();
			//绘制marker
			S.each(data,function(val,index,o){
				 var position=[val["y"],val["x"]],
				 title=val["agid"],
				 address=val["address"]||"",
				 ctime=val["ctime"],
				 conCommon="<span class='address'>"+address+"</span>"+ctime+'<p><a target="_blank" href="line.php?type=getag&agid='+agid+'">查看所有足迹<a/></p>',
				 conFirst=conCommon+"<span class='first'>首次监测地点</span>",
				 conLast=conCommon+"<span class='last'>最近监测地点</span>",
				 con=index===0?conFirst:(index===lastIndex?conLast:conCommon),
				 content=tInfoContent.replace(/{{con}}/g,con),
				 opt={
				 	position:position,
				 	title:title,
				 	group:group,
				 	icon:"http://yinghuo.com/q/xjy.png",
				 	infoWin:{
				 		content:content,
				 		group:group,
				 		later:2000,
				 		open:function(win,index){
				 			//事件绑定
							 var nPrev=S.all(".J_InfoPrev"),
							 length=group.infoWin.length;
							 nNext=S.all(".J_InfoNext");
							 //下一个
							 nNext.on("click",function(e){
						 		var next=index+1,
						 		nextInfoWin=group.infoWin[next],
						 		position=nextInfoWin.getPosition();
						 		win.close();
						 		map.center(position);
						 		nextInfoWin.open(map.map);	
							 });
							 //上一个
							 nPrev.on("click",function(e){
						 		var prev=index-1,
						 		prevInfoWin=group.infoWin[prev],
						 		position=prevInfoWin.getPosition();
						 		win.close();
						 		prevInfoWin.open(map.map);
						 		map.center(position);					 		
							 });
							if(index==0){
							 	nPrev.addClass("dn").detach("click");
							 } 
							 if(index==length-1){
							 	nNext.addClass("dn").detach("click");
							 }
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
			//显示路径
			group.polyLine=map.drawLine(group.path);
			 //如果有记录，让地图显示在最后一个锚点
			 if(group.mark.length!=0){
			 	 var last=group.mark.length-1,
			 	 lastMark=group.mark[last],
				 lastLat=lastMark.getPosition();
				 map.center(lastLat);
				 //提示最后更新信息
				 var lastInfo=group.infoWin[last];
				 lastInfo.open(map.map);
			 }

		},
		fail:function(mes){
			if(mes=="未登录"){
				LOGIN_BACK=function(data){
					S.Common.loginBack(data);
					comet2.start();
				}
				S.Common.userLogin(true,"LOGIN_BACK");
				comet2.stop();
			}
		}
	}),
	record=new S.Record(); 
	comet1.start().stop();
	comet2.start();
});
console.log("hello");