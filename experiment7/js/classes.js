//Create a class named circle that we will store data in to display
class Circle {
constructor(x, y, r, c, name, winrate) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.c = c;
    this.name = name;
    this.winrate = winrate
    this.grabbing = false;
}

updateWinrate(){
    if (this.winrate < 0.1 || isNaN(this.winrate)) {
        this.winrate = 0.1;
    }
}

display() {
    this.updateWinrate();
    fill(this.c, this.winrate);
    ellipse(this.x, this.y, this.r, this.r);
    //Display the name of the hero
    fill(0);
    
    textSize(15);
    text(this.name, this.x, this.y);
}

// Check if mouse is over the bubble
mouseOver() {
    const mouseDistance = dist(mouseX, mouseY, this.x, this.y);
    return mouseDistance < this.r / 2;
}

handleGrabbing(){
    if (this.grabbing) {
    this.x = mouseX;
    this.y = mouseY;
}}
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