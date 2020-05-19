import links from './modules/links'
import aframe from './modules/vendor/aframe_1.0.4'

const CS1 = window.CS1 = {}

import {version} from './modules/version'
CS1.version = version
console.log(`CS1 ${CS1.version}`)

import {cs1scene} from './modules/components/cs1scene'
//scene(CS1)


import {utils} from './modules/utils'
CS1.utils = utils

import {game} from './modules/components/game'
game(CS1)


import {gltfInstances} from './modules/components/gltf-instances'


import jump from './modules/components/jump'