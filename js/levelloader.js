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
     console.log("MapData :" +that.map[10] );

     for (this.row = 0; this.row < 14; this.row++)
     {
       //that.mazeSquares = [];
         for (this.col = 0; this.col < 24; this.col++)
         {
              that.mazeSquares.push(new WorldSquare(that.x, that.y));
              //that.mazeSquares[this.row][this.col] = new WorldSquare(that.x, that.y);
              that.x = that.x + that.squareSize;
         }
           that.x = 0;
         that.y = that.y + that.squareSize;

     }

    //console.log(that.map[10]);
     for (this.i = 0; this.i< 336; this.i++)
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
           that.mazeSquares[this.i].moveWall = true;
         }


     }

});
this.request.open("GET", "js/level.json");
this.request.send();
  }

  update()
  {

    for (this.i = 0; this.i < 336; this.i++)
    {
            this.mazeSquares[this.i].update();
    }


  }
  updateFromNet(index,containsWall,breakWall,moveWall)
  {
    this.mazeSquares[index].containsWall = containsWall;
    this.mazeSquares[index].breakWall = breakWall;
    this.mazeSquares[index].moveWall = moveWall;

  }
  updateFromNetMove(index1 ,index2,containsWall,breakWall,moveWall1,moveWall2)
  {
    this.mazeSquares[index1].containsWall = containsWall;
    this.mazeSquares[index1].breakWall = breakWall;
    this.mazeSquares[index1].moveWall = moveWall1;
    this.mazeSquares[index2].moveWall = moveWall2;

  }

}
