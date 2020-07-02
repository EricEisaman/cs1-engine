export const gltfInstances = (()=>{


AFRAME.registerComponent("gltf-instances", {
  schema: {
    count: { type: "int", default: 100 },
    src: { default: 'https://cdn.glitch.com/99425caa-9f43-42ef-ab3a-735829e794f3%2Fcs1_489.glb?v=1591049829712' },
  },

  init: function() {
    this.count = this.data.count;
    this.model = null;
    
    const self = this;
    var data = this.data;
    var el = this.el;
    
    
    var count = this.count;

    var geometry = new THREE.InstancedBufferGeometry();
    
    var material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader:  `
     attribute vec3 translate;
     attribute vec3 vector;
     attribute vec3 color;
     uniform float time;
     varying vec3 vColor;
     const float g = 9.8 * 1.5;
     void main() {
       vec3 offset;
       offset.xz = vector.xz * 9.0;
       //offset.xz = vector.xz * time;
       offset.y = vector.y * 2.5 - 0.5 * g * 0.0;
       //offset.y = vector.y * 2.0 - 0.5 * g * time * time;
       gl_Position = projectionMatrix * modelViewMatrix * vec4( position + translate + offset, 1.0 );
       vColor = color;
     }
    `,
      fragmentShader:`
        varying vec3 vColor;
        void main() {
          gl_FragColor = vec4( vColor, 1.0 );
        }
       `   
    });
    
    

    
        
    this.el.setAttribute('gltf-model',`src:url(${this.data.src})`);
    
    this.el.addEventListener('model-loaded', e=>{
      console.log('gltf-instances model loaded ...');
      const gltf = e.detail.model;
      window.gltf = gltf;
   
      gltf.traverse( function ( child ) {

          if ( child.isMesh ) {

              child.material.diffuse = material;
              //Setting the instanced buffer geometry
              geometry.copy(child.geometry);
              return;

          }

      } );
      
      
      

    var translateArray = new Float32Array(count * 3);
    var vectorArray = new Float32Array(count * 3);
    var colorArray = new Float32Array(count * 3);

    for (var i = 0; i < count; i++) {
      translateArray[i * 3 + 0] = (Math.random() - 0.35) * 100.0;
      translateArray[i * 3 + 1] = (Math.random() - 0.35) * 100.0;
      translateArray[i * 3 + 2] = (Math.random() - 0.55) * 100.0;
    }

    for (var i = 0; i < count; i++) {
      vectorArray[i * 3 + 0] = (Math.random() - 0.5) * 10.0;
      vectorArray[i * 3 + 1] = (Math.random() + 1.5) * 10.0;
      vectorArray[i * 3 + 2] = (Math.random() - 0.5) * 10.0;
    }

    for (var i = 0; i < count; i++) {
      colorArray[i * 3 + 0] = Math.random();
      colorArray[i * 3 + 1] = Math.random();
      colorArray[i * 3 + 2] = Math.random();
    }

    geometry.setAttribute(
      "translate",
      new THREE.InstancedBufferAttribute(translateArray, 3, true)
    );
    geometry.setAttribute(
      "vector",
      new THREE.InstancedBufferAttribute(vectorArray, 3, true)
    );
    geometry.setAttribute(
      "color",
      new THREE.InstancedBufferAttribute(colorArray, 3, true)
    );


    var mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    self.model = mesh;
    el.setObject3D("mesh", mesh);
    //el.emit("model-loaded", { format: "mesh", model: mesh });
      
      
      
      
    });
    
    
    
    
    
    
  },

  update: function() {
    

   
    
    
    
  },

  tick: function(time, delta) {
    if (this.model === null) {
      return;
    }

    //var mesh = this.model;
    //mesh.material.uniforms.time.value =
    //  (mesh.material.uniforms.time.value + delta / 1000) % 30.0;
  }
});

  
AFRAME.registerPrimitive('gltf-instances', {
  defaultComponents: {
    "gltf-instances": {}
  },

  mappings: {
    src: 'gltf-instances.src',
    count: 'gltf-instances.count',
    anim: 'gltf-instances.animation',
    distribution: 'gltf-instances.distribution',
    spacing: 'gltf-instances.spacing'
  }
});  
  
  
  
  
  
  
  
})()