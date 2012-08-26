/**
* @author dongzhu
*/
KISSY.add('common', function(S) {
    S.Common = {
        handleStr:function(str,cfg){
			var str=str;
			//去除前后空格
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
        * 类手风琴效果实现:容器内的元素，只有一个处在触发状态
        * @function
        * @name  Common#accordion
        * @param cfg
        * -contain :容器选择器
        * -item： 容器内元素选择器
        * -activedClass ：触发容器class
        * -type ：触发方式  默认为mouseover
        * -callback 回调函数
        */
        accordion: function(cfg) {
            var config = {
                contain: ".J_Accordion",
                item: ".accordionItem",
                activedClass: "on",
                type: "mouseenter",
                callback: function(item) { }
            };
            S.mix(config, cfg);
            var nContain = S.one(config.contain);
            if (!nContain) {
                return false;
            };
            var nItemList = nContain.all(config.item);
            nItemList.on(config.type, function(e) {
                var nTarget = S.one(e.currentTarget);
                nItemList.removeClass(config.activedClass);
                nTarget.addClass(config.activedClass);
                config.callback(nTarget);
            });

        },
        /**
		 *  是否登录判断
		 * @name Common#isLogin
		 * @param sucFun 已登录回调函数
		 * @param failFun 未登录回调函数
		 */
        isLogin: function (sucFun,fialFun) {
             S.Common.ajax({
             	url:"http://yinghuo.com/o/islogin.php",
             	type:'post',
				dataType:'json',
				cache:false,
				data:{
					result:"json"
				},
				success:function(data){
					if(data.isSuccess){
						sucFun(data);
					}else{
						fialFun(data);
					}
				},
				error:fialFun
             	}
             );
        },
        /**  
		 * @function
		 * @name Common#userLogin
		 * @param {Boolean} isiframe  
		 * @param url 回调地址/回调函数
		 * */
        userLogin: function (isIframe,url) {
        	if(isIframe){
        		var loginUrl="http://yinghuo.com/o/login.php?{type}="+url;
	           
	            S.Common.LOGINBOX = new S.Win("#J_LogoWin", {
	                width: 320,
	                height: 160,
	                src: loginUrl.replace(/{type}/,"callback")
	            });
	            S.Common.LOGINBOX.show();
        	}else{
				window.location=loginUrl.replace(/{type}/,"redirect");
        	}
            
        },
        loginBack:function(data){
        	S.Common.LOGINBOX.hide();
        	var nLogin=S.one(".J_UserLogin"),
				nExit=S.one(".J_UserExit"),
				nName=S.one(".J_UserName");
				nName.html(data.name);
				nName.show();
				nExit.show();
				nLogin.hide();
        },
        handleStr:function(str,cfg){
			var str=str;
			//去除前后空格
			if(cfg['trim']){
				str=S.trim(str);
			}
			if(cfg['escape']){
				str=S.escapeHTML(str);
			}
			if(cfg['uri']){
				str=encodeURI(str);
			}
			if(cfg['uri2']){
				str=encodeURI(encodeURI(str));
			}
			if(cfg['uric']){
				str=encodeURIComponent(str);
			}
			if(cfg['uric2']){
				str=encodeURIComponent(encodeURIComponent(str));
			}
			return str;
		},
        ajax:function(cfg){
        	S.io(cfg)
        },
        /*
        * url 地址操作
        */
        href: function(url) {
            var self = this;

            //初始化url处理
            self.init = function() {
                var url = location.href,
				protocol = location.protocol,
				host = location.host,
				pathname = location.pathname,
				port = location.port,
				search = location.search,
				hash = location.hash;
                //处理search
                search = search.replace(/^\?/, '');
                this.search = S.unparam(search);
                this.host = host;
                this.protocol = protocol;
                this.pathname = pathname;
                this.port = port;
                this.hash = hash;

            };
            //跳转页面
            self.open = function() {
                var search = S.param(this.search),
				host = this.host,
				protocol = this.protocol,
				pathname = this.pathname,
				port = this.port,
				hash = this.hash,
				url = protocol + "//" + host + pathname + "?" + search + hash;
                //alert(url);
                location.href = url;
            };
            //获取请求值
            self.get = function(str) {
                return this.search[str];
            };
            //设置、修改请求值
            self.set = function(name, value) {
                this.search[name] = value;
                return this;
            };
            self.hashHandle = function(value) {
                if (S.isUndefined(value)) {
                    return this.hash;

                } else {
                    this.hash = value;
                    return this;
                }
            };
            self.init();
        }

    }
},
{
    attach: false,
    requires: ['sizzle']
});
