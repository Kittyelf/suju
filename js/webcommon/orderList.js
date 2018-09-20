function OrderList(args){
	try {
		if (!args.renderTo)
			throw "renderTo元素不存在，请检查ID是否存在";
		if (!args.dataSource)
			throw "必须传入dataSource属性";
	} catch (e) {
		alert("OrderList初始化失败，原因：" + e);
		return;
	}
	this.init(args);
}

OrderList.prototype.init = function(args){
	this.parentDiv = $("#"+args.renderTo);
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.onComplete = args.onComplete?args.onComplete:function(){};
	this.postData = args.postData;
	
	//将数据缓存到父元素
	this.parentDiv.data("args",args);
	this.byDataSource();
};

OrderList.prototype.reload = function(obj){
	var args = this.parentDiv.data("args");
	if(obj!=""&&obj!=null)
		args.postData = obj;
	this.init(args);
};

OrderList.prototype.byDataSource = function(){
	var t = this;
	if(typeof this.dataSource == "string"){		
		$.post(t.dataSource, t.postData, function(res){
			t.dataSource = res;
			t.build();
		},"json");
		
	}else{
		t.build();
	}
};

OrderList.prototype.build = function(){
	this.parentDiv.html("");
	var t = this;
	if(this.dataSource.total=="0"){
		var odiv = $("<div class='data-suju-order-tip'>您暂无相关内容的订单</div>").appendTo(this.parentDiv);
		$("<a class='index-link' href='index.jsp'>去购物></a>").appendTo(odiv);
	}else{
		var tb = $("<table class='data-order-tb' cellspacing=0 callpadding=0></table>").appendTo(this.parentDiv);
		var thead = $("<thead class='data-order-thead'></thead>").appendTo(tb);
		var tr = $("<tr></tr>").appendTo(thead);
		var tharr = ["订单详细","收货人","金额","状态","操作"];
		for ( var i = 0; i < tharr.length; i++) {
			$("<th>"+tharr[i]+"</th>").appendTo(tr);
		}
		var tbody = $("<tbody class='data-order-tbody'></tbody>").appendTo(tb);
	}
	$(this.dataSource.rows).each(function(){
		var row = this;
		var sep_row = $("<tr class='sep-row'></tr>").appendTo(tbody);
		$("<td colspan='5'></td>").appendTo(sep_row);
		var tr_th = $("<tr class='tr-th'></tr>").appendTo(tbody);
		var th_td = $("<td colspan='5'></td>").appendTo(tr_th);
		$("<div class='data-order-createTime'>"+this.createTime+"</div>").appendTo(th_td);
		$("<div class='data-order-id' data-id='"+this.id+"'>订单号："+this.id+"</div>").appendTo(th_td);
		$("<div class='data-order-del' data-id='"+this.id+"'><i class='fa fa-trash-o'></i></div>").appendTo(th_td);
		var span = this.orderList.length;
		$(this.orderList).each(function(i,part){
			var tr_bd = $("<tr class='tr-bd' data-id='"+this.id+"'></tr>").appendTo(tbody);
			var goods_td = $("<td></td>").appendTo(tr_bd);
			var goods_item = $("<div class='goods-item' goods-id='"+this.goodsId+"'></div>").appendTo(goods_td);
			var p_img = $("<div class='p-img'></div>").appendTo(goods_item);
			$("<a href='jsp/shop/goods.jsp?goodsId="+this.goodsId+"' target='_blank'>").appendTo(p_img);
			$("<img class='goodsImg' src='upload/"+this.goodsImgList[0].fileName+"'" +
					"title='"+this.name+"' width='60' height='60'/>").appendTo(p_img);
			var p_msg = $("<div class='p-msg'><div>").appendTo(goods_item);
			$("<div class='p-msg'><div class='p-name'><a href='jsp/shop/goods.jsp?goodsId="+this.goodsId+"' class='a-link' target='_blank' title='"+this.name+"'>"
					+this.name+"</a></div></div>").appendTo(p_msg);
			$("<div class='goods-number'>x"+this.goodsNum+"</div>").appendTo(goods_td);
			/*************************************************************/
			if(!i>0){
				var span_td1 = $("<td class='rowspan' rowspan='"+span+"'></td>").appendTo(tr_bd);
				$("<div class='consignee'><span class='txt'>"+row.userName+"</span></div>").appendTo(span_td1);
				var consigenn_panel = $("<div class='consignee-panel hidden'></div>").appendTo(span_td1);
				$("<div class='consignee-userName'>"+row.userName+"</div>").appendTo(consigenn_panel);
				$("<div class='consignee-userTel'>"+row.userTel+"</div>").appendTo(consigenn_panel);
				$("<div class='consignee-address'>"+row.address+"</div>").appendTo(consigenn_panel);
				var span_td2 = $("<td class='rowspan' rowspan='"+span+"'></td>").appendTo(tr_bd);
				$("<div class='amount'><span>¥"+parseFloat(row.realTotalMoney).toFixed(2)+"</span></div>").appendTo(span_td2);
				var span_td3 = $("<td class='rowspan' rowspan='"+span+"'></td>").appendTo(tr_bd);
				var statusTxt = "";
				if(row.orderStatus == "0"){
					statusTxt = "未付款";
				}else if(row.orderStatus == "1"){
					statusTxt = "等待收货";
				}else if(row.orderStatus == "2"){
					statusTxt = "已取消";
				}else if(row.orderStatus == "10"){
					statusTxt = "确认收货";
				}else{
					statusTxt = "已评价";
				}
				var status = $("<div class='status'></div>").appendTo(span_td3);
				$("<span class='order-status' data-status='"+row.orderStatus+"'>"+statusTxt+"</span><br/>").appendTo(status);
				$("<a class='orderdetailed'>订单详情</a>").appendTo(status);
				var span_td4 = $("<td class='rowspan' rowspan='"+span+"'></td>").appendTo(tr_bd);
				var btnRebuy = $("<button class='btnRebuy'><i class='fa fa-flash'></i>再次购买</button>").appendTo(span_td4);
				if(row.orderStatus == "0"){
					$(btnRebuy).addClass("gotoPay").attr("data-id",row.id).html("<i class='fa fa-credit-card-alt'></i>去支付");
					$("<button class='btnCancel'><i class='fa fa-remove'>取消订单</i></button>").appendTo(span_td4);
				}else if(row.orderStatus == "1"){
					$(btnRebuy).addClass("conGoods").attr("data-id",row.id).html("<i class='fa fa-check-square-o'></i>确认收货");
				}else if(row.orderStatus == "10"){
					$(btnRebuy).addClass("goTxt").attr("data-id",row.id).html("<i class='fa fa-pencil'></i>去评价");
					$("<button class='btnCancel'><i class='fa fa-jpy'></i>申请退款</button>").appendTo(span_td4);
				}else if(row.orderStatus == "2"){
					return;
				}else{
					$("<button class='btnCancel'><i class='fa fa-jpy'></i>申请退款</button>").appendTo(span_td4);
				}
			}
		});
	});
	this.eventBuild();
};

OrderList.prototype.eventBuild = function(){
	$(".consignee").on("mouseover",function(){
		var obj = $(this).parent().children(".consignee-panel");
		$(obj).removeClass("hidden");
		if(util.isLTIE10()){
			var style = {
				opacity:"1",
				left:"6em"
			};
			$(obj).animate(style);
		}else{
			setTimeout(function(){
				$(obj).css("opacity","1").css("left","6em");
			},50);
		}
		
	}).on("mouseleave",function(){
		var obj = $(this).parent().children(".consignee-panel");
		if(util.isLTIE10()){
			var style = {
				opacity:"0",
				left:"4em"
			};
			$(obj).animate(style);
		}else{
			setTimeout(function(){
				$(obj).css("opacity","0").css("left","4em");
			},50);
		}
		setTimeout(function(){
			$(obj).addClass("hidden");
		},250);
	});
	this.onComplete();
};