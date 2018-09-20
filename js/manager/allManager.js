window.onload = function(){
	var grid = new Grid({
		renderTo:"userManager",
		dataSource:"servlet/SelectAllUser",
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
				var fileName = "img/"+value;
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
			name:"userlevel",
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
		}]
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
		}]
	});
	new Grid({
		renderTo:"goodsManager",
		dataSource:"servlet/SelectAllGoods",
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
			name:"img",
			alias:"商品图片",
			formatter:function(value){
				var str = "<img class='data-grid-body-item-img' src='img/good/"+value+"'/>";
				return str;
			},
			align:"center"
		},{
			name:"price",
			alias:"价格",
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
		}
	});
	new Grid({
		renderTo:"typeManager",
		dataSource:"servlet/SelectAllType",
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
		}]
	});
};
