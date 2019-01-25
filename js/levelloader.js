class LevelLoader
{
  /**
  *constructor Function to creat instances of TouchTest
  *
  */
  constructor()
  {
    this.x =0;
    this.y = 0;
    this.col = 0;
    this.row = 0;
    gameNs.map1 = true
    gameNs.map2 = false
    gameNs.map3 = false
    this.squareSize = 75 * 0.8;
    this.MaxRows = 12;
    this.MaxCols = 12;
    this.map = [];
     this.mazeSquares = [];
     this.request = new XMLHttpRequest();

     var that = this;
     this.request.addEventListener("load", function requestListener(){
    //TADA! Now I have the class data.
     this.levelloader = JSON.parse(this.responseText);
     this.map= this.levelloader.Map;
     //console.log("MapData :" +that.map[10] );

     that.y = that.squareSize * 1.5;
     for (this.row = 0; this.row < 13; this.row++)
     {
       //that.mazeSquares = [];
         for (this.col = 0; this.col < 15; this.col++)
         {
              that.mazeSquares.push(new WorldSquare(that.x, that.y));
              //that.mazeSquares[this.row][this.col] = new WorldSquare(that.x, that.y);
              that.x = that.x + that.squareSize;
         }
           that.x = 0;
         that.y = that.y + that.squareSize;

     }

    //console.log(that.map[10]);
     for (this.i = 0; this.i< 195; this.i++)
     {

         if (this.map[this.i] === 1)
         {
             that.mazeSquares[this.i].containsWall = true;
         }
         else if(this.map[this.i] === 2)
         {
           that.mazeSquares[this.i].breakWall = true;
         }
         else if(this.map[this.i] === 3)
         {
           that.mazeSquares[this.i].speedUp = true;
         }
         else if(this.map[this.i] === 4)
         {
           that.mazeSquares[this.i].armour = true;
         }
         else if(this.map[this.i] === 5)
         {
           that.mazeSquares[this.i].bomb = true;
         }
         else if(this.map[this.i] === 6)
         {
           that.mazeSquares[this.i].fire = true;
         }
         else if(this.map[this.i] === 7)
         {
           that.mazeSquares[this.i].oneup = true;
         }
         else if(this.map[this.i] === 8)
         {
           that.mazeSquares[this.i].endtile = true;
         }
         else if(this.map[this.i] === 9)
         {
           that.mazeSquares[this.i].edgeLeft = true;
         }
         else if(this.map[this.i] === 10)
         {
           that.mazeSquares[this.i].edgeRight = true;
         }
         else if(this.map[this.i] === 11)
         {
           that.mazeSquares[this.i].edgeDown = true;
         }


     }

});
this.request.open("GET", "js/level.json");
this.request.send();
  }

  NextLevel()
  {
     this.map = [];
     this.mazeSquares = [];
     this.request = new XMLHttpRequest();

     var that = this;
     this.request.addEventListener("load", function requestListener(){
    //TADA! Now I have the class data.
     this.levelloader = JSON.parse(this.responseText);
     if(gameNs.map1 === true)
     {
       gameNs.map1 = false
       gameNs.map2 = true
       this.map = this.levelloader.Map2
     }
     else if(gameNs.map2 === true)
     {
       gameNs.map2 = false
       gameNs.map3 = true
       this.map = this.levelloader.Map3
     }
     //console.log("MapData :" +that.map[10] );

     that.y = that.squareSize * 1.5;
     for (this.row = 0; this.row < 13; this.row++)
     {
       //that.mazeSquares = [];
         for (this.col = 0; this.col < 15; this.col++)
         {
              that.mazeSquares.push(new WorldSquare(that.x, that.y));
              //that.mazeSquares[this.row][this.col] = new WorldSquare(that.x, that.y);
              that.x = that.x + that.squareSize;
         }
           that.x = 0;
         that.y = that.y + that.squareSize;

     }

    //console.log(that.map[10]);
     for (this.i = 0; this.i< 195; this.i++)
     {

         if (this.map[this.i] === 1)
         {
             that.mazeSquares[this.i].containsWall = true;
         }
         else if(this.map[this.i] === 2)
         {
           that.mazeSquares[this.i].breakWall = true;
         }
         else if(this.map[this.i] === 3)
         {
           that.mazeSquares[this.i].speedUp = true;
         }
         else if(this.map[this.i] === 4)
         {
           that.mazeSquares[this.i].armour = true;
         }
         else if(this.map[this.i] === 5)
         {
           that.mazeSquares[this.i].bomb = true;
         }
         else if(this.map[this.i] === 6)
         {
           that.mazeSquares[this.i].fire = true;
         }
         else if(this.map[this.i] === 7)
         {
           that.mazeSquares[this.i].oneup = true;
         }
         else if(this.map[this.i] === 8)
         {
           that.mazeSquares[this.i].endtile = true;
         }

         else if(this.map[this.i] === 9)
         {
           that.mazeSquares[this.i].edgeLeft = true;
         }
         else if(this.map[this.i] === 10)
         {
           that.mazeSquares[this.i].edgeRight = true;
         }
         else if(this.map[this.i] === 11)
         {
           that.mazeSquares[this.i].edgeDown = true;
         }


     }

});
this.request.open("GET", "js/level.json");
this.request.send();
  }

  update()
  {
    // Check player one bomb
    // Get Player one bomb grid position
    var exploSrc = gameNs.playScene.player.bomb.onExplode(this.mazeSquares,gameNs.playScene.player.bombVal)

    // Check player two bomb
    // Get Player two bomb grid position
    var player2ExploSrc = gameNs.playScene.otherPlayer.bomb.onExplode(this.mazeSquares,gameNs.playScene.otherPlayer.bombVal)

    // Check every square in the grid vs the bomb and the effected area
    for (this.i = 0; this.i < 195; this.i++)
    {
      // if its inside the effected area
      if((this.mazeSquares[this.i].row / (75 * 0.8) >= exploSrc.x - 1 &&
        this.mazeSquares[this.i].row / (75 * 0.8) <= exploSrc.x + 1 &&
        (this.mazeSquares[this.i].col - 90) / (75 * 0.8) == exploSrc.y) ||
        (this.mazeSquares[this.i].row / (75 * 0.8) == exploSrc.x &&
        (this.mazeSquares[this.i].col - 90) / (75 * 0.8) >= exploSrc.y - 1 &&
        (this.mazeSquares[this.i].col - 90) / (75 * 0.8) <= exploSrc.y + 1))
        {
          // If the wall is not breakable
          if(this.mazeSquares[this.i].containsWall)
          {
            if(this.mazeSquares[this.i].row / (75 * 0.8) > exploSrc.x)
            {  // Right
              gameNs.playScene.player.bomb.addWall("Right", true)
            }
            else if(this.mazeSquares[this.i].row / (75 * 0.8) < exploSrc.x)
            {  // Left
              gameNs.playScene.player.bomb.addWall("Left", true)
            }
            else if((this.mazeSquares[this.i].col - 90) / (75 * 0.8) > exploSrc.y)
            {  // Down
              gameNs.playScene.player.bomb.addWall("Down", true)
            }
            else if((this.mazeSquares[this.i].col - 90) / (75 * 0.8) < exploSrc.y)
            {  // Up
              gameNs.playScene.player.bomb.addWall("Up", true)
            }
          }

          // If the wall is breakable
          if(this.mazeSquares[this.i].breakWall)
          {
            // Destroy wall
            this.mazeSquares[this.i].breakWall = false;
            //randomly give a power up
            var powerRnd = Math.floor((Math.random() * 1) + 1);
            //console.log(powerRnd);
            if (powerRnd == 5){
              this.mazeSquares[this.i].speedUp = true;
            }
            if (powerRnd == 2){
              this.mazeSquares[this.i].bomb = true;
            }
            if (powerRnd == 3){
              this.mazeSquares[this.i].fire = true;
            }
            if (powerRnd == 4){
              this.mazeSquares[this.i].oneup = true;
            }
            if (powerRnd == 1){
              this.mazeSquares[this.i].armour = true;
            }
            else{
              var endRnd = Math.floor((Math.random() * 100) + 1);
              if (endRnd == 1){
                this.mazeSquares[this.i].endtile = true;
             }
            }
          }
        }

      // if its inside the effected area
      if((this.mazeSquares[this.i].row / (75 * 0.8) >= player2ExploSrc.x - 1 &&
        this.mazeSquares[this.i].row / (75 * 0.8) <= player2ExploSrc.x + 1 &&
        (this.mazeSquares[this.i].col - 90) / (75 * 0.8) == player2ExploSrc.y) ||
        (this.mazeSquares[this.i].row / (75 * 0.8) == player2ExploSrc.x &&
        (this.mazeSquares[this.i].col - 90) / (75 * 0.8) >= player2ExploSrc.y - 1 &&
        (this.mazeSquares[this.i].col - 90) / (75 * 0.8) <= player2ExploSrc.y + 1))
        {

          // If the wall is not breakable
          if(this.mazeSquares[this.i].containsWall)
          {
            if(this.mazeSquares[this.i].row / (75 * 0.8) > player2ExploSrc.x)
            {  // Right
              gameNs.playScene.otherPlayer.bomb.addWall("Right", true)
            }
            else if(this.mazeSquares[this.i].row / (75 * 0.8) < player2ExploSrc.x)
            {  // Left
              gameNs.playScene.otherPlayer.bomb.addWall("Left", true)
            }
            else if((this.mazeSquares[this.i].col - 90) / (75 * 0.8) > player2ExploSrc.y)
            {  // Down
              gameNs.playScene.otherPlayer.bomb.addWall("Down", true)
            }
            else if((this.mazeSquares[this.i].col - 90) / (75 * 0.8) < player2ExploSrc.y)
            {  // Up
              gameNs.playScene.otherPlayer.bomb.addWall("Up", true)
            }
          }

          // If the wall is breakable
          if(this.mazeSquares[this.i].breakWall)
          {
            // Destroy wall
            this.mazeSquares[this.i].breakWall = false;
            //randomly give a power up
            var powerRnd = Math.floor((Math.random() * 10) + 1);
            //console.log(powerRnd);
            if (powerRnd == 1){
              this.mazeSquares[this.i].speedUp = true;
            }
            if (powerRnd == 2){
              this.mazeSquares[this.i].bomb = true;
            }
            if (powerRnd == 3){
              this.mazeSquares[this.i].fire = true;
            }
            if (powerRnd == 4){
              this.mazeSquares[this.i].oneup = true;
            }
            if (powerRnd == 5){
              this.mazeSquares[this.i].armour = true;
            }
            else{
              var endRnd = Math.floor((Math.random() * 100) + 1);
              if (endRnd == 1){
                this.mazeSquares[this.i].endtile = true;
             }
            }
          }
        }

      this.mazeSquares[this.i].update();
    }
    if(gameNs.sceneManager.currentScene.title === gameNs.tutorialScene.title)
    {
      var explosionTut = gameNs.tutorialScene.player.bomb.onExplode(this.mazeSquares, gameNs.tutorialScene.player.bombVal)
      for (this.i = 0; this.i < 195; this.i++)
      {
        if((this.mazeSquares[this.i].row / (75 * 0.8) >= explosionTut.x - 1 &&
          this.mazeSquares[this.i].row / (75 * 0.8) <= explosionTut.x + 1 &&
          (this.mazeSquares[this.i].col - 90) / (75 * 0.8) == explosionTut.y) ||
          (this.mazeSquares[this.i].row / (75 * 0.8) == explosionTut.x &&
          (this.mazeSquares[this.i].col - 90) / (75 * 0.8) >= explosionTut.y - 1 &&
          (this.mazeSquares[this.i].col - 90) / (75 * 0.8) <= explosionTut.y + 1))
          {
            // If the wall is not breakable
            if(this.mazeSquares[this.i].containsWall)
            {
              if(this.mazeSquares[this.i].row / (75 * 0.8) > explosionTut.x)
              {  // Right
                gameNs.playScene.player.bomb.addWall("Right", true)
              }
              else if(this.mazeSquares[this.i].row / (75 * 0.8) < explosionTut.x)
              {  // Left
                gameNs.playScene.player.bomb.addWall("Left", true)
              }
              else if((this.mazeSquares[this.i].col - 90) / (75 * 0.8) > explosionTut.y)
              {  // Down
                gameNs.playScene.player.bomb.addWall("Down", true)
              }
              else if((this.mazeSquares[this.i].col - 90) / (75 * 0.8) < explosionTut.y)
              {  // Up
                gameNs.playScene.player.bomb.addWall("Up", true)
              }
            }
            if(this.mazeSquares[this.i].breakWall)
            {
              this.mazeSquares[this.i].breakWall = false;
            }
          }
        this.mazeSquares[this.i].update();
      }
    }

  }

  updateFromNet(index,containsWall,breakWall,moveWall)
  {
    this.mazeSquares[index].containsWall = containsWall;
    this.mazeSquares[index].breakWall = breakWall;
    this.mazeSquares[index].speedUp = speedUp;

  }

  updateFromNetMove(index1 ,index2,containsWall,breakWall,moveWall1,moveWall2)
  {
    this.mazeSquares[index1].containsWall = containsWall;
    this.mazeSquares[index1].breakWall = breakWall;
    this.mazeSquares[index1].speedUp = speedUp;

  }


}
