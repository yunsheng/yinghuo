/**
 * config�����ļ�
 * @author liuchaowu.pt
 */

var GBK = "utf-8",
DZ_JSROOT = "http://yinghuo.com/";
KISSY.config({
    map: [[/(.+widdget\/.+)-min.js(\?[^?]+)?$/, "$1.js$2"], [/(.+widdget\/.+)-min.css(\?[^?]+)?$/, "$1.css$2"]],
    packages: [
    /***===============================
	 * �������
	 =====================================*/
	
    //����
    {
        name: "win",
        path: DZ_JSROOT + "widdget/win/",
        tag: "20120324",
        charset: GBK
    },
    //ȫѡ
    {
        name: "checkall",
        path: DZ_JSROOT + "widdget/checkall/",
        tag: "20120324",
        charset: GBK
    },
    //ֵ��֤
    {
        name: "check",
        path: DZ_JSROOT + "widdget/validation/",
        tag: "20120324",
        charset: GBK
    },
    //����֤
    {
        name: "validation",
        path: DZ_JSROOT + "widdget/validation/",
        tag: "20120324",
        charset: GBK
    },
    //���֤У��
    {
        name: "idcardreg",
        path: DZ_JSROOT + "widdget/validation/",
        tag: "20120324",
        charset: GBK
    },
    //����
    {
        name: "comment",
        path: DZ_JSROOT + "widdget/comment/",
        tag: "20120324",
        charset: GBK
    },
     /***===============================
	 * ���÷�������
	 =====================================*/
	//���÷���
	{
        name:'common',
	   	path:DZ_JSROOT+"o/js",
        tag: "20120324",
        charset: GBK
    },
	//���´���
    {
        name: "article",
        path: DZ_JSROOT + "blog/js/common/",
        tag: "20120324",
        charset: GBK
    },
     /***===============================
	 * ����ҳ��
	 =====================================*/
	//��������ҳ
    {
        name: "detail",
        path: DZ_JSROOT + "blog/js/",
        tag: "20120324",
        charset: GBK
    }
	 ]
});