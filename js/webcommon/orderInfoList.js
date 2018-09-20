function OIL(args){
	try {
		if (!args.renderTo)
			throw "renderTo元素不存在，请检查ID是否存在";
		if (!args.dataSource)
			throw "必须传入dataSource属性";
	} catch (e) {
		alert("OrderInfoList初始化失败，原因：" + e);
		return;
	}
	this.init(args);
}

OIL.prototype.init = function(args){
	this.parentDiv = $("#"+args.renderTo);
	this.dataSource = args.dataSource;
	this.postData = args.postData;
	this.onComplete = args.onComplete?args.onComplete:function(){};
	this.parentDiv.data("args",args);
	this.getDataBydataSource();
};

OIL.prototype.reload = function(){
	var args = this.parentDiv.data("args");
	this.init(args);
};

OIL.prototype.getDataBydataSource = function(){
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

OIL.prototype.build = function(){
	this.parentDiv.html("");
	var t = this;
	var totalPrice = 0;
	var postage = 0;
	var table = $("<table class='data-orderinfo-tbody'></table>").appendTo(this.parentDiv);
	$(this.dataSource.rows).each(function(){
		var tip = this.stock>0?"有货":"无货";
		parseInt(this.postage)>postage?postage = parseInt(this.postage):postage;
		totalPrice += this.stock>0?this.price*this.num:0;
		var tr = $("<tr class='tr-bd' data-id='"+this.id+"'></tr>").appendTo(table);
		var goods_msg = $("<td class='goods-item-msg'></td>").appendTo(tr);
		var goods_item = $("<div class='goods-item' goods-id='"+this.goodsId+"'></div>").appendTo(goods_msg);
		var p_img = $("<div class='p-img'></div>").appendTo(goods_item);
		$("<a href='jsp/shop/goods.jsp?goodsId="+this.goodsId+"' target='_blank'>" +
				"<img class='goodsImg' src='./../upload/"+this.goodsImgList[0].fileName+"' title='"+this.name+"' width='60' height='60'/></a>")
				.appendTo(p_img);
		var p_msg = $("<div class='p-msg'></div>").appendTo(goods_item);
		var p_name = $("<div class='p-name'></div>").appendTo(p_msg);
		$("<a class='a-link' href='jsp/shop/goods.jsp?goodsId="+this.goodsId+"' target='_blank' title='"+this.name+"'>"+this.name+"</a>").appendTo(p_name);
		$("<div class='goods-number'>x<span class='goods-number-txt'>"+this.num+"</span></div>").appendTo(goods_item);
		var price_msg = $("<td class='goods-price'>¥</td>").appendTo(tr);
		$("<div class='p-price'>"+this.price+"</div>").appendTo(price_msg);
		$("<td class='tip'>"+tip+"</td>").appendTo(tr);
	});
	var price_panel = $("<div class='orderinfo-price-panel'></div>").appendTo(this.parentDiv);
	var priceItems = [{
		title:"<span class='goods-num'>"+this.dataSource.total+"</span>件商品，总金额：",
		unit:"¥",
		price:totalPrice.toFixed(2)
	},{
		title:"返现：",
		unit:"-¥",
		price:"0.00"
	},{
		title:"运费：",
		unit:"¥",
		price:postage.toFixed(2)
	},{
		title:"服务费：",
		unit:"¥",
		price:"0.00"
	}];
	$(priceItems).each(function(){
		var priceLine = $("<div class='price-line'></div>").appendTo(price_panel);
		$("<span class='subtitle'>"+this.title+"</span>").appendTo(priceLine);
		var unitPanel = $("<div class='unit-panel'></div>").appendTo(priceLine);
		$("<span class='unit'>"+this.unit+"<span>").appendTo(unitPanel);
		$("<span class='price'>"+this.price+"<span>").appendTo(unitPanel);
	});
	var realPricePanel = $("<div class='real-price-panel'></div>").appendTo(this.parentDiv);
	var realPriceLine = $("<div class='real-price'></div>").appendTo(realPricePanel);
	$("<span class='realSubtitle'>应付总额：</span>").appendTo(realPriceLine);
	var realunitPanel = $("<div class='real-unit-panel'></div>").appendTo(realPriceLine);
	$("<span class='real-unit'>¥<span>").appendTo(realunitPanel);
	$("<span class='real-price-txt'>"+(postage+totalPrice).toFixed(2)+"<span>").appendTo(realunitPanel);
	var addressInfo = $("<div class='address-info'></div>").appendTo(realPricePanel);
	$("<span class='address-subtitle'>寄送至：<span>").appendTo(addressInfo);
	$("<span class='address-info-detail'><span>").appendTo(addressInfo);
	$("<span class='username-subtitle'>收货人：<span>").appendTo(addressInfo);
	$("<span class='username-info'><span>").appendTo(addressInfo);
	$("<button class='btn-orderinfo'>提交订单</button>").appendTo(this.parentDiv);
	this.eventBuild();
};

OIL.prototype.eventBuild = function(){
	this.onComplete();
};