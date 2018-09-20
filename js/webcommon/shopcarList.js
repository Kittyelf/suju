function ShopCarList(args){
	try {
		if(!args.renderTo){
			throw "渲染地址不存在";
		}
		if(!args.dataSource){
			throw "缺少渲染数据";
		}
	} catch (e) {
		alert("ShopCarList初始化失败，原因是："+e);
	}
	this.init(args);
}

ShopCarList.prototype.init = function(args){
	this.parentDiv = $("#"+args.renderTo);
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.onComplete = args.onComplete?args.onComplete:function(){};
	this.postData = args.postData;
	this.parentDiv.data("args",args);
	this.byDataSource();
};

ShopCarList.prototype.reload = function(){
	var args = this.parentDiv.data("args");
	this.init(args);
};

ShopCarList.prototype.byDataSource = function(){
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

ShopCarList.prototype.build = function(){
	var t = this;
	this.parentDiv.html("");
	var postage = 0;
	var total = 0;
	if(this.dataSource.total == "0"){
		var noPanel = $("<div class='cart-empty'></div>").appendTo(this.parentDiv);
		var message = $("<div class='message'></div>").appendTo(noPanel);
		var img = $("<img src='img/no-login-icon.png' class='icon-img'/>").appendTo(message);
		$("<div class='icon-tip'>购物车空空的哦~，去看看心仪的商品吧~</div>").appendTo(message);
		$("<div class='icon-goshopping'>去购物></div>").appendTo(message);
	}
	$(this.dataSource.rows).each(function(){
		parseInt(this.postage)>postage?postage = parseInt(this.postage):postage;
		total += this.stock>0?this.price*this.num:0;
		var tip = this.stock>0?"有现货":"库存不足";
		var item = $("<div class='shopcar-item' data-id='"+this.id+"'><div>").appendTo(t.parentDiv);
		var img = $("<div class='shopcar-img-panel'></div>").appendTo(item);
		$("<img class='shopcar-img' src='upload/"+this.goodsImgList[0].fileName+"'/>").appendTo(img);
		var msg = $("<div class='shopcar-msg-panel' data-id='"+this.id+"'></div>").appendTo(item);
		var up = $("<div class='shopcar_msg_up' data-id='"+this.id+"'></div>").appendTo(msg);
		var down = $("<div class='shopcar-msg-down' data-id='"+this.id+"'></div>").appendTo(msg);
		$("<div class='shopcar-msg-name' data-goodsId='"+this.goodsId+"'>"+this.name+"</div>").appendTo(up);
		$("<div class='shopcar-msg-price'>RMB "+this.price+"</div>").appendTo(up);
		$("<input class='shopcar-msg-num' type='text' value='"+this.num+"'/>").appendTo(up);
		$("<div class='errorTxt hidden'>限购2件</div>").appendTo(up);
		$("<div class='shopcar-msg-total'>RMB "+this.price*this.num+"</div>").appendTo(up);
		$("<div class='shopcar-msg-date'>送达日期："+tip+"</div>").appendTo(down);
		$("<div class='shopcar-msg-del' data-id='"+this.id+"'>删除</div>").appendTo(down);
	});
	var footer = $("<div class='shopcar-pay-line'></div>").appendTo(this.parentDiv);
	$("<div class='shopcar-pay-postage-part'>配送费<div class='shopcar-pay-postage'>RMB "+postage+"</div></div>").appendTo(footer);
	$("<div class='shop-pay-total-part'>总计<div class='shopcar-pay-total'>RMB "+total+"</div></div>").appendTo(footer);
	this.eventBuild();
};

ShopCarList.prototype.eventBuild = function(){
	$(".shopcar-msg-name").click(function(){
		if(util.isLTIE10())
			window.location.href = "goods.jsp?goodsId="+ $(this).attr("data-goodsId");
		else
			window.location.href = "jsp/shop/goods.jsp?goodsId="+ $(this).attr("data-goodsId");
	});
	$(".icon-goshopping").click(function(){
		if(util.isLTIE10()){
			window.location.href = "../../index.jsp";
		}else{
			window.location.href = "index.jsp";
		}
	});
	this.onComplete();
};