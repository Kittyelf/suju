var userId;
$(function(){
	userId = top.userId;
	reload();
	$("#btnAdd").click(function(){
		$("form").html("");
		var file = $("<input type='file' name='file'/>").appendTo("form");
		file.change(function(){
			if(file.val != "")
				$("form").submit();
		});
		file.click();
	});
	$(".click-update").click(function(){
		$("#userName").removeAttr("disabled");
		$("#userName").focus();
	});
	$("#userName").blur(function(){
		$(this).attr("disabled","disabled");
	});
	$(".click-change").click(function(){
		$("#phone").removeAttr("disabled");
		$("#phone").focus();
	});
	$("#phone").blur(function(){
		$(this).attr("disabled","disabled");
	});
	$(".btn-Save").click(function(){
		btn_Save();
	});
	$(".click-rechange").click(function(){
		top.dialog.show({
			"title":"账户充值",
			"dialogWidth":"60",
			"dialogHeight":"30",
			"dialogUrl":"jsp/dialog/addGoods.jsp"
		});
	});
});

function btn_Save(){
	$.post("updateUserMsg.action", {
		id : userId,
		name:$("#userName").val(),
		img:$(".user-img").attr("imgFileName"),
		phone:$("#phone").val()
	}, function(json) {
		if(json.isSuccess == "true"){
			$(".btn-Save").addClass("success").text("修改成功");
			setTimeout(function(){
				$(".btn-Save").removeClass("success").text("保存修改");
			},2000);
			reload();
			top.reload();
		}else{
			$(".btn-Save").addClass("error").text("修改失败");
			setTimeout(function(){
				$(".btn-Save").removeClass("error").text("保存修改");
			},2000);
		}
	});
}

function buildImg(imgFileName){
	imgFileName = imgFileName.replace(/[\[\]]/g,"");
	$(".user-img").attr("src","upload/"+imgFileName).attr("imgFileName",imgFileName);
}

function reload(){
	$.post("selectUserById.action", {
		id : userId
	}, function(json) {
		var user = json.rows[0];
		$(".user-img").attr("imgFileName",user.img).attr("src","upload/"+user.img);
		$("#balance").text(parseFloat(user.balance).toFixed(2));
		$("#userName").val(user.name);
		$("#phone").val(user.phone);
		$("#user-userName").text(user.name);
	});
}