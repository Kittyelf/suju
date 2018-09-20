function SS(args){
	try {
		if(!args.renderTo)
			throw "渲染地址不存在";
		if(!args.dataSource)
			throw "渲染数据不存在";
		if(args.defaultSelect && ! (typeof args.defaultSelect == "number") )
			throw "defaultSelect必须是一个数字，当前类型是" + typeof args.defaultSelect;
	} catch (e) {
		alert("轮播图初始化失败，原因"+e);
	}
	this.init(args);
}

SS.prototype.init = function(args){
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.defaultSelect = args.defaultSelect ? args.defaultSelect : 1;
	this.build();
};

SS.prototype.build = function(){
	var parentDiv = $("#"+this.renderTo).attr("class","data-picSlide-container");
	this.slidePanel = $("<ul class='data-picSlide-panel'></ul>").appendTo(parentDiv);
	var t = this;
	$(this.dataSource).each(function(){
		var li = $("<li class='data-picSlice-imgItem hidden'></li>").attr("data-id",this.id).appendTo(t.slidePanel);
		var img = $("<img src="+this.img+">").appendTo(li);
	});
	this.left = $("<i class='fa fa-angle-left leftArrow arrow'></i>").appendTo(parentDiv);
	this.right = $("<i class='fa fa-angle-right rightArrow arrow'></i>").appendTo(parentDiv);
	this.eventBuild();
};

SS.prototype.eventBuild = function(){
	var t = this;
	this.select($(".data-picSlice-imgItem").eq(0));
	var num = $(".data-picSlice-imgItem").length;
	this.left.click(function(){
		var index = $(".ss-select").attr("data-id")-1;
		if(index == 0){
			t.select($(".data-picSlice-imgItem").eq(num-1));
		}else
			t.select($(".data-picSlice-imgItem").eq(index-1));
	});
	this.right.click(function(){
		var index = $(".ss-select").attr("data-id")-1;
		if(index == num-1){
			t.select($(".data-picSlice-imgItem").eq(0));
		}else
			t.select($(".data-picSlice-imgItem").eq(index+1));
	});
};

SS.prototype.select = function(li){
	$(".data-picSlice-imgItem").removeClass("ss-select").addClass("hidden");
	li.removeClass("hidden").addClass("ss-select");
	if (util.isLTIE10()) {
		li.css("opacity", 0);
		var style = {
			opacity : 1
		};
		li.animate(style);
	} else {
		setTimeout(function() {
			li.css("opacity", "1");
		}, 30);
	}
};