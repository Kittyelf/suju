$(function(){
	orderId = getRequest().orderId;
	userId = $(".usercenter").attr("userId");
	$.post("selectOrderById.action",{
		id:orderId
	},function(res){
		$(".tip-id-txt").text(orderId);
		$(".tip-realMoney-txt").text(parseFloat(res.rows[0].realTotalMoney).toFixed(2));
		$(".pay-price-txt").text(parseFloat(res.rows[0].realTotalMoney).toFixed(2));
	},"json");
	
	/* 调用支付事件 */
	$("#pay-password").keydown(function(event){
		if(event.which == 13)
			btn_pay();
	});
	$(".pay-btn").click(function(){
		btn_pay();
	});
	
	/* 搜索栏及页眉 */
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
	
});

/* 个人中心栏的点击事件 */
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

/* 支付事件 */
function btn_pay(){
	var realTotalMoney = $(".pay-price-txt").text();
	$.post("updateOrder.action",{
		id:orderId,
		userId:userId,
		orderStatus:"1",
		realTotalMoney:realTotalMoney,
		password:$("#pay-password").val()
	},function(res){
		if(res.isSuccess=="true"){
			var odiv = $(".data-suju-pay-container").html("");
			var tip = $("<div class='data-suju-pry-success-tip'></div>").appendTo(odiv);
			$("<i class='fa fa-check-circle'></i>").appendTo(tip);
			$("<div class='sucess-tip'>恭喜您！购买成功！</div>").appendTo(tip);
			$("<div class='sucess-tip-sub'>支付成功，从您的账户余额中扣除<span class='pay-success-price'>"+parseFloat(realTotalMoney).toFixed(2)+"</span>元</div>").appendTo(tip);
			var btn = $("<div class='data-suju-pay-success-btn'></div>").appendTo(odiv);
			$("<button class='goto-order'>查看订单</button>").appendTo(btn);
			$("<button class='goto-index'>继续购物</button>").appendTo(btn);
			$(".goto-order").click(function(){
				location.href = $("base").attr("href")+"jsp/shop/order.jsp";
			});
			$(".goto-index").click(function(){
				location.href = $("base").attr("href")+"index.jsp";
			});
		}else{
			var odiv = $(".data-suju-pay-container").html("");
			var tip = $("<div class='data-suju-pry-success-tip'></div>").appendTo(odiv);
			$("<i class='fa fa-times-circle'></i>").appendTo(tip);
			$("<div class='sucess-tip'>购买失败</div>").appendTo(tip);
			$("<div class='sucess-tip-sub'>"+res.errMsg+"</div>").appendTo(tip);
			var btn = $("<div class='data-suju-pay-success-btn'></div>").appendTo(odiv);
			$("<button class='goto-order'>查看订单</button>").appendTo(btn);
			$("<button class='goto-index'>继续购物</button>").appendTo(btn);
			$(".goto-order").click(function(){
				location.href = $("base").attr("href")+"jsp/shop/order.jsp";
			});
			$(".goto-index").click(function(){
				location.href = $("base").attr("href")+"index.jsp";
			});
		}
	},"json");
}

/* 获取地址栏后的地址 */
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