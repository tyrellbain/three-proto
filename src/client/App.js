import * as THREE from '/three';
import * as dat from '/dat.gui';

export default class App {
  constructor(canvas) {
    this.canvas = canvas;
    this.setScene();
    this.setRenderer();
    this.setCamera();
    this.setDebug();
    this.run();
    this.animate();
    // requestAnimationFrame(this.run);
  }

  setDebug() {
    this.gui = new dat.GUI({ width: 420 });

    const cubeFolder = this.gui.addFolder('Cube');
    cubeFolder.add(this.cube.rotation, 'x', 0, Math.PI * 2, 0.01);
    cubeFolder.add(this.cube.rotation, 'y', 0, Math.PI * 2, 0.01);
    cubeFolder.add(this.cube.rotation, 'z', 0, Math.PI * 2, 0.01);

    const cameraFolder = this.gui.addFolder('Camera');
    cameraFolder.add(this.camera.position, 'z', 0, 10, 0.01);
    cubeFolder.open();
    cameraFolder.open();
  }

  setScene() {
    this.scene = new THREE.Scene();
    this.cube = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    );
    this.scene.add(this.cube);
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });
    this.renderer.setClearColor(0x000000, 1);
    this.renderer.setPixelRatio(2);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.physicallyCorrectLights = true;
    this.renderer.gammaFactor = 2.2;
    this.renderer.gammaOutPut = true;
    this.renderer.autoClear = false;
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 50);
    this.camera.up.set(0, 0, 1);
    this.camera.position.copy(new THREE.Vector3(1.135, -1.45, 1.15));
    this.camera.lookAt(new THREE.Vector3());
    this.camera.position.z = 5;
    this.scene.add(this.camera);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.run();
  };

  run() {
    this.renderer.render(this.scene, this.camera);
  }
}
