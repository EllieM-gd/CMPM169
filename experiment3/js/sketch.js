// sketch.js - Capture the users hand movement and draw a picture with it. Avoid obstacles that move towards the center of the screen.
// Author: Ellie McKay
// Date: 2025-02-04

let handPose;
let video;
let hands = [];
let isDetecting = true;
let collisionPoints = [];

let artSize = 20;
let savedPoints = [];
let obstacles = [];
let artColor = [255, 0, 0];
let outOfBoundsTimer = 5.0;
let gameStarted = false;
let gameOver = false;
let chanceToCreateObstacle = 2.5;


// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let handPNG;
let restartButton;

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
  handPNG = loadImage('img/hand.png');
}

function setupVariables() {
  collisionPoints = [];
  savedPoints = [];
  chanceToCreateObstacle = 2.5;
  obstacles = [];
  artColor = [255, 0, 0];
  outOfBoundsTimer = 5.0;
  gameStarted = false;
  gameOver = false;
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
  restartButton = createButton("reset")
  restartButton.position(canvasContainer.width() + 100, canvasContainer.height() + 10);
  restartButton.mousePressed(setupVariables);

  obstacles.push(createObstacle());

  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(canvasContainer.width(), canvasContainer.height());
  video.hide();
  // start detecting hands from the webcam video
  displaceColors = createFilterShader(displaceColorsSrc);
  handPose.detectStart(video, gotHands);

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  //Flip the camera for hand mirroring then hide it
  translate(video.width, 0);
  scale(-1, 1);
  image(video, 0, 0, video.width, video.height);
  background(0,0,100)

  // Draw all the tracked hand points
  collisionPoints = [];
  for (let i = 0; i < hands.length; i++) {
    if (!gameStarted) gameStarted = true;
    let hand = hands[i];
    detectHandPosition(hand);
    if (isDetecting){
      drawPlayer(hand.keypoints[8].x, hand.keypoints[8].y);
      drawPlayerCollision(hand.keypoints[8].x, hand.keypoints[8].y);
      artColor[Math.floor(Math.random() * 3)] += random(-15, 15);
      //Save points for drawing later
      if (!gameOver) savedPoints.push([hands[i].keypoints[8].x, hands[i].keypoints[8].y, artColor.slice()]);
    }
  }

  if (gameStarted == false) {
    push();
    scale(-1, 1);
    fill(255);
    textSize(50);
    text("Raise your hand to start", -canvasContainer.width()/2 - 200, canvasContainer.height()/2);
    pop();
    return;
  }

  //Draw the no hands found text
  if (!gameOver && isDetecting && hands.length == 0) {
    outOfBoundsTimer -= 0.01;
    outOfBoundsTimer = outOfBoundsTimer.toFixed(2);
    drawTimer();
  }
  //Draw the points if the game is over
  if (gameOver) {
    drawPoints();
  }
  //Apply the filter
  filter(displaceColors);

  if (!gameOver) handleObstacles();
}

function handleObstacles() {
  //Random chance to create a new obstacle
  if (Math.floor(Math.random() * 100) < chanceToCreateObstacle) {
    obstacles.push(createObstacle());
    chanceToCreateObstacle += 0.01;
  }

  for (i in obstacles) {
    if (obstacles[i].isActive()) {
      obstacles[i].move();
      obstacles[i].draw();
      obstacles[i].drawObjCollision();
      if (obstacles[i].isOutOfBounds()) {
        obstacles[i].destroy();
      }
      for (let p = 0; p < collisionPoints.length; p++) {
        if (obstacles[i].isActive() == false || obstacles[i].x - (canvasContainer.width() - collisionPoints[p][0]) > 100) continue;
        console.log("Checking " + collisionPoints[p][0], collisionPoints[p][1])
        if (obstacles[i].checkPlayerCollision(collisionPoints[p][0], collisionPoints[p][1])) {
          gameOver = true;
        }
      }
  }}
}

function drawPlayerCollision(x,y) {
  //Draw the square where the player collision is
  push();
  fill(255, 0, 0, 10);
  rect(x - 15, y, 60, 100);
  pop();
  collisionPoints.push([x, y]);
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
  text("Hand not found", -canvasContainer.width()/1.5, canvasContainer.height()/2+50);
  text(outOfBoundsTimer, -canvasContainer.width()/1.5, canvasContainer.height()/2);
  if (outOfBoundsTimer <= 0) {
    gameOver = true;
  }
  pop();
}


//Refactor to detect if the hand is on screen. If its not we'll start a counter that will end the game if it reaches 0
function detectHandPosition(hand) {
  return true;
  // if (hand.keypoints[8].y > hand.keypoints[7].y){
  //   isDrawing = false;
  // }
  // else if (!isDrawing && hand.keypoints[8].y < hand.keypoints[7].y){
  //   isDrawing = true;
  // }
}

function createObstacle() {
  //Create an obstacle on one of the edges of the screen. It will move towards the center of the screen
  let x,y,xDir,yDir;
  if (Math.floor(Math.random() * 2)) {
    x = -50;
    xDir = 2;
    y = Math.floor(Math.random() * canvasContainer.height());
    yDir = (height/2 - y) / (width - x);
  }
  else {
    x = canvasContainer.width() + 50;
    xDir = -2;
    y = Math.floor(Math.random() * canvasContainer.height());
    yDir = (height/2 - y) / (width - x);
  }
  return new Obstacle(x,y,xDir,yDir);

} 

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

function drawPoints() {
  for (let i = 0; i < savedPoints.length; i++) {
    push();
    fill(savedPoints[i][2][0], savedPoints[i][2][1], savedPoints[i][2][2]);
    noStroke();
    circle(savedPoints[i][0], savedPoints[i][1], artSize);
    pop();
  }
}


function pushSavedPoints(hand) {
  for (let i = 0; i < hand.keypoints.length; i++) {
    savedPoints.push([hand.keypoints[i].x, hand.keypoints[i].y]);
  }
}