var e;
var TYPEID;
$(function() {
	inputFocus();
	$("input[type='text'],input[type='password']").each(function(){
		if($(this).val != "")
			$(this).parent().children(".placeholder").addClass("hidden");
	});
	$("input[type='text'],input[type='password']").focus(function(){
		hideTips(this);
	}).blur(function(){
		checkTxt(this);
	}).keyup(function(){
		if($(this).val() == ""){
			if(util.isLTIE10()){ 
				$(this).parent().children(".placeholder").removeClass("hidden");
			}
		}else{
			$(this).parent().children(".placeholder").addClass("hidden");
		}
	});
	$("#txtName").focus();
	if (top.editObj)
		fillTxt();
	$("#btnSave").click(function(){
		btnSave_onClick();
		
	});
	
	$("#btnCancel").click(function(){
		if(TYPEID)
			fillTxt();
		else
			$("#txtName").val("");
		$("#txtName").focus();
	});
});

function btnSave_onClick(){
	var btnSave = $("#btnSave");
	if (btnSave.hasClass("btnDisable"))
		return;
	// 错误统计
	var errCount = 0;
	// 遍历所有输入框
	$("input[type='text'],input[type='password']").each(function() {
		// 检查文本内的文字是否符合要求
		errCount += checkTxt(this);
	});
	btnSave.addClass("btnDisable").text("正在保存，请稍后...");
	if(errCount>0){
		setTimeout(function(){
			btnSave.removeClass("btnDisable").text("保存");
		},100);
		return;
	}
	// 发起请求
	$.post(TYPEID?"updateType.action":"addType.action",{
		id : TYPEID,
		name : $("#txtName").val()
	},function(res){
		if(res.isSuccess==='true'){
			top.dialog.hide();
			top.window.frames["data-frame-rightContainer-mainIframe"].contentWindow.typeGrid.reload();
		}else{
			$("#btnSave").val(res.msg);
		}
		
	},"json");
}

function fillTxt() {
	if(top.editObj)
		e = top.editObj;
	top.editObj = null;
	$("#txtName").val(e.name);
	TYPEID = e.id;
};

function inputFocus(){
	$(".placeholder").click(function(){
		$(this).parent().children("input").focus();
	});
}

function checkTxt(obj){
	var msg = "";
	if($(obj).val() == ""){
		msg = $(obj).attr("placeholder");
	}else{
		if($(obj).val().length >= $(obj).attr("data-minLen") && $(obj).val().length <= $(obj).attr("maxlength") ){
			if(util.validate($(obj).val(),$(obj).attr("data-validate"))){
				msg = "";
			}else{
				msg = "只能输入"+$(obj).attr("data-valueRule");
			} 			
		}else{
			msg = "长度只能是"+$(obj).attr("data-minLen")+"-"+$(obj).attr("maxlength")+"位";
		}	
	} 
	return msg == "" ? hideTips(obj) : showTips(obj,msg);

};

function showTips(obj,msg){
	$(obj).addClass("errorInput");
	$(obj).parent().children(".errorPanel").removeClass("hidden");
	if(util.isLTIE10()){
		var style = {
				opacity:"1",
				top:"-3em"
		};
		$(obj).parent().children(".errorPanel").animate(style);
	}else{
		setTimeout(function(){
			$(obj).parent().children(".errorPanel").css("opacity","1").css("top","-3em");
		},50);
	}
	$(obj).parent().children(".errorPanel").children(".errorTxt").text(msg);
	return 1;
	
};

function hideTips(obj){
	$(obj).removeClass("errorInput");
	if(util.isLTIE10()){
		var style = {
				opacity:"0",
				top:"-2.4em"
		};
		$(obj).parent().children(".errorPanel").animate(style);
		setTimeout(function(){
			$(obj).parent().children(".errorPanel").addClass("hidden");
		},250);
	}else{
		setTimeout(function(){
			$(obj).parent().children(".errorPanel").css("opacity","0").css("top","-2.4em");
		},50);
		setTimeout(function(){
			$(obj).parent().children(".errorPanel").addClass("hidden");
		},200);
	}
	return 0;
};