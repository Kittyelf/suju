$(function(){
	new slideshow({
		renderTo : "slideshow",
		/*dataSource : [{
			index:1,
			img:"img/slide_img1.png"
		},{
			index:2,
			img:"img/slide_img2.png"
		},{
			index:3,
			img:"img/slide_img3.png"
		},{
			index:4,
			img:"img/slide_img4.png"
		}],*/
		dataSource:[{
			imgList:[{
				index:1,
				img:"img/good/goods1_1.jpg"
			},{
				index:2,
				img:"img/good/goods1_2.jpg"
			},{
				index:3,
				img:"img/good/goods1_3.jpg"
			},{
				index:4,
				img:"img/good/goods1_4.jpg"
			}]
		}],
		imgWidth:28.571428571428573,
		font:14,
		index:0
	});
});