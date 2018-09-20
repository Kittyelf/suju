function Star(args){
	try{
		if(!args.renderTo){
			throw "渲染地址不存在";
		}if(!args.dataSource){
			throw "渲染数据不存在";
		}
	}catch(e){
		alert("Star初始化失败，原因："+e);
	}
	this.init(args);
}

Star.prototype.init = function(args){
	this.renderTo = args.renderTo;
	this.dataSource = args.dataSource;
	this.onComplete = args.onComplete?args.onComplete:function(){};
	this.build();
};

Star.prototype.build = function(){
	var t = this;
	this.parentDiv = $("#"+this.renderTo).addClass("xzw_starSys");
	var starBox = $("<div class='xzw_starBox'></div>").appendTo(this.parentDiv);
	var stars = $("<ul class='star stars'></ul>").appendTo(starBox);
	$(this.dataSource).each(function(){
		$("<li><a class='"+this.className+"'>"+this.level+"</a></li>").appendTo(stars);
	});
	$("<div class='current-rating showb'></div>").appendTo(starBox);
	$("<div class='description'></div>").appendTo(this.parentDiv);
	var option = $("<div class='option'></div>").appendTo(this.parentDiv);
	$(this.dataSource).each(function(){
		if(this.hidden)
			var clearfix = $("<ul class='option-con clearfix' style='display:none'></ul>").appendTo(option);
		else
			var clearfix = $("<ul class='option-con clearfix'></ul>").appendTo(option);
		$(this.items).each(function(){
			$("<li><a>"+this.item+"</a></li>").appendTo(clearfix);
		});
	});
	$("<div class='prompt'>请选择评论等级</div>").appendTo(this.parentDiv);
	this.eventBuild();
};

Star.prototype.eventBuild = function(){
	var t = this;
	var stepW = 30;
    var description = new Array("太差","不好用","一般","还不错","非常完美");
    var stars = $(".star.stars > li",this.parentDiv);
    var descriptionTemp;
    var option = $(".option",this.parentDiv);
    $(".showb",this.parentDiv).css("width",0);
    stars.each(function(i){
        $(stars[i]).click(function(e){
            var n = i+1;
            $(t.parentDiv).attr("data-icon",n);
            $(".showb",t.parentDiv).css({"width":stepW*n});
            descriptionTemp = description[i];
            $(this).find('a').blur();
            return t.stopDefault(e);
            return descriptionTemp;
        });
    });
    stars.each(function(i){
        $(stars[i]).hover(
            function(){
                $(".description",t.parentDiv).text(description[i]);
                option.find(".option-con:eq(" + $(this).index() + ")",t.parentDiv).show().siblings().hide();
                $(".prompt",t.parentDiv).hide();
            },
            function(){
                if(descriptionTemp != null){
                    $(".description",t.parentDiv).text(descriptionTemp);
                }else{
                   $(".description",t.parentDiv).text(" "); 
                   option.find(".option-con",t.parentDiv).hide();
                  $(".prompt",t.parentDiv).show();
                }

                    
            }
        );
    });
};

Star.prototype.stopDefault = function(e){
	if(e && e.preventDefault)
        e.preventDefault();
	 else
	    window.event.returnValue = false;
	 return false;
};