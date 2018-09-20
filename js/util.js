//判断是否是低版本浏览器
function isLow(){
	//判断是否是低版本浏览器 IE8和IE9
	var navUserAgent = navigator.userAgent;
	if((navUserAgent.indexOf("MSIE 8.0")>-1) || (navUserAgent.indexOf("MSIE 9.0")>-1)){
		return true;
	}else{
		return false;
	}
}

function ajax(method,url,callback){
	var xhr = new XMLHttpRequest();
	
	xhr.open(method,url);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			callback(xhr.responseText);
		}
	};
	
	xhr.send();
}

