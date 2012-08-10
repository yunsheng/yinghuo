/**
 * @author DZ
 */
var LOGIN_BACK;
KISSY.use("map,top,comet,record",function(S){
	var latlng = new google.maps.LatLng(38.51, 115.30),
	mapCanvas=document.getElementById("map"),
	myOptions={
      zoom: 8,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    },
    href=new S.Common.href(),
    tInfoContent='<div class="infoWin">{{con}}</div><span class="J_InfoPrev">上一地点</span><span class="J_InfoNext">下一地点</span>',
    name=href.get("name")||"d",
    cfg={
    	node:mapCanvas,
    	options:myOptions,
    	rightclick:function(e){
    		comet.stop();
    		var latlng=e.latLng;
    		S.log(latlng);
    		record.add(name,latlng["cb"],latlng["ab"],null,null,comet.start,comet);
    	}
    },
    map=new S.Map(cfg),
    comet=new S.Comet({
		url:'../data/poll.php',
		interval:5,
		timeout:5,
		data:{
			name:name,
			timeout:5
		},
		success:function(data){
			var dataLen=data.length,
			lastIndex=dataLen-1;
			map.redraw();
			//重新绘制marker
			S.each(data,function(val,index,o){
				 var position=[val["x"],val["y"]],
				 title=val["name"],
				 address=val["address"]||"",
				 ctime=val["ctime"],
				 conCommon="<span class='address'>"+address+"</span>"+ctime,
				 conFirst=conCommon+"<span class='first'>首次监测地点</span>",
				 conLast=conCommon+"<span class='last'>最近监测地点</span>",
				 con=index===0?conLast:(index===lastIndex?conFirst:conCommon),
				 content=tInfoContent.replace(/{{con}}/g,con),
				 opt={
				 	position:position,
				 	title:title,
				 	infoWin:{
				 		content:content,
				 		later:2000,
				 		open:function(win,index){
				 			//事件绑定
							 var nPrev=S.all(".J_InfoPrev"),
							 length=map.infoWin.length;
							 nNext=S.all(".J_InfoNext");
							 //下一个
							 nNext.on("click",function(e){
						 		var next=index-1,
						 		nextInfoWin=map.infoWin[next],
						 		position=nextInfoWin.getPosition();
						 		win.close();
						 		map.center(position);
						 		nextInfoWin.open(map.map);	
							 });
							 //上一个
							 nPrev.on("click",function(e){
						 		var prev=index+1,
						 		prevInfoWin=map.infoWin[prev],
						 		position=prevInfoWin.getPosition();
						 		win.close();
						 		prevInfoWin.open(map.map);
						 		map.center(position);					 		
							 });
							if(index==0){
							 	nNext.addClass("dn").detach("click");
							 } 
							 if(index==length-1){
							 	nPrev.addClass("dn").detach("click");
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
			 //让地图显示在最后一个锚点
			 var lastMark=map.mark[0],
			 lastLat=lastMark.getPosition();
			 map.center(lastLat);
			 //提示最后更新信息
			 var lastInfo=map.infoWin[0];
			 lastInfo.open(map.map);
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
	}),
	record=new S.Record(); 
    comet.start();
   
});
