export default (()=>{
  
AFRAME.registerComponent('cs1jukebox', {
  schema: {
	
  },
  
  init: function(){
    if(!CS1.socket){
      console.error('cs1-jukebox requires a socket connection!');
      return
    }
    CS1.jukebox.audio.addEventListener('jukeboxplay',e=>{
      CS1.socket.emit('jukebox',{action:'play',index:e.detail.index,player:CS1.myPlayer.name});
      CS1.log(`${CS1.myPlayer.name} is playing ${CS1.jukebox.songNames[e.detail.index]}.`);
    });
    CS1.jukebox.audio.addEventListener('jukeboxpause',e=>{
      CS1.socket.emit('jukebox',{action:'pause',player:CS1.myPlayer.name});
      CS1.log(`${CS1.myPlayer.name} has paused the jukebox.`);
    }); 
    CS1.socket.on('jukebox',data=>{
      if(data.player==CS1.myPlayer.name)return;
      switch(data.action){
        case 'play':
          CS1.jukebox.play(data.index);
          CS1.log(`${data.player} is playing ${CS1.jukebox.songNames[data.index]}!`);
          break;
        case 'pause':
          CS1.jukebox.pause(false);
          CS1.log(`${data.player} has paused the jukebox!`);
          break;
      }
    });
  }
});  
  
AFRAME.registerPrimitive('cs1-jukebox', {
  defaultComponents: {
    jukebox:{},
    cs1jukebox:{},
    position:{x:0,y:3,z:-8}
  },
  mappings: {
    names: 'jukebox.names',
    src: 'jukebox.src',
    logo: 'jukebox.logo',
    color: 'jukebox.color',
    highlight:'jukebox.highlight',
    current: 'jukebox.current',
    heading: 'jukebox.heading',
    border: 'jukebox.border',
    scaletext: 'jukebox.scaletext',
    playthrough: 'jukebox.playthrough',
    initialdelay: 'jukebox.initialdelay',
    autoplay: 'jukebox.autoplay',
    volume: 'jukebox.volume'
  }
});  

!function(){"use strict";!function(e){var t={};function s(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(i,a,function(t){return e[t]}.bind(null,a));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="",s(s.s=0)}([function(e,t,s){s(1)},function(e,t,s){if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");const i=s(2);AFRAME.registerComponent("htmlembed",{schema:{ppu:{type:"number",default:256}},init:function(){var e=new i(this.el,()=>{t&&(t.needsUpdate=!0)},(e,t)=>{switch(e){case"resize":this.el.emit("resize");break;case"rendered":this.el.emit("rendered");break;case"focusableenter":this.el.emit("focusableenter",t);break;case"focusableleave":this.el.emit("focusableleave",t);break;case"inputrequired":this.el.emit("inputrequired",t)}});this.htmlcanvas=e;var t=new THREE.CanvasTexture(e.canvas);t.minFilter=THREE.LinearFilter,t.wrapS=THREE.ClampToEdgeWrapping,t.wrapT=THREE.ClampToEdgeWrapping;const s=new THREE.MeshBasicMaterial({map:t,transparent:!0});var a=new THREE.PlaneGeometry,n=new THREE.Mesh(a,s);this.el.setObject3D("screen",n),this.screen=n,this.el.addEventListener("raycaster-intersected",e=>{this.raycaster=e.detail.el}),this.el.addEventListener("raycaster-intersected-cleared",e=>{this.htmlcanvas.clearHover(),this.raycaster=null}),this.el.addEventListener("mousedown",e=>{e instanceof CustomEvent?this.htmlcanvas.mousedown(this.lastX,this.lastY):e.stopPropagation()}),this.el.addEventListener("mouseup",e=>{e instanceof CustomEvent?this.htmlcanvas.mouseup(this.lastX,this.lastY):e.stopPropagation()}),this.resize()},resize(){this.width=this.htmlcanvas.width/this.data.ppu,this.height=this.htmlcanvas.height/this.data.ppu,this.screen.scale.x=this.width,this.screen.scale.y=this.height},update(){this.resize()},forceRender(){this.htmlcanvas.forceRender()},tick:function(){if(this.resize(),this.raycaster){var e=this.raycaster.components.raycaster.getIntersection(this.el);if(e){var t=e.point;this.el.object3D.worldToLocal(t);var s=this.width/2,i=this.height/2,a=Math.round((t.x+s)/this.width*this.htmlcanvas.canvas.width),n=Math.round((1-(t.y+i)/this.height)*this.htmlcanvas.canvas.height);this.lastX==a&&this.lastY==n||this.htmlcanvas.mousemove(a,n),this.lastX=a,this.lastY=n}}},remove:function(){this.el.removeObject3D("screen")}})},function(e,t){!function(){var e=document.createElement("style");e.innerHTML="input, select,textarea{border: 1px solid #000000;margin: 0;background-color: #ffffff;-webkit-appearance: none;}:-webkit-autofill {color: #fff !important;}input[type='checkbox']{width: 20px;height: 20px;display: inline-block;}input[type='radio']{width: 20px;height: 20px;display: inline-block;border-radius: 50%;}input[type='checkbox'][checked],input[type='radio'][checked]{background-color: #555555;}a-entity[htmlembed] img{display:inline-block}a-entity[htmlembed]{display:none}";var t=document.querySelector("head");t.insertBefore(e,t.firstChild)}(),e.exports=class{constructor(e,t,s){if(!e)throw"Container Element is Required";var i;this.updateCallback=t,this.eventCallback=s,this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.html=e,this.html.style.display="block",this.width=0,this.height=0,this.html.style.display="none",this.html.style.position="absolute",this.html.style.top="0",this.html.style.left="0",this.html.style.overflow="hidden",this.mousemovehtml=e=>{e.stopPropagation()},this.html.addEventListener("mousemove",this.mousemovehtml),this.hashChangeEvent=()=>{this.hashChanged()},window.addEventListener("hashchange",this.hashChangeEvent,!1),this.overElements=[],this.focusElement=null,this.img=new Image,this.img.addEventListener("load",()=>{this.render()}),this.csshack();var a=new MutationObserver((e,t)=>{if(!this.nowatch)for(var s=0;s<e.length;s++)if(e[s].target!=this.html||"attributes"!=e[s].type){if(!e[s].target.styleRef||"class"==e[s].attributeName){var a=this.csssig(e[s].target);if(e[s].target.styleRef==a)continue;e[s].target.styleRef=a}i||(i=setTimeout(()=>{this.svgToImg(),i=!1}))}});a.observe(this.html,{attributes:!0,childList:!0,subtree:!0}),this.observer=a,this.cssgenerated=[],this.cssembed=[],this.serializer=new XMLSerializer,this.hashChanged()}forceRender(){Array.from(document.querySelectorAll("*")).map(e=>e.classCache={}),this.svgToImg()}hashChanged(){if(window.clearedHash!=window.location.hash){Array.from(document.querySelectorAll("*")).map(e=>e.classCache={});var e=document.querySelector(".targethack");if(e&&e.classList.remove("targethack"),window.location.hash){var t=document.querySelector(window.location.hash);t&&t.classList.add("targethack")}}window.clearedHash=window.location.hash,this.svgToImg()}cleanUp(){this.observer.disconnect(),window.removeEventListener("hashchange",this.hashChangeEvent),this.html.addEventListener("mousemove",this.mousrmovehtml)}csshack(){for(var e=document.styleSheets,t=0;t<e.length;t++)try{for(var s=e[t].cssRules,i=[],a=0;a<s.length;a++){s[a].cssText.indexOf(":hover")>-1&&i.push(s[a].cssText.replace(new RegExp(":hover","g"),".hoverhack")),s[a].cssText.indexOf(":active")>-1&&i.push(s[a].cssText.replace(new RegExp(":active","g"),".activehack")),s[a].cssText.indexOf(":focus")>-1&&i.push(s[a].cssText.replace(new RegExp(":focus","g"),".focushack")),s[a].cssText.indexOf(":target")>-1&&i.push(s[a].cssText.replace(new RegExp(":target","g"),".targethack"));var n=i.indexOf(s[a].cssText);n>-1&&i.splice(n,1)}for(a=0;a<i.length;a++)e[t].insertRule(i[a])}catch(e){}}dbj2(e){for(var t=5381,s=0;s<e.length;s++)t=(t<<5)+t+e.charCodeAt(s);return t}csssig(e){if(e.classCache||(e.classCache={}),!e.classCache[e.className]){for(var t=getComputedStyle(e),s="",i=0;i<t.length;i++)s+=t[t[i]];e.classCache[e.className]=this.dbj2(s)}return e.classCache[e.className]}arrayBufferToBase64(e){for(var t="",s=e.byteLength,i=0;i<s;i++)t+=String.fromCharCode(e[i]);return window.btoa(t)}embedCss(e,t){return new Promise(s=>{var i,a=[];t=(t=(t=(t=t.replace(new RegExp(":hover","g"),".hoverhack")).replace(new RegExp(":active","g"),".activehack")).replace(new RegExp(":focus","g"),".focushack")).replace(new RegExp(":target","g"),".targethack");const n=RegExp(/url\((?!['"]?(?:data):)['"]?([^'"\)]*)['"]?\)/gi);for(;i=n.exec(t);)a.push(this.getDataURL(new URL(i[1],e)).then((e=>s=>{t=t.replace(e[1],s)})(i)));Promise.all(a).then(e=>{s(t)})})}getURL(e){return e=new URL(e,window.location).href,new Promise(t=>{var s=new XMLHttpRequest;s.open("GET",e,!0),s.responseType="arraybuffer",s.onload=()=>{t(s)},s.send()})}generatePageCSS(){for(var e=Array.from(document.querySelectorAll("style, link[type='text/css'],link[rel='stylesheet']")),t=[],s=0;s<e.length;s++){var i=e[s];if(-1==this.cssgenerated.indexOf(i)){this.csshack();var a=this.cssgenerated.length;this.cssgenerated.push(i),"STYLE"==i.tagName?t.push(this.embedCss(window.location,i.innerHTML).then(((e,t)=>e=>{this.cssembed[t]=e})(0,a))):t.push(this.getURL(i.getAttribute("href")).then((e=>t=>{var s=new TextDecoder("utf-8").decode(t.response);return this.embedCss(window.location,s).then(((e,t)=>e=>{this.cssembed[t]=e})(0,e))})(a)))}}return Promise.all(t)}getDataURL(e){return new Promise(t=>{this.getURL(e).then(s=>{var i=new Uint8Array(s.response),a=s.getResponseHeader("Content-Type").split(";")[0];if("text/css"==a){var n=new TextDecoder("utf-8").decode(i);this.embedCss(e,n).then(e=>{var s=window.btoa(e);s.length>0?t("data:"+a+";base64,"+s):t("")})}else{var o=this.arrayBufferToBase64(i);t("data:"+a+";base64,"+o)}})})}embededSVG(){for(var e=[],t=this.html.querySelectorAll("*"),s=0;s<t.length;s++){var i=t[s].getAttributeNS("http://www.w3.org/1999/xlink","href");if(i&&e.push(this.getDataURL(i).then((e=>t=>{e.removeAttributeNS("http://www.w3.org/1999/xlink","href"),e.setAttribute("href",t)})(t[s]))),"IMG"==t[s].tagName&&"data"!=t[s].src.substr(0,4)&&e.push(this.getDataURL(t[s].src).then((e=>t=>{e.setAttribute("src",t)})(t[s]))),"http://www.w3.org/1999/xhtml"==t[s].namespaceURI&&t[s].hasAttribute("style")){var a=t[s].getAttribute("style");e.push(this.embedCss(window.location,a).then(((e,t)=>s=>{e!=s&&t.setAttribute("style",s)})(a,t[s])))}}var n=this.html.querySelectorAll("style");for(s=0;s<n.length;s++)e.push(this.embedCss(window.location,n[s].innerHTML).then((e=>t=>{e.innerHTML!=t&&(e.innerHTML=t)})(n[s])));return Promise.all(e)}updateFocusBlur(){for(var e=this.html.querySelectorAll("*"),t=0;t<e.length;t++){var s=e[t];s.tabIndex>-1?(s.hasOwnProperty("focus")||(s.focus=(e=>()=>this.setFocus(e))(s)),s.hasOwnProperty("blur")||(s.blur=(e=>()=>this.focusElement==e&&this.setBlur())(s))):(delete s.focus,delete s.blur)}}getParents(){var e=[],t=[],s=this.html.parentNode;do{var i=s.tagName.toLowerCase();"a-"==i.substr(0,2)&&(i="div");var a="<"+("body"==i?'body xmlns="http://www.w3.org/1999/xhtml"':i)+' style="transform: none;left: 0;top: 0;position:static;display: block" class="'+s.className+'"'+(s.id?' id="'+s.id+'"':"")+">";e.unshift(a);var n="</"+i+">";if(t.push(n),"body"==i)break}while(s=s.parentNode);return[e.join(""),t.join("")]}updateCheckedAttributes(){for(var e=this.html.getElementsByTagName("input"),t=0;t<e.length;t++){var s=e[t];s.hasAttribute("checked")?s.checked||s.removeAttribute("checked"):s.checked&&s.setAttribute("checked","")}}svgToImg(){this.updateFocusBlur(),Promise.all([this.embededSVG(),this.generatePageCSS()]).then(()=>{this.html.style.display="block",this.width==this.html.offsetWidth&&this.height==this.html.offsetHeight||(this.width=this.html.offsetWidth,this.height=this.html.offsetHeight,this.canvas.width=this.width,this.canvas.height=this.height,this.eventCallback&&this.eventCallback("resized"));var e=this.serializer.serializeToString(this.html),t=this.getParents();e='<svg width="'+this.width+'" height="'+this.height+'" xmlns="http://www.w3.org/2000/svg"><defs><style type="text/css"><![CDATA[a[href]{color:#0000EE;text-decoration:underline;}'+this.cssembed.join("")+']]></style></defs><foreignObject x="0" y="0" width="'+this.width+'" height="'+this.height+'">'+t[0]+e+t[1]+"</foreignObject></svg>",this.img.src="data:image/svg+xml;utf8,"+encodeURIComponent(e),this.html.style.display="none"})}render(){this.canvas.width=this.width,this.canvas.height=this.height,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.drawImage(this.img,0,0),this.updateCallback&&this.updateCallback(),this.eventCallback&&this.eventCallback("rendered")}transformPoint(e,t,s,i,a){var n=e.transform;if(0==n.indexOf("matrix(")){var o=new THREE.Matrix4,r=n.substring(7,n.length-1).split(", ").map(parseFloat);o.elements[0]=r[0],o.elements[1]=r[1],o.elements[4]=r[2],o.elements[5]=r[3],o.elements[12]=r[4],o.elements[13]=r[5]}else{if(0!=n.indexOf("matrix3d("))return[t,s,z];o=new THREE.Matrix4,r=n.substring(9,n.length-1).split(", ").map(parseFloat),o.elements=r}var l=e["transform-origin"],h=i+(l=l.replace(new RegExp("px","g"),"").split(" ").map(parseFloat))[0],c=a+l[1],d=0;l[2]&&(d+=l[2]);var u=(new THREE.Matrix4).makeTranslation(-h,-c,-d);if(0!=(o=(new THREE.Matrix4).makeTranslation(h,c,d).multiply(o).multiply(u)).determinant())return[t,s];var m=(new THREE.Matrix4).getInverse(o),p=new THREE.Vector3(t,s,0),v=new THREE.Vector3(t,s,-1);p.applyMatrix4(m),v.applyMatrix4(m);var f=v.sub(p).normalize();if(0==f.z)return!1;var g=f.multiplyScalar(-p.z/f.z).add(p);return[g.x,g.y]}getBorderRadii(e,t){for(var s,i=["border-top-left-radius","border-top-right-radius","border-bottom-right-radius","border-bottom-left-radius"],a=[],n=0;n<i.length;n++){for(var o=t[i[n]],r=/(\d*)([a-z%]{1,3})/gi,l=[];s=r.exec(o);)l.push({value:s[1],unit:s[2]});1==l.length&&l.push(l[0]),a.push(l)}const h={px:1,"%":e.offsetWidth/100};var c=[];for(n=0;n<a.length;n++){for(var d=a[n],u=(l=[],0);u<d.length;u++)l.push(d[u].value*h[d[u].unit]);c.push(l)}var m=1,p=1,v=1,f=1,g=c[0][0]+c[1][0];if(g>e.offsetWidth){var b=1/g*e.offsetWidth;m=Math.min(m,b),p=Math.min(p,b)}var y=c[1][1]+c[2][1];y>e.offsetHeight&&(b=1/y*e.offsetHeight,v=Math.min(v,b),p=Math.min(p,b));var w=c[2][0]+c[3][0];w>e.offsetWidth&&(b=1/w*e.offsetWidth,v=Math.min(v,b),f=Math.min(f,b));var E=c[0][1]+c[3][1];return E>e.offsetHeight&&(b=1/E*e.offsetHeight,m=Math.min(m,b),f=Math.min(f,b)),c[0][0]=c[0][0]*m,c[0][1]=c[0][1]*m,c[1][0]=c[1][0]*p,c[1][1]=c[1][1]*p,c[2][0]=c[2][0]*v,c[2][1]=c[2][1]*v,c[3][0]=c[3][0]*f,c[3][1]=c[3][1]*f,c}checkInBorder(e,t,s,i,a,n){if("0px"==t["border-radius"])return!0;var o,r,l=e.offsetWidth,h=e.offsetHeight,c=this.getBorderRadii(e,t);return!(s<c[0][0]+a&&i<c[0][1]+n&&(o=(c[0][0]+a-s)/c[0][0])*o+(r=(c[0][1]+n-i)/c[0][1])*r>1||s>a+l-c[1][0]&&i<c[1][1]+n&&(o=(s-(a+l-c[1][0]))/c[1][0])*o+(r=(c[1][1]+n-i)/c[1][1])*r>1||s>a+l-c[2][0]&&i>n+h-c[2][1]&&(o=(s-(a+l-c[2][0]))/c[2][0])*o+(r=(i-(n+h-c[2][1]))/c[2][1])*r>1||s<c[3][0]+a&&i>n+h-c[3][1]&&(o=(c[3][0]+a-s)/c[3][0])*o+(r=(i-(n+h-c[3][1]))/c[3][1])*r>1)}checkElement(e,t,s,i,a,n,o,r){if(o.offsetParent){var l=window.getComputedStyle(o),h=o.offsetLeft+s,c=o.offsetTop+i,d=o.offsetWidth,u=o.offsetHeight,m=l["z-index"];if("auto"!=m&&(a=0,n=parseInt(m)),"static"!=l.position&&o!=this.html&&"auto"==m&&(a+=1),("block"==l.display||"inline-block"==l.display)&&"none"!=l.transform){var p=this.transformPoint(l,e,t,h,c);if(!p)return;e=p[0],t=p[1],"auto"==m&&(a+=1)}if(e>h&&e<h+d&&t>c&&t<c+u)this.checkInBorder(o,l,e,t,h,c)&&(a>=r.zIndex||n>r.level)&&n>=r.level&&"none"!=l["pointer-events"]&&(r.zIndex=a,r.ele=o,r.level=n);else if("visible"!=l.overflow)return;var v=o.firstChild;if(v)do{1==v.nodeType&&(v.offsetParent==o?this.checkElement(e,t,s+h,i+c,a,n,v,r):this.checkElement(e,t,s,i,a,n,v,r))}while(v=v.nextSibling)}}elementAt(e,t){this.html.style.display="block";var s={zIndex:0,ele:null,level:0};return this.checkElement(e,t,0,0,0,0,this.html,s),this.html.style.display="none",s.ele}moveMouse(){var e=this.moveX,t=this.moveY,s=this.moveButton,i={screenX:e,screenY:t,clientX:e,clientY:t,button:s||0,bubbles:!0,cancelable:!0},a={clientX:e,clientY:t,button:s||0,bubbles:!1},n=this.elementAt(e,t);if(n!=this.lastEle)if(n){n.tabIndex>-1&&this.eventCallback&&this.eventCallback("focusableenter",{target:n}),this.lastEle&&this.lastEle.tabIndex>-1&&this.eventCallback&&this.eventCallback("focusableleave",{target:this.lastEle});var o=[],r=n;this.lastEle&&this.lastEle.dispatchEvent(new MouseEvent("mouseout",i)),n.dispatchEvent(new MouseEvent("mouseover",i));do{if(r==this.html)break;-1==this.overElements.indexOf(r)&&(r.classList&&r.classList.add("hoverhack"),r.dispatchEvent(new MouseEvent("mouseenter",a)),this.overElements.push(r)),o.push(r)}while(r=r.parentNode);for(var l=0;l<this.overElements.length;l++){var h=this.overElements[l];-1==o.indexOf(h)&&(h.classList&&h.classList.remove("hoverhack"),h.dispatchEvent(new MouseEvent("mouseleave",a)),this.overElements.splice(l,1),l--)}}else for(;h=this.overElements.pop();)h.classList&&h.classList.remove("hoverhack"),h.dispatchEvent(new MouseEvent("mouseout",i));n&&-1==this.overElements.indexOf(n)&&this.overElements.push(n),this.lastEle=n,n&&n.dispatchEvent(new MouseEvent("mousemove",i)),this.moveTimer=!1}mousemove(e,t,s){this.moveX=e,this.moveY=t,this.moveButton=s,this.moveTimer||(this.moveTimer=setTimeout(this.moveMouse.bind(this),20))}mousedown(e,t,s){var i={screenX:e,screenY:t,clientX:e,clientY:t,button:s||0,bubbles:!0,cancelable:!0},a=this.elementAt(e,t);a&&(this.activeElement=a,a.classList.add("activehack"),a.classList.remove("hoverhack"),a.dispatchEvent(new MouseEvent("mousedown",i))),this.mousedownElement=a}setFocus(e){e.dispatchEvent(new FocusEvent("focus")),e.dispatchEvent(new CustomEvent("focusin",{bubbles:!0,cancelable:!1})),e.classList.add("focushack"),this.focusElement=e}setBlur(){this.focusElement&&(this.focusElement.classList.remove("focushack"),this.focusElement.dispatchEvent(new FocusEvent("blur")),this.focusElement.dispatchEvent(new CustomEvent("focusout",{bubbles:!0,cancelable:!1})))}clearHover(){var e;for(this.moveTimer&&(clearTimeout(this.moveTimer),this.moveTimer=!1);e=this.overElements.pop();)e.classList&&e.classList.remove("hoverhack"),e.dispatchEvent(new MouseEvent("mouseout",{bubbles:!0,cancelable:!0}));this.lastEle&&this.lastEle.dispatchEvent(new MouseEvent("mouseleave",{bubbles:!0,cancelable:!0})),this.lastEle=null;var t=document.querySelector(".activeElement");t&&(t.classList.remove("activehack"),this.activeElement=null)}mouseup(e,t,s){var i={screenX:e,screenY:t,clientX:e,clientY:t,button:s||0,bubbles:!0,cancelable:!0},a=this.elementAt(e,t);this.activeElement&&(this.activeElement.classList.remove("activehack"),a&&(a.classList.add("hoverhack"),-1==this.overElements.indexOf(a)&&this.overElements.push(a)),this.activeElement=null),a?(a.dispatchEvent(new MouseEvent("mouseup",i)),a!=this.focusElement&&(this.setBlur(),a.tabIndex>-1?this.setFocus(a):this.focusElement=null),a==this.mousedownElement&&(a.dispatchEvent(new MouseEvent("click",i)),"INPUT"==a.tagName&&this.updateCheckedAttributes(),"INPUT"!=a.tagName&&"TEXTAREA"!=a.tagName&&"SELECT"!=a.tagName||this.eventCallback&&this.eventCallback("inputrequired",{target:a}))):(this.focusElement&&this.focusElement.dispatchEvent(new FocusEvent("blur")),this.focusElement=null)}}}]);const e={},t=document.createElement("div");t.setAttribute("style","margin-top: -30px;font-size:10px;text-align:center;color:#58E7F4;");const s=document.createElement("h2");s.innerText="Now Playing",s.setAttribute("style","margin-bottom:-10px;margin-top:30px;text-align:center;color:#fff;"),t.appendChild(s);const i=document.createElement("p");i.setAttribute("style","margin-top: 10px;font-size:12px;text-align:center;color:#58E7F4;"),t.appendChild(i);const a=new Image;a.style.display="block";const n=document.createElement("div");n.setAttribute("style","height:350px;width:240px;border-style:solid;border-width:5px;border-radius:10px;border-color:#D3FFE7;margin-top:2.0em"),n.appendChild(a),n.appendChild(t);const o=document.createElement("a-entity");o.setAttribute("htmlembed",""),o.className="jukebox",o.appendChild(n),e.ui=o,e.player=n,e.logo=a,e.heading=s,e.current=i;const r=window.AFRAME;window.CS1||(window.CS1={}),r.registerComponent("jukebox",{schema:{names:{type:"array",default:["Don't You Worry Bout a Thing</br>by</br>Jacob Collier","Fireflies</br>by</br>Owl City","One Life</br>by</br>Patrick Patrikios","Save Me</br>by</br>the Underground All Stars","Riders on the Storm</br>by</br>the Doors"]},src:{type:"array",default:[159735657,5988210,"https://cdn.glitch.com/a4339379-3ed9-4b49-bced-16d8a59ee858%2FOne_Life.mp3?v=1576924357900",9645925,219569230]},logo:{default:"https://cdn.glitch.com/b88fe5ca-4161-4b19-865e-cfabdd398fa7%2Faj_logo.png?v=1565976468386"},color:{default:"#FFF"},border:{default:"#D3FFE7"},highlight:{default:"#32BA6F"},current:{default:"#58E7F4"},heading:{default:"#FFF"},scaletext:{default:1},playthrough:{default:!0},initialdelay:{default:0},autoplay:{default:!1},volume:{default:1}},init:function(){const t={songs:this.data.src,songNames:this.data.names,volume:this.data.volume,playThrough:this.data.playthrough,initialDelay:this.data.initialdelay};let s=t.songs,i=document.createElement("audio"),a="https://api.soundcloud.com/tracks/",n="/stream?client_id=b9d11449cd4c64d461b8b5c30650cd06";i.loop=!t.playThrough,i.volume=this.data.volume;let o=document.createElement("button");o.innerHTML="PLAY NEXT SONG",o.zIndex=100,o.style.display="none",o.addEventListener("click",e=>{window.CS1.jukebox.playNext()});let r=document.createElement("div");r.style.margin="0 auto",r.style.width="800px",setTimeout(()=>{document.body.appendChild(r),r.appendChild(o)},5e3),t.playThrough&&i.addEventListener("ended",e=>{console.log("bgm song ended"),window.CS1.jukebox.playNext()}),window.CS1.jukebox={audio:i,tracks:s,songNames:t.songNames};let l=0;window.CS1.jukebox.play=function(e){const o="number"==typeof e?e:this.index;if(c.components.sound__clickclick.playSound(),l!=o||"Now Playing"!=m.innerText){if("number"!=typeof e){const e=new CustomEvent("jukeboxplay",{detail:{index:o}});i.dispatchEvent(e)}m.innerText="Now Playing",u.innerHTML=window.CS1.jukebox.songNames[o],l=o,Number(s[o])?i.src=a+s[o]+n:i.src=s[o],i.crossorigin="anonymous",i.autoplay=!0,i.load(),i.loop=!t.playThrough,i.volume=t.volume}else window.CS1.jukebox.pause(!0)},window.CS1.jukebox.pause=function(e){if(i.pause(),m.innerText="Choose a Track",u.innerText="",e){const e=new Event("jukeboxpause");i.dispatchEvent(e)}},window.CS1.jukebox.playNext=function(){++l==s.length&&(l=0),Number(s[l])?i.src=a+s[l]+n:i.src=s[l],i.crossorigin="anonymous",i.load(),i.loop=!t.playThrough,i.play(l),u.innerHTML=t.songNames[l]};const h=e=>{setTimeout(e=>{window.CS1.jukebox.play(0)},t.initialDelay),document.body.removeEventListener(e.type,h),console.log(`Playing Jukebox on ${e.type} event.`)};if(this.data.autoplay&&CS1.jukebox.tracks.length){let e=CS1.game?"gameStart":"click";document.body.addEventListener(e,h)}const c=e.ui;c.setAttribute("sound__hoverclick","src:url(https://cdn.glitch.com/36918312-2de3-4283-951d-240b263949f7%2Fclick.mp3?v=1561929149589);volume:0.2;poolSize:10"),c.setAttribute("sound__clickclick","src:url(https://cdn.glitch.com/98086d61-d948-4a3b-9b36-c3aed0e4a121%2Fclick.mp3?v=1565959171546);volume:0.8;poolSize:10");const d=e.player;e.player.style.borderColor=this.data.border,e.logo.src=this.data.logo,e.logo.style.width="25%",e.logo.style.margin="10px auto 0px",e.logo.style.marginTop="-30px";const u=e.current;u.style.color=this.data.current,u.style.fontSize=`${12*this.data.scaletext}px`;const m=e.heading;m.style.color=this.data.heading,m.style.fontSize=`${14*this.data.scaletext}px`,m.innerText="Choose a Track",u.innerText="";const p=document.createElement("div");p.setAttribute("style","text-align:center;margin-left:0.0em;margin-top:1.0em"),t.songs.forEach((e,s)=>{const i=document.createElement("div");i.innerHTML=t.songNames[s],i.setAttribute("style",`color:${this.data.color};font-size:${12*this.data.scaletext}px`),i.addEventListener("click",window.CS1.jukebox.play.bind({index:s})),i.addEventListener("mouseenter",e=>{c.components.sound__hoverclick.playSound(),i.setAttribute("style",`color:${this.data.color};background-color:${this.data.highlight};font-size:${14*this.data.scaletext}px`)}),i.addEventListener("mouseleave",e=>{i.setAttribute("style",`color:${this.data.color};font-size:${12*this.data.scaletext}px`)}),p.appendChild(i)}),d.appendChild(p),this.el.appendChild(c)}}),r.registerPrimitive("a-jukebox",{defaultComponents:{jukebox:{},position:{}},mappings:{names:"jukebox.names",src:"jukebox.src",logo:"jukebox.logo",color:"jukebox.color",highlight:"jukebox.highlight",current:"jukebox.current",heading:"jukebox.heading",border:"jukebox.border",scaletext:"jukebox.scaletext",playthrough:"jukebox.playthrough",initialdelay:"jukebox.initialdelay",autoplay:"jukebox.autoplay",volume:"jukebox.volume"}})}();


})()