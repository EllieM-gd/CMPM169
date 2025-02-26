// sketch.js - 
// Author: Ellie McKay
// Date: 2/16/2025

let button;
let canvasContainer;

let circles = [];
let heroes = [];

let slider;
let state = 0; //0 is nothing, 1 is updating, 2 is update success, 3 is wrong username

//TODO:
//Fix circle spawn algorithm
//Create multiple categories to look at, IE: Heroes your best vs, Players you play with
//Fix opacity of circles
//Add state 3 handling 
//Add options to choose seasons to look at. Valid Season IDs: 0, 1, 1.5

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
  update = $('#update');
  slider = $('#uname');
  button.click(function() {
    //updateUsername();
    runAPIAndPrint()
  });
  update.click(function() {
    updatePlayerInfo()
  });

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

function reset() {
  circles = [];
  heroes = [];
  state = 0;
}


function runAPIAndPrint() {
  reset();
  $.getJSON('http://localhost:3000/api/player', { username: slider.val() }, function(data) {
    console.log(data); // Now you can use the API response!
    createPlayerHeroArray(data);
  });
}

function updatePlayerInfo(){
  reset();
  state = 1;
  $.getJSON('http://localhost:3000/api/update',{ username: slider.val() }, function(data) {
    console.log(data); // Now you can use the API response!
    state = 2;
});
}

function createPlayerHeroArray(data){
  if (data.heroes_ranked.length > 0) {
    for (let i = 0; i < data.heroes_ranked.length; i++) {
      pushHeroStats(data.heroes_ranked[i]);
    }
  }
  if (data.heroes_unranked.length > 0) {
    for (let i = 0; i < data.heroes_unranked.length; i++) {
      pushHeroStats(data.heroes_unranked[i]);
    }
  }
  createCriclesForHeros();
}

function pushHeroStats(hero) {
  // First hero scenario
  if (heroes.length == 0) {
    heroes.push(new Heroes(hero.hero_name, hero.hero_thumbnail, hero.play_time, hero.matches, hero.wins));
    return;
  }
  //Check if hero is already in array
  const heroIndex = heroes.findIndex(heroObj => heroObj.isHero(hero.hero_name));
  if (heroIndex == -1) {
    heroes.push(new Heroes(hero.hero_name, hero.hero_thumbnail, hero.play_time, hero.matches, hero.wins));
  } else {
    heroes[heroIndex].addMatchesAndWins(hero.matches, hero.wins);
  }
}


function createCriclesForHeros(){
  let xPos = 50;
  let prevRadius = 0;
  for (let i = 0; i < heroes.length; i++) {
    //get a random color
    let randomColor = color(random(255), random(255), random(255));
    xPos += prevRadius;
    prevRadius = heroes[i].matches_played * 2;
    console.log("Matches Played" + heroes[i].matches_played);
    if (heroes[i].matches_played == 0) {
      prevRadius = 1;
    }
    circles.push(new Circle(xPos, 10 * (i + 1), prevRadius, randomColor, heroes[i].hero_name, heroes[i].calculateWinRate()));
  }
}


// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(255);
  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
    if (circles[i].grabbing) {
      circles[i].handleGrabbing();
    }
  }

  if (state == 1){
    textSize(50);
    fill("rgb(245, 26, 26)");
    text("Updating...", centerHorz, centerVert);
  }
  if (state == 2){
    textSize(50);
    fill("rgb(26, 245, 26)");
    text("Update Finished!", centerHorz, centerVert);
  }
  if (state == 3){
    textSize(50);
    fill("rgb(231, 167, 167)");
    text("Username not found!", centerHorz, centerVert);
  }


}

function mousePressed() {
  for (let i = 0; i < circles.length; i++) {
    if (circles[i].mouseOver()) {
      circles[i].grabbing = true;
      console.log("Grabbing");
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].grabbing = false;
  }
}