class WorldSquare
{
  /**
  *constructor Function to creat instances of TouchTest
  *
  */
  constructor(row,col)
  {
    this.imgWall = new Image();
    this.imgNotWall = new Image();
    this.imgBreakWall = new Image();
    this.imgMoveWall = new Image();
    this.imgWall.src = "img/wall.png";
    this.imgNotWall.src = "img/notwall.png";
    this.imgBreakWall.src = "img/breakwall.png";
    this.imgMoveWall.src = "img/movewall.png";
    this.containsWall = false;
    this.breakWall = false;
    this.moveWall = false;
    this.row = row;
    this.x = this.row;
    this.col = col;
    this.y = this.col;
    this.squareSize = 75 * 0.8;


  }
  initLevelLoader()
  {


  }
  checkCollisionMap(player)
  {
    console.log(map.x);
    if(map.containsWall == true)
    {
      if((this.x< player.x + player.width)&&
        (this.x+this.width>player.x)&&
        (this.y+this.height>player.y)&&
        (this.y<player.y+player.height) )
        {
          return true;
          console.log("Collided");
        }
        else
       {
        return false;
        }
      }
  }
  update()
  {
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    if(this.containsWall == true)
    {
      var image = this.imgWall;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);

    }
    else if(this.containsWall == false)
    {
      var image = this.imgNotWall
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }

    if(this.breakWall == true)
    {
      var image = this.imgBreakWall;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }
    if(this.moveWall == true)
    {
      var image = this.imgMoveWall;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);

    }


  }
  draw()
  {


  }


}
