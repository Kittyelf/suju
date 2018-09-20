function Menu(args) {
	try {
		if (!args.renderTo)
			throw "renderTo元素不存在，请检查ID是否存在";
		if (!args.dataSource)
			throw "必须传入dataSource属性";
	} catch (e) {
		alert("Menu初始化失败，原因：" + e);
		return;
	}
	this.init(args);
}
Menu.prototype.init = function(args) {
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.onClick = args.onClick?args.onClick:function(){};
	this.getDataBydataSource();
};
Menu.prototype.getDataBydataSource = function() {
	var t = this;
	if (typeof this.dataSource == "string") {
		$.ajax({
			type : "POST",
			url : this.dataSource,
			success : function(res) {
				t.dataSource = res;
				t.build();
			}
		});
	}
	this.build();
};
Menu.prototype.build = function() {
	var t = this;
	var parentDiv = $("#"+this.renderTo).addClass("data-suju-menu-container");
	this.menuList = $("<ul class='data-frame-menu-list'></ul>").appendTo(parentDiv);
	$(this.dataSource).each(function(){
		var li = $("<li class='data-frame-menu' url='"+this.url+"'></li>").appendTo(t.menuList);
		$("<i class='"+this.icon+"'></i>").appendTo(li);
		$("<span class='menu-txt'>"+this.txt+"</span>").appendTo(li);
		$("<span class='data-frame-menu-arrow'></span>").appendTo(li);
	});
	this.hoverItem = $("<div class='data-suju-hoverItem hidden'></div>").appendTo(parentDiv);
	this.activeItem = $("<div class='data-suju-activeItem hidden'></div>").appendTo(parentDiv);
	this.eventBind();
};

Menu.prototype.eventBind = function() {
	var t = this;
	var lastMenu = util.cookie.get("lastMenu");
	if(lastMenu != null && lastMenu!=""){
		this.select($("li[url='"+lastMenu+"']",this.menuList));
		this.onClick({
			"url":lastMenu
		});
	}else{
		this.select($("li:eq(0)",this.menuList));
		this.onClick({
			"url":$("li:eq(0)",this.menuList).attr("url")
		});
	}
	$(t.menuList).hover(function(){
		$(t.hoverItem).removeClass("hidden");
	},function(){
		$(t.hoverItem).addClass("hidden");
	});
	$(t.menuList).on("mouseenter",".data-frame-menu",function(event){
		if(util.isLTIE10()){
			var style = {
				top:$(this).index()*3.7535714285714286+"em"
			};
			$(t.hoverItem).animate(style);
		}else{
			$(t.hoverItem).css("top",$(this).index()*3.7535714285714286+"em");
		}
	}).on("click",".data-frame-menu",function(){
		t.select(this);
		util.cookie.set("lastMenu",$(this).attr("url"));
		t.onClick({
			"url":$(this).attr("url")
		});
		$(t.activeItem).removeClass("hidden");
		if(util.isLTIE10()){
			var style = {
				top:$(this).index()*3.7535714285714286+"em"
			};
			$(t.activeItem).animate(style);
		}else{
			$(t.activeItem).css("top",$(this).index()*3.7535714285714286+"em");
		}
	});
};

Menu.prototype.select = function(li){
	$(".data-frame-menu").removeClass("selectMenu");
	$(li).addClass("selectMenu");
	$(".data-frame-menu-arrow").removeClass("arrowselect");
	$(li).children().eq(2).addClass("arrowselect");
};