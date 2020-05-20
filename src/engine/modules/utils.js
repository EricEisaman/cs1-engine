export const utils = {
  
  loadScript: function (url){
	return new Promise(function(resolve, reject){
		const head = document.getElementsByTagName('head')[0]
		const script = document.createElement('script')
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