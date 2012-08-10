KISSY.use('grid,sizzle,common,comet,top,record', function (S, Grid) {
	//处理登陆判断及回调函数
	//@param:callback:回调函数
	//@param:obj：上下文
    var handleLogin=function(callback,obj){
    	 LOGIN_BACK=function(data){
    	 	
			sucFun(data,true);
		};
		var sucFun=function(data,isLoginback){
			if(data&&data.isLogin){
				if(isLoginback){
					
					S.Common.loginBack(data);
				}
				obj&&S.isObject(obj)?callback.apply(obj):callback();
			}
		},
		failFun=function(){
			S.Common.userLogin(true,"LOGIN_BACK");
		};
		S.Common.isLogin(sucFun,failFun);
    },
    startComet=function(){
    	handleLogin(comet.start,comet);
    },
    endComet=function(){
    	comet.stop();
    },
    addRecord=function(){
    	comet.stop();
    	handleLogin(record.add,record);

    },
    eidtRecord=function(){
    	comet.stop();
    	handleLogin(function(){
    		var selected=grid.getSelected();
             if(selected){
             	record.edit(selected["id"],selected["name"],selected["x"],selected["y"],selected["ctime"]);
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
             	record.del(selected["id"]);
             }else{
             	S.Win.warn("请选中要删除的记录");
             }
    	});
   },
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
            width: 80,
            dataIndex: 'x'
        },
        {
            title: '东经',
            sortable: true,
            width: 80,
            dataIndex: 'y'
        },
        {
            title: '地点名称',
            sortable: true,
            width: 200,
            dataIndex: 'address'
        },{
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
                text: '开始轮询',
                handler: function () {
                   startComet();
                },
                css: 'J_StartComet bar-btn-export'
            },{
                id: 'end',
                text: '结束轮询',
                handler: function () {
                	endComet();
                   
                },
                css: 'J_StopComet bar-btn-export'
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
		url:'../data/comet.php',
		interval:0,
		timeout:30,
		data:{
			name:"d",
			timeout:30
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
	
});