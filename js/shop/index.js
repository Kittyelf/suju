$(function(){
	$("body").click(function(event){
		if($(event.target).hasClass("personal-center-panel")||$(event.target).hasClass("fa-shopping-bag")||$(event.target).hasClass("personal-center-item"))
			return;
		else
			hideTip();
	});
	$(".fa.fa-shopping-bag").click(function(){
		var obj = $(".personal-center-panel");
		$(obj).hasClass("centerSelect")?hideTip():showTip(obj);
	});
	$(".exit").click(function(){
        location.href = "";
	});
	$(".shopbag").click(function(){
        location.href = "shopcar.html";
	});
	$(".userorder").click(function(){
        location.href = "";
	});
	$(".usercenter").click(function(){
        location.href = "login.html";
	});
	$(".register").click(function(){
        location.href = "register.html";
	});
	$(".fa.fa-circle").click(function(){
        location.href = "index.html";
	});
	$("#searchTxt").focus();
	$("#searchTxt").keydown(function(event){
		if(event.which==13)
            location.href = "searchResult.html";
	});
	$(".fa.fa-search").click(function(){
		location.href = "searchResult.html";
	});
	new slideshow({
		renderTo : "data-index-slideshow-container",
		dataSource : [{
			id:1,
			img:"./../img/slide_img1.png"
		},{
			id:2,
			img:"./../img/slide_img2.png"
		},{
			id:3,
			img:"./../img/slide_img3.png"
		},{
			id:4,
			img:"./../img/slide_img4.png"
		}]
	});
});

function showTip(obj){
	$(".personal-center-panel").removeClass("hidden");
	$(obj).addClass("centerSelect");
	if(util.isLTIE10()){
		var style = {
			"opacity":"1",
			"top":"-4em"
		};
		$(obj).animate(style);
	}else{
		setTimeout(function(){
			$(obj).css("opacity","1").css("top","-4em");
		},10);
	}
}

function hideTip(){
	var obj = $(".personal-center-panel");
	$(obj).removeClass("centerSelect");
	if(util.isLTIE10()){
		var style = {
			"opacity":"0",
			"top":"-4.5emem"
		};
		$(obj).animate(style);
	}else{
		setTimeout(function(){
			$(obj).css("opacity","0").css("top","-4.5em");
		},10);
	}
	setTimeout(function(){
		$(".personal-center-panel").addClass("hidden");
	},250);
}