// sketch.js - 
// Author: Ellie McKay
// Date: 2/16/2025

// Slot Machine Source: https://editor.p5js.org/ffmaer/sketches/odU88zEVV
// Some of the code in this file was initially generated with github co-pilot.

let arr_i = 0;

let programState = 0;
//0 is nothing, 1 is prompting user, 2 is printing out the madlib, 3 is done printing out the madlib

let waitingOnUser = false;

//We need to have the tracery decide what route its going to go, and how many of each grammar it needs
//We prompt the user to enter each of the grammar types
//We then slowly print out the madlib with the grammar types in place

let currentText = "";
textIndex = 0;
let finishedTextArray = [];
let grammarType = "";
let userInput = "";
let printedText = "";
let printedTextIndex = 0;


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
  currentText = getABeginning() + " " + getAMiddle() + " " + getAnEnding();
  fastForward();

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

function fastForward() {
  arr_i = pushUntilParenthesis(currentText, arr_i);
  grammarType = getKeyWord();
}


function pushUntilParenthesis(array, index) {
  let i = index;
  while (array[i] != "(") {
    if (i + 1 >= array.length) {
      programState = 2;
      finishedTextArray += ".";
      arr_i += 1;
      return i;
    }
    finishedTextArray += array[i];
    i++;
  }
  programState = 1;
  return i;
}

function getKeyWord() {
  if (programState == 2) return;
  let keyWord = "";
  let i = arr_i + 1;
  while (currentText[i] != ")") {
    keyWord += currentText[i];
    i++;
  }
  arr_i = i + 1;
  waitingOnUser = true;
  userInput = "";
  return keyWord;
}


// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(32);
  
  if (programState == 1 && waitingOnUser) {
    //We want to write on the screen prompting the user to enter the grammar type.
    fill("rgb(245, 26, 26)");
    //Increase font size
    textSize(50)
    text("Please enter a(n) " + grammarType + ": " + userInput, 100, 100);
  }
  else if (programState == 1 && waitingOnUser == false) {
    fastForward();
  }


  if (programState == 2){
    printedText += finishedTextArray[printedTextIndex];
    printedTextIndex += 1;
    if (printedTextIndex >= finishedTextArray.length) {
      programState = 3;
    }
    strokeWeight(1);
    printCurrentArray();
  }
  if (programState == 3) {
    printCurrentArray();
  }
}

function pushChosenWordToArray(array, word) {
  for (let i = 0; i < word.length; i++) {
    finishedTextArray += word[i];
  }
}


function printCurrentArray() {
  textWrap(WORD);
  fill("rgb(245, 26, 26)");
  x = 100;
  y = 100;
  text(printedText, x, y, canvasContainer.width()-150, canvasContainer.height()-150);
}

function keyTyped() {
  if (waitingOnUser) {
    if (keyCode === ENTER && userInput.length > 0) {
      waitingOnUser = false;
      pushChosenWordToArray(finishedTextArray, userInput);
    } else {
      if (keyCode === ENTER || userInput.length > 16) return;
      userInput += key;
    }
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE && userInput.length > 0) {
    userInput = userInput.substring(0, userInput.length - 1);
  } 
}



// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
}