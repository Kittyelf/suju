var e;
var SLTTYPE;
var GOODSID;
$(function() {
	$("#btnAdd").click(function(){
		$(".goodsImgListSubTItle").removeClass("red").text("请上传3~10张图片");
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
	SLTTYPE = new DDL({
		renderTo : "sltType",
		mapping : {
			key : "id",
			value : "name"
		},
		perloadItem : [ {
			id : "-1",
			name : "-- 请选择 --"
		} ],
		dataSource : "SelectAllType.action",
		onComplete : function() {
			if (top.editObj)
				fillTxt();
			$("#txtName").focus();
		},
		onClick:function(){
			checkSlt();
		}
	});
	/* 保存按钮 */
	$("#btnSave").click(function(){
		btnSave_onClick();
	});
	/* 重置按钮 */
	$("#btnCancel").click(function(){
		if(GOODSID){
			$(".imgContainer").remove();
			fillTxt();
		}
		else{
			$("#txtName").val("");
			$("#txtPrice").val("");
			$("#txtSales").val("");
			$("#txtStock").val("");
			$("#txtDes").val("");
			$("#txtPostage").val("");
			SLTTYPE.select($("#sltType .ddlItem[data-id='-1']"));
			$(".imgContainer").remove();
		}
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
	// 获取商品分类下拉列表选中项
	errCount += checkSlt();
	var imgNum = $(".goods_img").length;
	if(imgNum<1 || imgNum>5){
		errCount++;
		$(".goodsImgListSubTItle").addClass("red").text("请上传1~5张图片，您目前有"+imgNum+"张图片");
	}
	btnSave.addClass("btnDisable").text("正在保存，请稍后...");
	if(errCount>0){
		setTimeout(function(){
			btnSave.removeClass("btnDisable").text("保存");
		},100);
		return;
	}
	// 发起请求
	$.post(GOODSID?"updateGoods.action":"addGoods.action",{
		id : GOODSID,
		name : $("#txtName").val(),
		price : $("#txtPrice").val(),
		sales : $("#txtSales").val(),
		stock : $("#txtStock").val(),
		des : $("#txtDes").val(),
		postage : $("#txtPostage").val(),
		typeId : $("#sltType .ddlSelect").attr("data-id"),
		imgFileNameList :$(".goods_img").map(function(i,t){
			return $(t).attr("data-fileName");
		}).get().join(",")
	},function(res){
		if(res.isSuccess==='true'){
			top.dialog.hide();
			top.window.frames["data-frame-rightContainer-mainIframe"].contentWindow.goodsGrid.reload();
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
	$("#txtName").val(e.name);
	$("#txtPrice").val(e.price);
	$("#txtSales").val(e.sales);
	$("#txtStock").val(e.stock);
	$("#txtDes").val(e.des);
	$("#txtPostage").val(e.postage);
	SLTTYPE.select($("#sltType .ddlItem[data-id='" + e.typeId + "']"));
	GOODSID = e.id;
	$(e.goodsImgList.split(",")).each(function(){
		buildImg(this);
	});
};

function checkSlt() {
	var type = $("#sltType .ddlSelect").attr("data-id");
	if (type == "-1") {
		showTips($("#sltType"), "请选择商品类型");
		return 1;
	} else {
		hideTips($("#sltType"));
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

function inputFocus(){
	$(".placeholder").click(function(){
		$(this).parent().children("input").focus();
	});
}