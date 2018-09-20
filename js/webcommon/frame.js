$(function(){
	var lastUrl = util.cookie.get("lastMenu");
	dialog = new Dialog({
		"renderTo":"dialog-div"
	});
	$(".data-frame-left-panel-lime").click(function(){
		location.href = $("base").attr("href")+"index.jsp";
	});
	var menu = new Menu({
		renderTo:"menu-panel",
		dataSource:[{
			icon:"fa fa-user-circle-o",
			url:"jsp/manager/userManager.jsp",
			txt:"用户管理"
		},{
			icon:"fa fa-shopping-bag",
			url:"jsp/manager/goodsManager.jsp",
			txt:"商品管理"
		},{
			icon:"fa fa-clone",
			url:"jsp/manager/typeManager.jsp",
			txt:"商品类型管理"
		}],
		"onClick":function(args){
			$("#data-frame-rightContainer-mainIframe").attr("src",args.url);
		},
		"onComplete":function(){
			
		}
	});
	$(window).resize(function(){
		updateSize();
	});
	
	$(".data-frame-btn-panel").click(function(){
		btnExit();
	});
	
	updateSize();
});

//让嵌套页占满右边区域
function updateSize(){
	$("#data-frame-rightContainer-mainIframe").css("height",document.body.clientHeight/14-3+"em");
}

function btnExit(){
	$.post("Exit.action",{},function(res){
		if(res.isSuccess == "true"){
			if(util.isLTIE10())
				location.href = "login.jsp";
			else
				location.href = "jsp/login.jsp";
		}
	});
}