var goodsGrid;
window.onload = function(){
	$("#btnSearch").click(function() {
		loadGrid();
	});
	$("input[type='text']").keydown(function(event){
		if(event.which==13)
			loadGrid();
	});
	$("#btnAdd").click(function(){
		top.dialog.show({
			"title":"添加商品",
			"dialogWidth":"60",
			"dialogHeight":"30",
			"dialogUrl":"jsp/dialog/addGoods.jsp"
		});
		
	});
	
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
			"dialogWidth":"60",
			"dialogHeight":"30",
			"dialogUrl":"jsp/dialog/addGoods.jsp"
		});
		
	});
	
	$("#btnDel").click(function() {
		if($(this).hasClass("btnDisable"))
			return;
		top.dialog.show({
			title:"删除商品",
			dialogWidth:30,
			dialogHeight:15,
			confirm:true,
			text:"商品删除后无法恢复，请确认！",
			onClickYes : function() {
				var goodsId = $(".gridLineSelect>td[alias='id']").attr("originalvalue");
				$.post("deleteGoods.action",{
					id : goodsId
				},function(res){
					if(res.isSuccess==='true'){
						top.dialog.hide();
						goodsGrid.reload();
					}else{
						alert(res.errMsg);
					}	
				},"json");
			}
		});
	});
	
	new DDL({
		renderTo:"sltType",
		dataSource:"SelectAllType.action",
		perloadItem:[{
			id:-1,
			name:"--请选择--"
		}],
		mapping:{
			key:"id",
			value:"name"
		},
		onComplete:function(){
			loadGrid();
		},
		onClick:function(){
			loadGrid();
		}
	});
	
	var data = [{
		id:-1,
		name:"--请选择--"
	},{
		id:"<",
		name:"小于"
	},{
		id:"=",
		name:"等于"
	},{
		id:">",
		name:"大于"
	}];
	
	new DDL({
		renderTo:"sltStock",
		dataSource:data
	});
	
	new DDL({
		renderTo:"sltPostage",
		dataSource:data
	});
	
	new DDL({
		renderTo:"sltPrice",
		dataSource:data
	});
	
	new DDL({
		renderTo:"sltSales",
		dataSource:data
	});
};
function loadGrid(){
	var condition = " WHERE ";
	// 追加商品名称模糊查询条件
	var txtGoodsName = $("#txtGoodsName").val();
	if (txtGoodsName != "")
		condition += " G.NAME LIKE '%" + txtGoodsName + "%' AND ";
	// 追加商品销量查询条件
	var sltSales = $("#sltSales .ddlSelect").attr("data-id");
	var txtSales = $("#txtSales").val();
	if (sltSales != "" && txtSales != "")
		condition += " G.SALES " + sltSales + txtSales + " AND ";
	// 追加商品分类查询条件
	var sltType = $("#sltType .ddlSelect").attr("data-id");
	if (sltType != "-1")
		condition += " G.TYPEID ='" + sltType + "' AND ";
	// 追加商品价格查询条件
	var sltPrice = $("#sltPrice .ddlSelect").attr("data-id");
	var txtPrice = $("#txtPrice").val();
	if (sltPrice != "" && txtPrice != "")
		condition += " G.PRICE " + sltPrice + txtPrice + " AND ";
	// 追加商品库存查询条件
	var sltStock = $("#sltStock .ddlSelect").attr("data-id");
	var txtStock = $("#txtStock").val();
	if (sltStock != "" && txtStock != "")
		condition += " G.STOCK " + sltStock + txtStock + " AND ";
	var txtDes = $("#txtDes").val();
	if (txtDes != "")
		condition += " G.DES LIKE '%" + txtDes + "%' AND ";
	var sltPostage = $("#sltPostage .ddlSelect").attr("data-id");
	var txtPostage = $("#txtPostage").val();
	if (sltPostage != "" && txtPostage != "")
		condition += " G.POSTAGE " + sltPostage + txtPostage + " AND ";
	condition += " 1=1 ";
	goodsGrid = new Grid({
		renderTo:"goodsManager",
		dataSource:"SelectAllGoodsByLimit.action",
		title:[{
			name:"id",
			alias:"商品ID",
			hide:true
		},{
			name:"name",
			alias:"商品名称"
		},{
			name:"des",
			alias:"描述信息",
			formatter : function(value) {
				if (value == null)
					return "";
				else {
					var res = "";
					if (value.length > 10) {
						res += "<div class='desContainer'>";
						res += "<div class='shortDes'>"
								+ value.substring(0, 10)
								+ "...</div>";
						res += "<div class='longDesContainer hidden'><div class='longDes'>"+ value + "</div>";
						res += "</div></div>";
						return res;
					} else
						res = value;
					return res;
				}
			}
		},{
			name:"goodsImgList",
			alias:"商品图片",
			formatter : function(cell) {
				return $(cell).map(
						function() {
							return "<img class='data-grid-body-item-img' src='upload/"
									+ this.fileName + "' data-url='upload/" + this.fileName + "'></img>";
						}).get().join("");
			},
			originalFormatter : function(cell) {
				return $(cell).map(function() {
					return this.fileName;
				}).get().join(",");
			}
		},{
			name:"price",
			alias:"价格",
			formatter:function(value){
				var str = "￥" + Number(value).toFixed(1);
				return str;
			},
			align:"right"
		},{
			name:"postage",
			alias:"邮费",
			formatter:function(value){
				var str = "￥" + Number(value).toFixed(1);
				return str;
			},
			align:"right"
		},{
			name:"sales",
			alias:"累计销售",
			align:"right"
		},{
			name:"stock",
			alias:"剩余库存",
			align:"right"
		},{
			name:"typeName",
			alias:"商品类型"
		},{
			name:"typeId",
			alias:"商品类型ID",
			hide:true
		},{
			name:"createTime",
			alias:"创建时间",
			align:"center"
		}],
		onComplete:function(){
			$(".shortDes").hover(function(){
				var des = $(this);
				des.next().removeClass("hidden");
				setTimeout(function(){
					des.next().addClass("desShow");
				},100);
			},function(){
				var des = $(this);
				des.next().removeClass("desShow");
				setTimeout(function(){
					des.next().addClass("hidden");
				},100);
			});
			$(".data-grid-body-item-img").click(function(){
				top.dialog.show({
					"title":"商品图片",
					"dialogWidth":"40.9",
					"dialogHeight":"43.5",
					"dialogUrl":$(this).attr("data-url")
				});
			});
		},
		onRowClick : function(tr) {
			var rows = $("#goodsManager .gridLineSelect");
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

