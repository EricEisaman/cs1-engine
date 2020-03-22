export default {
  
  loadScript: function (url, callback){

    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
},
  
  loadScriptPromise: function (url){
	return new Promise(function(resolve, reject){
		var head = document.getElementsByTagName('head')[0]
		var script = document.createElement('script')
		script.type = 'text/javascript'
		script.addEventListener('load', function(){
			this.removeEventListener('load', this)
			resolve(script)
		})
		script.src = url
		head.appendChild(script)
	})
}
  
  
}