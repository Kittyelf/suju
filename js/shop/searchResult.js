var goodsList;
$(function(){
	// userId = $(".usercenter").attr("userId");
	// var txt = getRequest().txt;
	// $("#searchTxt").keydown(function(event){
	// 	if(event.which==13)
	// 		location.href = $("base").attr("href")+"jsp/shop/searchResult.jsp?txt="+$("#searchTxt").val();
	// });
	// var condition = "";
	// if(txt == ""){
	// 	condition = " WHERE 1=1 ";
	// }else{
	// 	condition = " WHERE G.NAME LIKE '%"+txt+"%' OR T.NAME LIKE '%"+txt+"%' ";
	// }
	goodsList = new GoodsList({
		renderTo:"goodsList",
		dataSource:{rows:[{
				goodsId:"",
                goodsImgList:[{fileName:"CC9382EE4BC34D1AAD242E17B03DFC0F (4).jpg"}],
				name:"AirPods",
				price:"1276"
			},{
                goodsId:"",
                goodsImgList:[{fileName:"A4A777916DA346D59F1CC033ACEAEDEF (3).jpg"}],
                name:"Beats Solo3 Wireless 头戴式耳机 - 哑光黑色",
                price:"2268"
			},{
                goodsId:"",
                goodsImgList:[{fileName:"13343D249CE64A2CAD7723E937D00C68 (2).jpg"}],
                name:"Powerbeats3 Wireless 入耳式耳机 - Beats Decade Collection - 桀骜黑红",
                price:"1475"
            },{
                goodsId:"",
                goodsImgList:[{fileName:"569220A098A049329AAB68AC8F37F6EA (3).jpg"}],
                name:"Wahoo ELEMNT GPS 骑行电脑",
                price:"2247"
            },{
                goodsId:"",
                goodsImgList:[{fileName:"056C2161639D4F28A77325EFE9C6F383 (1).jpg"}],
                name:"iPhone 8 Plus/7 Plus 硅胶保护壳 - 碧海色",
                price:"325"
            },{
                goodsId:"",
                goodsImgList:[{fileName:"E4874E0471904AD7993FAB8AA83532DE (2).jpg"}],
                name:"iPhone 闪电基座 – 金色",
                price:"424"
            }]},
		onComplete:function(){
			$(".data-suju-gl-gbox").click(function(){
                location.href = "goods.html";
			});
		}
	});
	$("#searchTxt").keydown(function(event){

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
        location.href = "";
    });
    $(".shopbag").click(function(){
        location.href = "";
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
	$(".as-accordion-item-panel").click(function(){
		$(this).hasClass("filterSelect")?hide(this):show(this);
	});
});

function show(obj){
	$(obj).addClass("filterSelect");
	$(obj).children(".accordion-item-icon").addClass("iconSelect");
	$(obj).parent().children(".as-search-filter-items").removeClass("hidden");
}

function hide(obj){
	$(obj).removeClass("filterSelect");
	$(obj).children(".accordion-item-icon").removeClass("iconSelect");
	$(obj).parent().children(".as-search-filter-items").addClass("hidden");
}

function setRequest(obj) {
	if(util.isLTIE10())
		window.location.href = "goods.jsp?goodsId="+ $(obj).attr("goodsid");
	else
		window.location.href = "jsp/shop/goods.jsp?goodsId="+ $(obj).attr("goodsid");
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