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


     }

});
this.request.open("GET", "js/level.json");
this.request.send();
  }

  update()
  {
    var explosionSrc = gameNs.playScene.player.bomb.onExplode()
    for (this.i = 0; this.i < 195; this.i++)
    {
      if((this.mazeSquares[this.i].row / (75 * 0.8) >= explosionSrc.x - 1 &&
        this.mazeSquares[this.i].row / (75 * 0.8) <= explosionSrc.x + 1 &&
        (this.mazeSquares[this.i].col - 90) / (75 * 0.8) == explosionSrc.y) ||
        (this.mazeSquares[this.i].row / (75 * 0.8) == explosionSrc.x &&
        (this.mazeSquares[this.i].col - 90) / (75 * 0.8) >= explosionSrc.y - 1 &&
        (this.mazeSquares[this.i].col - 90) / (75 * 0.8) <= explosionSrc.y + 1))
        {
          if(this.mazeSquares[this.i].breakWall)
          {
            this.mazeSquares[this.i].breakWall = false;
            //randomly give a power up
            var powerRnd = Math.floor((Math.random() * 10) + 1);
            console.log(powerRnd);
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
          }
        }
      this.mazeSquares[this.i].update();
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
