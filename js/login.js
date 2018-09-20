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
	var userName = util.cookie.get("lastLoginName");
	if(userName != null && userName != ""){
		$(".sujuIdTxt").val(userName);
		$("#chkRM").prop("checked",true);
		$(".sujuPwdTxt").focus();
	}else
		$(".sujuIdTxt").focus();
	inputFocus();
	$(".btn").click(function(){
        btn_Login();
	});
	$("input").keydown(function(event){
		if(event.which==13)
			btn_Login();
	});
	$(".placeholder-line").on("focus","input",function(){
		errorHide();
	}).on("keyup","input",function(){
		if($(this).val() == "")
			$(this).parent().children(".placeholder-txt").removeClass("hidden");
		else
			$(this).parent().children(".placeholder-txt").addClass("hidden");
	});
});
function checkMsg(){
	var count = 0;
	$("input[type='text'],input[type='password']").each(function(){
		var txtObj = $(this);
		var txtStr = txtObj.val();
		var errObj = $(this).parent().children(".errorPanel");
		if(txtStr == ""){
			errorShow(errObj, txtObj);
			return count++;
		}
		if(!util.validate(txtStr, txtObj.attr("data-validate"))){
			errorShow(errObj, txtObj);
			errObj.children(".errorTxt").text(txtObj.attr("valueRule"));
			count++;
		}
		if ($.trim(txtStr).length < txtObj.attr("data-minLen")) {
			errorShow(errObj, txtObj);
			errObj.children(".errorTxt").text("至少输入" + txtObj.attr("data-minLen") + "个字符");
			count++;
		}
		if ($.trim(txtStr).length > txtObj.attr("data-maxLen")) {
			errorShow(errObj, txtObj);
			errObj.children(".errorTxt").text("最多输入" + txtObj.attr("data-maxLen") + "个字符");
			count++;
		}
	});
	return count;
}

function btn_Login(){
	var count = checkMsg();
	if(count>0)
		return;
	else{
        location.href = "index.html";
	}
}

function errorShow(errObj,txtObj){
	errObj.removeClass("hidden").css("opacity",0);
	if(util.isLTIE10()){
		var style = {
			"opacity":1,
			"top":"-3.4em"
		};
		errObj.animate(style,50);
	}else{
		setTimeout(function(){
			errObj.css("opacity",1).css("top","-3.4em");
		},50);	
	}
	txtObj.addClass("errorInput");
}

function errorHide(){
	$(".placeholder-line>input").removeClass("errorInput");
	if(util.isLTIE10()){
		var style = {
			"opacity":0,
			"top":"-2.4em"
		};
		$(".errorPanel.pwd").animate(style).addClass("hidden");
		$(".errorPanel.id").animate(style).addClass("hidden");
	}else{
		$(".errorPanel.pwd").css("opacity",0).css("top","-2.4em");
		$(".errorPanel.id").css("opacity",0).css("top","-2.4em");
		setTimeout(function(){
			$(".errorPanel.pwd").addClass("hidden");
			$(".errorPanel.id").addClass("hidden");
		},250);
	}
}

function inputFocus(){
	$(".placeholder-txt").click(function(){
		$(this).parent().children("input").focus();
	});
}

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