import * as THREE from '/three';
import * as dat from '/dat.gui';

let container;
let camera;
let renderer;
let scene;
let cube;

const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 1;
const far = 50;

(function () {
  // find element with id root
  container = document.getElementById('root');

  // setup scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color('skyblue');

  // setup camera
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 10);

  // create a cube mesh
  cube = new THREE.Mesh(new THREE.BoxBufferGeometry(1, 1, 1), new THREE.MeshStandardMaterial({ color: 0x800080 }));

  // create directional (white) light
  const light = new THREE.DirectionalLight(0xffffff, 5.0);
  light.position.set(10, 10, 10);

  // set up renderer
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.physicallyCorrectLights = true;
  renderer.gammaFactor = 2.2;
  renderer.gammaOutPut = true;
  renderer.autoClear = false;

  // add <canvas> created by the renderer to the DOM
  if (container) container.appendChild(renderer.domElement);

  // canvas = canvas;
  // setScene();

  // add everything to the scene
  scene.add(camera);
  scene.add(cube);
  scene.add(light);

  // start animation loop
  renderer.setAnimationLoop(() => {
    update();
    render();
  });

  setDebug();
})();

function setDebug() {
  const gui = new dat.GUI({ width: 420 });

  const cubeFolder = gui.addFolder('Cube');
  cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01);
  cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01);
  cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2, 0.01);

  const cameraFolder = gui.addFolder('Camera');
  cameraFolder.add(camera.position, 'x', 1, 5, 0.1);
  cameraFolder.add(camera.position, 'y', 1, 5, 0.1);
  cameraFolder.add(camera.position, 'z', 1, 5, 0.1);
  cubeFolder.open();
  cameraFolder.open();
}

function update() {
  cube.rotation.z += 0.01;
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
}

function render() {
  renderer.render(scene, camera);
}
