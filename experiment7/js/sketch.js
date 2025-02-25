// sketch.js - 
// Author: Ellie McKay
// Date: 2/16/2025

let button;
let canvasContainer;

let circles = [];
let heroes = [];

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


function runAPIAndPrint() {
  $.getJSON('http://localhost:3000/api/player', function(data) {
    console.log(data); // Now you can use the API response!
    createPlayerHeroArray(data);
});
}

function updatePlayerInfo(){
  $.getJSON('http://localhost:3000/api/update', function(data) {
    console.log(data); // Now you can use the API response!
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
  if (heroes.length == 0) {
    heroes.push(new Heroes(hero.hero_name, hero.hero_thumbnail, hero.play_time, hero.matches, hero.wins));
  }
  const heroIndex = heroes.findIndex(heroObj => heroObj.isHero(hero.hero_name));
  if (heroIndex == -1) {
    heroes.push(new Heroes(hero.hero_name, hero.hero_thumbnail, hero.play_time, hero.matches, hero.wins));
  } else {
    heroes[heroIndex].addMatchesAndWins(hero.matches, hero.wins);
  }
}





class Heroes {
  constructor(hero_name, hero_thumbnail, play_time, matches_played, matches_won) {
    this.hero_name = hero_name;
    this.hero_url = hero_thumbnail;
    this.play_time = play_time;
    this.matches_played = matches_played;
    this.matches_won = matches_won;
  }
  isHero(hero_name){
    return this.hero_name == hero_name;
  }

  calculateWinRate(){
    return this.matches_won / this.matches_played;
  }

  addMatchesAndWins(matches, wins){
    this.matches_played += matches;
    this.matches_won += wins;
  }

  // getImage(){
  //   $.getJSON('http://localhost:3000/api/image', this.hero_url, function(data) {
  //     console.log(data); // Now you can use the API response!
  //   });
  // }

}



//Create a class named circle that we will store data in to display
class Circle {
  constructor(x, y, r, c, name) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.name = name;
  }

  display() {
    fill(this.c);
    ellipse(this.x, this.y, this.r, this.r);
    //Display the name of the hero
    fill(0);
    text(this.name, this.x, this.y);
  }
}


function createCriclesForHeros(){
  console.log(heroes);
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
    console.log(xPos);
    circles.push(new Circle(xPos, 10 * (i + 1), prevRadius, randomColor, heroes[i].hero_name));
  }
}


// draw() function is called repeatedly, it's the main animation loop
function draw() {
  background(255);
  for (let i = 0; i < circles.length; i++) {
    circles[i].display();
  }
}