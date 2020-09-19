var gameState = 0;
var playerCount;
var allPlayers;

var database;

var form, player, game;

var cars, car1, car2, car3, car4;

var carImage1, carImage2, carImage3, carImage4, track, ground;

var alertRank = 1, playerRank;

function preload() {
  carImage1 = loadImage("images/car1.png");
  carImage2 = loadImage("images/car2.png");
  carImage3 = loadImage("images/car3.png");
  carImage4 = loadImage("images/car4.png");
  track = loadImage("images/track.jpg");
  ground = loadImage("images/ground.png");
}


function setup(){
  createCanvas(displayWidth - 50, displayHeight - 50);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  console.log(gameState);
  if(playerCount === 4 && gameState === 0){
    game.update(1);
  }
  if(gameState === 1){
    console.log("play");
    clear();
    game.play();
  }

  if(gameState === 2) {
    console.log("end");
    //clear();
    game.end();
  }
}
