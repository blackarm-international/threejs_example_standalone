api.controller = function() {
  function spectrumGreenRed(numerator, denominator) {
    var decimalBlue;
    var decimalGreen;
    var decimalRed;
    var decimal;
    var saturation;
    decimalBlue = 1;
    decimalGreen = 0;
    decimalRed = 0;
    saturation = 1;
    decimal = numerator / denominator;
    if (denominator == 0){
      decimal = 1;
    }
    if (decimal < 0) {
      decimal = 0;
    }
    if (decimal > 1) {
      decimal = 1;
    }
    // green to yellow
    if (decimal < 0.5) {
      decimalBlue = (1 - saturation);
      decimalGreen = 1;
      decimalRed = (1 - saturation) + (decimal / 0.5 * saturation);
    }
    // yellow to red
    if (decimal >= 0.5) {
      decimalBlue = (1 - saturation);
      decimalGreen = (1 - saturation) + (saturation - ((decimal - 0.5) / 0.5) * saturation);
      decimalRed = 1;
    }
    // max or over, hard red
    if (decimal >= 1.0) {
      decimalBlue = 0;
      decimalGreen = 0;
      decimalRed = 1;
    }
    return [
      decimalBlue,
      decimalGreen,
      decimalRed
    ];
  }
  function addBoxes() {
    var boxX = 0.4;
    var boxY = 1;
    var boxZ = 0.4;
    var colorBlue = 0;
    var colorGreen = 0;
    var colorRed = 0;
    var boxGeometry;
    var boxMaterial;
    var boxMesh;
    var centerY;
    var centerZ;
    var centerX;
    var sizeX;
    var sizeY;
    var sizeZ;
    var scale = 0.025;
    // using blender coordinates as inputs
    for (var xLoop = 0; xLoop < 20; xLoop += 1) {
      for (var yLoop = 0; yLoop < 20; yLoop += 1) {
        centerX = 0.5 + (xLoop * 1.0);
        centerY = 0.5 + (yLoop * 1.0);
        sizeX = 1.0;
        sizeY = 1.0;
        sizeZ = 1 + (Math.random() * 10);
        centerZ = sizeZ * 0.5;
        // converting to three.js table
        boxX = (tableWidth * -0.5) + (centerY * scale);
        boxY = tableHeight + (centerZ * scale);
        boxZ = tableZCenter - (tableWidth * 0.5) + (centerX * scale);
        // @ts-ignore
        boxGeometry = new THREE.BoxGeometry(sizeY * scale, sizeZ * scale, sizeX * scale);
        // @ts-ignore
        boxMaterial = new THREE.MeshStandardMaterial();
        [
          colorBlue,
          colorGreen,
          colorRed
        ] = spectrumGreenRed(sizeZ, 11);
        boxMaterial.color.setRGB(colorRed, colorGreen, colorBlue);
        boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        boxMesh.position.x = boxX;
        boxMesh.position.y = boxY;
        boxMesh.position.z = boxZ;
        // @ts-ignore
        boxMesh.name = 'testing';
        scene.add(boxMesh);
      }
    }
  }
  function init() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    // camera
    const cameraRatio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(50, cameraRatio, 0.01, 50);
    camera.position.set(0, 1.5, 0);
    controls = new OrbitControls(camera, container);
    controls.target.set(0, tableHeight, tableZCenter);
    controls.update();
    // table
    const tableGeometry = new THREE.BoxGeometry(tableWidth, tableHeight, tableWidth);
    const tableMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 1.0,
      metalness: 0.0
    });
    addBoxes();
    // light
    scene.add(new THREE.HemisphereLight(0x888877, 0x777788));
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(0, 4, tableZCenter);
    scene.add(light);
    // painters
    const painter1 = new TubePainter();
    scene.add(painter1.mesh);
    const painter2 = new TubePainter();
    scene.add(painter2.mesh);
    // renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));
    function onSelectStart() {
      this.userData.isSelecting = true;
    }
    function onSelectEnd() {
      this.userData.isSelecting = false;
    }
    function onSqueezeStart() {
      this.userData.isSqueezing = true;
      this.userData.positionAtSqueezeStart = this.position.y;
      this.userData.scaleAtSqueezeStart = this.scale.x;
    }
    function onSqueezeEnd() {
      this.userData.isSqueezing = false;
    }
    controller1 = renderer.xr.getController(0);
    controller1.addEventListener('selectstart', onSelectStart);
    controller1.addEventListener('selectend', onSelectEnd);
    controller1.addEventListener('squeezestart', onSqueezeStart);
    controller1.addEventListener('squeezeend', onSqueezeEnd);
    controller1.userData.painter = painter1;
    scene.add(controller1);
    controller2 = renderer.xr.getController(1);
    controller2.addEventListener('selectstart', onSelectStart);
    controller2.addEventListener('selectend', onSelectEnd);
    controller2.addEventListener('squeezestart', onSqueezeStart);
    controller2.addEventListener('squeezeend', onSqueezeEnd);
    controller2.userData.painter = painter2;
    scene.add(controller2);
    const geometry = new THREE.CylinderGeometry(0.01, 0.02, 0.08, 5);
    geometry.rotateX(- Math.PI / 2);
    const material = new THREE.MeshStandardMaterial({ flatShading: true });
    const mesh = new THREE.Mesh(geometry, material);
    const pivot = new THREE.Mesh(new THREE.IcosahedronGeometry(0.01, 3));
    pivot.name = 'pivot';
    pivot.position.z = - 0.05;
    mesh.add(pivot);
    controller1.add(mesh.clone());
    controller2.add(mesh.clone());
    window.addEventListener('resize', onWindowResize);
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  function handleController(controller) {
    const userData = controller.userData;
    const painter = userData.painter;
    const pivot = controller.getObjectByName('pivot');
    if (userData.isSqueezing === true) {
      const delta = (controller.position.y - userData.positionAtSqueezeStart) * 5;
      const scale = Math.max(0.1, userData.scaleAtSqueezeStart + delta);
      pivot.scale.setScalar(scale);
      painter.setSize(scale);
    }
    cursor.setFromMatrixPosition(pivot.matrixWorld);
    if (userData.isSelecting === true) {
      painter.lineTo(cursor);
      painter.update();
    } else {
      painter.moveTo(cursor);
    }
  }
  function animate() {
    renderer.setAnimationLoop(render);
  }
  function render() {
    handleController(controller1);
    handleController(controller2);
    renderer.render(scene, camera);
  }
  // import * as THREE from 'three';
  // import { OrbitControls } from './OrbitControls.js';
  // import { TubePainter } from './TubePainter.js';
  // import { VRButton } from './VRButton.js';
  var serverLink = this;
  var tableZCenter = -0.5;
  var tableHeight = 0.7;
  var tableWidth = 0.5;
  var camera;
  var scene;
  var renderer;
  var controller1;
  var controller2;
  const cursor = new THREE.Vector3();
  var controls;
  init();
  animate();
};