var SLTSEX;
$(function(){
	userId = $(".usercenter").attr("userId");
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
	SLTSEX = new DDL({
		renderTo:"sltSex",
		dataSource:[{
			id:"-1",
			name:"--未选择--"
		},{
			id:"0",
			name:"女"
		},{
			id:"1",
			name:"男"
		}]
	});
	$(".errTip").addClass("hidden");
	$("#firstname").focus();
	inputFocus();
	$(".btnregister").click(function(){
		// btn_Register();
	});
	$("input").keydown(function(event){
		// if(event.which==13)
		// 	btn_Register();
	});
	$(".super-register-container").on("focus","input",function(event){
		$(this).parent().children(".errTip").addClass("hidden");
		$(this).removeClass("errInput");
	}).on("blur","input",function(event){
		checkTxt(this);
	}).on("keyup","input",function(event){
		if($(this).val() == "")
			$(this).parent().children(".placeholder-txt").removeClass("hidden");
		else
			$(this).parent().children(".placeholder-txt").addClass("hidden");
	});
	$(".ddl").click(function(){
		$(".ddlSelect").parent().parent().parent().parent().children(".errTip").addClass("hidden");
		$(".ddlSelect").parent().parent().removeClass("errInput");
	});
	// $(".bluetxt,.icon-img").click(function(){
	// 	loadImg();
	// });
});

function inputFocus(){
	$(".placeholder-txt,.errTip").click(function(){
		$(this).parent().children("input").focus();
	});
}

function checkTxt(obj){
	var txtStr = $(obj).val();
	var errObj = $(obj).parent().children(".errTip");
	if($("#password").val()!=""&&$("#confirm").val()!=""&&$("#password").val()!=$("#confirm").val()){
		$(".errTip.confirm").removeClass("hidden").text("两次密码不一致，请确认密码");
		$("#confirm").addClass("errInput");
		return;
	}
	if(txtStr == ""){
		$(errObj).removeClass("hidden");
		$(obj).addClass("errInput");
		return;
	}
	if(!util.validate(txtStr, $(obj).attr("data-validate"))){
		$(errObj).removeClass("hidden").text($(obj).attr("valueRule"));
		$(obj).addClass("errInput");
		return;
	}
	if ($.trim(txtStr).length < $(obj).attr("data-minLen")) {
		$(errObj).removeClass("hidden").text("至少输入" + $(obj).attr("data-minLen") + "个字符");
		$(obj).addClass("errInput");
		return;
	}
	if ($.trim(txtStr).length > $(obj).attr("data-maxLen")) {
		$(errObj).removeClass("hidden").text("最多输入" + $(obj).attr("data-maxLen") + "个字符");
		$(obj).addClass("errInput");
		return;
	}
}

function checkMsg(){
	var count = 0;
	$(".errTip").each(function(){
		var txtObj = $(this).parent().children("input[type=text],input[type=password]");
		var txtStr = txtObj.val();
		if(txtObj.length!=0){
			if(txtStr == ""){
				$(this).removeClass("hidden");
				txtObj.addClass("errInput");
				return count++;
			}
			if(!util.validate(txtStr, txtObj.attr("data-validate"))){
				$(this).removeClass("hidden").text(txtObj.attr("valueRule"));
				txtObj.addClass("errInput");
				count++;
			}
			if ($.trim(txtStr).length < txtObj.attr("data-minLen")) {
				$(this).removeClass("hidden").text("至少输入" + txtObj.attr("data-minLen") + "个字符");
				txtObj.addClass("errInput");
				count++;
			}
			if ($.trim(txtStr).length > txtObj.attr("data-maxLen")) {
				$(this).removeClass("hidden").text("最多输入" + txtObj.attr("data-maxLen") + "个字符");
				txtObj.addClass("errInput");
				count++;
			}
			if($("#password").val()!=""&&$("#confirm").val()!=""&&$("#password").val()!=$("#confirm").val()){
				$(".errTip.confirm").removeClass("hidden").text("两次密码不一致，请确认密码");
				$("#confirm").addClass("errInput");
				count++;
			}
		}
	});
	if($(".ddlSelect").attr("data-id") == "-1"){
		$(".ddlSelect").parent().parent().parent().parent().children(".errTip").removeClass("hidden");
		$(".ddlSelect").parent().parent().addClass("errInput");
		return count++;
	}
	return count;
}

// function btn_Register(){
// 	var count = checkMsg();
// 	if(count>0)
// 		return;
// 	else{
// 		$.post("register.action",{
// 			userName : $("#username").val(),
// 			password : $("#password").val(),
// 			name : $("#firstname").val()+$("#lastname").val(),
// 			phone : $("#phonenumber").val(),
// 			sex : $("#sltSex .ddlSelect").attr("data-id"),
// 			code:$("#txtCode").val()
// 		},function(res){
// 			if(res.isSuccess==='true'){
// 				$(".btnregister").addClass(".successRegister").text("请稍后...");
// 				setTimeout(function(){
// //					$(".btnregister").removeClass(".successRegister").text("完成");
// 					clearTxt();
// 					location.href = $("base").attr("href")+"jsp/login.jsp";
// //					$(".jumpLogin").removeClass("hidden");
//
// 				},2000);
// //				setTimeout(function(){
// //					$(".jumpLogin").addClass("hidden");
// //				},7000);
// 			}else{
// 				$(".btnregister").addClass("errorRegister").text(res.msg);
// 				loadImg();
// 				setTimeout(function(){
// 					$(".btnregister").removeClass("errorRegister").text("完成");
// 				},2000);
// 			}
//
// 		},"json");
// 	}
// }

// function clearTxt(){
// 	$("input[type='text'],input[type='password']").each(function(){
// 		$(this).val("");
// 		SLTSEX.select($("#sltSex .ddlItem[data-id='-1']"));
// 	});
// }
//
// function loadImg(){
// 	$("#txtCode").val("");
// 	$("#pic").attr("src",$("#pic").attr("data-path")+"?+="+Date.now());
// }

function showTip(obj){
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
}