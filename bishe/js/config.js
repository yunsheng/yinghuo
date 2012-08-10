KISSY.DZ={
	ROOT:'http://yinghuo.com/',
	BSJSROOT:'http://yinghuo.com/bishe/js/',
	BSCOMMONROOT:'http://yinghuo.com/bishe/js/common/',
	WIDDGETROOT:'http://yinghuo.com/widdget/'
}

KISSY.config({
	 map: [
			 [/(.+bishe\/js\/.+)-min.js(\?[^?]+)?$/, '$1.js$2'],
			 [/(.+bishe\/js\/.+)-min.css(\?[^?]+)?$/, '$1.css$2']
	],
	 packages:[
	 /***===============================
	 * 公用组件
	 =====================================*/
	
   	//公用方法
		{
			name:'common',
	   		path:KISSY.DZ.ROOT+"o/js",
		    tag:'20120324',
			charset:"utf-8"
   	},
   	//轮询
   	{
			name:'comet',
			path:KISSY.DZ.BSCOMMONROOT,
			tag:'20120323',
			charset:"utf-8"
	},
	//表格
	{
			name:'grid',
			path:KISSY.DZ.WIDDGETROOT+"grid/",
			tag:'20120323',
			charset:"utf-8"
	},
	//弹窗
	{
			name:'win',
			path:KISSY.DZ.WIDDGETROOT+"win/",
			tag:'20120323',
			charset:"utf-8"
	},
	//返回顶端
	{
			name:'top',
			path:KISSY.DZ.WIDDGETROOT+"top/",
			tag:'20120323',
			charset:"utf-8"
	},
	//websocket
	{
			name:'socket',
			path:KISSY.DZ.BSCOMMONROOT,
			tag:'20120323',
			charset:"utf-8"
	},
	//全选
    {
        name: "checkall",
        path: KISSY.DZ.WIDDGETROOT+"checkall/",
        tag: "20120324",
        charset: "utf-8"
    },
    //值验证
    {
        name: "check",
        path: KISSY.DZ.WIDDGETROOT + "validation/",
        tag: "20120324",
        charset: "utf-8"
    },
    //表单验证
    {
        name: "validation",
        path: KISSY.DZ.WIDDGETROOT + "validation/",
        tag: "20120324",
        charset: "utf-8"
    },
    //地址管理
    {
        name: "areaselect",
        path: KISSY.DZ.WIDDGETROOT + "area/",
        tag: "20120324",
        charset: "utf-8"
    },
   	 /***===============================
	 * 类
	 =====================================*/
	//记录
 	{
		name:'line',
		path:KISSY.DZ.BSCOMMONROOT,
		tag:'20120323',
		charset:"utf-8"
	},
	//基站
 	{
		name:'bts',
		path:KISSY.DZ.BSCOMMONROOT,
		tag:'20120323',
		charset:"utf-8"
	},
	//计划
 	{
		name:'plan',
		path:KISSY.DZ.BSCOMMONROOT,
		tag:'20120323',
		charset:"utf-8"
	},
	//错误代码
 	{
		name:'code',
		path:KISSY.DZ.BSCOMMONROOT,
		tag:'20120323',
		charset:"utf-8"
	},
	//google 地图
 	{
		name:'map',
		path:KISSY.DZ.BSCOMMONROOT,
		tag:'20120323',
		charset:"utf-8"
	},
	/***===============================
	 * 单独页面
	 =====================================*/
	//记录管理
	{
		name:'record',
		path:KISSY.DZ.BSJSROOT,
		tag:'20120323',
		charset:"utf-8"
	},
	//基站管理
	{
		name:'btshandle',
		path:KISSY.DZ.BSJSROOT,
		tag:'20120323',
		charset:"utf-8"
	},
	//计划管理
	{
		name:'planhandle',
		path:KISSY.DZ.BSJSROOT,
		tag:'20120323',
		charset:"utf-8"
	}
	]
});