// sketch.js - Untouchable ant colony
// Author: Ellie McKay
// Date: 1/20/2025

//Some of the code in this file was generated using Github Co-Pilot
// Inspiration and base code: http://www.generative-gestaltung.de/2/sketches/?01_P/P_2_1_1_04
//Ant PNG: https://www.freepnglogos.com/uploads/ant-png/ant-mixed-clip-art-stormdesignz-3.png

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
var tileCount = 5;
var shapeSize = 30;

// Globals
let myInstance;
let canvasContainer;
var tileWidth, tileHeight;

function resizeScreen() {
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  //Set up our variables
  tileWidth = canvas.width / tileCount;
  tileHeight = canvas.height / tileCount;
  currentShape = loadImage("img/ant.png");
  // resize canvas is the page is resized
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  redrawCanvas();
}

function redrawCanvas() {
  clear();
  background(240,0,0);
  let gridY, gridX, posX, posY;
  for (gridY = 0; gridY < tileCount; gridY += .5) {
    for (gridX = 0; gridX < tileCount; gridX += .25) {

      posX = tileWidth * gridX + 25;
      posY = tileHeight * gridY + 50;

      // calculate angle between mouse position and actual position of the shape
      const angle = atan2(mouseY - posY, mouseX - posX);
      // calculate the distance to the mouse position
      const distance = dist(mouseX, mouseY, posX, posY);
      
      let distanceFactorX = 0;
      let distanceFactorY = 0;
      if (distance < 50) {
        // Move the shape away from the mouse
        distanceFactorX = -1 * (cos(angle) * (50 - distance));
        distanceFactorY = -1 * (sin(angle) * (50 - distance));
      }
      else if (distance > 100) {
        if (mouseX > posX) {
          distanceFactorX += 2;
        }
        else {
          distanceFactorX += -2;
        }
        if (mouseY > posY) {
          distanceFactorY += 2;
        }
        else {
          distanceFactorY += -2;
      }
    }

      newShapeSize = shapeSize;

      push();
      translate(posX + distanceFactorX, posY + distanceFactorY);
      rotate(angle);
      noStroke();
      image(currentShape, 0, 0, newShapeSize, newShapeSize);
      pop();
    }
  }
}