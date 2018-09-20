var GOODSIMGLIST;
$(function(){
	// userId = $(".usercenter").attr("userId");
	$("body").click(function(event){
		if($(event.target).hasClass("personal-center-panel")||$(event.target).hasClass("fa-shopping-bag")||$(event.target).hasClass("personal-center-item"))
			return;
		else
			hideTip();
	});
	dialog = new Dialog({
		"renderTo":"dialog-div"
	});
	$(".addShopCar").click(function(){

	});
	$(".fa.fa-shopping-bag").click(function(){
		var obj = $(".personal-center-panel");
		$(obj).hasClass("centerSelect")?hideTip():showTip(obj);
	});
    $(".exit").click(function(){
        location.href = "";
    });
    $(".shopbag").click(function(){
        location.href = "shopcar.html";
    });
    $(".userorder").click(function(){
        location.href = "";
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
	// var goodsId = getRequest().goodsId;
	// $.post("getGoodsById.action", {
	// 	id : goodsId
	// }, function(json) {
	// 	GOODS = json;
	// 	$("#goodsName").text(GOODS.rows[0].name);
	// 	$("#goodsPrice").text("RMB "+GOODS.rows[0].price);
	// 	$(".addShopCar").attr("data-goodsId",goodsId);
	// });
	// $.post("queryImgByGoods.action", {
	// 	id : goodsId
	// }, function(json) {
	// 	GOODSIMGLIST = json.rows;
	 	new GoodsImg({
			renderTo:"imgShow",
			dataSource:[{
				fileName:"CC9382EE4BC34D1AAD242E17B03DFC0F (1).jpg"
			},{
                fileName:"CC9382EE4BC34D1AAD242E17B03DFC0F (2).jpg"
			},{
                fileName:"CC9382EE4BC34D1AAD242E17B03DFC0F (3).jpg"
			},{
                fileName:"CC9382EE4BC34D1AAD242E17B03DFC0F (4).jpg"
            },{
                fileName:"CC9382EE4BC34D1AAD242E17B03DFC0F (5).jpg"
            }]
		});
	// });
	$(".title").click(function(){
		$(this).hasClass("titleSelect")?hide(this):show(this);
	});
	// new Comment({
	// 	renderTo:"comment",
	// 	dataSource:"selectCommentByLimit.action",
	// 	postData:{
	// 		condition:" WHERE C.GOODSID = '"+goodsId+"' "
	// 	},
	// 	onComplete:function(){
	// 		$(".goods-info-imgs-img").click(function(){
	// 			dialog.show({
	// 				"title":"评论图片",
	// 				"dialogWidth":"40.9",
	// 				"dialogHeight":"43.5",
	// 				"dialogUrl":$(this).attr("src")
	// 			});
	// 		});
	// 	}
	// });
    $(".addShopCar").click(function () {
        location.href = "orderInfo.html";
    });
});

function addShopcar(){
	if($(".usercenter").text() == "登录"){
		if(util.isLTIE10()){
			location.href = "../login.jsp";
		}else
			location.href = "jsp/login.jsp";
	}else{
		$.post("addShopcar.action",{
			goodsId : $(".addShopCar").attr("data-goodsId"),
			userId : $(".usercenter").attr("data-userId"),
			num : 1
		},function(res){
			if(res.isSuccess==='true'){
				$(".addShopCar").text("添加成功");
				$(".addShopCar").addClass("success");
				setTimeout(function(){
					$(".addShopCar").text("添加至购物袋");
					$(".addShopCar").removeClass("success");
				},1000);
			}else{
				$(".addShopCar").addClass("error");
				$(".addShopCar").text(res.errMsg);
				setTimeout(function(){
					$(".addShopCar").text("添加至购物袋");
					$(".addShopCar").removeClass("error");
				},2000);
			}
			
		},"json");
	}
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

function show(obj){
	$(obj).addClass("titleSelect");
	$(obj).children(".title-icon").addClass("iconSelect");
	$(obj).parent().children(".data-suju-goods-panel").removeClass("hidden");
}

function hide(obj){
	$(obj).removeClass("titleSelect");
	$(obj).children(".title-icon").removeClass("iconSelect");
	$(obj).parent().children(".data-suju-goods-panel").addClass("hidden");
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