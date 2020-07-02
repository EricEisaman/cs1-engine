import {version} from './modules/version/version';

document.addEventListener('DOMContentLoaded',e=>{
  const msg = document.createElement('div');
  msg.innerHTML = `</br>cs1-game-socket ${version.version}`;
  document.body.appendChild(msg);
});

 