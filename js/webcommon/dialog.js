function Dialog(args){

	try{
		if(!args.renderTo){
			throw "渲染地址不存在";
		}
	}catch(e){
		alert("Dialog初始化失败，原因："+e);
	}
	this.init(args);
	
}

Dialog.prototype.init = function(args){
	
	this.renderTo = $("#"+args.renderTo);
	this.confirm = args.confirm;
	this.icon = args.icon;
};

Dialog.prototype.build = function(){
	this.renderTo.html("");
	
	//创建弹出层内容区域
	this.dialogBar = $("<div class='dialog-bar'></div>").appendTo(this.renderTo);
	this.barTitle = $("<div class='bar-title'>"+this.titleTxt+"</div>").appendTo(this.dialogBar);
	this.barClose = $("<div class='bar-close'><i class='fa fa-times' aria-hidden='true'></i></div>").appendTo(this.dialogBar);
	
	this.dialogMes = $("<div class='dialog-mes'>").appendTo(this.renderTo);
//	this.dialogPage = $("<iframe id='dialog-page' src='"+this.dialogUrl+"' frameborder='0'></iframe>").appendTo(this.dialogMes);
	
	if(this.confirm){
		var content = $("<div class='content'></div>").appendTo(this.dialogMes);
		if(this.icon)
			var icon = $("<i class='"+this.icon+"'></i>").appendTo(content);
		else
			var icon = $("<i class='fa fa-trash-o'></i>").appendTo(content);
		var contentTxt = $("<div class='contentTxt'></div>").text(this.text).appendTo(content);
		this.btnBar = $("<div class='btnBar'></div>").appendTo(this.dialogMes);
		this.btnYes = $("<button id='btnYes'>确认</button>").appendTo(this.btnBar);
		this.btnNo = $("<button id='btnNo'>取消</button>").appendTo(this.btnBar);
	}else
		this.dialogPage = $("<iframe id='dialog-page' src='"+this.dialogUrl+"' frameborder='0'></iframe>").appendTo(this.dialogMes);
	
	//创建遮盖层
	this.dialogMask = $("<div id='dialog-mask' class='hidden'></div>").insertAfter(this.renderTo);
	
	//调用事件绑定
	this.bindEvent();
};
//事件绑定
Dialog.prototype.bindEvent =function(){
	var t = this;
	$(t.barClose).hover(function(){
		$(this).addClass("closeHover");
	},function(){
		$(this).removeClass("closeHover");
	}).click(function(){
		t.hide();
	});
	
	if(this.confirm)
		$(this.btnBar).on("click","button",function(){
			t.hide();
			if($(this).attr("id")=="btnYes")
				t.onClickYes();
		});
	if(this.reconfirm)
		$(this.btnBar).on("click","button",function(){
			t.hide();
			if($(this).attr("id")=="btnYes")
				t.onClickYes();
	});
	

};

//下拉列表显示
Dialog.prototype.show = function(args){
	var t = this;
	this.titleTxt = args.title;
	this.dialogUrl = args.dialogUrl;
	this.confirm = args.confirm;
	this.text = args.text;
	this.icon = args.icon;
	this.onClickYes = args.onClickYes ? args.onClickYes : function(){};
	this.renderTo.css({
		"width":args.dialogWidth+"em",
		"height":args.dialogHeight+"em",
		"margin-left":-(args.dialogWidth)/2 +"em",
		"margin-top":-(args.dialogHeight)/2+"em"
	});
	
	
	t.build();
	$("#dialog-div").removeClass("hidden").css("opcity",0);
	$("#dialog-mask").removeClass("hidden").css("opcity",0);
	
	if(util.isLTIE10()){
		setTimeout(function(){
			t.dialogMask.animate({
				"opacity":"0.4"
			},250);
			t.renderTo.animate({
				"opacity":"1"
			},250);
		},50);
	}else{
		setTimeout(function(){
			t.dialogMask.css({
				"opacity":"0.4"
			},250);
			t.renderTo.css({
				"opacity":"1"
			});
		},50);
	}
	

};
//下拉列表隐藏
Dialog.prototype.hide = function(){
	var t = this;
	
	if(util.isLTIE10()){
		setTimeout(function(){
			t.renderTo.animate({
				"opacity":"0"
			},250);
			t.dialogMask.animate({
				"opacity":"0"
			},250);
		},50);
	}else{
		setTimeout(function(){
			t.renderTo.css({
				"opacity":"0"
			});
			t.dialogMask.css({
				"opacity":"0"
			},250);
		},50);
	}
	setTimeout(function(){
		$("#dialog-div").addClass("hidden");
		$("#dialog-mask").addClass("hidden");
	},250);
	
};