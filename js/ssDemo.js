$(function(){
	new SS({
		renderTo:"slideshow",
		dataSource:[{
			id:1,
			img:"img/slide_img1.png"
		},{
			id:2,
			img:"img/slide_img2.png"
		},{
			id:3,
			img:"img/slide_img3.png"
		},{
			id:4,
			img:"img/slide_img4.png"
		}],
		defaultSelect:1
	});
});