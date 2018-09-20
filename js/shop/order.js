$(function(){
	userId = $(".usercenter").attr("userId");
	dialog = new Dialog({
		"renderTo":"dialog-div"
	});
	$("#searchTxt").keydown(function(event){
		if(event.which==13)
			location.href = $("base").attr("href")+"jsp/shop/searchResult.jsp?txt="+$("#searchTxt").val();
	});
	orderList = new OrderList({
		renderTo:"data-order-orderList",
		dataSource:"selectOrderByLimit.action",
		postData:{
			userId:userId
		},
		onComplete:function(){
			$(".data-order-del").click(function(){
				var orderId = $(this).attr("data-id");
				dialog.show({
					title:"删除订单",
					dialogWidth:30,
					dialogHeight:15,
					confirm:true,
					text:"订单删除后无法恢复，请确认！",
					onClickYes : function() {
						$.post("delOrder.action",{
							id:orderId
						},function(res){
							if(res.isSuccess == "true"){
								orderList.reload();
							}else{
								
							}
						},"json");
					}
				});
			});
			$(".gotoPay").click(function(){
				var orderId = $(this).attr("data-id");
				location.href = $("base").attr("href")+"jsp/shop/pay.jsp?orderId="+orderId;
			});
			$(".conGoods").click(function(){
				var orderId = $(this).attr("data-id");
				
				dialog.show({
					title:"确认收货",
					dialogWidth:30,
					dialogHeight:15,
					confirm:true,
					icon:"fa fa-check-circle",
					text:"订单确认后无法恢复，请确认！",
					onClickYes : function() {
						$.post("updateStatus.action",{
							id:orderId,
							orderStatus:"10"
						},function(res){
							if(res.isSuccess=="true"){
								orderList.reload({
									userId:userId,
									orderStatus:$(".itemSelect").attr("data-status")
								});
							}else{
								alert(res.errMsg);
							}
						},"json");
					}
				});
				
//				
//				$.post("updateStatus.action",{
//					id:orderId,
//					orderStatus:"10"
//				},function(res){
//					if(res.isSuccess=="true"){
//						orderList.reload({
//							userId:userId,
//							orderStatus:$(".itemSelect").attr("data-status")
//						});
//					}else{
//						alert(res.errMsg);
//					}
//				},"json");
			});
			$(".goTxt").click(function(){
				var orderId = $(this).attr("data-id");
				location.href = $("base").attr("href")+"jsp/shop/comment.jsp?orderId="+orderId;
			});
		}
	});
	$("body").click(function(event){
		if($(event.target).hasClass("personal-center-panel")||$(event.target).hasClass("fa-shopping-bag")||$(event.target).hasClass("personal-center-item"))
			return;
		else
			hideTip();
	});
	$(".fa.fa-shopping-bag").click(function(){
		var obj = $(".personal-center-panel");
		$(obj).hasClass("centerSelect")?hideTip():showTip(obj);
	});
	$(".exit").click(function(){
		btnExit();
	});
	$(".shopbag").click(function(){
		btnBag();
	});
	$(".userorder").click(function(){
		btnOrder();
	});
	$(".usercenter").click(function(){
		btnCenter();
	});
	$(".register").click(function(){
		if(util.isLTIE10()){
			window.location.href = "../register.jsp";
		}else
			location.href = "jsp/register.jsp";
	});
	$(".fa.fa-circle").click(function(){
		if(util.isLTIE10()){
			window.location.href = "../../index.jsp";
		}else
			window.location.href = "index.jsp";
	});
	new Tab({
		renderTo:"data-order-tab",
		dataSource:[{
			id:1,
			name:"全部订单",
			status:""
		},{
			id:2,
			name:"等待付款",
			status:"0"
		},{
			id:3,
			name:"等待收货",
			status:"1"
		},{
			id:4,
			name:"等待评价",
			status:"10"
		}],
		offSet:7,
		onComplete:function(){
			$(".data-suju-menu-item").click(function(){
				orderList.reload({
					userId:userId,
					orderStatus:$(this).attr("data-status")
				});
			});
		}
	});
});

function showTip(obj){
	$(".personal-center-panel").removeClass("hidden");
	$(obj).addClass("centerSelect");
	if(util.isLTIE10()){
		var style = {
			"opacity":"1",
			"top":"-4em"
		};
		$(obj).animate(style);
	}else{
		setTimeout(function(){
			$(obj).css("opacity","1").css("top","-4em");
		},10);
	}
}

function hideTip(){
	var obj = $(".personal-center-panel");
	$(obj).removeClass("centerSelect");
	if(util.isLTIE10()){
		var style = {
			"opacity":"0",
			"top":"-4.5emem"
		};
		$(obj).animate(style);
	}else{
		setTimeout(function(){
			$(obj).css("opacity","0").css("top","-4.5em");
		},10);
	}
	setTimeout(function(){
		$(".personal-center-panel").addClass("hidden");
	},250);
}

function btnExit(){
	$.post("Exit.action",{},function(res){
		if(res.isSuccess == "true"){
			if(util.isLTIE10()){
				location.href = "../../index.jsp";
			}else
				location.href = "index.jsp";
		}
	});
}

function btnOrder(){
	if($(".usercenter").text() == "登录"){
		if(util.isLTIE10()){
			location.href = "../login.jsp";
		}else
			location.href = "jsp/login.jsp";
	}else{
		if(util.isLTIE10()){
			location.href = "order.jsp";
		}else
			window.location.href = "jsp/shop/order.jsp";
	}
}

function btnBag(){
	if($(".usercenter").text() == "登录"){
		if(util.isLTIE10()){
			location.href = "../login.jsp";
		}else
			location.href = "jsp/login.jsp";
	}
	else{
		if(util.isLTIE10()){
			location.href = "shopcar.jsp?userId="+ $(".usercenter").attr("userId");
		}else
			window.location.href = "jsp/shop/shopcar.jsp?userId="+ $(".usercenter").attr("userId");
	}
}

function btnCenter(){
	if($(".usercenter").text() == "登录")
		if(util.isLTIE10()){
			location.href = "../login.jsp";
		}else
			location.href = "jsp/login.jsp";
	else{
		location.href = $("base").attr("href")+"jsp/shop/center.jsp?userId="+userId;
	}
}