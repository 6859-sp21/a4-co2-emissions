// import * as THREE from 'three';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// let renderer;
// scene.add(cube);
// camera.position.z = 5;

// const animate = () => {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
//   renderer.render(scene, camera);
// };

// const resize = () => {
//   renderer.setSize(window.innerWidth, window.innerHeight)
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// };

// export const createScene = (el) => {
//   renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
//   resize();
//   animate();
// }

// window.addEventListener('resize', resize);

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';


// var STLLoader = require('three-stl-loader')(THREE);
// var OrbitControls = require('three-orbit-controls')(THREE);

let renderer;

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

var light = new THREE.DirectionalLight();
light.position.set(2.5, 7.5, 15);
scene.add(light);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// const renderer = new THREE.WebGLRenderer()
// renderer.outputEncoding = THREE.sRGBEncoding
// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

const material = new THREE.MeshPhysicalMaterial({
    color: 0xb2ffc8,
    metalness: .25,
    roughness: 0.1,
    transparent: true,
    transmission: 1.0,
    side: THREE.DoubleSide,
    clearcoat: 1.0,
    clearcoatRoughness: .25
});

const loader = new STLLoader(THREE)
loader.load(
    '../model/lib.stl',

    function (geometry) {
        const mesh = new THREE.Mesh(geometry, material)
        scene.add(mesh)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded')
    },
    (error) => {
        console.log(error);
    }
);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
};

var animate = function () {
    requestAnimationFrame(animate)

    controls.update()

    render()
};

function render() {
    renderer.render(scene, camera)
};

export const createScene = (el) => {
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });

  const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
//   resize();
  animate();
};