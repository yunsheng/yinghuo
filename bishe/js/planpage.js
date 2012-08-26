KISSY.use('grid,sizzle,common,comet,top,planhandle', function (S, Grid) {
	//处理登陆判断及回调函数
	//@param:callback:回调函数
	//@param args参数
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
    addPlan=function(){
    	comet.stop();
    	handleLogin(planHandle.add,["",btsid,agid,"","",comet.start,comet],planHandle);

    },
    eidtPlan=function(){
    	comet.stop();
    	handleLogin(function(){
    		var selected=grid.getSelected();
             if(selected){
             	planHandle.edit(selected["PA_ID"],selected["BTS_ID"],selected["AG_ID"],selected["PA_START"],selected["PA_END"],comet.start,comet);
             }else{
             	S.Win.warn("请选中要编辑的计划");
             }
    	});
   },
   delPlan=function(){
   		comet.stop();
   		handleLogin(function(){
    		var selected=grid.getSelected();
            if(selected){
             	planHandle.del(selected["PA_ID"],comet.start,comet);
             }else{
             	S.Win.warn("请选中要删除的计划");
             }
    	});
   },
   //执行计划
   donePlan=function(){   	
		comet.stop();
		handleLogin(function(){
		    var selected=grid.getSelected();
		    S.Win.confirm("您确定要现在派遣巡检员执行任务吗？","警告",function(){
				 	planHandle.done(selected["PA_ID"],function(data){
				 		if (data.isSuccess) {
				 			S.Win.inform("巡检完毕"); 
				 			comet.start();
				 		} else{
				 			S.Win.warn(data.message,"未完成巡检");
					 	};
				 	});
				 });
		  });
   },
   request=new S.Common.href(),
   btsid=request.get("btsid"),
   agid=request.get("agid"),
   type=request.get("type")||"getbts",
    store = new Grid.Store({
        autoLoad: false
    }),
    //编辑
    planHandle=new S.PlanHandle(),
    config = {
        renderTo: 'J_async_grid',
        title:"ddd",
        columns: [{
            title: '计划ID',
            width: 70,
            sortable: true,
            dataIndex: 'PA_ID'
        },{
            title: '基站ID',
            width: 70,
            sortable: true,
            dataIndex: 'BTS_ID'
        },
        {
            title: '巡检员ID',
            sortable: true,
            width: 70,
            dataIndex: 'AG_ID'
        },
        {
            title: '开始时间',
            sortable: true,
            width: 160,
            dataIndex: 'PA_START'
        },
        {
            title: '截止时间',
            sortable: true,
            width: 160,
            dataIndex: 'PA_END'
        },
        {
            title: '是否已巡检',
            sortable:true,
            width: 70,
            dataIndex: 'PA_DONE',
            renderer:function(val){
            	return val=="0"?"否":"是"
            }
        },
        {
            title: '实际巡检时间',
            sortable:true,
            width: 160,
            dataIndex: 'PA_TIME'
        },
        {
            title: '操作',
            sortable: true,
            width: 160,
            dataIndex: 'PA_DONE',
            renderer:function(val){
            	var undoneHtml="<a class='btn J_Xunjian'>去巡检</>",
            	doneHtml="<a href='detail.php?paid="+"' class='btn J_Show'>查看巡检详情<a/>",
            	html= val=="0"?undoneHtml:doneHtml;
            	return html;
            }
        }],
        loadMask: true,
        store: store,
        tbar: {
            buttons: [{
                id: 'add',
                text: '添加计划',
                handler: function () {
                  addPlan();
                },
                css: 'J_AddPlan bar-btn-add'
            },{
                id: 'edit',
                text: '修改选中计划',
                handler: function () {
                  	eidtPlan();
                },
                css: 'J_EidtPlan bar-btn-create'
            },{
                id: 'del',
                text: '删除选中计划',
                handler: function () {
                  	delPlan();
                },
                css: 'J_EidtPlan bar-btn-close'
            }]
        }
    }, 
    grid = new Grid.Grid(config),
	comet=new S.Comet({
		url:'../data/plan.php',
		interval:60,
		data:{
			type:type,
			btsid:btsid,
			agid:agid
		},
		timeout:5,
		type:'POST',
		success:function(data){
			store.setResult(data);
			var nXunjian=S.all(".J_Xunjian");
			nXunjian&&nXunjian.on("click",function(e){
				 donePlan();
			});
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