const CS1 = window.CS1 = {}

import {version} from './modules/version'
CS1.version = version

//import aframe from './modules/vendor/aframe'

import utils from './modules/utils'
window.addEventListener('DOMContentLoaded', e => {
  utils.loadScriptPromise('https://aframe.io/releases/1.0.4/aframe.min.js')
  .then(script=>{
     CS1.scene = document.createElement('a-scene')
     document.body.appendChild(CS1.scene)
     document.body.dispatchEvent(new Event('cs1-ready'))
  })
});




