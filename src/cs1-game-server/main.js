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



const default_config = {
  test: "config testing"
}


const CS1Server = {
  
  
  configure : (config)=>{
    
    CS1Server.config = config; 
    
  },
  
  start : (config=default_config)=>{
    
    console.log(`cs1-game-server ${version.version}`);
    
    http.listen(app.get('port'), ()=>{
      console.log('GAME SERVER CONFIG:');
      console.log(config);
      console.log('CS1 Game Server listening on port',app.get('port'));
    });
    
    
  }
  

  
}


module.exports = CS1Server


 