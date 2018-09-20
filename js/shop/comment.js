function Comment(args){
	try {
		if(!args.renderTo){
			throw "渲染地址不存在";
		}
		if(!args.dataSource){
			throw "渲染数据不存在";
		}
		if(args.onComplete && !(typeof args.onComplete == "function")){
			throw "onComplete必须是一个方法，当前类型是" + typeof args.onComplete;
		}
	} catch (e) {
		alert("Comment初始化失败，原因"+e);
	}
	this.init(args);
}

Comment.prototype.init = function(args){
	this.parentsDiv = $("#"+args.renderTo);
	this.dataSource = args.dataSource;
	this.onComplete = args.onComplete ? args.onComplete : function(){};
	if(args.postData){
		if(args.postData.pageSize == null){
			args.postData.pageSize = 10;
		}
		if(args.postData.pageNum == null){
			args.postData.pageNum = 1;
		}
		
	}else{
		args.postData = {
			"pageNum" : 1,
			"pageSize" : 10
		};
	}
	this.postData = args.postData;
	this.parentsDiv.data("args",args);
	this.byDataSource();
};

Comment.prototype.byDataSource = function(){
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

Comment.prototype.reload = function(pageNum,pageSize){
	var args = this.parentsDiv.data("args");
	if(pageSize){
		args.postData.pageSize = pageSize; 
	}
	if(pageNum){
		args.postData.pageNum = pageNum; 
	}
	this.init(args);
};

Comment.prototype.build = function(){
	this.parentsDiv.html("");
	this.tab = $("<div class='comment-tab'></div>").appendTo(this.parentsDiv);
	this.commentPanel = $("<div class='data-suju-comment-boxPanel'></div>").appendTo(this.parentsDiv);
	var t = this;
	$(this.dataSource.rows).each(function(){
		var box = $("<div class='data-suju-comment-box'></div>").appendTo(t.commentPanel);
		var user = $("<div class='user-info'></div>").appendTo(box);
		$("<img class='user-info-img' src='upload/"+this.img+"'/>").appendTo(user);
		var name = this.name.substring(0,1)+"***"+this.name.substring(this.name.length-1, this.name.length);
		$("<div class='user-info-name'>"+name+"</div>").appendTo(user);
		var goods = $("<div class='goods-info'></div>").appendTo(box);
		$("<div class='goods-info-star' style='width:"+16*this.icon+"px;'><img src='img/star.png'/></div>").appendTo(goods);
		var content = this.content==null?"该用户未给详细文字评价":this.content;
		$("<div class='goods-info-comment'>"+content+"</div>").appendTo(goods);
		var commentImgList = $("<div class='goods-info-imgs'></div>").appendTo(goods);
		$(this.commentImgList).each(function(){
			$("<img class='goods-info-imgs-img' src='upload/"+this.fileName+"'/>").appendTo(commentImgList);
		});
		$("<div class='goods-info-time'>"+this.createTime+"</div>").appendTo(goods);
	});
	var pageLine = $("<div class='data-suju-gl-pageLine'></div>").appendTo(this.parentsDiv);
	this.prev = $("<span class='pageLine-prev'></span>").appendTo(pageLine);
	$("<i class='fa fa-angle-left'></i>").appendTo(this.prev);
	var pageSpan = $("<span class='pageSpan'></span>").appendTo(pageLine);
	this.curPage = $("<input class='pageLine-curPage' type='text'/>").val(this.postData.pageNum).appendTo(pageSpan);
	$("<span></span>").appendTo(pageSpan).text("/");
	this.totalPage = $("<span class='pageLine-totalPage'></span>").text(Math.ceil(this.dataSource.total/this.postData.pageSize)).appendTo(pageSpan);
	this.next = $("<span class='pageLine-next'></span>").appendTo(pageLine);
	$("<i class='fa fa-angle-right'></i>").appendTo(this.next);
	if(this.dataSource.total == "0"){
		var comment = $("#comment").html("");
		$("<div class='entry-tip'>该商品暂无评论，快去购买首先评论吧！</div>").appendTo(comment);
	}
	this.eventBuild();
};

Comment.prototype.eventBuild = function(){
	var t = this;
	var comment = this.parentsDiv;
	new Tab({
		renderTo:comment.attr("id")+" .comment-tab",
		dataSource:[{
			id:1,
			name:"全部评价"
		},{
			id:2,
			name:"晒图(99+)"
		},{
			id:3,
			name:"好评(99+)"
		},{
			id:3,
			name:"中评(15)"
		},{
			id:3,
			name:"差评(10)"
		}]
	});
	/* 分页 */
	$(".pageLine-prev",this.goodsList).click(function(){
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
	});
	this.onComplete();
};

Comment.prototype.jumpWeb = function(){
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
};

