const version = require('./modules/version/version');
const fs = require('fs');
const express = require('express');  
const app = express();  
const http = require('http').Server(app); 
const io = require('socket.io')(http);
require('./modules/socket/socket.js')(io);
require('./modules/socket/addons/iot-api.js').setApp(app);
require('./modules/admin/ide/ide-api.js').setApp(app);
app.use(express.static('public'));
if(process.env.PROD)
app.use(function(req, res, next) {
      if ((req.get('X-Forwarded-Proto') !== 'https')) {
        res.redirect('https://' + req.get('Host') + req.url);
      } else
        next();    
    });
app.get("/", function (request, response) {
  response.send('CS1 Game Server');
  //response.sendFile('./public/index.html',{root:'.'});
}); 
app.get("/admin", function (request, response) {
  response.send('Server Admin Console');
  //response.sendFile('admin.html',{root:'.'});
}); 
app.set('port', (process.env.PORT || 5000));


const storeJSONData = (data, path) => {
      try {
        fs.writeFileSync(path, JSON.stringify(data) )
      } catch (err) {
        console.error(err)
      }
    }

const storeData = (data, path) => {
      try {
        fs.writeFileSync(path, data )
      } catch (err) {
        console.error(err)
      }
    }

const swStr = `
const cacheName = 'cs1.0.1'; 

self.addEventListener('install', e => {
 console.log('Service Worker Installed');
});

self.addEventListener('activate', e => {
 e.waitUntil(
   caches.keys().then(cacheNames=> {
      return Promise.all(
        cacheNames.map(cache=>{
          if(cache != cacheName){
            return caches.delete(cache);
          }
        })
      )
    })
 )
});

self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res=>{
        const resClone = res.clone();
        caches
      .open(cacheName)
      .then(cache=>{        
       if(e.request.url.includes('socket.io/socket.io'))
          cache.put(e.request,resClone)
       else if(!e.request.url.includes('socket.io') && e.request.method!='HEAD'){
         try{
           cache.put(e.request,resClone);
           
         }catch(err){
          console.log(e.request);
         }
       }
          
       });
       return res;
     }).catch(err=>caches.match(e.request).then(res=>res))
  );
});

`

const manifestJSONStr = `
{
  "name": "CS1",
  "short_name": "CS1",
  "description": "Introduction to Computer Science through Game Design and Development.",
  "icons": [
    {
      "sizes": "192x192",
      "type": "image/png",
      "src": "https://cdn.glitch.com/a66c3f5c-9aba-45c0-952e-ccc59d8b0df3%2FCS1_logo_192.png?v=1564891473987"
    },
    {
      "sizes": "512x512",
      "type": "image/png",
      "src": "https://cdn.glitch.com/a66c3f5c-9aba-45c0-952e-ccc59d8b0df3%2FCS1_logo_512.png?v=1564891633017"
    }
  ],
  "display": "fullscreen",
  "orientation":"landscape",
  "background_color": "white",
  "theme_color": "maroon",
  "start_url": "/index.html"
}

`

const default_config = {
  test: "config testing"
}


const CS1Server = {
  
  
  configure : (config)=>{
    
    CS1Server.config = config; 
    
  },
  
  start : (config=default_config)=>{
    
    console.log(`cs1-game-server ${version.version}`);
    
    console.log(`writing service worker to public/sw.js`);
    
    storeData(swStr,'./public/sw.js');
    
    console.log(`writing PWA manifest to public/manifest.json`);
    
    storeData(manifestJSONStr,'./public/manifest.json');
    

    
    http.listen(app.get('port'), ()=>{
      console.log('GAME SERVER CONFIG:');
      console.log(config);
      console.log('CS1 Game Server listening on port',app.get('port'));
    });
    
    
  }
  

  
}


module.exports = CS1Server


 