$(function(){
	var menu = new Menu({
		renderTo:"menu-panel",
		dataSource:[{
			icon:"fa fa-user-circle-o",
			url:"jsp/manager/userManager.jsp",
			txt:"用户管理"
		},{
			icon:"fa fa-id-badge",
			url:"jsp/manager/goodsManager.jsp",
			txt:"商品管理"
		},{
			icon:"fa fa-clone",
			url:"jsp/manager/typeManager.jsp",
			txt:"商品类型管理"
		}],
		"onClick":function(args){
			$("#frame-page").attr("src",args.url);
		},
		"onComplete":function(){
			
		}
	});
});

