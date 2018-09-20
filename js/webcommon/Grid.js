function Grid(args){
	try {
		if(!args.renderTo){
			throw "渲染地址不存在";
		}
		if(!args.dataSource){
			throw "渲染信息不存在";
		}
		if(!args.title){
			throw "渲染表头信息不存在";
		}
		if (args.onRowClick && !$.isFunction(args.onRowClick))
			throw "onRowClick属性必须是一个方法，现在是" + typeof args.onRowClick;
	} catch (e) {
		alert("Grid初始化失败，原因："+e);
	}
	this.init(args);
};

Grid.prototype.init = function(args){
	this.parentDiv = $("#"+args.renderTo);
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.title = args.title;
	this.onComplete = args.onComplete?args.onComplete:function(){};
	this.onRowClick = args.onRowClick ? args.onRowClick : function(){};
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
	
	//将数据缓存到父元素
	this.parentDiv.data("args",args);
	this.byDataSource();
};

Grid.prototype.reload = function(pageNum,pageSize){
	//获取父元素缓存的数据
	var args = this.parentDiv.data("args");
	if(pageSize){
		args.postData.pageSize = pageSize; 
	}
	if(pageNum){
		args.postData.pageNum = pageNum; 
	}
	$("#btnEdit").addClass("btnDisable");
	$("#btnDel").addClass("btnDisable");
	this.init(args);
};

Grid.prototype.byDataSource = function(){
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

Grid.prototype.build = function(){
	this.parentDiv.html("");
	this.parentDiv.addClass("gridContainer");
	var gridPanel = $("<table class='data-grid-panel'cellspacing=0 callpadding=0></table>").appendTo(this.parentDiv);
	var gridHead = $("<thead class='data-grid-header'></thead>").appendTo(gridPanel);
	var gridHead_tr = $("<tr class='data-grid-header-line'></tr>").appendTo(gridHead);
	var t = this;
	$(this.title).each(function(){
		var th = $("<th class='data-grid-header-item'></th>").text(this.alias).appendTo(gridHead_tr);
		if(this.hide)
			$(th).addClass("hidden");
	});
	this.gridBody = $("<tbody class='data-grid-body'></tbody>").appendTo(gridPanel);
	$(this.dataSource.rows).each(function(i,row){
		var tr = $("<tr class='data-grid-body-line'></tr>").appendTo(t.gridBody);
		$(t.title).each(function(j,column){
			var oldText,newText;
			oldText = newText = row[column.name];
			if(column.formatter && $.isFunction(column.formatter))
				newText =(typeof(column.formatter(newText))=="object")?column.formatter(newText).cellValue:column.formatter(oldText);
			if(column.originalFormatter && $.isFunction(column.originalFormatter))
				oldText = column.originalFormatter(oldText);
			var td = $("<td class='data-grid-body-item'>"+newText+"</td>").attr("originalvalue",oldText).attr("alias",column.name).appendTo(tr);
			if(column.hide)
				$(td).addClass("hidden");
			if(column.align)
				$(td).addClass("align-"+column.align);
		});
	});
	this.footer = $("<div class='data-grid-footer'></div>").appendTo(this.parentDiv);
	var footerLine = $("<div class='data-grid-footer-line'></div>").appendTo(this.footer);
	var arrHTML = [];
	arrHTML.push("<span style='width: 12.3em;padding-left: 3em;'>共<span class='data-grid-footer-total'>"+this.dataSource.total+"</span>项，每页显示</span>");
	arrHTML.push("<span style='width: 5.6em;'><span class='ddlPageSize' style='display:inline-block;width:6em;'></span></span><span style='padding-left: 1.2em;'>项</span>");
	arrHTML.push("<span><button class='btnFirst pageBtn'>首页</button></span>");
	arrHTML.push("<span><button class='btnPrev pageBtn'>上一页</button></span>");
	arrHTML.push("<span class='pageSpan'><span class='currentPage'>"+this.postData.pageNum+"</span>/<span class='totalPage'>"+Math.ceil(this.dataSource.total/this.postData.pageSize)+"</span></span>");
	arrHTML.push("<span><button class='btnNext pageBtn'>下一页</button></span>");
	arrHTML.push("<span><button class='btnLast pageBtn'>尾页</button></span>");
	arrHTML.push("<span><input class='data-grid-footer-page' type='text'/></span>");
	arrHTML.push("<span><button class='btnJump pageBtn'>跳转</button></span>");
	footerLine.html(arrHTML.join(""));
	this.eventBuild();
};

Grid.prototype.eventBuild = function(){
	this.onComplete();
	var grid = this.parentDiv;
	var t = this;
	new DDL({
		renderTo:t.parentDiv.attr("id") +" .ddlPageSize",
		dataSource:[ {
			id : "10",
			name : "10"
		}, {
			id : "20",
			name : "20"
		}, {
			id : "50",
			name : "50"
		}],
		direction:"up",
		onClick:function(obj){
			t.reload(1,obj.id);			
		},
		defaultSelect:t.postData.pageSize
	});
	$(this.gridBody).on("click",".data-grid-body-line",function(){
		if($(this).hasClass("gridLineSelect")){
			$(".data-grid-body-line",t.gridBody).removeClass("gridLineSelect");
			$(".shortDes",t.gridBody).removeClass("selectDes");
			t.onRowClick(this);
			return;
		}
		$(".data-grid-body-line",t.gridBody).removeClass("gridLineSelect");
		$(".shortDes",t.gridBody).removeClass("selectDes");
		$(this).addClass("gridLineSelect");
		$(".shortDes",this).addClass("selectDes");
		t.onRowClick(this);
	});
	$(".btnPrev",this.parentDiv).click(function(){
		var cp = $(".currentPage",t.parentDiv);
		var page = +cp.text();
		page = (page-1)<1?1:page-1;
		cp.text(page);
		t.reload(page,$(".ddlSelect",t.footer).attr("data-id"));
	});
	$(".btnNext",this.parentDiv).click(function(){
		var cp = $(".currentPage",t.parentDiv);
		var page = +cp.text();
		var maxPage = $(".totalPage",t.parentDiv).text();
		var newPage = Math.min(maxPage,page+1);
		cp.text(newPage);
		t.reload(newPage,$(".ddlSelect",t.footer).attr("data-id"));
	});
	$(".btnFirst",this.parentDiv).click(function(){
		t.reload(1,$(".ddlSelect",t.footer).attr("data-id"));
	});
	$(".btnLast",this.parentDiv).click(function(){
		var newPage = $(".totalPage",t.parentDiv).text();
		t.reload(newPage,$(".ddlSelect",t.footer).attr("data-id"));
	});
	$(".btnJump",this.parentDiv).click(function(){
		t.jumpWeb();
	});
	$(".data-grid-footer-page",t.parentDiv).keydown(function(event){
		if(event.which==13)
			t.jumpWeb();
	});
};

Grid.prototype.jumpWeb = function(){
	var t = this;
	var cp = $(".data-grid-footer-page",t.parentDiv);
	var page = +cp.val();
	if(typeof page != "number")
		return;
	var maxPage = $(".totalPage",t.parentDiv).text();
	var newPage = Math.min(maxPage,page);
	newPage = newPage<1?1:newPage;
	cp.text(newPage);
	t.reload(newPage,$(".ddlSelect",t.footer).attr("data-id"));
};