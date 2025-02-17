// sketch.js - 
// Author: Ellie McKay
// Date: 2/16/2025


// Slot Machine Source: https://editor.p5js.org/ffmaer/sketches/odU88zEVV
// Some of the code in this file was initially generated with github co-pilot.

let arr_i = 0;
let arr = nounArray;
let SLOW_DELAY = 400;
let FAST_DELAY = 100;
let DELAY_INCREMENT = 50;
let delay = SLOW_DELAY;
let nextTime;
let spinState = 0;
let programState = 0;
// 0 is stop, 1 is play, 2 is to-stop

//We need to have the array of the madlib assigned to a variable, and a empty one that we fill so we can print what we already have
//We need to have a nother variable assigned to the current spinny thing.
//We need to keep track of where to print the spinny thing.

let currentText = "";
textIndex = 0;
let currentTextArray = [];



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
  currentText = getARandomMadLib()
  console.log(currentText)
  nextTime = millis() + delay;
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}



// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(32);
  if (millis() > nextTime && spinState != 0) {
    if (spinState == 1) {
      if (delay > FAST_DELAY) {
        delay -= DELAY_INCREMENT;
      }
    } else if (spinState == 2) {
      delay += DELAY_INCREMENT;
      if (delay > SLOW_DELAY * 2) {
        spinState = 0;
        pushChosenWordToArray(arr, arr_i);
        programState = 0;
      }
    }
    arr_i++; // the index of next pattern
    arr_i %= arr.length; // the index goes to front when it reaches the end https://processing.org/reference/modulo.html
    nextTime = millis() + delay;
  }
  
  if (currentText[textIndex] == "("){
    let keyWord = ""
    textIndex++
    while (currentText[textIndex] != ")"){
      keyWord += currentText[textIndex]
      textIndex++
    }
    arr = getNeededArray(keyWord)
    textIndex++
    programState = 1;
    spinState = 1;
  }
  else if (programState == 0) {
    currentTextArray.push(currentText[textIndex])
    textIndex++
  }

  textAlign(CENTER, CENTER);
  textSize(32);
  noStroke()
  fill("rgb(231,22,22)")

  if (spinState != 0){
    // current pattern
    text(arr[arr_i], width / 2, height / 2);

    // previous pattern
    let prev_i = (arr_i + arr.length - 1) % arr.length;
    text(arr[prev_i], width / 2, height / 2 - 30);

    // next pattern
    let next_i = (arr_i + 1) % arr.length;
    text(arr[next_i], width / 2, height / 2 + 30);
  }

  strokeWeight(1);
  printCurrentArray();
}

function pushChosenWordToArray(array, index) {
  for (let i = 0; i < array[index].length; i++) {
    currentTextArray.push(array[index][i]);
  }
}


function printCurrentArray() {
  x = 100;
  y = 100;
  for (let i = 0; i < currentTextArray.length; i++) {
    text(currentTextArray[i], x, y);
    x += 30;
    if (x > canvasContainer.width() - 100 && currentTextArray[i] == " ") {
      x = 100;
      y += 50;
    }
  }
}



// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  if (spinState == 1) {
    // if it is playing
    spinState = 2; // to stop
  } else if (spinState == 0) {
    // if it was stopped
    delay = SLOW_DELAY;
    nextTime = millis() + delay;
    spinState = 1; // play
  }
}