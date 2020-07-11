# 🛣️ The Road to 1.0.0

## API Promises
___

### Overview: 

These promises define the minimum developer contract which will be fullfilled by one or more of the **CS1 Game Engine** packages by the **1.0.0** release.

- Choice of game type: 
  - single player
  - single player with authentication and database
  - multiplayer with authentication and database.
  
- Easy Avatar Management
  - provide Blender templates for custom avatars
  - custom avatar animations ✅
  - simple and powerful animation control API ✅
  - work effortlessly across devices
    - Standard ✅
    - Mobile
    - Oculus Browser ✅
  
- Easy Camera Control
  - first person camera
  - third person camera
    - set avatar opacity
    - set camera offset
  - transition between camera states

- Multimodal Development
  - combine HTML and JavaScript ✅
  - only HTML ✅
  - only JavaScript inline ✅
  - only JavaScript loaded via src ✅
  - mix inline and src loaded JavaScript ✅
  
- Installs as PWA 
  - provides potential for offline functionality ✅
  - manages asset caching for increased performance and minimal network load ✅
  
- Extensible via THREE.js and AFRAME APIs
  - compose custom entities, components, and systems with AFRAME ✅
  - compose and interop with custom lower level object3D, materials, and geometries with THREE.js ✅
  
- Customized AFRAME
  - All entities have an asynchronous **.set** method which returns a promise and resolves with the modified entity. ✅
    - the **.set** method will fetch any applied component, listed in the **CS1.utils.libMap**, if not already available.✅
  - entity.set(componentName, configObject, url) ✅
    - first check for componentName in **AFRAME.components** ✅
    - then check for componentName in **CS1.utils.libMap** ✅
    - then try to fetch the component from **url** ✅
  
- Empowering DSL API via CS1 global object. 
  - CS1.myPlayer✅
  - CS1.game ✅
  - CS1.add ✅
  - CS1.scene ✅
  
- Anytime access to AFRAME components and THREE.js object3Ds.
  - decouple the developer from the underlying event cascade and setup of the entity-component-system (ECS) and CS1 global. ✅
  - custom **cs1-script** element ✅
  
- Intuitive P2P System
  - manage peer group
  - p2p audio streaming
  - p2p video streaming
  - p2p text
  - p2p file transfer
  
  
___
___
  
  # 🛣️ The Road to 2.0.0

## API Promises
___

### Overview: 

These promises define the minimum developer contract which will be fullfilled by one or more of the **CS1 Game Engine** packages by the **2.0.0** release.
  
- Easy integration with WASM powered libraries
  - provide wrapper including some common utility functions augmenting the callable WASM internal functions
  - support WASM powered physics engine(s)
  - support WASM powered linear system solver(s)
  - support WASM powered machine learning
  
- C++ /  Ardiuno client 
  - auto detect from a set of supported PLCs
  - polling API
  - socket API
  
- Adapters 
  - database adapters
  - third-party service adapters


