// sketch.js - Day/Night cycles with moon phases and clouds
// Author: Ellie McKay
// Date: 1/26/2025

// Source P5.js: https://editor.p5js.org/rjgilmour/sketches/PJCF1AdrC
// Moon Source: https://www.vecteezy.com/vector-art/109549-vector-flat-moon-phases-icons

// Some of the code in this file was initially generated with github co-pilot.

// Globals
let canvasContainer;
let time;

// Colors
const baseGrassColor = [126, 240, 126];
const cloudBaseColor = [180, 182, 183]
let grassColor = baseGrassColor;
let cloudColor = cloudBaseColor;

// Moons
let fullMoon, wncMoon, wngMoon, wxgMoon, wxcMoon, fstqMoon, thrdqMoon, newMoon;
let moonIndex = 0;
let moonPhases = [];

// Clouds
let clouds = [];

// Stars
let stars = [];
let starsA = 0;

class Cloud{
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  draw() {
    //Source: https://editor.p5js.org/mena-landry/sketches/D7ql4Nd3V
    fill(cloudColor);
    noStroke();
    ellipse(this.x, this.y, 70, 50);
    ellipse(this.x + 10, this.y + 10, 70, 50);
    ellipse(this.x - 20, this.y + 10, 70, 50);
  }

  move() {
    this.x += this.speed;
  }
  checkInRange() {
    return this.x > -100 && this.x < canvasContainer.width() + 100;
  }
}

function createCloud(speed) {
  let cloudX = 0;
  let cloudSpeed = speed;
  if (random(1) > 0.5) {
    cloudX = canvasContainer.width() + 100;
    cloudSpeed = -speed;
  }
  const cloudHeight = random(canvasContainer.height() * 0.1, canvasContainer.height() * 0.3);
  const tempCloud = new Cloud(cloudX, cloudHeight, cloudSpeed);
  clouds.push(tempCloud);
}

function createCloudAt(x,y,speed) {
  let cloudSpeed = speed;
  if (random(1) > 0.5) {
    cloudSpeed = -speed;
  }
  const tempCloud = new Cloud(x, y, cloudSpeed);
  clouds.push(tempCloud);
}

function isNighttime() {
  return time > cycleTime / 2;
}

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
  
  createCloud(0.6);
  createStars();

  cycleTime = 60;  // Number of "seconds" for a day/night cycle
  frameRate(60) 
  time = 0;
  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

function handleTime(){
  time += 1/30 + time/40000; //Gets faster as time goes on. Prob needs adjusting
  if (time >= cycleTime) {
    time = 0;
    updateMoon();
  }
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  handleTime();
  let sun = (sin(time * 2 * PI / cycleTime)/2 + 0.5); //Sun value between 0 and 1

  //Lock the sun to a minimum value so it doesn't get too dark
  if (sun < 0.2) {
    sun = 0.2
  }
  
  //.1% chance of creating a cloud
  if (random(1) > 0.999) {
    createCloud(0.6);
  }
  
  //Adjust colors based on times of day
  background(135 * sun, 206 * sun, 235 * sun); //Background sky based on time of day
  grassColor = [baseGrassColor[0] * sun, baseGrassColor[1] * sun, baseGrassColor[2] * sun]
  cloudColor = [cloudBaseColor[0] * sun, cloudBaseColor[1] * sun, cloudBaseColor[2] * sun, cloudBaseColor[3]];

  //Draw stars at night
  if (isNighttime()) {
    //Determine stars alpha/brightness value based on time of night or moon phase
    if (moonPhases[moonIndex] != newMoon) starsA = abs(45-time)
    else starsA = 10; //New Moon = Lots of stars all night long
    //If its a full moon, make the stars dimmer
    if (moonPhases[moonIndex] == fullMoon) starsA = 2;
    drawStars(starsA);
  }
  
  drawSun();
  drawMoon();
  drawGrass();

  //Draw clouds
  for (i in clouds) {
    clouds[i].draw();
    clouds[i].move();
    drawShadow(clouds[i].x - 40, clouds[i].x + 40,sun)
    //Delete the cloud if its outside of the screen
    if (!clouds[i].checkInRange()) {
      clouds.splice(i, 1);
    }
  }
}

function drawShadow(minx,maxx,sun) {
  push()
    fill(0, 0, 0, 50 * sun)
    beginShape()
      vertex(minx, height-40)
      vertex(maxx, height-40)
      vertex(maxx, height)
      vertex(minx, height)
    endShape(CLOSE)
  pop()
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

function drawStars(a) {
  push()
    for (starsIndex in stars) {
      fill((100 * a/3))
      noStroke()
      circle(stars[starsIndex][0], stars[starsIndex][1], 2)
    }
  pop()
}

function createStars(){
  for (let i = 0; i < 50; i++) {
    stars.push([random(width), random(height/2, 0)])
  }
}

function drawMoon() {
  push()
    translate(width/2, height)
    //Rotate the angle of the canvas to get the moons position.
    const angle = -2 * PI + time/cycleTime * 2 * PI
    rotate(angle)
    //Translate the canvas to the moons position
    translate(height, 0)

    // Reverse the angle so that the moon is always rotated the same way.
    rotate(-angle);
    if (moonPhases[moonIndex] != newMoon) {
      image(moonPhases[moonIndex], 0, 0, 50, 50)
    }
  pop()
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  if (mouseY > canvasContainer.height() - 40) return;
  createCloudAt(mouseX, mouseY, 0.6);
  return;
}