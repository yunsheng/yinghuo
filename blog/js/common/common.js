/**
 * @author dongzhu
 */

KISSY.add("common",function(S){
	S.Common={
		handleStr:function(str,cfg){
			var str=str;
			//ȥ��ǰ��ո�
			if(cfg['trim']){
				str=S.trim(str);
			}
			if(cfg['escape']){
				str=S.escapeHTML(str);
			}
			if(cfg['uri']){
				str=encodeURI(str);
			}
			if(cfg['uric']){
				str=encodeURIComponent(str);
			}
			if(cfg['uric2']){
				str=encodeURIComponent(encodeURIComponent(str));
			}
			return str;
		},
		/**
		 * ��������Դ����select��ǩ
		 */
		selector:function(data){
			
		}
	}
},{
	attach:false,
	requires:['sizzle']
});
