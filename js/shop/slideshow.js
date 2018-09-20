function slideshow(args) {
	try {
		if (!args.renderTo)
			throw "renderTo元素不存在，请检查ID是否存在";
		if (!args.dataSource)
			throw "必须传入dataSource属性";
	} catch (e) {
		alert("轮播图初始化失败，原因：" + e);
		return;
	}
	this.init(args);
}
slideshow.prototype.init = function(args) {
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.imgWidth = args.imgWidth;
	this.font = args.font;
	this.index = args.index;
	this.build();
};
slideshow.prototype.build = function() {
	this.parentContainer = $("#"+this.renderTo).addClass("data-gl-ss-container");
	this.imgList = $("<ul class='data-gl-ss-imglist'></ul>").appendTo(this.parentContainer);
	var t = this;
	$(this.dataSource[this.index].imgList).each(function(){
		var imgPanel = $("<li class='data-gl-ss-img-panel'></li>").attr("img_id",this.index).appendTo(t.imgList);
		var img = $("<img src="+this.img+" class='data-gl-ss-img'/>").appendTo(imgPanel);
	});
	this.left = $("<i class='fa fa-angle-left leftArrow arrow'></i>").appendTo(this.imgList);
	this.right = $("<i class='fa fa-angle-right rightArrow arrow'></i>").appendTo(this.imgList);
	this.num = $(this.dataSource[this.index].imgList).length;
	this.eventBind();
};

slideshow.prototype.eventBind = function() {
	var t = this;
	$(".data-gl-ss-img-panel","#"+this.renderTo).eq(0).addClass("imgSelect");
	this.arrow = $(".arrow","#"+this.renderTo);
	$(this.imgList).hover(function() {
		var index = $(".imgSelect").eq(t.index).attr("img_id");
		util.isLTIE10() ? t.left.animate({
			left : ".2em"
		}) : t.left.css("left",".2em");
		util.isLTIE10() ? t.right.animate({
			right : ".2em"
		}) : t.right.css("right",".2em");
	}, function() {
		util.isLTIE10() ? t.left.animate({
			left : "-.4em"
		}) : t.left.css("left","-.4em");
		util.isLTIE10() ? t.right.animate({
			right : "-.4em"
		}) : t.right.css("right","-.4em");
	});
	$(this.left).click(function() {
		var index = $(".imgSelect").eq(t.index).attr("img_id");
		$(".data-gl-ss-img-panel","#"+t.renderTo).each(function(){
			$(this).removeClass("imgSelect");
		});
		if(index==1){
			$(".data-gl-ss-img-panel","#"+t.renderTo).eq(t.num-1).addClass("imgSelect");
		}else{
			$(".data-gl-ss-img-panel","#"+t.renderTo).eq(index-2).addClass("imgSelect");
		}
	});
	$(this.right).click(function() {
		var index = $(".imgSelect").eq(t.index).attr("img_id");
		$(".data-gl-ss-img-panel","#"+t.renderTo).each(function(){
			$(this).removeClass("imgSelect");
		});
		if(index==t.num){
			$(".data-gl-ss-img-panel","#"+t.renderTo).eq(0).addClass("imgSelect");
		}else{
			$(".data-gl-ss-img-panel","#"+t.renderTo).eq(index).addClass("imgSelect");
		}
	});
};