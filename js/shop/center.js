var userId;
$(function(){
	userId = $(".usercenter").attr("userId");
	reload();
	dialog = new Dialog({
		"renderTo":"dialog-div"
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
	var menu = new Menu({
		renderTo:"menu-panel",
		dataSource:[{
			icon:"fa fa-user-circle-o",
			url:"jsp/center/userCenter.jsp",
			txt:"个人资料"
		},{
			icon:"fa fa-shopping-bag",
			url:"",
			txt:"我的订单"
		},{
			icon:"fa fa-clone",
			url:"",
			txt:"我的评论"
		}],
		"onClick":function(args){
			$("#data-frame-rightContainer-mainIframe").attr("src",args.url);
		},
		"onComplete":function(){
			
		}
	});
});

function reload(){
	$.post("selectUserById.action", {
		id : userId
	}, function(json) {
		var user = json.rows[0];
		$(".data-frame-left-img").attr("src","upload/"+user.img);
	});
}

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