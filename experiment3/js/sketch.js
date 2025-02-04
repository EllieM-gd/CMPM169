// sketch.js - purpose and description here
// Author: Your Name
// Date:

// IDEAS:
//Game where you unlock things by making hand gestures
//Drawing program where you can draw with your hands
//Draw with your fingers. Pinch to not draw?
//Game where you have to dodge obstacles with your hands

let handPose;
let video;
let hands = [];
let isDetecting = true;
let isDrawing = false;
let artSize = 20;
let savedPoints = [];
let artColor = [255, 0, 0];
let outOfBoundsTimer = 10.0;
const gameStarted = false;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let handPNG;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
  handPNG = loadImage('img/hand.png');
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
  //move image by the width of image to the left
  translate(video.width, 0);
  //then flip the image
  scale(-1, 1);
  //draw video capture feed as image inside p5 canvas
  image(video, 0, 0, video.width, video.height);
  background(0,0,100)

  drawPoints();
  //randomizeDrawing();

  // Draw all the tracked hand points
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    detectHandPosition(hand);
    if (isDetecting){
      console.log("Drawing Hand " + i);
      drawPlayer(hand.keypoints[8].x, hand.keypoints[8].y);
      //if (isDrawing) savedPoints.push([hands[i].keypoints[8].x, hands[i].keypoints[8].y]);
    }
  }
  if (isDetecting && hands.length == 0) {
    outOfBoundsTimer -= 0.01;
    outOfBoundsTimer = outOfBoundsTimer.toFixed(2);
    drawTimer();
  }
}

function randomizeDrawing() {
  //Pick a random number 0-2
  let randomNum = Math.floor(Math.random() * 3);
  artColor[randomNum] += random(-15, 15);
  artSize += random(-0.5, 0.5);
  if (artSize < 10) { artSize = 10; }
}

function drawPlayer(x,y) {
  //Draw the player as a hand
  image(handPNG, x - 40, y, 100, 100);
}

function drawTimer() {
  //Draw the timer
  push()
  fill(255);
  textSize(50);
  scale(-1, 1);
  text("Hand not found", -canvasContainer.width()/2, canvasContainer.height()/2+50);
  text(outOfBoundsTimer, -canvasContainer.width()/2, canvasContainer.height()/2);
  if (outOfBoundsTimer <= 0) {
    //End the game
  }
  pop();
}


//Refactor to detect if the hand is on screen. If its not we'll start a counter that will end the game if it reaches 0
function detectHandPosition(hand) {
  if (hand.keypoints[8].y > hand.keypoints[7].y){
    isDrawing = false;
  }
  else if (!isDrawing && hand.keypoints[8].y < hand.keypoints[7].y){
    isDrawing = true;
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

function drawPoints() {
  for (let i = 0; i < savedPoints.length; i++) {
    fill(artColor);
    noStroke();
    circle(savedPoints[i][0], savedPoints[i][1], artSize);
  }
}


function pushSavedPoints(hand) {
  for (let i = 0; i < hand.keypoints.length; i++) {
    savedPoints.push([hand.keypoints[i].x, hand.keypoints[i].y]);
  }
}