// sketch.js - 
// Author: Ellie McKay
// Date: 2/16/2025

let winrateButton, playtimeButton, matchButton;
let friendsMatchesButton, friendsWinRateButton;
let canvasContainer;
let seasonDropDown;

let circles = [];
let heroes = [];
let players = [];

const ip = 'http://localhost:3000';

let heroSearch = true;

let slider;
let state = 0; //0 is nothing, 1 is updating, 2 is update success, 3 is wrong username, 4 is loading

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

function radiusBasedOnMatchesPlayed(hero) {
  return 4 + hero.matches_played * 2.5;
}

function radiusBasedOnWinRate(hero) {
  let returnValue = hero.calculateWinRate() * 100;
  if (returnValue < 4) {
    returnValue = 4;
  }
  return returnValue;
}

function radiusBasedOnPlayTime(hero) {
  let playTime = (hero.play_time / 60) / 2;
  return 4 + playTime;
}

function radiusBasedOnMatchesPlayers(player) {
  return 4 + player.matches * 0.5;
}

function radiusBasedOnTeammateWinrate(player) {
  let returnValue = player.winrate;
  if (returnValue < 4) {
    returnValue = 4;
  }
  return returnValue;
}

function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  seasonDropDown = $('#seasons');

  // * - HANDLE BUTTONS - * //
  matchButton = $('#matches'); 
  winrateButton = $('#winrate');
  playtimeButton = $('#playtime');
  friendsMatchesButton = $('#friends');
  friendsWinRateButton = $('#friendwinrate');
  update = $('#update');
  slider = $('#uname');
  //Heroes
  matchButton.click(function() {
    heroSearch = true;
    runAPIAndPrint(radiusBasedOnMatchesPlayed, sortBasedOnMatchesPlayed);
  });
  winrateButton.click(function() {
    heroSearch = true;
    runAPIAndPrint(radiusBasedOnWinRate, sortBasedOnWinRate);
  });
  playtimeButton.click(function() {
    heroSearch = true;
    runAPIAndPrint(radiusBasedOnPlayTime, sortBasedOnPlayTime);
  });
  //Players
  friendsMatchesButton.click(function() {
    heroSearch = false;
    runAPIAndPrint(radiusBasedOnMatchesPlayers, sortBasedOnMatches);
  });
  friendsWinRateButton.click(function() {
    heroSearch = false;
    runAPIAndPrint(radiusBasedOnTeammateWinrate, sortBasedOnPlayerWinRate);
  });
  //Other
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
  players = [];
  state = 0;
}


function runAPIAndPrint(functionToRun, sortFunction) {
  reset();
  state = 4;
  let seasons = seasonDropDown.val();
  if (seasons.length == 0) {
    seasons[0] = 1;
  }
  for (let i = 0; i < seasons.length; i++) {
    let currentSeason = seasons[i];
  $.getJSON(ip + '/api/player', { username: slider.val(), season: currentSeason }, function(data) {
    console.log(data); // Now you can use the API response!
    if (data.error) {
      state = 3;
      return;
    }
    if (heroSearch) createPlayerHeroArray(data);
    else createTeammateArray(data);
    if (i == seasons.length - 1) {
      if (sortFunction) {
        sortFunction();
      }
      if (heroSearch) createCriclesForHeros(functionToRun);
      else createCirclesForPlayers(functionToRun);
      state = 0;
    }
  }); 
}
}





function updatePlayerInfo(){
  reset();
  state = 1;
  $.getJSON(ip + '/api/update',{ username: slider.val() }, function(data) {
    console.log(data); // Now you can use the API response!
    if (data.error) {
      state = 3;
      return;
    }
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
}

function createTeammateArray(data){
  if (data.team_mates.length > 0) {
    for (let i = 0; i < data.team_mates.length; i++) {
      pushPlayerStats(data.team_mates[i]);
    }
    console.log(players);
  }
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

function pushPlayerStats(player) {
  // First player scenario
  if (players.length == 0) {
    players.push(new Players(player.player_info.nick_name, player.matches, player.win_rate));
    return;
  }
  //Check if player is already in array
  const playerIndex = players.findIndex(playerObj => playerObj.isPlayer(player.player_info.nick_name));
  if (playerIndex == -1) {
    players.push(new Players(player.player_info.nick_name, player.matches, player.win_rate));
  } else {
    players[playerIndex].addMatchesAndWins(player.matches, player.win_rate);
  }
}

function sortBasedOnMatchesPlayed() {
  heroes.sort((a, b) => (a.matches_played < b.matches_played) ? 1 : -1);
}

function sortBasedOnWinRate() {
  heroes.sort((a, b) => (a.calculateWinRate() < b.calculateWinRate()) ? 1 : -1);
}

function sortBasedOnPlayTime() {
  heroes.sort((a, b) => (a.play_time < b.play_time) ? 1 : -1);
}

function sortBasedOnMatches() {
  players.sort((a, b) => (a.matches < b.matches) ? 1 : -1);
}

function sortBasedOnPlayerWinRate() {
  players.sort((a, b) => Number(b.winrate) - Number(a.winrate));
}

function createCriclesForHeros(theFunction){
  let xPos = 50;
  let prevRadius = 0;
  for (let i = 0; i < heroes.length; i++) {
    //get a random color
    let randomColor = color(random(255), random(255), random(255));
    //Handle the placement on the x axis
    xPos += prevRadius / 2;
    prevRadius = theFunction(heroes[i])
    xPos += prevRadius / 2;
    //If the hero has no matches played, set the radius to 1
    circles.push(new Circle(xPos, 100 + (10 * (i + 1)), prevRadius, randomColor, heroes[i].hero_name, heroes[i].calculateWinRate()));
  }
}

function createCirclesForPlayers(theFunction){
  let xPos = 50;
  let prevRadius = 0;
  for (let i = 0; i < players.length; i++) {
    //get a random color
    let randomColor = color(random(255), random(255), random(255));
    //Handle the placement on the x axis
    xPos += prevRadius / 2;
    prevRadius = theFunction(players[i])
    xPos += prevRadius / 2;
    //If the hero has no matches played, set the radius to 1
    circles.push(new Circle(xPos, 100 + (40 * (i + 1)), prevRadius, randomColor, players[i].name, players[i].winrate));
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
    text("Username not found!", centerHorz - 100, centerVert);
  }
  if (state == 4){
    textSize(50);
    fill("rgb(26, 26, 245)");
    text("Loading...", centerHorz, centerVert);
  }


}

function mousePressed() {
  for (let i = 0; i < circles.length; i++) {
    if (circles[i].mouseOver()) {
      circles[i].grabbing = true;
    }
  }
}

function mouseReleased() {
  for (let i = 0; i < circles.length; i++) {
    circles[i].grabbing = false;
  }
}