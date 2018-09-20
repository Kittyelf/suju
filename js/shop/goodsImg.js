function GoodsImg(args){
	try {
		if(!args.renderTo)
			throw "渲染地址不存在";
		if(!args.dataSource)
			throw "渲染数据不存在";
	} catch (e) {
		alert("GoodsImg初始化失败，原因："+e);
	}
	this.init(args);
}

GoodsImg.prototype.init = function(args){
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.build();
};

GoodsImg.prototype.build = function(){
	var t = this;
	this.parentDiv = $("#"+this.renderTo).addClass("goods-message-img-panel");
	this.bigImg = $("<div class='goods-message-img-big'></div>").appendTo(this.parentDiv);
	this.selectBigImg = $("<img class='selectBigImg'/>").attr("src","./../upload/"+this.dataSource[0].fileName).appendTo(this.bigImg);
	this.imgList = $("<ul class='goods_message-img-small-panel'></ul>").appendTo(this.parentDiv);
	$(this.dataSource).each(function(){
		var li = $("<li class='goods_message-img-small-item'></li>").appendTo(t.imgList);
		$("<img class='small-img-item'/>").attr("src","./../upload/"+this.fileName).attr("data-id",this.id).appendTo(li);
	});
	this.eventBuild();
};

GoodsImg.prototype.eventBuild = function(){
	var t = this;
	$(".goods_message-img-small-item").eq(0).addClass("itemImgSelect");
	$(this.imgList).on("click",".goods_message-img-small-item",function(){
		$(".goods_message-img-small-item").removeClass("itemImgSelect");
		$(this).addClass("itemImgSelect");
		t.selectBigImg.attr("src",$(".small-img-item",this).attr("src"));
	});
};