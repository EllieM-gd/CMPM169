// sketch.js - 3D Tunnel
// Author: Ellie McKay
// Date: 2/9/2025

import * as THREE from '../../node_modules/three/src/Three.js';

// Globals
let myInstance;
let canvasContainer;
let lastTime = 0;
let rotation = true;

//Get window size
let ww, wh;

//Create a WebGL renderer
let renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas")
});

//Create an empty scene
let scene;
let camera;

//Hard coded array of points
let points = [
  [68.5,185.5],
  [1,262.5],
  [270.9,281.9],
  [345.5,212.8],
  [178,155.7],
  [240.3,72.3],
  [153.4,0.6],
  [52.6,53.3],
  [68.5,185.5]
];
const pointsCopy = points;
console.log(pointsCopy);

//Convert the array of points into vertices
for (let i = 0; i < points.length; i++) {
  const x = points[i][0]/2;
  const y = 0;
  const z = points[i][1]/2;
  points[i] = new THREE.Vector3(x, y, z);
}

let path;
let tubes = [];

const light = new THREE.PointLight(0xffffff,5, 50);

// Wireframe material
const material = new THREE.MeshLambertMaterial({
  color: 0xEC407A, //Pink color,
  wireframeLinewidth: 0.5,
  side : THREE.BackSide, //Reverse the sides
  wireframe:true, //Display the tube as a wireframe
  emissive: 0x26C6DA,
  emissiveIntensity: 0.2,
  reflectivity: 0
});		

function createMaterial(color) {
  const material = new THREE.MeshLambertMaterial({
    color: color,
    side : THREE.BackSide,
    wireframe:true,
    emissive: 0x26C6DA,
    emissiveIntensity: 0.2,
  });
  return material;
}

function createTube(pointsref, offset, color, main) {
  // Rotate and scale the tube based on the offset
  const tubePoints = [];
  for (let i = 0; i < pointsref.length; i++) {
    const angle = offset * Math.PI / 180; // Convert offset to radians
    const x = pointsref[i].x * Math.cos(angle) - pointsref[i].z * Math.sin(angle);
    const z = pointsref[i].x * Math.sin(angle) + pointsref[i].z * Math.cos(angle);
    tubePoints[i] = new THREE.Vector3(x / 2, 0, z / 2);
  }
  if (main == true) path = new THREE.CatmullRomCurve3(tubePoints);
  const geometry = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(tubePoints), 300, 2, 20, true);
  const newmaterial = createMaterial(color);
  const tube = new THREE.Mesh(geometry, newmaterial);
  tube.scale.set(1 + offset / 10, 1 + offset / 10, 1 + offset / 10); // Scale based on offset
  return tube;
}

function resizeScreen() {
  console.log("Resizing...");
  renderer.setSize(canvasContainer.width(), canvasContainer.height());
}

// setup() function is called once when the program starts
function setup() {
  console.log("Setting up...");
  canvasContainer = $("#canvas-container");

  tubes[0] = createTube(pointsCopy, 0, 0xE91E63, true);
  tubes[1] = createTube(pointsCopy, -8, 0xF9A825, false);
  tubes[2] = createTube(pointsCopy, 16, 0x1DE9B6, false);
  tubes[3] = createTube(pointsCopy, -24, 0xF9A825, false);
  tubes[4] = createTube(pointsCopy, 32, 0xE91E63, false);

  ww = canvasContainer.width();
  wh = canvasContainer.height();
  renderer.setSize(ww, wh);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000);
  camera.position.z = 100;
  for (let tube in tubes) {
    scene.add(tubes[tube]);
  }
  scene.add(light);

  // resize canvas is the page is resized
  resizeScreen();

  render();
}

let percentage = 0;
function render(){
  const currentTime = performance.now();
  const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
  lastTime = currentTime;

  //Increase the percentage
  percentage += 0.004 * deltaTime;
  //Get the point at the specific percentage
  const p1 = path.getPointAt(percentage%1);
  const p2 = path.getPointAt((percentage + 0.01)%1);
  //Place the camera at the point
  camera.position.set(p1.x,p1.y,p1.z);
  camera.lookAt(p2);
  if (rotation) camera.rotateZ(percentage * 100);
  light.position.set(p2.x, p2.y, p2.z);
  
  //Render the scene
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

window.onload = setup;



// if mouse clicked
$(document).mousedown(function(e){
  rotation = !rotation;
})