var SHOPCAR;
$(function(){
	userId = $(".usercenter").attr("userId");
	$("#searchTxt").keydown(function(event){
		if(event.which==13)
			location.href = $("base").attr("href")+"jsp/shop/searchResult.jsp?txt="+$("#searchTxt").val();
	});
	$("#searchTxt").keydown(function(event){
		if(event.which==13)
			location.href = $("base").attr("href")+"jsp/shop/searchResult.jsp?txt="+$("#searchTxt").val();
	});
	// SHOPCAR = new ShopCarList({
	// 	renderTo:"shopcarList",
	// 	dataSource:"selectShopcarByLimit.action",
	// 	postData:{
	// 		condition:" WHERE USERID='"+userId+"' "
	// 	},
	// 	onComplete:function(){
	// 		$(".shopcar-msg-del").click(function(){
	// 			delShopcar($(this).attr("data-id"));
	// 		});
	// 		$(".shopcar-msg-num").blur(function(){
	// 			var t = this;
	// 			checkNum(this);
	// 			if($(this).hasClass("errorInput")){
	// 				setTimeout(function(){
	// 					updateShopcar(t);
	// 				},2000);
	// 			}else{
	// 				updateShopcar(t);
	// 			}
	// 		});
	// 	}
	// });
	
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

    });
    $(".shopbag").click(function(){
        location.href = "shopcar.html";
    });
    $(".userorder").click(function(){

    });
    $(".usercenter").click(function(){
        location.href = "login.html";
    });
    $(".register").click(function(){
        location.href = "register.html";
    });
    $(".fa.fa-circle").click(function(){
        location.href = "index.html";
    });
	$(".data-suju-pay-btn").click(function(){
		// if(util.isLTIE10()){
		// 	if($(".shopcar-item").length == "0")
		// 		window.location.href = "../../index.jsp";
		// 	else
		// 		window.location.href = "orderInfo.jsp";
		// }else{
		// 	if($(".shopcar-item").length == "0")
		// 		window.location.href = "index.jsp";
		// 	else
		// 		window.location.href = "jsp/shop/orderInfo.jsp";
		// }
	});
});

function checkNum(obj){
	var errObj = $(obj).parent().children(".errorTxt");
	if($(obj).val()<0){
		$(obj).val("1");
	}else if($(obj).val()>2){
		$(obj).addClass("errorInput");
		$(obj).val("2");
		$(errObj).removeClass("hidden");
		setTimeout(function(){
			$(obj).removeClass("errorInput");
			$(errObj).addClass("hidden");
		},2000);
	}else if($(obj).val()== "2"){
		$(obj).val("2");
	}else{
		$(obj).val("1");
	}
}

function updateShopcar(obj){
	$.post("updateShopcar.action",{
		num:$(obj).val(),
		goodsId:$(obj).parent().children(".shopcar-msg-name").attr("data-goodsId"),
		userId : $(".usercenter").attr("userId")
	},function(res){
		if(res.isSuccess==='true'){
			SHOPCAR.reload();
		}else{
			alert("删除失败");
		}
		
	},"json");
}

function delShopcar(id){
	$.post("deleteShopcar.action",{
		id:id
	},function(res){
		if(res.isSuccess==='true'){
			SHOPCAR.reload();
		}else{
			alert("删除失败");
		}
		
	},"json");
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