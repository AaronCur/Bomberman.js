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
    this.imgEdgeLeft = new Image();
    this.imgEdgeRight = new Image();
    this.imgEdgeDown = new Image();
    //power-up
    this.imgSpeedUp = new Image();
    this.imgArmour = new Image();
    this.imgBomb = new Image();
    this.imgFire = new Image();
    this.imgOneUp = new Image();
    //end game
    this.imgEnd = new Image();

    this.imgWall.src = "img/indistructableWall.png";
    this.imgNotWall.src = "img/floor.png";
    this.imgBreakWall.src = "img/destructableWall.png";
    this.imgEdgeLeft.src = "img/borderWallLeft.png";
    this.imgEdgeRight.src = "img/borderWallRight.png";
    this.imgEdgeDown.src = "img/borderWallDown.png";
    //power-up
    this.imgSpeedUp.src = "img/skate.png";
    this.imgArmour.src = "img/armour.png";
    this.imgBomb.src = "img/bombP.png";
    this.imgFire.src = "img/Fire.png";
    this.imgOneUp.src = "img/1Up.png";
    //end game
    this.imgEnd.src = "img/exit.png";

    this.containsWall = false;
    this.breakWall = false;
    this.speedUp = false;
    this.armour = false;
    this.bomb = false;
    this.fire = false;
    this.oneup = false;
    this.edgeLeft = false;
    this.edgeRight = false;
    this.edgeDown = false;
    this.endtile = false;
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
      var image = this.imgNotWall;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }
    if(this.speedUp == true)
    {
      var image = this.imgSpeedUp;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }
    if(this.armour == true)
    {
      var image = this.imgArmour;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }
    if(this.fire == true)
    {
      var image = this.imgFire;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }
    if(this.bomb == true)
    {
      var image = this.imgBomb;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }
    if(this.oneup == true)
    {
      var image = this.imgOneUp;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }
    if(this.endtile == true)
    {
      var image = this.imgEnd;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }

    if(this.breakWall == true)
    {
      var image = this.imgBreakWall;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }

    if(this.goal === true && this.breakWall === false)
    {
      var image = this.endGoal
      ctx.drawImage(image,0,0,this.squareSize, this.squareSize, this.row, this.col, this.squareSize, this.squareSize)
    }
    
    if(this.edgeLeft == true)
    {
      this.containsWall = true;
      var image = this.imgEdgeLeft;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }
    if(this.edgeRight == true)
    {
      this.containsWall = true;
      var image = this.imgEdgeRight;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }
    if(this.edgeDown == true)
    {
      this.containsWall = true;
      var image = this.imgEdgeDown;
      ctx.drawImage(image, 0 , 0,this.squareSize, this.squareSize ,this.row,this.col, this.squareSize,this.squareSize);
    }
  }
  draw()
  {


  }


}
