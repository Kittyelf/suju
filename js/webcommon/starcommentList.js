var obj;
var num;
function StarComment(args){
	try {
		if(!args.renderTo)
			throw "渲染地址不存在";
		if(!args.dataSource)
			throw "渲染数据不存在";
	} catch (e) {
		alert("StarComment初始化失败，原因是："+e);
	}
	this.init(args);
}

StarComment.prototype.init = function(args){
	this.parentDiv = $("#"+args.renderTo);
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.onComplete =  args.onComplete?args.onComplete:function(){};
	this.postData = args.postData;
	this.parentDiv.data("args",args);
	this.byDataSource();
};

StarComment.prototype.byDataSource = function(){
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

StarComment.prototype.reload = function(){
	var args = this.parentDiv.data("args");
	this.init(args);
};

StarComment.prototype.build = function(){
	var t = this;
	this.parentDiv.html("");
	this.parentContainer = $("<div class='comment-list-container'></div>").appendTo(this.parentDiv);
	$("<div class='comment-list-title-panel'>订单号：<span class='comment-order-id'>"+
			this.dataSource.rows[0].id+
			"</span><span class='comment-order-time'>"+this.dataSource.rows[0].createTime
			+"</span></div>").appendTo(this.parentContainer);
	this.commentList = $("<div class='comment-list'></div>").appendTo(this.parentContainer);
	var count = 1;
	$(this.dataSource.rows[0].orderList).each(function(){
		var item = $("<div class='comment-list-item'></div>").appendTo(t.commentList);
		var info = $("<div class='comment-goods-info' data-goodsId='"+this.goodsId+"'></div>").appendTo(item);
		$("<div class='goods-img'><a href='jsp/shop/goods.jsp?goodsId="+this.goodsId
				+"' target='_blank'><img class='goodsImg' src='upload/"+this.goodsImgList[0].fileName
				+"' title='"+this.name+"' width='140' height='140'/></a></div>").appendTo(info);
		$("<div class='goods-name'><a class='a-link' href='jsp/shop/goods.jsp?goodsId="+this.goodsId
				+"' target='_blank' title='"+this.name+"'>"+this.name+"</a></div>").appendTo(info);
		$("<div class='goods-price'><strong>¥<span class='goods-price-txt'>"+this.goodsPrice+
				"</span></strong></div>").appendTo(info);
		var content = $("<div class='comment-conent-panel'></div>").appendTo(item);
		var starLine = $("<div class='comment-star-line'></div>").appendTo(content);
		$("<div class='comment-star-sub'>商品评分</div>").appendTo(starLine);
		$("<div id='star"+count+"' class='comment-star'></div>").appendTo(starLine);
		var contentLine = $("<div class='comment-conent-line'></div>").appendTo(content);
		$("<div class='comment-conent-sub'>评论晒单</div>").appendTo(contentLine);
		var contentPanel = $("<div class='comment-conent'></div>").appendTo(contentLine);
		$("<div class='textarea'><textarea class='conent-text' placeholder='分享体验心得，给万千想买的人一个参考~'/>" +
				"<div class='textarea-ext'>还可输入<span class='textarea-ext-num'>500<span>字</div></div>").appendTo(contentPanel);
		var imgPanel = $("<div class='comment-img-panel'></div>").appendTo(contentPanel);
		$("<div class='comment-img-list'><button class='btnAdd'><span class='btnAddTtx'>+</span></button></div>").appendTo(imgPanel);
		$("<form class='hidden' action='uploadImg.action' enctype='multipart/form-data' method='POST' target='myIframe'></form>").appendTo(imgPanel);
		$("<iframe id='myIframe' name='myIframe'></iframe>").appendTo(imgPanel);
		$("<div class='num-tip-panel'><span class='upload-num'>共<span class='current-num'>0</span>张，还能上传" +
				"<span class='rest-num'>5</span>张</span></div>").appendTo(imgPanel);
		count++;
	});
	this.eventBuild();
};

StarComment.prototype.eventBuild = function(){
	var t = this;
	$(".comment-star").each(function(){
		new Star({
			renderTo:$(this).attr("id"),
			dataSource:[{
				level:"1",
				items:[{item:"实物与图片严重不符"},{item:"不能用"}],
				className:"one-star"
			},{
				level:"2",
				items:[{item:"商品破损严重"},{item:"颜色不好看"}],
				className:"two-stars",
				hidden:true
			},{
				level:"3",
				items:[{item:"商品有瑕疵"},{item:"与预计效果有一定差距"}],
				className:"three-stars",
				hidden:true
			},{
				level:"4",
				items:[{item:"颜色还可以"},{item:"可以更好"}],
				className:"four-stars",
				hidden:true
			},{
				level:"5",
				items:[{item:"完美！"},{item:"物有所值"},{item:"会回购"}],
				className:"five-stars",
				hidden:true
			}],
			onComplete:function(){
				
			}
		});
	});
	$(this.parentContainer).on("click",".btnAdd",function(){
		num = "";
		obj = "";
		var currentObj = $(this).parent().parent().children(".num-tip-panel").children(".upload-num").children(".current-num");
		var restObj = $(this).parent().parent().children(".num-tip-panel").children(".upload-num").children(".rest-num");
		var current = parseInt($(currentObj).text());
		var rest = parseInt($(restObj).text());
		if(rest == "0"){
			return;
		}
		obj = $(this).parent().parent().children("form");
		$(obj).html("");
		num = $(this).parent().parent().children(".num-tip-panel");
		var file = $("<input type='file' name='file'/>").appendTo(obj);
		file.change(function(){
			if(file.val != "")
				$(obj).submit();
		});
		file.click();
	});
	$(this.parentContainer).on("click",".imgContainer",function(){
		var currentObj = $(this).parent().children(".num-tip-panel").children(".upload-num").children(".current-num");
		var restObj = $(this).parent().children(".num-tip-panel").children(".upload-num").children(".rest-num");
		var current = parseInt($(currentObj).text());
		var rest = parseInt($(restObj).text());
		$(this).remove();
		var newCurrent = current>0?current-1:current;
		var newRest = rest<5?rest+1:rest;
		$(currentObj).text(newCurrent);
		$(restObj).text(newRest);
	});
	$(".conent-text",this.parentDiv).keyup(function(){
		   var len = $(this).val().length;
		   if(len > 499){
		    $(this).val($(this).val().substring(0,140));
		   }
		   var num = 500 - len;
		   $(".textarea-ext-num",t.parentDiv).text(num);
		  });
	this.onComplete();
};

top.buildImg = function buildImg(imgFileName){
	var current = parseInt($(".current-num",num).text());
	var rest = parseInt($(".rest-num",num).text());
	var panel = $(num).parent();
	imgFileName = imgFileName.replace(/[\[\]]/g,"");
	var imgContainer = $("<div class='imgContainer'></div>").prependTo(panel);
	imgContainer.append("<img class='goods_img' data-fileName='"+imgFileName+"' src='upload/"+imgFileName+"' alt='商品图片'></img>");
	imgContainer.append("<div class='imgHoverBG'></div>");
	imgContainer.append("<div class='imgTxt'>删除</div>");
	var newCurrent = current<5?current+1:current;
	var newRest = rest>0?rest-1:rest;
	$(".current-num",num).text(newCurrent);
	$(".rest-num",num).text(newRest);
};