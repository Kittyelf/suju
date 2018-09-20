function GoodsList(args){
	if(!args.renderTo){
		throw "渲染地址不存在";
	}
	if(!args.dataSource){
		throw "渲染数据不存在";
	}
	this.init(args);
}

GoodsList.prototype.init = function(args){
	this.goodsList = $("#"+args.renderTo);
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.onComplete = args.onComplete ? args.onComplete : function() {
	};
	this.txt = args.txt;
	if(args.postData){
		if(args.postData.pageSize == null){
			args.postData.pageSize = 9;
		}
		if(args.postData.pageNum == null){
			args.postData.pageNum = 1;
		}
		
	}else{
		args.postData = {
			"pageNum" : 1,
			"pageSize" : 9
		};
	}
	this.postData = args.postData;
	this.goodsList.data("args",args);
	this.bySourceData();
};

GoodsList.prototype.reload = function(pageNum,pageSize){
	var args = this.goodsList.data("args");
	if(pageSize){
		args.postData.pageSize = pageSize; 
	}
	if(pageNum){
		args.postData.pageNum = pageNum; 
	}
	this.init(args);
};

GoodsList.prototype.bySourceData = function(){
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

GoodsList.prototype.build = function(){
	var t = this;
	this.goodsList.html("");
	this.goodsList.addClass("data-suju-gl-panel");
	$(this.dataSource.rows).each(function(num,gbox){
		this.goodsBox = $("<div class='data-suju-gl-gbox'></div>").attr("goodsId",this.id).appendTo(t.goodsList);
		this.imgpanel = $("<div class='data-suju-gl-imgpanel'></div>").appendTo(this.goodsBox);
		if(this.goodsImgList)
			$("<img src='"+"./../upload/"+this.goodsImgList[0].fileName+"' class='data-suju-gl-img'>").appendTo(this.imgpanel);
		$("<div class='data-suju-gl-name'></div>").text(this.name).appendTo(this.goodsBox);
		$("<div class='data-suju-gl-price'></div>").text("RMB "+this.price).appendTo(this.goodsBox);
	});

	var pageLine = $("<div class='data-suju-gl-pageLine'></div>").appendTo(this.goodsList);
	this.prev = $("<span class='pageLine-prev'></span>").appendTo(pageLine);
	$("<i class='fa fa-angle-left'></i>").appendTo(this.prev);
	var pageSpan = $("<span class='pageSpan'></span>").appendTo(pageLine);
	this.curPage = $("<input class='pageLine-curPage' type='text'/>").val(1).appendTo(pageSpan);
	$("<span></span>").appendTo(pageSpan).text("/");
	this.totalPage = $("<span class='pageLine-totalPage'></span>").text(3).appendTo(pageSpan);
	this.next = $("<span class='pageLine-next'></span>").appendTo(pageLine);
	$("<i class='fa fa-angle-right'></i>").appendTo(this.next);

	this.eventBuild();
};

GoodsList.prototype.eventBuild = function(){
	var t = this;
	/*$(".pageLine-prev",this.goodsList).click(function(){
		var cp = $(".pageLine-curPage",t.goodsList);
		var page = +cp.val();
		page = (page-1)<1?1:page-1;
		cp.val(page);
		t.reload(page);
	});
	$(".pageLine-next",this.goodsList).click(function(){
		var cp = $(".pageLine-curPage",t.goodsList);
		var page = +cp.val();
		var maxPage = $(".pageLine-totalPage",t.goodsList).text();
		var newPage = Math.min(maxPage,page+1);
		cp.val(newPage);
		t.reload(newPage);
	});
	$(".pageLine-curPage",t.goodsList).keydown(function(event){
		if(event.which==13)
			t.jumpWeb();
	});*/
	this.onComplete();
};

/*
GoodsList.prototype.jumpWeb = function(){
	var t = this;
	var cp = $(".pageLine-curPage",t.goodsList);
	var page = +cp.val();
	if(typeof page != "number")
		return;
	var maxPage = $(".pageLine-totalPage",t.goodsList).text();
	var newPage = Math.min(maxPage,page);
	newPage = newPage<1?1:newPage;
	cp.val(newPage);
	t.reload(newPage);
};*/
