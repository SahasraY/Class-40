class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 200);
    car1.addImage(CAR_1)
    car2 = createSprite(300, 200);
    car2.addImage(CAR_2)
    car3 = createSprite(500, 200);
    car3.addImage(CAR_3)
    car4 = createSprite(700, 200);
    car4.addImage(CAR_4)
    cars = [car1, car2, car3, car4];
  }

  play() {

    Player.getPlayerInfo();

    image(TImage, 0, -displayHeight * 3, displayWidth, displayHeight * 7)
    form.hide();



    if (allPlayers !== undefined) {
      
      var index = 0;

      
      var x = 200;
      var y;

      for (var plr in allPlayers) {



        index = index + 1;


        x = x + 220;

        y = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;

        if (index === player.index) {
          cars[index - 1].shapeColor = "red";
          textSize(25)
          fill("white")
          text("You",cars[index-1].x,cars[index-1].y+80)
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y
        }





      }

    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 10
      player.update();
    }

    if(player.distance>3400){
      gameState=2;
    }

    drawSprites();

  

  }

  end(){
    console.log("Game Ended")
  }
}
