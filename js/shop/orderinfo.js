$(function(){
	userId = $(".usercenter").attr("userId");

	var addrInfo = "";
	var userInfo = "";
	/**
	 * 点击新增收货地址，弹出添加收货地址的页面,
	 * dialog 对收货地址进行操作时的弹框
	 */
	dialog = new Dialog({
		"renderTo":"dialog-div"
	});
	$(".consignee-add-link").click(function(){
		dialog.show({
			"title":"新增收货信息",
			"dialogWidth":"44",
			"dialogHeight":"33",
			"dialogUrl":"addAddress.html"
		});
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
	address = new Address({
		renderTo:"consignee-address",
		dataSource:{rows:[{
                userName:"小仙女",
                userTel:"15800000000",
                address:"浙江省杭州市西湖区济川街道",
                isDefault:"1"
            },{
                userName:"小鸡崽",
                userTel:"18000000000",
                address:"浙江省杭州市西湖区济川街道"
            }]}
		// onComplete:function(){
		// 	$(".del-address").click(function(){
		// 		var addressId = $(this).attr("data-id");
		// 		dialog.show({
		// 			title:"删除收货地址",
		// 			dialogWidth:30,
		// 			dialogHeight:15,
		// 			confirm:true,
		// 			text:"地址删除后无法恢复，请确认！",
		// 			onClickYes : function() {
		// 				$.post("deleteAddress.action",{
		// 					id:addressId
		// 				},function(res){
		// 					if(res.isSuccess==='true'){
		// 						address.reload();
		// 					}
		// 				},"json");
		// 			}
		// 		});
		// 	});
		// 	addrInfo = $(".itemSelect").parent().children(".addr-detail").children(".addr-info").text();
		// 	userInfo = $(".itemSelect").parent().children(".addr-detail").children(".addr-name").text()+" "+
		// 				$(".itemSelect").parent().children(".addr-detail").children(".addr-tel").text();
		// 	$(".set-default").click(function(){
		// 		$.post("updateDefault.action",{
		// 			id:$(this).attr("data-id"),
		// 			userId:userId
		// 		},function(res){
		// 			if(res.isSuccess==='true'){
		// 				address.reload();
		// 			}
		// 		},"json");
		// 	});
		// 	$(".update-address").click(function(){
		// 		var address = $(this).parent().parent().children(".addr-detail").children(".addr-info").text();
		// 		editObj = {
		// 			id:$(this).attr("data-id"),
		// 			userId:userId,
		// 			userName:$(this).parent().parent().children(".addr-detail").children(".addr-name").text(),
		// 			province:address.slice(0,2),
		// 			city:address.slice(3,5),
		// 			address:address.slice(6),
		// 			userTel:$(this).parent().parent().children(".addr-detail").children(".addr-tel").text()
		//
		// 		};
		// 		dialog.show({
		// 			"title":"修改收货信息",
		// 			"dialogWidth":"44",
		// 			"dialogHeight":"33",
		// 			"dialogUrl":"jsp/dialog/addAddress.jsp"
		// 		});
		// 	});
		// },
		// onClick:function(){
		// 	addrInfo = $(".itemSelect").parent().children(".addr-detail").children(".addr-info").text();
		// 	userInfo = $(".itemSelect").parent().children(".addr-detail").children(".addr-name").text()+" "+
		// 				$(".itemSelect").parent().children(".addr-detail").children(".addr-tel").text();
		// 	orderInfoList.reload();
		// }
	});
	
	/**
	 * 送货清单
	 */
	orderInfoList = new OIL({
		renderTo:"orderInfoList",
		dataSource:{total:2,rows:[{
				stock:"213",
				postage:"0",
				price:"1276",
				num:"2",
				goodsImgList:[{fileName:"CC9382EE4BC34D1AAD242E17B03DFC0F (2).jpg"}],
				name:"AirPods"
			},{
                stock:"213",
                postage:"0",
                price:"2268",
                num:"1",
                goodsImgList:[{fileName:"A4A777916DA346D59F1CC033ACEAEDEF (3).jpg"}],
                name:"Beats Solo3 Wireless 头戴式耳机 - 哑光黑色"
            }]},
		onComplete:function () {
            	$(".address-info-detail").text("浙江省杭州市西湖区济川街道");
            	$(".username-info").text("15800000000");
        }
		// postData:{
		// 	condition:" WHERE USERID='"+userId+"' "
		// },
		// onComplete:function(){
		// 	$(".address-info-detail").text(addrInfo);
		// 	$(".username-info").text(userInfo);
		// 	$(".btn-orderinfo").click(function(){
		// 		$.post("addOrder.action",{
		// 			addressId:$(".itemSelect").attr("data-addressId"),
		// 			orderStatus : "00",
		// 			realTotalMoney:$(".real-price-txt").text()
		// 		},function(res){
		// 			if(res.isSuccess==='true'){
		// 				$(".tr-bd").each(function(){
		// 					$.post("addOrderDetailed.action",{
		// 						orderId:res.errMsg,
		// 						userId:userId,
		// 						goodsId:$(this).children(".goods-item-msg").children(".goods-item").attr("goods-id"),
		// 						goodsNum:$(this).children(".goods-item-msg").children(".goods-item").children(".goods-number").children(".goods-number-txt").text(),
		// 						goodsPrice : $(this).children(".goods-price").children(".p-price").text(),
		// 						status:"00"
		// 					},"json");
		// 					$.post("deleteShopcar.action",{
		// 						id:$(this).attr("data-id")
		// 					},"json");
		// 				});
		// 				location.href = $("base").attr("href")+"jsp/shop/pay.jsp?orderId="+res.errMsg;
		// 			}else{
		// 				alert("订单添加失败");
		// 			}
		//
		// 		},"json");
		// 	});
		// }
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