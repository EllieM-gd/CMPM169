// sketch.js - 
// Author: Ellie McKay
// Date: 2/16/2025

let button;
let canvasContainer;

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
  button = $('#run'); 
  button.click(function() {
    //updateUsername();
    runAPIAndPrint()
  });

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}


function runAPIAndPrint() {
  $.getJSON('http://localhost:3000/api/player', function(data) {
    console.log(data); // Now you can use the API response!
});
}



// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(255);
}