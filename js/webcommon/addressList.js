function Address(args){
	try {
		if (!args.renderTo)
			throw "renderTo元素不存在，请检查ID是否存在";
		if (!args.dataSource)
			throw "必须传入dataSource属性";
	} catch (e) {
		alert("Address初始化失败，原因：" + e);
		return;
	}
	this.init(args);
}

Address.prototype.init = function(args){
	this.parentDiv = $("#"+args.renderTo);
	this.dataSource = args.dataSource;
	this.postData = args.postData;
	this.onComplete = args.onComplete?args.onComplete:function(){};
	this.onClick = args.onClick?args.onClick:function(){};
	this.parentDiv.data("args",args);
	this.getDataBydataSource();
};

Address.prototype.reload = function(){
	var args = this.parentDiv.data("args");
	this.init(args);
};

Address.prototype.getDataBydataSource = function(){
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

Address.prototype.build = function(){
	var t = this;
	this.parentDiv.html("");
	var ul = $("<ul class='address-list'></ul>").appendTo(this.parentDiv);
	$(this.dataSource.rows).each(function(){
		var li = $("<li class='address-item'></li>").appendTo(ul);
		var consigee = $("<div class='consigee-item' data-addressId='"+this.id+"'></div>").appendTo(li);
		this.isDefault==1?consigee.addClass("itemSelect"):"";
		if(t.dataSource.rows.length == "1")
			consigee.addClass("itemSelect");
		$("<span class='consigee-item-name' title='"+this.userName+"'>"+this.userName+"<span>").appendTo(consigee);
		$("<span class='arrow hidden'><i class='fa fa-check'></i></span>").appendTo(consigee);
		var detail = $("<div class='addr-detail'></div>").appendTo(li);
		$("<span class='addr-name' title='"+this.userName+"'>"+this.userName+"</span>").appendTo(detail);
		$("<span class='addr-info' title='"+this.address+"'>"+this.address+"</span>").appendTo(detail);
		$("<span class='addr-tel'>"+this.userTel+"</span>").appendTo(detail);
		var addr = $("<span class='addr-default hidden'>默认地址</span>").appendTo(detail);
		this.isDefault==1?addr.removeClass("hidden"):"";
		var tip = $("<div class='item-tip'></div>").appendTo(li);
		$("<span class='set-default hidden' data-id='"+this.id+"'>设为默认地址</span>").appendTo(tip);
		$("<span class='update-address hidden' data-id='"+this.id+"'>编辑</span>").appendTo(tip);
		$("<span class='del-address hidden' data-id='"+this.id+"'>删除</span>").appendTo(tip);
	});
	var on = $("<div class='addr-switch switch-on'></div>").appendTo(this.parentDiv);
	$("<span>更多地址<span>").appendTo(on);
	$("<i class='fa fa-angle-double-down'></i>").appendTo(on);
	var off = $("<div class='addr-switch switch-off hidden'></div>").appendTo(this.parentDiv);
	$("<span>收起地址<span>").appendTo(off);
	$("<i class='fa fa-angle-double-up'></i>").appendTo(off);
	this.eventBuild();
};

Address.prototype.eventBuild = function(){
	var t = this;
	this.checkDefault();
	$(".address-item").each(function(){
			$(this).children(".consigee-item").hasClass("itemSelect")?
				$(this).removeClass("hidden")
				:$(this).addClass("hidden");
	});
	$(".address-item").on("mouseover",function(){
		t.checkSelect(this);
		$(this).children(".addr-detail").addClass("itemHover");
	}).on("mouseout",function(){
		$(this).children(".item-tip").children().addClass("hidden");
		$(this).children(".addr-detail").removeClass("itemHover");
	});
	$(".consigee-item").on("click",function(){
		$(".consigee-item").removeClass("itemSelect");
		$(this).addClass("itemSelect");
		t.onClick();
		t.checkDefault();
	});
	$(".switch-on").click(function(){
		$(".address-item").removeClass("hidden");
		$(this).addClass("hidden");
		$(".switch-off").removeClass("hidden");
	});
	$(".switch-off").click(function(){
		$(".consigee-item").each(function(){
			if($(this).hasClass("itemSelect")){
				
			}else{
				$(this).parent().addClass("hidden");
			}
		});
		$(this).addClass("hidden");
		$(".switch-on").removeClass("hidden");
	});
	this.onComplete();
};

Address.prototype.checkSelect = function(obj){
	if(!$(obj).children(".consigee-item").hasClass("itemSelect")){
		$(obj).children(".item-tip").children(".del-address").removeClass("hidden");
	}
	if($(obj).children(".addr-detail").children(".addr-default").hasClass("hidden")){
		$(obj).children(".item-tip").children(".set-default").removeClass("hidden");
	}
	$(obj).children(".item-tip").children(".update-address").removeClass("hidden");
};

Address.prototype.checkDefault = function(){
	var items = $(".consigee-item");
	$(items).each(function(){
		if($(this).hasClass("itemSelect")){
			$(this).children(".arrow").removeClass("hidden");
		}else{
			$(this).children(".arrow").addClass("hidden");
		}
	});
};