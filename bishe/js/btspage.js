KISSY.use('grid,sizzle,common,comet,top,btshandle', function (S, Grid) {
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
    startComet=function(){
    	handleLogin(comet.start,comet);
    },
    endComet=function(){
    	comet.stop();
    },
    addBts=function(){
    	comet.stop();
    	handleLogin(btsHandle.add,["","","","","","","","",comet.start,comet],btsHandle);
    },
    eidtBts=function(){
    	comet.stop();
    	handleLogin(function(){
    		var selected=grid.getSelected();
             if(selected){
             	btsHandle.edit(selected["BTS_ID"],selected["BTS_NAME"],selected["BTS_LO"],selected["BTS_LA"],selected["BTS_PROV"],selected["BTS_CITY"],selected["BTS_COUNTY"],selected["BTS_ADDRESS"],function(){
             		comet.start();
             	});
             }else{
             	S.Win.warn("请选中要编辑的基站");
             }
    	});
   },
   delBts=function(){
   		handleLogin(function(){
    		var selected=grid.getSelected();
            if(selected){
             	btsHandle.del(selected["BTS_ID"]);
             }else{
             	S.Win.warn("请选中要删除的基站");
             }
    	});
   },
    store = new Grid.Store({
        autoLoad: false
    }),
    //编辑
    btsHandle=new S.BtsHandle(),
    config = {
        renderTo: 'J_async_grid',
        columns: [{
            title: '基站ID',
            width: 120,
            sortable: true,
            dataIndex: 'BTS_ID'
        },{
            title: '基站名',
            width: 200,
            sortable: true,
            dataIndex: 'BTS_NAME'
        },
        {
            title: '经度',
            sortable: true,
            width: 80,
            dataIndex: 'BTS_LO'
        },
        {
            title: '纬度',
            sortable: true,
            width: 80,
            dataIndex: 'BTS_LA'
        },
        {
            title: '省',
            sortable: true,
            width: 80,
            dataIndex: 'BTS_PROV'
        },
        {
            title: '市',
            sortable:true,
            width: 80,
            dataIndex: 'BTS_CITY'
        },
        {
            title: '区/县',
            sortable:true,
            width: 80,
            dataIndex: 'BTS_COUNTY'
        },
        {
            title: '详细地点名称',
            sortable: true,
            width: 200,
            dataIndex: 'BTS_ADDRESS'
        }],
        loadMask: true,
        store: store,
        tbar: {
            buttons: [{
                id: 'add',
                text: '添加基站',
                handler: function () {
                  addBts();
                },
                css: 'J_AddBts bar-btn-add'
            },{
                id: 'edit',
                text: '修改选中基站',
                handler: function () {
                  	eidtBts();
                },
                css: 'J_EidtBts bar-btn-create'
            },{
                id: 'del',
                text: '删除选中基站',
                handler: function () {
                  	delBts();
                },
                css: 'J_EidtBts bar-btn-close'
            }]
        }
    }, 
    grid = new Grid.Grid(config),
	comet=new S.Comet({
		url:'../data/bts.php',
		interval:10,
		data:{
			type:"getall"
		},
		timeout:10,
		type:'POST',
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