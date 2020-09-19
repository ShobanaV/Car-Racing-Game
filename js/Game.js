class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
        gameState = data.val();
        console.log("getting state");
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    // console.log(gameState);
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(displayWidth/2 - 300, displayHeight - 100);
    car2 = createSprite(displayWidth/2 - 100, displayHeight - 100);
    car3 = createSprite(displayWidth/2 + 100, displayHeight - 100);
    car4 = createSprite(displayWidth/2 + 300, displayHeight - 100);
    cars = [car1, car2, car3, car4];

    car1.addImage("car", carImage1);
    car2.addImage("car", carImage2);
    car3.addImage("car", carImage3);
    car4.addImage("car", carImage4);

  }

  play(){
    form.hide();
    // textSize(30);
    // text("Game Start", 120, 100)
    Player.getPlayerInfo();    
    player.getCarsAtEnd();

    if(allPlayers !== undefined){
      background(ground);
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

      var index = 0;
      //var x =  displayWidth/2 - 300;
      var y = 0;

      for(var plr in allPlayers){
        y = displayHeight - allPlayers[plr].distance - 100;
       // cars[index].x = x;
        cars[index].y = y;

        // console.log(player.index, index)

        if(index + 1 === player.index) {
          fill("red");
          ellipse(cars[index].x, cars[index].y, 60, 60);
          cars[index].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index].y;
        } 

        index = index + 1;

        //x = x + 200;      
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > displayHeight * 5 - 200) {
      gameState = 2;
      player.rank += 1;
      playerRank = player.rank;
      Player.updateCarsAtEnd(player.rank);
      
    }


    drawSprites();
  }

  end() {
    // if(gameOver === undefined) {
    // //   console.log("here")
    //   var gameOver = createElement("h2");
    //   gameOver.position(displayWidth/2 - 300, 100);
    //   gameOver.html("Game Over");
    //   // console.log(gameOver)
    //   var rankMsg = createElement("h2");
    //   rankMsg.position(displayWidth/2 - 250, 200);
    //   rankMsg.html("Your Rank : " + player.rank);
    // }
    if(alertRank) {
      swal({
        title: "Game Over!",
        text: "Your rank : " + playerRank,
        icon: "success",
        // button: "OK"
        buttons : false
      })

      alertRank = 0

    }
    
    
    
    // game.update(2);
  }
}
