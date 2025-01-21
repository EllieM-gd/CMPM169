// sketch.js - purpose and description here
// Author: Your Name
// Date:

//Font Source: https://www.fontspace.com/whale-i-tried-font-f30502

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;

const doSort = true;
const rowDirection = 'both';

const fontFile = "text/WhaleITriedRegular.ttf";
const textFile = "text/doawktranscript.txt";

class MyClass {
    constructor(font, textLocation) {
        this.font = loadFont(font);
        this.loadStrings = loadStrings(textLocation);
        this.loadStrings = this.loadStrings.join(" ");
        console.log(this.loadStrings);
        console.log(this.loadStrings[0][1]);
    }

    setupTreeMap() {
      this.words = this.loadStrings
      console.log(this.words.length);
    }

    draw() {
      textAlign(CENTER, BASELINE);
      let height = 10;
      let x,y = 0;
      console.log(this.words[0]);
      for (let i = 0; i < this.words.length; i++) {
        const item = this.loadStrings[i];
        x += item.length + 1;
        if (x > 600) {
          x = 0;
          y += height;
        }
        fill(255);
        stroke(0);
        strokeWeight(1);
        rect(x, y, item.length, height);
    
        let word = item.toLowerCase();
        console.log(word)
        textFont(this.font, 100);
        let textW = textWidth(word);
        let fontSize = 100 * (item.length * 0.9) / textW;
        fontSize = min(fontSize, (height * 0.9));
        textFont(this.font, fontSize);
    
        fill(0);
        noStroke();
        text(word, x + item.length / 2, y + height * 0.8);
      }
    
      noLoop();
    }
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

  // create an instance of the class
  myInstance = new MyClass(fontFile, textFile);
  myInstance.setupTreeMap();

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(220);
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  myInstance.draw();
}