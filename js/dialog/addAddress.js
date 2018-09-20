var ADDRESSID;
$(function(){
	province = new DDL({
		renderTo:"slt-province",
		dataSource:[{
			id:"-1",
			name:"-请选择省份-"
		},{
			id:"江苏",
			name:"江苏"
		},{
			id:"浙江",
			name:"浙江"
		},{
			id:"四川",
			name:"四川"
		}],
		onClick:function(){
			updateCity();
		},
		onComplete:function(){
			setTimeout(function(){
				if(top.editObj)
					fillTxt();
				$("#userName").focus();
			},250);
		}
	});
	city = new DDL({
		renderTo:"slt-city",
		dataSource:[{
			id:"-1",
			name:"-请先选择省份-"
		}]
	});
	$(".btnSave").click(function(){
		// btnSave();
        top.dialog.hide();
	});
	// $("input").keydown(function(event){
	// 	if(event.which==13)
	// 		btnSave();
	// });
});

function updateCity(){
	var citys = [];
	if($(".ddlSelect").attr("data-id")=="江苏"){
		citys = [{
			id:"-1",
			name:"-请选择市区-"
		},{
			id:"南京",
			name:"南京"
		},{
			id:"泰州",
			name:"泰州"
		},{
			id:"苏州",
			name:"苏州"
		}];
	}
	if($(".ddlSelect").attr("data-id")=="浙江"){
		citys = [{
			id:"-1",
			name:"-请选择市区-"
		},{
			id:"绍兴",
			name:"绍兴"
		},{
			id:"杭州",
			name:"杭州"
		},{
			id:"舟山",
			name:"舟山"
		}];
	}
	if($(".ddlSelect").attr("data-id")=="四川"){
		citys = [{
			id:"-1",
			name:"-请选择市区-"
		},{
			id:"成都",
			name:"成都"
		},{
			id:"绵阳",
			name:"绵阳"
		}];
	}
	if($(".ddlSelect").attr("data-id")=="-1"){
		citys = [{
			id:"-1",
			name:"-请先选择省份-"
		}];
	}
	city = new DDL({
		renderTo:"slt-city",
		dataSource:citys
	});
}

function btnSave(){
	var isDefault = 0;
	if(top.$(".consigee-item").length == "0")
		isDefault = 1;
	var address = $("#slt-province").children(".ddlTitle").text()+"省"+
	$("#slt-city").children(".ddlTitle").text()+"市"+$("#address").val();
	$.post(ADDRESSID?"updateAddress.action":"addAddress.action",{
		id:ADDRESSID,
		userId : top.userId,
		userName : $("#userName").val(),
		userTel : $("#userTel").val(),
		address:address,
		isDefault:isDefault
	},function(res){
		if(res.isSuccess==='true'){
			top.dialog.hide();
			top.address.reload();
			top.orderInfoList.reload();
		}else{
			$("#btnSave").val(res.msg);
		}
		
	},"json");
}

function fillTxt(){
	if(top.editObj)
		e = top.editObj;
	top.editObj = null;
	ADDRESSID = e.id;
	$("#userName").val(e.userName);
	$("#userTel").val(e.userTel);
	$("#address").val(e.address);
	province.select($("#slt-province .ddlItem[data-id='" + e.province + "']"));
	updateCity();
	city.select($("#slt-city .ddlItem[data-id='" + e.city + "']"));
}