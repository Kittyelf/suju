var e;
var SLTSEX;
var USERID;
$(function() {
	$("#btnAdd").click(function(){
		$(".goodsImgListSubTItle").removeClass("red").text("请上传用户头像");
		$("form").html("");
		var file = $("<input type='file' name='file'/>").appendTo("form");
		file.change(function(){
			if(file.val != "")
				$("form").submit();
		});
		file.click();
	});
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
	SLTSEX = new DDL({
		renderTo : "sltSex",
		mapping : {
			key : "id",
			value : "name"
		},
		perloadItem : [ {
			id : "-1",
			name : "-- 请选择 --"
		} ],
		dataSource : [{
			id : "0",
			name : "女"
		},{
			id : "1",
			name : "男"
		}],
		onComplete : function() {
			setTimeout(function(){
				if (top.editObj)
					fillTxt();
			},50);
			$("#txtUserName").focus();
		},
		onClick : function(){
			checkSlt();
		}
	});
	
	$("#btnSave").click(function(){
		btnSave_onClick();
	});
	
	$("#btnCancel").click(function(){
		if(USERID){
			$(".imgContainer").remove();
			fillTxt();
		}else{
			$(".imgContainer").remove();
			$("#txtUserName").val("");
			$("#txtPassword").val("");
			$("#txtConPassword").val("");
			$("#txtName").val("");
			$("#txtPhone").val("");
			SLTSEX.select($("#sltSex .ddlItem[data-id='-1']"));
		}
		$("#txtUserName").focus();
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
	// 获取商品分类下拉列表选中项
	errCount += checkSlt();
	var imgNum = $(".goods_img").length;
	if(imgNum!=1){
		errCount++;
		$(".goodsImgListSubTItle").addClass("red").text("请上传1张图片，您目前有"+imgNum+"张图片");
	}
	btnSave.addClass("btnDisable").text("正在保存，请稍后...");
	if(errCount>0){
		setTimeout(function(){
			btnSave.removeClass("btnDisable").text("保存");
		},100);
		return;
	}
	// 发起请求
	$.post(USERID?"updateUser.action":"addUser.action",{
		id : USERID,
		userName : $("#txtUserName").val(),
		password : $("#txtPassword").val(),
		name : $("#txtName").val(),
		phone : $("#txtPhone").val(),
		sex : $("#sltSex .ddlSelect").attr("data-id"),
		img : $(".goods_img").attr("data-fileName")
	},function(res){
		if(res.isSuccess==='true'){
			top.dialog.hide();
			top.window.frames["data-frame-rightContainer-mainIframe"].contentWindow.userGrid.reload();
		}else{
			$("#btnSave").val(res.msg);
		}
		
	},"json");
}

function buildImg(imgFileName){
	imgFileName = imgFileName.replace(/[\[\]]/g,"");
	var imgContainer = $("<div class='imgContainer'></div>").prependTo("#goodsImgList");
	imgContainer.append("<img class='goods_img' data-fileName='"+imgFileName+"' src='upload/"+imgFileName+"' alt='商品图片'></img>");
	imgContainer.append("<div class='imgHoverBG'></div>");
	imgContainer.append("<div class='imgTxt'>删除</div>");
	imgContainer.click(function(){
		$(this).remove();
	});
}

function fillTxt() {
	if(top.editObj)
		e = top.editObj;
	top.editObj = null;
	$("#txtUserName").val(e.userName);
	$("#txtPassword").val(e.password);
	$("#txtConPassword").val(e.password);
	$("#txtName").val(e.name);
	$("#txtPhone").val(e.phone);
	SLTSEX.select($("#sltSex .ddlItem[data-id='"+e.sex+"']"));
	USERID = e.id;
	$(e.img.split(",")).each(function(){
		buildImg(this);
	});
};

function inputFocus(){
	$(".placeholder").click(function(){
		$(this).parent().children("input").focus();
	});
	$(".placeholder").click(function(){
		$(this).parent().children("input").focus();
	});
}

function checkSlt() {
	var type = $("#sltSex .ddlSelect").attr("data-id");
	if (type == "-1") {
		showTips($("#sltSex"), "请选择性别");
		return 1;
	} else {
		hideTips($("#sltSex"));
		return 0;
	}
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