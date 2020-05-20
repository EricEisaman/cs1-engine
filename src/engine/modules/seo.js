export const seo = (()=>{
  
function addLink(rel,href){
const link = document.createElement('link');
link.rel = rel;
link.href = href;
document.head.appendChild(link); 
return link;
}





})()