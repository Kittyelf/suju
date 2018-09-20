function Tab(args){
	try {
		if(!args.renderTo){
			throw "渲染地址不存在";
		}
		if(!args.dataSource){
			throw "渲染数据不存在";
		}
		if(args.defaultSelect && ! (typeof args.defaultSelect == "number") ){
			throw "defaultSelect必须是一个数字，当前类型是" + typeof args.defaultSelect;
		}
	} catch (e) {
		alert("Tab初始化失败，原因："+e);
	}
	this.init(args);
};

Tab.prototype.init = function(args){
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.offSet = args.offSet?args.offSet:7.7;
	this.defaultSelect = args.defaultSelect ? args.defaultSelect : 1;
	this.onComplete = args.onComplete?args.onComplete:function(){};
	this.bydataSource();
};

Tab.prototype.bydataSource = function(){
	var t = this;
	if(typeof this.dataSource == "string"){
		$.ajax({
		   type: "POST",
		   url: t.dataSource,
		   success: function(res){
			   t.dataSource = JSON.parse(res);
			   t.build();
		   }
		});	
	}else{
		t.build();
	}
};

Tab.prototype.build = function(){
	var t = this;
	this.parentDiv = $("#"+this.renderTo).addClass("data-tab-container");
	var menuContainer = $("<div class='data-suju-menu-container'></div>").appendTo(this.parentDiv);
	this.itemList = $("<ul class='data-suju-menu-itemList'></ul>").appendTo(menuContainer);
	$(this.dataSource).each(function(){
		var item = $("<li class='data-suju-menu-item' data-id='"+this.id+"'></li>").text(this.name).appendTo(t.itemList);
		if(this.status){
			$(item).attr("data-status",this.status);
		}
	});
	$("li[data-id='"+this.defaultSelect+"']",this.parentDiv).addClass("itemSelect");
	this.itemHover = $("<div class='itemHover hidden'></div>").appendTo(menuContainer);
	this.itemActive = $("<div class='itemActive'></div>").appendTo(menuContainer);
	this.eventBuild();
};

Tab.prototype.eventBuild = function(){
	var t = this;
	$(this.itemList).hover(function(event){
		$(t.itemHover).removeClass("hidden");
	},function(){
		$(t.itemHover).addClass("hidden");
	});
	$(this.itemList).on("mouseenter",".data-suju-menu-item",function(){
		if(util.isLTIE10()){
			var style = {
				left:$(this).index()*t.offSet+"em"
			};
			t.itemHover.animate(style);
		}else{
			$(t.itemHover).css("left",$(this).index()*t.offSet+"em");
		}
	}).on("click",".data-suju-menu-item",function(){
		if(util.isLTIE10()){
			var style = {
				left:$(this).index()*t.offSet+"em"
			};
			t.itemActive.animate(style);
		}else{
			$(t.itemActive).css("left",$(this).index()*t.offSet+"em");
		}
	});
	$(this.parentDiv).click(function(event){
		if(!$(event.target).hasClass("data-suju-menu-item"))
			return;
		$(".data-suju-menu-item",t.parentDiv).removeClass("itemSelect");
		$(event.target).addClass("itemSelect");
	});
	this.onComplete();
};