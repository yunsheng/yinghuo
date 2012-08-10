/**
 * @author dongzhu
 */
var LOGIN_BACK;
KISSY.use("common",function(S){	
	var nLogin=S.one(".J_UserLogin"),
	nExit=S.one(".J_UserExit"),
	nName=S.one(".J_UserName");
	nLogin&&nLogin.on("click",function(e){
		S.Common.userLogin(true,"LOGIN_BACK");
	});
	LOGIN_BACK=function(data){
		S.Common.loginBack(data);
	}
});
