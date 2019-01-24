class Ai
{
  /**
  *Constructor function that accepts key pressed events and initiates code
  moves square based on which button that's pressed
  @param {number}x assigns squares x position
  @param {number}y assigns squares y position
  @param {number}width assigns height of sqaure
  @param {number}height assigns height of square
  @param {number}colour assigns colour of square
  */
  constructor(context, imageOptions, fps, y, x)
  {
//  this.x=x;
  this.collisionUp = false;
  this.collisionDown = false;
  this.collisionLeft = false;
  this.collisionRight = false;
  this.moveX = null;
  this.moveY = null;
  this.enableLeft = null;
  this.enableRight = null;
  this.enableDown = null;
  this.enableUp = null;
  this.direction = 0;

  this.img= imageOptions.image;
  this.fps = fps;
  this.x = x;
  this.xFeet = this.x + (this.width / 2);
  this.yFeet = this.y + (this.height/2);
  this.y = y;
  this.index = 0;
  this.width = imageOptions.width;
  this.height = imageOptions.height;
  this.time = 0;
  this.ticksPerFrame = 1000/this.fps;
  this.col = 0;
  this.row = 0;
  this.i = 0;
  this.j = 0;
  this.squareSize = 75 * 0.8;

  this.maxRows=13
  this.maxCols=15

  this.moved =false
  gameNs.collides = false;

  this.tile = {};
  this.tile.width = 75;
  this.tile.height = 75;


  //call at the start
  this.direction = Math.floor((Math.random() * 4) + 1);
  }

  updateFromNet(x, y, moveX, moveY, direction)
  {
    this.x = x;
    this.y = y;
    this.moveX = moveX;
    this.moveY = moveY;
    this.direction = direction;
  }

 update(level)
 {

   if(gameNs.playScene.gameover == false)
   {
     if(this.moveX == false && this.x> 0 /*&& this.checkCollisionMap(level.mazeSquares[this.i -1])==false*/)
      {

        //this.x -= 5;
        this.direction = 4;
        this.collisionRight = false;
        this.collisionUp = false;
        this.collisionDown = false;

      }
      else if (this.moveX == true && this.x < 23 * 75 /*&& this.checkCollisionMap(level.mazeSquares[this.i +1]==false)*/)
      {

        //this.x +=5;
        this.direction = 2;
        this.collisionLeft = false;
        this.collisionUp = false;
        this.collisionDown = false;
      }
      else if (this.moveY == false && this.y > 10)
      {

         //this.y-=5;
         this.direction = 1;
         this.collisionDown = false;
         this.collisionLeft = false;
         this.collisionRight = false;
      }
      else if (this.moveY == true && this.y < 12 * 75)
      {

       this.direction = 3;
       this.collisionUp = false;
       this.collisionLeft = false;
       this.collisionRight = false;
      }


   }
   else {
     this.moveX = null;
     this.moveY = null;
   }
   if(this.idle == true){
       gameNs.emitters = [new Emitter(new VectorTwo(this.x +40, this.y +75), VectorTwo.fromAngle(0, 0))];
   }


//change sprite based on direction
  var image = this.img;

  if (this.moveX == false)
   {
     gameNs.ctx.drawImage(image, this.index* 80 , 100,80, 100 ,this.x,this.y, this.width,this.height);
   }
   else if (this.moveX == true)
   {
     gameNs.ctx.drawImage(image, this.index* 80 , 200,80, 100 ,this.x,this.y, this.width,this.height);
   }
   else if (this.moveY == true)
   {
     gameNs.ctx.drawImage(image, this.index* 80, 0,80, 100 ,this.x,this.y, this.width,this.height);
   }
   else if (this.moveY == false)
   {
     gameNs.ctx.drawImage(image, this.index* 80 , 300,80, 100 ,this.x,this.y, this.width,this.height);
   }

//idle and facing a direction
   if(this.moveX== null && this.moveY ==null)
   {
     if(this.direction == 1)
     {

       gameNs.ctx.drawImage(image, 80 , 300,80, 100 ,this.x,this.y, this.width,this.height);

     }
     else if(this.direction == 2)
     {

       gameNs.ctx.drawImage(image, 80 , 200,80, 100 ,this.x,this.y, this.width,this.height);
     }
     else if(this.direction == 3)
     {
       gameNs.ctx.drawImage(image, 80, 0,80, 100 ,this.x,this.y, this.width,this.height);
     }
     else
     {
        gameNs.ctx.drawImage(image, 80 , 100,80, 100 ,this.x,this.y, this.width,this.height);
     }

   }


   if(this.ticksPerFrame < this.time)
   {
     this.index = this.index +1;
     if(this.index > 2)
     {
       this.index = 0;
     }
       this.time =0;
   }
   this.xFeet = (this.x + (this.width/2));
   this.yFeet = (this.y -(this.squareSize * 1.5)+ 5);
   this.col = Math.floor(this.xFeet / this.squareSize) + 1 ;
   this.row = Math.floor(this.yFeet / this.squareSize) + 1 ;
   this.i = (this.row * this.maxCols)+this.col;
   this.i = this.i - 1  ;

   this.checkCollisionMap(level);

 }



  checkCollisionMap(level)
  {

    if(this.direction == 2  )
    {
      this.x += 2;
      if(level.mazeSquares[this.i+1].containsWall === true || level.mazeSquares[this.i+1].breakWall === true)
      {
        if(level.mazeSquares[this.i+1].x <= this.x+this.width - 6)
        {
          this.moveX = null;
          this.moveY = null;
          this.collisionRight = true;
          this.pickDirection();
        }
        else
         {
           this.moved=false;
           this.collisionRight = false;
        }
      }

    }
      else if(this.direction == 4 )
      {
        this.x -= 2;
        if(level.mazeSquares[this.i - 1].containsWall === true || level.mazeSquares[this.i - 1].breakWall === true )
        {
          if(this.x <= level.mazeSquares[this.i - 1].x + (this.squareSize - 6)   )
          {
            this.moveX = null;
            this.moveY = null;
            this.collisionLeft = true;
            this.pickDirection();
          }
          else
           {
             this.moved=false;
             this.collisionLeft = false;
          }
        }


    }
    else if(this.direction == 1)
    {
      this.y -= 2;
      if(level.mazeSquares[this.i - this.maxCols].containsWall ===true || level.mazeSquares[this.i - this.maxCols].breakWall ===true)
      {
        if(this.y + (this.height / 2) + 5<= level.mazeSquares[this.i-this.maxCols].y + this.squareSize)
        {
          this.moveX = null;
          this.moveY = null;
          this.collisionUp = true;
          this.pickDirection();
        }
        else
         {
           this.moved=false;
           this.collisionUp = false;
        }
      }


  }
  else if(this.direction == 3)
  {
      this.y += 2;
    if(level.mazeSquares[this.i + this.maxCols].containsWall===true || level.mazeSquares[this.i + this.maxCols].breakWall===true)
    {
      if(this.y + this.height >= level.mazeSquares[this.i+this.maxCols].y)
      {
        this.moveX = null;
        this.moveY = null;
        this.collisionDown = true;
        this.pickDirection();
      }
      else
       {
         this.moved=false;
         this.collisionDown = false;
      }
    }
  }
 }

 pickDirection(){
   var currentDirection = this.direction;
   this.direction = Math.floor((Math.random() * 4) + 1);
   if (currentDirection == this.direction){
     this.pickDirection();
   }
 }

 checkCollision(level, player)
 {
     if((this.x< player.x + player.width)&&
       (this.x+this.width>player.x)&&
       (this.y+this.height>player.y)&&
       (this.y<player.y+player.height) )
       {

         this.pickDirection();

       }
        else
      {
        //console.log("Not Collided")
        //this.timer =0;
      }
  }

}
