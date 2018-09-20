var userGrid;
window.onload = function(){
	$("#btnSearch").click(function() {
		loadGrid();
	});
	$("#btnAdd").click(function(){
		top.dialog.show({
			"title":"添加用户",
			"dialogWidth":"60",
			"dialogHeight":"30",
			"dialogUrl":"jsp/dialog/addUser.jsp"
		});
		
	});
	$("input[type='text']").keydown(function(event){
		if(event.which==13)
			loadGrid();
	});
	//修改按钮点击事件
	$("#btnEdit").click(function(){
		if($(this).hasClass("btnDisable"))
			return;
		var editObj = {};
		$(".gridLineSelect>td").each(function() {
			var alias = $(this).attr("alias");
			editObj[alias] = $(this).attr("originalvalue");
		});
		top.editObj = editObj;
		top.dialog.show({
			"title":"修改用户",
			"dialogWidth":"60",
			"dialogHeight":"30",
			"dialogUrl":"jsp/dialog/addUser.jsp"
		});
		
	});
	
	$("#btnDel").click(function() {
		if($(this).hasClass("btnDisable"))
			return;
		top.dialog.show({
			title:"删除用户",
			dialogWidth:30,
			dialogHeight:15,
			confirm:true,
			text:"用户删除后无法恢复，请确认！",
			onClickYes : function() {
				var userId = $(".gridLineSelect>td[alias='id']").attr("originalvalue");
				$.post("deleteUser.action",{
					id : userId
				},function(res){
					if(res.isSuccess==='true'){
						top.dialog.hide();
						userGrid.reload();
					}else{
						alert(res.errMsg);
					}	
				},"json");
			}
		});
	});
	
	
	new DDL({
		renderTo:"sltSex",
		dataSource:[{
			id:-1,
			name:"--请选择--"
		},{
			id:0,
			name:"女"
		},{
			id:1,
			name:"男"
		}],
		onComplete:function(){
			loadGrid();
		},
		onClick:function(){
			loadGrid();
		}
	});
};
function loadGrid(){
	var condition = " WHERE ";
	var txtUser = $("#txtUser").val();
	if(txtUser != "")
		condition += " USERNAME LIKE '%"+txtUser+"%' AND ";
	var txtUserName = $("#txtUserName").val();
	if(txtUserName != "")
		condition += " NAME LIKE '%"+txtUserName+"%' AND ";
	var txtPhone = $("#txtPhone").val();
	if(txtPhone != "")
		condition += " PHONE LIKE '%"+txtPhone+"%' AND ";
	var sltSex = $(".ddlSelect","#sltSex").attr("data-id");
	if(sltSex != "-1")
		condition += " SEX = "+sltSex+" AND ";
	condition += " 1=1 ";
	userGrid = new Grid({
		renderTo:"userManager",
		dataSource:"SelectAllUser.action",
		title:[{
			name:"id",
			alias:"用户ID",
			hide:true
		},{
			name:"userName",
			alias:"账号"
		},{
			name:"password",
			alias:"密码"
		},{
			name:"name",
			alias:"用户名"
		},{
			name:"img",
			alias:"用户头像",
			align:"center",
			formatter:function(value){
				var fileName = "upload/"+value;
				var str = "<img class='data-user-grid-img' src='"+fileName+"'>";
				return str;
			}
		},{
			name:"phone",
			alias:"联系方式",
			align:"right"
		},{
			name:"sex",
			alias:"性别",
			formatter:function(value){
				var iconclassName = value == 0? "fa fa-venus" : "fa fa-mars";
				var spanclassName = value == 0? "data-icon-woman" : "data-icon-man";
				var str = "<span class='"+spanclassName+"'><i class='"+iconclassName+"'></i></span>";
				return str;
			},
			align:"center"
		},{
			name:"userLevel",
			alias:"用户等级",
			align:"center",
			formatter:function(value){
				var iconclassName = value == 0? "fa fa-user-o" : "fa fa-mortar-board";
				var spanclassName = value == 0? "data-icon-user" : "data-icon-manager";
				var str = "<span class='"+spanclassName+"'><i class='"+iconclassName+"'></i></span>";
				return str;
			}
		},{
			name:"createTime",
			alias:"创建时间",
			align:"center"
		}],
		onRowClick : function(tr) {
			var rows = $("#userManager .gridLineSelect");
			if (rows.length > 0)
				$(".btnDisable").removeClass("btnDisable");
			else
				$("#btnEdit,#btnDel").addClass("btnDisable");
		},
		postData : {
			condition : condition
		},
		onComplete:function(){
			/*$(".data-user-grid-img").click(function(){
				top.dialog.show({
					"title":"用户头像",
					"dialogWidth":"51.5",
					"dialogHeight":"53",
					"dialogUrl":$(this).attr("src")
				});
			});*/
		}
	});
}
