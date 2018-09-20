var NUM;
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
	this.imgWidth = args.imgWidth?args.imgWidth:135;
	this.font = args.font?args.font:14;
	this.getDataBydataSource();
};
slideshow.prototype.getDataBydataSource = function() {
	var t = this;
	if (Array.isArray(this.dataSource))
		this.build();
	else if (typeof this.dataSource == "string") {
		$.ajax({
			type : "POST",
			url : this.dataSource,
			success : function(res) {
				t.dataSource = res;
				t.build();
			}
		});
	}
};
slideshow.prototype.build = function() {
	this.slideshow = $("#" + this.renderTo);
	this.banner = $("<div id = 'banner'></div>").appendTo(this.slideshow);
	this.bannerlist = $("<div class='bannerlist'></div>").appendTo(this.banner);
	this.left = $("<i class='fa fa-angle-left leftArrow arrow'></i>").appendTo(this.slideshow);
	this.right = $("<i class='fa fa-angle-right rightArrow arrow'></i>").appendTo(this.slideshow);
	this.bottomline_list=$("<div class='bottomline-list'></div>").appendTo(this.slideshow);
	this.ul = $("<ul></ul>").appendTo(this.bottomline_list);
	var t = this;
	$(this.dataSource).each(function(){
		$("<img alt='图片加载失败' src='"+this.img+"'>").attr('index',this.index).appendTo(t.bannerlist);
		$("<li class='bottomline'></li>").attr('index',this.index).appendTo(t.ul);
	});
	this.select($(".bottomline").eq(0));
	NUM = this.dataSource.length;
	this.eventBind();
};

slideshow.prototype.eventBind = function() {
	var i = 0;
	var c = null;
	c = setTimeout(carousel, 5000);
	function carousel() {
		clearTimeout(c);
		if ($(".lineSelect").next().length == 1)
			t.select($(".lineSelect").next());
		else
			t.select($(".bottomline").eq(0));
		t.animate(-t.imgWidth);
		
		c = setTimeout(carousel, 5000);
	}
	var t = this;
	$(this.bottomline_list).on("click",".bottomline",function(event){
		var tg = event.target;
		t.select(tg);
		$("#banner").css("left", $(this).index()*(-t.imgWidth)+"em");
	});
	$(this.left).click (function() { 
		clearTimeout(c);
	    t.animate(t.imgWidth);
	    if($(".lineSelect").prev().length==1)
	    	t.select($(".lineSelect").prev());
	    else
	    	t.select($(".bottomline").eq(NUM-1));
	    c = setTimeout(carousel, 5000);
	});
	$(this.right).click (function() { 
		clearTimeout(c);
	    t.animate(-t.imgWidth);
	    if($(".lineSelect").next().length==1)
	    	t.select($(".lineSelect").next());
	    else
	    	t.select($(".bottomline").eq(0));
	    c = setTimeout(carousel, 5000);
	});
};
slideshow.prototype.btnselect = function(){
	var t = this;
	$(".bottomline").each(function(index){
		if(this.attr("index")==index)
			this.select(this);
	});
};
slideshow.prototype.select = function(bottomline) {
	$("li", this.bottomline_list).removeClass("lineSelect");
	$(bottomline).addClass("lineSelect");
};
slideshow.prototype.animate = function(offset){
	this.list = $("#banner");
	this.newLeft = parseInt(this.list.css("left"))/this.font + offset;
	this.list.css("left",this.newLeft + 'em');
	if(this.newLeft<-(this.imgWidth*(NUM-1))){
		this.list.css("left",0 + 'em');
	}
	if(this.newLeft>0){
		this.list.css("left",-(this.imgWidth*(NUM-1)) + 'em');
	}
	
};