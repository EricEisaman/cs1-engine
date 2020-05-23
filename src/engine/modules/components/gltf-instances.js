export const gltfInstances = (()=>{


AFRAME.registerComponent("gltf-instances", {
  schema: {
    count: { type: "int", default: 10000 }
  },

  init: function() {
    this.count = this.data.count;
    this.model = null;
  },

  update: function() {
    if (this.model !== null) {
      return;
    }

    var data = this.data;
    var el = this.el;

    var count = this.count;

    var geometry = new THREE.InstancedBufferGeometry();
    geometry.copy(new THREE.TetrahedronBufferGeometry(1.0));

    var translateArray = new Float32Array(count * 3);
    var vectorArray = new Float32Array(count * 3);
    var colorArray = new Float32Array(count * 3);

    for (var i = 0; i < count; i++) {
      translateArray[i * 3 + 0] = (Math.random() - 0.35) * 100.0;
      translateArray[i * 3 + 1] = (Math.random() - 0.35) * 100.0;
      translateArray[i * 3 + 2] = (Math.random() - 0.35) * 100.0;
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

    var mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    this.model = mesh;
    el.setObject3D("mesh", mesh);
    el.emit("model-loaded", { format: "mesh", model: mesh });
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