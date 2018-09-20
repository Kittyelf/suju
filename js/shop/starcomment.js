$(function(){
	userId = $(".usercenter").attr("userId");
	orderId = getRequest().orderId;
	commentList = new StarComment({
		renderTo:"comment-list-container",
		dataSource:"selectOrderListById.action",
		postData:{
			id:orderId
		},
		onComplete:function(){
			$(".comment-btn").click(function(){
				$(".comment-list-item").each(function(){
					$.post("addComment.action",{
						goodsId:$(this).children(".comment-goods-info").attr("data-goodsId"),
						userId:userId,
						content:$(this).find(".conent-text").val(),
						icon:$(this).find(".comment-star.xzw_starSys").attr("data-icon"),
						arrGoodsImg:$(this).find(".goods_img").map(function(i,t){
							return $(t).attr("data-fileName");
						}).get().join(",")
					},function(res){
						if(res.isSuccess == "true"){
							$.post("updateStatus.action",{
								id:orderId,
								orderStatus:"11"
							},function(msg){
								if(msg.isSuccess=="true"){
									location.href = $("base").attr("href")+"jsp/shop/order.jsp";
								}else{
									alert(msg.errMsg);
								}
							},"json");
						}else{
							
						}
					},"json");
				});
			});
		}
	});
	$("#searchTxt").keydown(function(event){
		if(event.which==13)
			location.href = $("base").attr("href")+"jsp/shop/searchResult.jsp?txt="+$("#searchTxt").val();
	});
	$("#searchTxt").keydown(function(event){
		if(event.which==13)
			location.href = $("base").attr("href")+"jsp/shop/searchResult.jsp?txt="+$("#searchTxt").val();
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
	$("#comment-star").each(function(){
		new Star({
			renderTo:"comment-star",
			dataSource:[{
				level:"1",
				items:[{item:"实物与图片严重不符"},{item:"不能用"}],
				className:"one-star"
			},{
				level:"2",
				items:[{item:"商品破损严重"},{item:"颜色不好看"}],
				className:"two-stars",
				hidden:true
			},{
				level:"3",
				items:[{item:"商品有瑕疵"},{item:"与预计效果有一定差距"}],
				className:"three-stars",
				hidden:true
			},{
				level:"4",
				items:[{item:"颜色还可以"},{item:"可以更好"}],
				className:"four-stars",
				hidden:true
			},{
				level:"5",
				items:[{item:"完美！"},{item:"物有所值"},{item:"会回购"}],
				className:"five-stars",
				hidden:true
			}],
			onComplete:function(){
				
			}
		});
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
}

function getRequest() {
	var url = window.location.search;
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.substr(1);
		strs = str.split("&");
		for ( var i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}