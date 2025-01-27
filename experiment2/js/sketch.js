// sketch.js - purpose and description here
// Author: Ellie McKay
// Date: 1/26/2025

//Moon Source: https://www.vecteezy.com/vector-art/109549-vector-flat-moon-phases-icons

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

//TODO LIST::
// - Add Moon cycles - Done but check "TODO" in drawMoon()
// - Create clouds and make them move accross screen
// - -  Cast shadows depending on the clouds location
// - Add stars at night



// Globals
let canvasContainer;
let time;

const baseGrassColor = [126, 240, 126];
let grassColor = baseGrassColor;

let fullMoon, wncMoon, wngMoon, wxgMoon, wxcMoon, fstqMoon, thrdqMoon, newMoon;
let moonIndex = 0;
let moonPhases = [];


function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function setImageVariables(){
  fullMoon = loadImage("src/FullMoon.png");
  wncMoon = loadImage("src/WaningCrescent.png");
  wngMoon = loadImage("src/WaningGibbous.png");
  wxgMoon = loadImage("src/WaxingGibbous.png");
  wxcMoon = loadImage("src/WaxingCrescent.png");
  fstqMoon = loadImage("src/FirstQuarter.png");
  thrdqMoon = loadImage("src/ThirdQuarter.png");
  moonPhases = [fullMoon, wngMoon, thrdqMoon, wncMoon, newMoon, wxcMoon, fstqMoon, wxgMoon]
}

function updateMoon(){
  moonIndex += 1;
  if (moonIndex >= moonPhases.length) moonIndex = 0;
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  setImageVariables();
  // resize canvas is the page is resized

  cycleTime = 60;  // Number of seconds for a day/night cycle
  frameRate(360) 
  time = 0;
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

function handleTime(){
  if (time >= cycleTime) {
    time = 0;
    updateMoon();
  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  time += 1/60 + time/40000; //Gets faster as time goes on. Prob needs adjusting
  handleTime();
  let sun = (sin(time * 2 * PI / cycleTime)/2 + 0.5) // 
  //console.log(time/40000)

  if (sun < 0.2) {
    sun = 0.2
  } 
  
  background(135 * sun, 206 * sun, 235 * sun); //Background sky based on time of day
  grassColor = [baseGrassColor[0] * sun, baseGrassColor[1] * sun, baseGrassColor[2] * sun]
  
  drawSun();
  drawMoon();
  drawGrass();
}



function drawGrass() {
  push()
    fill(grassColor)
    rect(0, height-40, width, height/4)
  pop()
}

function drawSun() {
  push()
    translate(width/2, height)
    rotate(-PI + time/cycleTime * 2 * PI)
    translate(height, 0)
    fill(255, 255, 0)
    stroke(255, 255, 100)
    circle(0, 0, 50)
  pop()
}

function drawMoon() {
  push()
    translate(width/2, height)
    //TODO: Make the moon not rotate when moving around the screen.
    rotate(-2 * PI + time/cycleTime * 2 * PI)
    console.log(-2 * PI + time/cycleTime * 2 * PI)
    translate(height, 0)
    if (moonPhases[moonIndex] != newMoon) {
      image(moonPhases[moonIndex], 0, 0, 50, 50)
    }
  pop()
}




// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // Do something 
  return;
}