/**
 * config配置文件
 * @author liuchaowu.pt
 */

var CHARSET = "utf-8",
DZ_JSROOT = "http://yinghuo.com/";
KISSY.config({
    map: [[/(.+widdget\/.+)-min.js(\?[^?]+)?$/, "$1.js$2"], [/(.+widdget\/.+)-min.css(\?[^?]+)?$/, "$1.css$2"]],
    packages: [
    /***===============================
	 * 公用组件
	 =====================================*/
	
    //弹窗
    {
        name: "win",
        path: DZ_JSROOT + "widdget/win/",
        tag: "20120324",
        charset: CHARSET
    },
    //全选
    {
        name: "checkall",
        path: DZ_JSROOT + "widdget/checkall/",
        tag: "20120324",
        charset: CHARSET
    },
    //值验证
    {
        name: "check",
        path: DZ_JSROOT + "widdget/validation/",
        tag: "20120324",
        charset: CHARSET
    },
    //表单验证
    {
        name: "validation",
        path: DZ_JSROOT + "widdget/validation/",
        tag: "20120324",
        charset: CHARSET
    },
    //身份证校验
    {
        name: "idcardreg",
        path: DZ_JSROOT + "widdget/validation/",
        tag: "20120324",
        charset: CHARSET
    },
    //评论
    {
        name: "comment",
        path: DZ_JSROOT + "widdget/comment/",
        tag: "20120324",
        charset: CHARSET
    },
     /***===============================
	 * 公用方法、类
	 =====================================*/
	//公用方法
	{
        name:'common',
	   	path:DZ_JSROOT+"o/js",
        tag: "20120324",
        charset: CHARSET
    },
	//文章处理
    {
        name: "article",
        path: DZ_JSROOT + "blog/js/common/",
        tag: "20120324",
        charset: CHARSET
    },
     /***===============================
	 * 单独页面
	 =====================================*/
	//文章详情页
    {
        name: "detail",
        path: DZ_JSROOT + "blog/js/",
        tag: "20120324",
        charset: CHARSET
    }
	 ]
});