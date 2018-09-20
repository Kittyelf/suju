function DDL(args){
	try{
		if (!Array.isArray) {
			Array.isArray = function(arg) {
				return Object.prototype.toString.call(arg) === '[object Array]';
			};
		}
		if(!args.renderTo){
			throw "渲染地址不存在";
		}
		if(!args.dataSource){
			throw "渲染数据不存在";
		}
//		//判断默认选中项是否存在
//		if(args.defaultSelect && ! (typeof args.defaultSelect == "number") ){
//			throw "defaultSelect必须是一个数字，当前类型是" + typeof args.defaultSelect;
//		}
		//判断预加载项是否存
		if(args.perloadItem && !Array.isArray(args.perloadItem)){
			throw "perloadItem必须是一个对象数组，当前类型是" + typeof args.perloadItem;
		}
		//判断点击事件是否存在
		if(args.onClick && !(typeof args.onClick == "function")){
			throw "onClick必须是一个方法，当前类型是" + typeof args.onClick;
		}
		//判断点击事件是否存在
		if(args.onComplete && !(typeof args.onComplete == "function")){
			throw "onComplete必须是一个方法，当前类型是" + typeof args.onComplete;
		}
	}catch(e){
		alert("DDL初始化失败，原因"+e);
	}
	this.init(args);
};

DDL.prototype.init = function(args){
	this.parentsDiv = $("#"+args.renderTo);
//	this.ddl = $("<div class='ddl'></div>").appendTo(this.parentsDiv);
//	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.perloadItem = args.perloadItem;
	this.defaultSelect = args.defaultSelect;
	this.direction = args.direction == "up" ? "bottom" : "top";
	this.offset = args.offset ? args.offset : 0;
	this.mapping = args.mapping ? args.mapping : {
		"key":"id",
		"value":"name"
	};
	this.onClick = args.onClick ? args.onClick : function(){};
	this.onComplete = args.onComplete ? args.onComplete : function(){};
	this.parentsDiv.data("this",this);
	this.byDataSource();
};

DDL.prototype.byDataSource = function(){
	var t = this;
	if(typeof this.dataSource == "string"){
		$.ajax({
		   type: "POST",
		   url: t.dataSource,
		   success: function(res){
			   t.dataSource = res;
			   t.build();
		   }
		});		
	}else{
		t.build();
	}
};

DDL.prototype.build = function(){
//	this.ddl = $("<div class='ddl'></div>").appendTo(this.parentsDiv);
	this.parentsDiv.addClass("ddl");
	this.arrow = $("<div class='arrow'></div>").appendTo(this.parentsDiv);
	this.ddlTitle = $("<div class='ddlTitle'></div>").text("--请选择--").appendTo(this.parentsDiv);
	this.selectList = $("<ul class='selectList hidden'></ul>").appendTo(this.parentsDiv);
	if(this.dataSource.rows){
		if(this.perloadItem){
			this.dataSource.rows = this.perloadItem.concat(this.dataSource.rows);
		}
	}else if(this.perloadItem){
		this.dataSource = this.perloadItem.concat(this.dataSource);
	}
	var t = this;
	if(this.dataSource.rows){
		$(this.dataSource.rows).each(function(index, item){
			$("<li class='ddlItem'></li>").attr("data-id",item[t.mapping.key]).text(item[t.mapping.value]).appendTo(t.selectList);
		});
	}else{
		$(this.dataSource).each(function(index, item){
			$("<li class='ddlItem'></li>").attr("data-id",item[t.mapping.key]).text(item[t.mapping.value]).appendTo(t.selectList);
		});
	}
	this.select($("li" + (this.defaultSelect ? "[data-id='" + this.defaultSelect + "']" : ":eq(0)"), this.parentsDiv));
	this.eventBuild();
};

DDL.prototype.eventBuild = function(){
	var t = this;
//	$(this.parentsDiv).hover(function(){
//		
//	},function(){
//		t.selectList.hasClass("hidden")?t.hide():t.hide();
//	});
//	this.parentsDiv.click(function(event){
//		t.selectList.hasClass("hidden")?t.show():t.hide();
//		event.stopPropagation();
//	});
//	
//	$(".selectList",t.parentsDiv).on("click",".ddlItem",function(){
//		t.select(event.target);
//		t.onClick({
//			"id":$(event.target).attr("data-id"),
//			"value":$(event.target).text()
//		});
//	});
	this.parentsDiv.click(function(event){
		var tg = event.target;
		var tc = tg.className;
		if (tc == "ddlItem") {
			t.select(tg);
			t.onClick({
				"id":$(event.target).attr("data-id"),
				"value":$(event.target).text()
			});
		}
		t.selectList.hasClass("hidden")?t.show():t.hide();
//		$(".ddl").not(t.ddl).each(function() {
//			$(this).data("this").hide();
//		});
		event.stopPropagation();
	});
	// 点击页面其他位置收起下拉列表
	$("body").click(function() {
		t.hide();
	});
	this.onComplete();
};
DDL.prototype.show = function() {
	var t = this;
	this.selectList.removeClass("hidden");
	if (util.isLTIE10()) {
		this.selectList.css("opacity", 0);
		var style = {
			opacity : 1
		};
		style[this.direction] = this.offset + 2.35 +"em";
		this.selectList.animate(style);
	} else {
		this.arrow.addClass("arrowSelect");
		setTimeout(function() {
			t.selectList.css(t.direction,t.offset + 2.35 + "em").css("opacity", "1");
		}, 30);
	}
};

DDL.prototype.hide = function() {
	var t = this;
	if (util.isLTIE10()) {
		var style = {
			opacity : 0
		};
		style[this.direction] = this.offset + 1.8 +"em";
		this.selectList.animate(style);
	} else {
		this.arrow.removeClass("arrowSelect");
		setTimeout(function() {
			t.selectList.css(t.direction,t.offset + 1.8 + "em").css("opacity","0");
		}, 30);
	}
	setTimeout(function() {
		t.selectList.addClass("hidden");
	}, 300);
};
DDL.prototype.select = function(li){
	var t = this;
	$(".ddlItem",t.parentsDiv).removeClass("ddlSelect");
	$(li).addClass("ddlSelect");
	t.ddlTitle.text($(li).text());
};