// sketch.js - 3D Tunnel
// Author: Ellie McKay
// Date: 2/9/2025

import * as THREE from '../../node_modules/three/src/Three.js';

// Globals
let myInstance;
let canvasContainer;

//Get window size
var ww, wh;

//Create a WebGL renderer
var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas")
});

//Create an empty scene
var scene;
var camera;

//Hard coded array of points
var points = [
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

//Convert the array of points into vertices
for (var i = 0; i < points.length; i++) {
  var x = points[i][0]/2;
  var y = 0;
  var z = points[i][1]/2;
  points[i] = new THREE.Vector3(x, y, z);
}

var path = new THREE.CatmullRomCurve3(points);	
var light = new THREE.PointLight(0xffffff,5, 50);

var geometry = new THREE.TubeGeometry( path, 300, 2, 20, true );
// Wireframe material
var material = new THREE.MeshLambertMaterial({
  color: 0xff0000, //Red color
  side : THREE.BackSide, //Reverse the sides
  wireframe:true //Display the tube as a wireframe
});		
//Create a mesh
var tube = new THREE.Mesh( geometry, material );

function resizeScreen() {
  console.log("Resizing...");
  renderer.setSize(canvasContainer.width(), canvasContainer.height());
}

// setup() function is called once when the program starts
function setup() {
  console.log("Setting up...");
  canvasContainer = $("#canvas-container");

  ww = canvasContainer.width();
  wh = canvasContainer.height();
  renderer.setSize(ww, wh);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000);
  camera.position.z = 100;

  scene.add(tube);
  scene.add(light);

  // resize canvas is the page is resized
  resizeScreen();

  render();
}

var percentage = 0;
function render(){
  //Increase the percentage
  percentage += 0.001;
  //Get the point at the specific percentage
  var p1 = path.getPointAt(percentage%1);
  var p2 = path.getPointAt((percentage + 0.01)%1);
  //Place the camera at the point
  camera.position.set(p1.x,p1.y,p1.z);
  camera.lookAt(p2);
  light.position.set(p2.x, p2.y, p2.z);
  
  //Render the scene
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

window.onload = setup;