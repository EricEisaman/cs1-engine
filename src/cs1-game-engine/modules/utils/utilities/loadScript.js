export const loadScript = function (url,txt){
	return new Promise(function(resolve, reject){
		const head = document.getElementsByTagName('head')[0]
		const script = document.createElement('script')
		script.type = 'text/javascript'
		script.addEventListener('load', function(){
			this.removeEventListener('load', this)
			resolve(script)
		})
    if(typeof url == 'string'){
      script.src = url
    }else{
      script.innerHTML = txt
    } 
		head.appendChild(script)
	})
}