var typeGrid;
window.onload = function(){
	LoadGrid();
	$("input[type='text']").keydown(function(event){
		if(event.which==13)
			LoadGrid();
	});
	$("#btnSearch").click(function() {
		LoadGrid();
	});
	$("#btnAdd").click(function(){
		top.dialog.show({
			"title":"添加商品类型",
			"dialogWidth":"35",
			"dialogHeight":"15",
			"dialogUrl":"jsp/dialog/addType.jsp"
		});
		
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
			"title":"修改商品",
			"dialogWidth":"35",
			"dialogHeight":"15",
			"dialogUrl":"jsp/dialog/addType.jsp"
		});
		
	});
	
	$("#btnDel").click(function() {
		if($(this).hasClass("btnDisable"))
			return;
		top.dialog.show({
			title:"删除商品类型",
			dialogWidth:30,
			dialogHeight:15,
			confirm:true,
			text:"商品类型删除后无法恢复，请确认！",
			onClickYes : function() {
				var typeId = $(".gridLineSelect>td[alias='id']").attr("originalvalue");
				$.post("deleteType.action",{
					id : typeId
				},function(res){
					if(res.isSuccess==='true'){
						top.dialog.hide();
						typeGrid.reload();
					}else{
						alert(res.errMsg);
					}	
				},"json");
			}
		});
	});
	
	
};
function LoadGrid(){
	var condition = " WHERE ";
	var txtTypeName = $("#txtTypeName").val();
	if(txtTypeName != "")
		condition += " NAME LIKE '%"+txtTypeName+"%' AND ";
	condition += " 1=1 ";
	typeGrid = new Grid({
		renderTo:"typeManager",
		dataSource:"SelectAllTypeByLimit.action",
		title:[{
			name:"id",
			alias:"类型ID",
			hide:true
		},{
			name:"name",
			alias:"类型名称"
		},{
			name:"createTime",
			alias:"创建时间",
			align:"center"
		}],
		onRowClick : function(tr) {
			var rows = $("#typeManager .gridLineSelect");
			if (rows.length > 0)
				$(".btnDisable").removeClass("btnDisable");
			else
				$("#btnEdit,#btnDel").addClass("btnDisable");
		},
		postData : {
			condition : condition
		}
	});
}
