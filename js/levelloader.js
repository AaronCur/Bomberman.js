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
    if(gameNs.sceneManager.currentScene.title === gameNs.playScene.title)
    {
      // Check player one bomb
      // Get Player one bomb grid position
      for (var i = 0; i < gameNs.playScene.player.bombs.length; i++) {
        var exploSrc = gameNs.playScene.player.bombs[i].onExplode(this.mazeSquares,gameNs.playScene.player.bombVal)
        if(gameNs.playScene.player.bombs[i].firePowerUp)
        {
          var explosionSize = 2;
        }
        else {
          var explosionSize = 1;
        }
        // Check every square in the grid vs the bomb and the effected area
        for (this.j = 0; this.j < 195; this.j++)
        {
          // if its inside the effected area
          if((this.mazeSquares[this.j].row / (75 * 0.8) >= exploSrc.x - explosionSize &&
            this.mazeSquares[this.j].row / (75 * 0.8) <= exploSrc.x + explosionSize &&
            (this.mazeSquares[this.j].col - 90) / (75 * 0.8) == exploSrc.y) ||
            (this.mazeSquares[this.j].row / (75 * 0.8) == exploSrc.x &&
            (this.mazeSquares[this.j].col - 90) / (75 * 0.8) >= exploSrc.y - explosionSize &&
            (this.mazeSquares[this.j].col - 90) / (75 * 0.8) <= exploSrc.y + explosionSize))
            {
              // If the wall is not breakable
              if(this.mazeSquares[this.j].containsWall)
              {
                if(this.mazeSquares[this.j].row / (75 * 0.8) > exploSrc.x)
                {  // Right
                  var diff  = (this.mazeSquares[this.j].row / (75 * 0.8) - exploSrc.x);
                  if(diff === 1 || gameNs.playScene.player.bombs[i].firePowerUp)
                  {
                    gameNs.playScene.player.bombs[i].addWall("Right" + diff, true)
                  }
                }
                else if(this.mazeSquares[this.j].row / (75 * 0.8) < exploSrc.x)
                {  // Left
                  var diff  = (exploSrc.x - this.mazeSquares[this.j].row / (75 * 0.8));
                  if(diff === 1 || gameNs.playScene.player.bombs[i].firePowerUp)
                  {
                    gameNs.playScene.player.bombs[i].addWall("Left" + diff, true)
                  }
                }
                else if((this.mazeSquares[this.j].col - 90) / (75 * 0.8) > exploSrc.y)
                {  // Down
                  var diff  = ((this.mazeSquares[this.j].col - 90) / (75 * 0.8) - exploSrc.y);
                  if(diff === 1 || gameNs.playScene.player.bombs[i].firePowerUp)
                  {
                    gameNs.playScene.player.bombs[i].addWall("Down" + diff, true)
                  }
                }
                else if((this.mazeSquares[this.j].col - 90) / (75 * 0.8) < exploSrc.y)
                {  // Up
                  var diff  = (exploSrc.y - (this.mazeSquares[this.j].col - 90) / (75 * 0.8));
                  if(diff === 1 || gameNs.playScene.player.bombs[i].firePowerUp)
                  {
                    gameNs.playScene.player.bombs[i].addWall("Up" + diff, true)
                  }
                }
              }
              else if(this.mazeSquares[this.j].breakWall)
              { // If the wall is breakable
                // Destroy wall
                this.mazeSquares[this.j].breakWall = false;
                //randomly give a power up
                var powerRnd = Math.floor((Math.random() * 10) + 1);
                //console.log(powerRnd);
                if (powerRnd == 1){
                  this.mazeSquares[this.j].speedUp = true;
                }
                if (powerRnd == 2){
                  this.mazeSquares[this.j].bomb = true;
                }
                if (powerRnd == 3){
                  this.mazeSquares[this.j].fire = true;
                }
                if (powerRnd == 4){
                  this.mazeSquares[this.j].oneup = true;
                }
                if (powerRnd == 5){
                  this.mazeSquares[this.j].armour = true;
                }
                else{
                  var endRnd = Math.floor((Math.random() * 100) + 1);
                  if (endRnd == 1){
                    this.mazeSquares[this.j].endtile = true;
                  }
                }
              }
            }
          }
      }


      for (var j = 0; j < gameNs.playScene.otherPlayer.bombs.length; j++) {
        // Check player two bomb
        // Get Player two bomb grid position
        var player2ExploSrc = gameNs.playScene.otherPlayer.bombs[j].onExplode(this.mazeSquares,gameNs.playScene.otherPlayer.bombVal)

        if(gameNs.playScene.otherPlayer.bombs[j].firePowerUp)
        {
          var explosionSize = 2;
        }
        else {
          var explosionSize = 1;
        }
        // Check every square in the grid vs the bomb and the effected area
        for (this.i = 0; this.i < 195; this.i++)
        {

          // if its inside the effected area
          if((this.mazeSquares[this.i].row / (75 * 0.8) >= player2ExploSrc.x - explosionSize &&
            this.mazeSquares[this.i].row / (75 * 0.8) <= player2ExploSrc.x + explosionSize &&
            (this.mazeSquares[this.i].col - 90) / (75 * 0.8) == player2ExploSrc.y) ||
            (this.mazeSquares[this.i].row / (75 * 0.8) == player2ExploSrc.x &&
            (this.mazeSquares[this.i].col - 90) / (75 * 0.8) >= player2ExploSrc.y - explosionSize &&
            (this.mazeSquares[this.i].col - 90) / (75 * 0.8) <= player2ExploSrc.y + explosionSize))
            {

              // If the wall is not breakable
              if(this.mazeSquares[this.i].containsWall)
              {
                if(this.mazeSquares[this.i].row / (75 * 0.8) > player2ExploSrc.x)
                {
                  // Right
                  var diff  = (this.mazeSquares[this.i].row / (75 * 0.8) - player2ExploSrc.x);
                  if(diff === 1 || gameNs.playScene.otherPlayer.bombs[j].firePowerUp)
                  {
                    gameNs.playScene.otherPlayer.bombs[j].addWall("Right" + diff, true)
                  }
                }
                else if(this.mazeSquares[this.i].row / (75 * 0.8) < player2ExploSrc.x)
                {  // Left
                  var diff  = (player2ExploSrc.x - this.mazeSquares[this.i].row / (75 * 0.8));
                  if(diff === 1 || gameNs.playScene.otherPlayer.bombs[j].firePowerUp)
                  {
                    gameNs.playScene.otherPlayer.bombs[j].addWall("Left" + diff, true)
                  }
                }
                else if((this.mazeSquares[this.i].col - 90) / (75 * 0.8) > player2ExploSrc.y)
                {  // Down
                  var diff  = ((this.mazeSquares[this.i].col - 90) / (75 * 0.8) - player2ExploSrc.y);
                  if(diff === 1 || gameNs.playScene.otherPlayer.bombs[j].firePowerUp)
                  {
                    gameNs.playScene.otherPlayer.bombs[j].addWall("Down" + diff, true)
                  }
                }
                else if((this.mazeSquares[this.i].col - 90) / (75 * 0.8) < player2ExploSrc.y)
                {  // Up
                  var diff  = (player2ExploSrc.y - (this.mazeSquares[this.i].col - 90) / (75 * 0.8));
                  if(diff === 1 || gameNs.playScene.otherPlayer.bombs[j].firePowerUp)
                  {
                    gameNs.playScene.otherPlayer.bombs[j].addWall("Up" + diff, true)
                  }
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
        }
      }


    if(gameNs.sceneManager.currentScene.title === gameNs.tutorialScene.title)
    {
      // Check player one bomb
      // Get Player one bomb grid position
      for (var i = 0; i < gameNs.tutorialScene.player.bombs.length; i++) {
        var explosionTut = gameNs.tutorialScene.player.bombs[i].onExplode(this.mazeSquares,gameNs.tutorialScene.player.bombVal)

        if(gameNs.tutorialScene.player.bombs[i].firePowerUp)
        {
          var explosionSize = 2;
        }
        else {
          var explosionSize = 1;
        }

        // Check every square in the grid vs the bomb and the effected area
        for (this.j = 0; this.j < 195; this.j++)
        {
          if((this.mazeSquares[this.j].row / (75 * 0.8) >= explosionTut.x - explosionSize &&
            this.mazeSquares[this.j].row / (75 * 0.8) <= explosionTut.x + explosionSize &&
            (this.mazeSquares[this.j].col - 90) / (75 * 0.8) == explosionTut.y) ||
            (this.mazeSquares[this.j].row / (75 * 0.8) == explosionTut.x &&
            (this.mazeSquares[this.j].col - 90) / (75 * 0.8) >= explosionTut.y - explosionSize &&
            (this.mazeSquares[this.j].col - 90) / (75 * 0.8) <= explosionTut.y + explosionSize))
            {
              // If the wall is not breakable
              if(this.mazeSquares[this.j].containsWall)
              {
                if(this.mazeSquares[this.j].row / (75 * 0.8) > explosionTut.x)
                {  // Right
                  var diff  = ((this.mazeSquares[this.j].row / (75 * 0.8)) - explosionTut.x);
                  if(diff === 1 || gameNs.tutorialScene.player.bombs[i].firePowerUp)
                  {
                    gameNs.tutorialScene.player.bombs[i].addWall("Right" + diff, true)
                  }
                }
                else if(this.mazeSquares[this.j].row / (75 * 0.8) < explosionTut.x)
                {  // Left
                  var diff  = (explosionTut.x - (this.mazeSquares[this.j].row / (75 * 0.8)));
                  if(diff === 1 || gameNs.tutorialScene.player.bombs[i].firePowerUp)
                  {
                    gameNs.tutorialScene.player.bombs[i].addWall("Left" + diff, true)
                  }
                }
                else if((this.mazeSquares[this.j].col - 90) / (75 * 0.8) > explosionTut.y)
                {  // Down
                  var diff  = (((this.mazeSquares[this.j].col - 90) / (75 * 0.8)) - explosionTut.y);
                  if(diff === 1 || gameNs.tutorialScene.player.bombs[i].firePowerUp)
                  {
                    gameNs.tutorialScene.player.bombs[i].addWall("Down" + diff, true)
                  }
                }
                else if((this.mazeSquares[this.j].col - 90) / (75 * 0.8) < explosionTut.y)
                {  // Up
                  var diff  = (explosionTut.y - ((this.mazeSquares[this.j].col - 90) / (75 * 0.8)));
                  if(diff === 1 || gameNs.tutorialScene.player.bombs[i].firePowerUp)
                  {
                    gameNs.tutorialScene.player.bombs[i].addWall("Up" + diff, true)
                  }
                }
              }
              if(this.mazeSquares[this.j].breakWall)
              {
                this.mazeSquares[this.j].breakWall = false;
              }
            }
          this.mazeSquares[this.j].update();
        }
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
