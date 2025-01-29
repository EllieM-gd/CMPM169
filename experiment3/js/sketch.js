// sketch.js - purpose and description here
// Author: Your Name
// Date:

// IDEAS:
//Game where you unlock things by making hand gestures
//Drawing program where you can draw with your hands

let handPose;
let video;
let hands = [];
let isDetecting = true;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(canvasContainer.width(), canvasContainer.height());
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);    
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }
  }
}


// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
    toggleDetection();
}

function toggleDetection() {
  if (isDetecting) {
    handPose.detectStop();
    isDetecting = false;
  } else {
    handPose.detectStart(video, gotHands);
    isDetecting = true;
  }
}