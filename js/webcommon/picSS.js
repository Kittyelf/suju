function slideshow(args){
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

slideshow.prototype.init = function(args){
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.defaultSelect = args.defaultSelect ? args.defaultSelect : 1;
	this.build();
};

slideshow.prototype.build = function(){
	var t = this;
	this.parentDiv = $("#"+this.renderTo).attr("class","data-slideshow-container");
	var mainPanel = $("<div class='data-slideshow-mian-container'></div>").appendTo(this.parentDiv);
	this.imgPanel = $("<ul class='data-slideshow-panel'></ul>").appendTo(mainPanel);
	var statusContainer = $("<div class='data-slideshow-status-container'></div>").appendTo(this.parentDiv);
	this.statusPanel = $("<ul class='data-slideshow-status-panel'></ul>").appendTo(statusContainer);
	$(this.dataSource).each(function(){
		var li = $("<li class='data-slideshow-img-item hidden'></li>").attr("data-id",this.id).appendTo(t.imgPanel);
		$("<img class='data-slideshow-img' src='"+this.img+"'/>").attr("data-id",this.id).appendTo(li);
		var sli = $("<li class='data-slideshow-status-item'></li>").attr("data-id",this.id).appendTo(t.statusPanel);
	});
	this.left = $("<i class='fa fa-angle-left leftArrow arrow'></i>").appendTo(this.parentDiv);
	this.right = $("<i class='fa fa-angle-right rightArrow arrow'></i>").appendTo(this.parentDiv);
	this.lineHover = $("<div class='lineHover'></div>").appendTo(statusContainer);
	this.eventBuild();
};

slideshow.prototype.eventBuild = function(){
	var t = this;
	var i = 0;
	var c = null;
	c = setTimeout(carousel, 5000);
	function carousel() {
		clearTimeout(c);
		t.auto();
		c = setTimeout(carousel, 5000);
	}
	$(t.statusPanel).on("mouseenter",".data-slideshow-status-item",function(){
		if(util.isLTIE10()){
			var style = {
				left:$(this).index()*28.51928571428571+"em"
			};
			$(t.lineHover).animate(style);
		}else{
			$(t.lineHover).css("left",$(this).index()*28.51928571428571+"em");
		}
	});
	
	this.show($(".data-slideshow-img-item").eq(0));
	this.select($(".data-slideshow-status-item").eq(0));
	var num = $(".data-slideshow-img-item").length;
	$(this.statusPanel).on("mouseenter",".data-slideshow-status-item",function(event){
		var tg = event.target;
		t.select(tg);
		t.show($(".data-slideshow-img-item").eq($(this).index()));
	});
	this.left.click(function(){
		clearTimeout(c);
		var index = $(".picSelect").attr("data-id")-1;
		if(index == 0){
			t.show($(".data-slideshow-img-item").eq(num-1));
		}else
			t.show($(".data-slideshow-img-item").eq(index-1));
		if($(".lineSelect").prev().length==1){
			t.select($(".lineSelect").prev());
			if(util.isLTIE10()){
				var style = {
					left:(index-1)*28.51928571428571+"em"
				};
				$(t.lineHover).animate(style);
			}else{
				$(t.lineHover).css("left",(index-1)*28.51928571428571+"em");
			}
		}else{
			t.select($(".data-slideshow-status-item").eq(num-1));
			if(util.isLTIE10()){
				var style = {
					left:3*28.51928571428571+"em"
				};
				$(t.lineHover).animate(style);
			}else{
				$(t.lineHover).css("left",3*28.51928571428571+"em");
			}
		}
		c = setTimeout(carousel, 5000);
	});
	this.right.click(function(){
		clearTimeout(c);
		var index = $(".picSelect").attr("data-id")-1;
		if(index == num-1){
			t.show($(".data-slideshow-img-item").eq(0));
		}else
			t.show($(".data-slideshow-img-item").eq(index+1));
		if($(".lineSelect").next().length==1){
			t.select($(".lineSelect").next());
			if(util.isLTIE10()){
				var style = {
					left:(index+1)*28.51928571428571+"em"
				};
				$(t.lineHover).animate(style);
			}else{
				$(t.lineHover).css("left",(index+1)*28.51928571428571+"em");
			}
		}else{
			t.select($(".data-slideshow-status-item").eq(0));
			if(util.isLTIE10()){
				var style = {
					left:"0em"
				};
				$(t.lineHover).animate(style);
			}else{
				$(t.lineHover).css("left","0em");
			}
		}
		c = setTimeout(carousel, 5000);
	});
	$(this.parentDiv).hover(function(){
		if(util.isLTIE10()){
			var style1 = {
				right:".3em"	
			};
			var style2 = {
				left:".3em"	
			};
			t.right.animate(style1);
			t.left.animate(style2);
		}else{
			t.right.css("right",".3em");
			t.left.css("left",".3em");
		}
	},function(){
		if(util.isLTIE10()){
			var style1 = {
				right:"-.4em"	
			};
			var style2 = {
				left:"-.4em"	
			};
			t.right.animate(style1);
			t.left.animate(style2);
		}else{
			t.right.css("right","-.4em");
			t.left.css("left","-.4em");
		}
	});
};

slideshow.prototype.show = function(li){
//	$(".data-slideshow-img-item").removeClass("picSelect").addClass("hidden");
//	li.removeClass("hidden").addClass("picSelect");
//	if (util.isLTIE10()) {
//		var style = {
//			opacity : 1
//		};
//		li.animate(style);
//	} else {
//		setTimeout(function() {
//			li.css("opacity", "1");
//		}, 30);
//	}
	$(".picSelect").fadeOut();
	setTimeout(function() {
		$(".data-slideshow-img-item").removeClass("picSelect").addClass("hidden");
		li.removeClass("hidden").addClass("picSelect");
	}, 100);
	$(li).fadeIn(250);
};

slideshow.prototype.select = function(li) {
	$("li", this.statusPanel).removeClass("lineSelect");
	$(li).addClass("lineSelect");
};

slideshow.prototype.auto = function(){
	var t = this;
	var index = $(".picSelect").attr("data-id")-1;
	if($(".picSelect").next().length==1)
		this.show($(".picSelect").next());
	else
		this.show($(".data-slideshow-img-item").eq(0));
	if($(".lineSelect").next().length==1){
		this.select($(".lineSelect").next());
		if(util.isLTIE10()){
			var style = {
				left:(index+1)*28.51928571428571+"em"
			};
			$(t.lineHover).animate(style);
		}else{
			$(t.lineHover).css("left",(index+1)*28.51928571428571+"em");
		}
	}
	else{
		this.select($(".data-slideshow-status-item").eq(0));
		if(util.isLTIE10()){
			var style = {
				left:"0em"
			};
			$(t.lineHover).animate(style);
		}else{
			$(t.lineHover).css("left","0em");
		}
	}
};