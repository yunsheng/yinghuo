KISSY.use('grid,sizzle,common,comet,top,record', function (S, Grid) {
	//处理登陆判断及回调函数
	//@param:callback:回调函数
	//@param:obj：上下文
    var handleLogin=function(callback,args,obj){
    	 LOGIN_BACK=function(data){
    	 	
			sucFun(data,true);
		};
		var sucFun=function(data,isLoginback){
				if(isLoginback){
					
					S.Common.loginBack(data);
				}
				obj&&S.isObject(obj)?callback.apply(obj,args):callback(args);
		},
		failFun=function(){
			S.Common.userLogin(true,"LOGIN_BACK");
		};
		S.Common.isLogin(sucFun,failFun);
    },
    addRecord=function(){
    	handleLogin(record.add,[agid,"","","","",comet.start,comet],record);
    },
    eidtRecord=function(){
    	comet.stop();
    	handleLogin(function(){
    		var selected=grid.getSelected();
             if(selected){
             	record.edit(selected["id"],selected["name"],selected["x"],selected["y"],selected["ctime"],selected["address"],comet.start,comet);
             
             }else{
             	S.Win.warn("请选中要编辑的记录");
             }
    	});
   },
   delRecord=function(){
   	    comet.stop();
   		handleLogin(function(){
   			
    		var selected=grid.getSelected();
            if(selected){
             	record.del(selected["id"],comet.start,comet);
             }else{
             	S.Win.warn("请选中要删除的记录");
             }
    	});
   },
   href=new S.Common.href(),
    agid=href.get("agid")||"1000",
    store = new Grid.Store({
        autoLoad: false
    }),
    //编辑
    record=new S.Record(),
    config = {
        renderTo: 'J_async_grid',
        columns: [{
            title: '巡检员',
            width: 100,
            sortable: true,
            dataIndex: 'name'
        },
        {
            title: '北纬',
            sortable: true,
            width: 120,
            dataIndex: 'x'
        },
        {
            title: '东经',
            sortable: true,
            width:120,
            dataIndex: 'y'
        },
        {
            title: '地点名称',
            sortable: true,
            width: 200,
            dataIndex: 'address'
        },
        {
            title: '创建时间',
            sortable: true,
            width: 200,
            dataIndex: 'ctime'
        },
        {
            title: '更新时间',
            sortable:true,
            width: 200,
            dataIndex: 'utime'
        }],
        loadMask: true,
        store: store,
        tbar: {
            buttons: [{
                id: 'start',
                text: '实时跟踪',
                handler: function () {
                   window.open("map-ag.php?agid="+agid+"&type=getag");
                },
                css: 'J_StartComet bar-btn-export'
            },{
                id: 'add',
                text: '添加记录',
                handler: function () {
                  addRecord();
                },
                css: 'J_AddRecord bar-btn-add'
            },{
                id: 'edit',
                text: '修改选中记录',
                handler: function () {
                  	eidtRecord();
                },
                css: 'J_EidtRecord bar-btn-create'
            },{
                id: 'del',
                text: '删除选中记录',
                handler: function () {
                  	delRecord();
                },
                css: 'J_EidtRecord bar-btn-close'
            }]
        }
    }, 
    grid = new Grid.Grid(config),
	comet=new S.Comet({
		url:'../data/poll.php',
		interval:10,
		timeout:5,
		data:{
			name:agid
		},
		success:function(data){
			store.setResult(data);
		},
		fail:function(mes){
			if(mes=="未登录"){
				S.Common.userLogin(true,"LOGIN_BACK");
				comet.stop();
			}
		}
	}); 
	comet.start();
});