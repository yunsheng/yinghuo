﻿KISSY.add('common',function(S){S.Common={hoverChange:function(target){if(!target||!target.length){return}var nTarget=target,nFirst=S.one(nTarget[0]),activedItem=function(item){var nTar=item,nTarImg=nTar.one(".picwrap"),nTarText=nTar.one(".textwrap"),nActived=nTar.siblings(".active");if(nActived.length){var nActImg=nActived.one(".picwrap"),nActText=nActived.one(".textwrap");nActImg.addClass("dn");nActText.removeClass("dn");nActived.removeClass("active")}nTar.addClass("active");nTarImg.removeClass("dn");nTarText.addClass("dn")};nFirst.addClass("first");activedItem(nFirst);nTarget.on("mouseenter",function(e){var nEventTarget=S.one(e.currentTarget);if(!nEventTarget.hasClass("active")){activedItem(nEventTarget)}})},accordion:function(cfg){var config={contain:".J_Accordion",item:".accordionItem",activedClass:"on",type:"mouseenter",callback:function(item){}};S.mix(config,cfg);var nContain=S.one(config.contain);if(!nContain){return false};var nItemList=nContain.all(config.item);nItemList.on(config.type,function(e){var nTarget=S.one(e.currentTarget);nItemList.removeClass(config.activedClass);nTarget.addClass(config.activedClass);config.callback(nTarget)})},search:function(url){var inputNode=S.one(".search_input"),selectNode=S.one(".search_select"),selectUl=S.one(".search_select ul"),selectLi=S.all(".search_select ul li"),btnNode=S.one(".search_btn"),defaultNode=S.one(".search_select .default"),clickNode=S.one(".search_click"),url=url,type=0,defaultValue="请输入",hide=function(){selectUl.addClass("dn");selectLi.removeClass("hovered");clickNode.removeClass("search_click_mouseentered")},show=function(){selectUl.removeClass("dn");clickNode.addClass("search_click_mouseentered")};inputNode.on("focusout",function(e){var value=inputNode.val();if(value==""){inputNode.val(defaultValue).addClass("reset")}});inputNode.on("focusin",function(e){var value=inputNode.val();if(value==defaultValue){inputNode.val("").removeClass("reset")}});btnNode.on("click",function(e){e.halt();var content=inputNode.val(),uri=url+"keywords="+escape(content);window.open(uri)});defaultNode.on("mouseenter",show);selectLi.on("mouseenter",function(e){var targetNode=S.one(e.currentTarget);targetNode.addClass("hovered");targetNode.siblings("li").removeClass("hovered")});selectLi.on("click",function(e){var targetNode=S.one(e.currentTarget);type=targetNode.val();defaultNode.html(targetNode.html());hide()});selectNode.on("mouseleave",hide)},subNav:function(navUrl,isHidden){var classifyNode=S.one("#J_Classify"),titleNode=classifyNode.one(".title"),ulNode=classifyNode.one(".listul"),itemNode=classifyNode.all(".listul li"),tabNode=classifyNode.all(".tab-container"),dataurl=navUrl,getContent=function(target,senddata){var isload=target.attr("isload");if(!isload){S.io({type:"GET",url:dataurl,dataType:"html",data:senddata,success:function(data){target.attr("isload",true);target.html(data)}})}},classifyhidden=function(){titleNode.on("mouseenter",function(e){ulNode.removeClass("dn")});classifyNode.on("mouseleave",function(e){ulNode.addClass("dn")})};itemNode.on("mouseenter",function(e){var targetNode=S.one(e.currentTarget),dataid=targetNode.attr("dataid"),contentSelect=".content"+dataid,senddata={id:dataid},contentNode=classifyNode.one(contentSelect);tabNode.addClass("dn");getContent(contentNode,senddata);contentNode.removeClass("dn");var n_top=(dataid-1)*30+29;contentNode.css("top",n_top+"px")});tabNode.on("mouseleave",function(e){var targetNode=S.one(e.currentTarget);targetNode.addClass("dn")});classifyNode.on("mouseleave",function(e){tabNode.addClass("dn")});if(isHidden){classifyhidden()}},href:function(url){var self=this;self.init=function(){var url=location.href,protocol=location.protocol,host=location.host,pathname=location.pathname,port=location.port,search=location.search,hash=location.hash;search=search.replace(/^\?/,'');this.search=S.unparam(search);this.host=host;this.protocol=protocol;this.pathname=pathname;this.port=port;this.hash=hash};self.open=function(){var search=S.param(this.search),host=this.host,protocol=this.protocol,pathname=this.pathname,port=this.port,hash=this.hash,url=protocol+"//"+host+pathname+"?"+search+hash;location.href=url};self.get=function(str){return this.search[str]};self.set=function(name,value){this.search[name]=value;return this};self.hashHandle=function(value){if(S.isUndefined(value)){return this.hash}else{this.hash=value;return this}};self.init()}}},{attach:false,requires:['sizzle']});