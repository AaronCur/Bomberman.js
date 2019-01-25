class Player
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
  constructor(context, imageOptions, fps, y, x, playerID)
  {
    // States
    this.stateIdle = new State("Idle")
    this.stateLeft = new State("Left")
    this.stateRight = new State("Right")
    this.stateUp = new State("Up")
    this.stateDown = new State("Down")
    this.stateDie = new State("Die")

    // Events
    this.eventLeft = new Event("Move_Left", this.stateIdle, this.stateLeft, true);
    this.eventRight = new Event("Move_Right", this.stateIdle, this.stateRight, true);
    this.eventUp = new Event("Move_Up", this.stateIdle, this.stateUp, true);
    this.eventDown = new Event("Move_Down", this.stateIdle, this.stateDown, true);
    this.eventDie = new Event("Die", this.stateIdle, this.stateDie, true);


    // FSM
    this.fsm = new NStateMEvent("Animations", this.stateIdle);

    this.eventLeft.addTrigger({
      id: "Left",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)
    this.eventRight.addTrigger({
      id: "Right",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)
    this.eventUp.addTrigger({
      id: "Up",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)
    this.eventDown.addTrigger({
      id: "Down",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)
    this.eventDie.addTrigger({
      id: "Die",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)

    this.fsm.addState(this.stateLeft)
    this.fsm.addState(this.stateRight)
    this.fsm.addState(this.stateUp)
    this.fsm.addState(this.stateDown)
    this.fsm.addState(this.stateDie)

    this.fsm.addEvent(this.eventLeft)
    this.fsm.addEvent(this.eventRight)
    this.fsm.addEvent(this.eventUp)
    this.fsm.addEvent(this.eventDown)
    this.fsm.addEvent(this.eventDie)

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
    this.idle = false;

    this.img= imageOptions.image;
    this.fps = fps;
    this.spawnX = x;
    this.spawnY = y;
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

    //power up
    this.speed = 5;
    this.invincible = false;
    this.invincibleCount = 0;


    this.maxRows=13
    this.maxCols=15

    this.moved =false
    gameNs.collides = false;
    //power up
      this.speed = 5;
      this.invincible = false;
      this.invincibleCount = 0;


    this.imgB=new Image();
    this.imgB.src = "img/Bomb.png";
    this.tile = {};
    this.tile.width = 75;
    this.tile.height = 75;

    this.bomb = new Bomb({
      width: 256,
      height: 244,
      image: this.imgB
    }, 10, this.tile)

    this.healthSystem = new HealthSystem(playerID);
    this.scoreSystem = new ScoreSystem(playerID);
    this.respawnTimer = 0;
    this.respawnTimerLimit = 100;

    //particle effects
    gameNs.maxParticles = 200;
    gameNs.particleSize = 1;
    gameNs.objectSize = 10;
    gameNs.life = 0;
    gameNs.maxLife = 200;
    gameNs.loop = true;
    gameNs.alpha = 255;

    gameNs.particles = [];
    gameNs.canvas = document.querySelector('canvas');
    gameNs.ctx = gameNs.canvas.getContext('2d');

    gameNs.canvas.width = window.innerWidth;
    gameNs.canvas.height = window.innerHeight;
    gameNs.emitters = [new Emitter(new VectorTwo(this.x+40, this.y+75), VectorTwo.fromAngle(0, 0))];

    this.id = playerID;

    this.bombGrid;

    update();


  }



  setPosition()
  {
    this.x = 800;
    this.y = 100;
  }
  updateFromNet(x, y, moveX, moveY, direction)
  {
    this.x = x;
    this.y = y;
    this.moveX = moveX;
    this.moveY = moveY;
    this.direction = direction;
  }

  die()
  {
    this.x = this.spawnX;
    this.y = this.spawnY;
    if(this.respawnTimer > this.respawnTimerLimit)
    {
      this.healthSystem.healthVal -= 1;
      this.respawnTimer = 0;
    }
    // Make invinciple for 5 seconds
  }

  checkEnemyBomb(bombP, playerid)
  {
    if(((this.col - 1) >= bombP.x - 1 &&
      (this.col - 1) <= bombP.x + 1 &&
      this.row == bombP.y)||
      ((this.col - 1) == bombP.x &&
      this.row >= bombP.y - 1 &&
      this.row <= bombP.y + 1))
      {
        var collide = true;
        console.log("Enemy bomb");
        if(this.invincible == false){

          if(playerid == 1 && collide == true)
          {
            gameNs.playScene.otherPlayer.scoreSystem.scoreVal += 200;
            collide = false;
          }
          else {
            gameNs.playScene.player.scoreSystem.scoreVal += 200;
            collide = false;
          }
          this.die();
        }
      }
  }

  checkBomb(level)
  {
    var explosionSrc = this.bomb.onExplode(level.mazeSquares, this.bombVal);

    if(((this.col - 1) >= explosionSrc.x - 1 &&
      (this.col - 1) <= explosionSrc.x + 1 &&
      this.row == explosionSrc.y)||
      ((this.col - 1) == explosionSrc.x &&
      this.row >= explosionSrc.y - 1 &&
      this.row <= explosionSrc.y + 1))
      {
        console.log("Own bomb")
        if(this.invincible == false){
          this.die();
        }
      }


  }
  checkCollisionAi(level, ai)
  {
      if((this.x< ai.x + ai.width/4)&&
        (this.x+this.width>ai.x)&&
        (this.y+this.height>ai.y)&&
        (this.y<ai.y + ai.height/4) )
        {
          console.log("collides");
          if(this.invincible == false){
            this.die();
          }
        }
         else
       {
         //do not nothing
       }
   }

 update(level)
 {
   drawParticles();
   this.bomb.draw();

   if(this.invincible == true){
     this.invincibleCount++;
     //console.log("invincible");
   }
   else{
     //console.log("not invincible");
   }
   if(this.invincibleCount > 300){
     this.invincible = false;
   }
   //console.log("X: " + (this.col - 1))
   //console.log("Y: " + this.row)
   //console.log(this.bomb.onExplode());

   this.checkBomb(level)

   if(gameNs.playScene.gameover == false)
   {
     this.fsm.updateAvailableEvents(false);
     this.respawnTimer++;
     this.bomb.update();

     if(this.moveX == false && this.x> 0)
      {
        gameNs.emitters = [new Emitter(new VectorTwo(this.x +40, this.y +75), VectorTwo.fromAngle(0.5, 2))];

        if(this.direction === 0)
        {
          this.fsm.changeState(this.eventLeft);
        }

        if(this.checkCollisionMapLeft(level) == false)
        {
          this.x -= this.speed;
        }

        this.direction = 4;
        this.collisionRight = false;
        this.collisionUp = false;
        this.collisionDown = false;

      }
      else if (this.moveX == true && this.x < 23 * 75 )
      {
        gameNs.emitters = [new Emitter(new VectorTwo(this.x +40, this.y +75), VectorTwo.fromAngle(3.5, 2))];

        if(this.direction === 0)
        {
          this.fsm.changeState(this.eventRight);
        }
        if(this.checkCollisionMapRight(level) == false)
        {
            this.x +=this.speed;
        }
        this.direction = 2;
        this.collisionLeft = false;
        this.collisionUp = false;
        this.collisionDown = false;
      }
      else if (this.moveY == false && this.y > 10)
      {
        gameNs.emitters = [new Emitter(new VectorTwo(this.x + 40, this.y +75), VectorTwo.fromAngle(2, 2))];


         if(this.direction === 0)
         {
           this.fsm.changeState(this.eventUp);
         }

         if(this.checkCollisionMapUp(level) == false)
         {
           this.y-=this.speed;
         }

         this.direction = 1;
         this.collisionDown = false;
         this.collisionLeft = false;
         this.collisionRight = false;
      }
      else if (this.moveY == true && this.y < 12 * 75 )
      {
        gameNs.emitters = [new Emitter(new VectorTwo(this.x +40, this.y +75), VectorTwo.fromAngle(5, 2))];

        if(this.direction === 0)
        {
          this.fsm.changeState(this.eventDown);
        }

        if(this.checkCollisionMapDown(level) == false)
        {
          this.y+=this.speed;
        }

        this.direction = 3;
        this.collisionUp = false;
        this.collisionLeft = false;
        this.collisionRight = false;
      }
      else {

        if(this.direction === 0)
        {
          if(this.fsm.currentState === this.stateLeft)
          {
            this.fsm.changeState(this.eventLeft);
          }
          else if (this.fsm.currentState === this.stateRight)
          {
            this.fsm.changeState(this.eventRight)
          }
          else if (this.fsm.currentState === this.stateUp)
          {
            this.fsm.changeState(this.eventUp)
          }
          else if (this.fsm.currentState === this.stateDown)
          {
            this.fsm.changeState(this.eventDown)
          }
        }
      }
   }
   else {
     this.moveX = null;
     this.moveY = null;
     this.direction = 0;
   }

   if(this.idle == true){
       gameNs.emitters = [new Emitter(new VectorTwo(this.x +40, this.y +75), VectorTwo.fromAngle(0, 0))];
   }

   if(this.id === 1)
   {
     if (gameNs.playScene.player.moveY == null && gameNs.playScene.player.moveX == null){
       gameNs.playScene.player.idle= true;
       this.direction = 0;
     }
     else{
       gameNs.playScene.player.idle= false;
     }
   }
   else if(this.id === 2)
   {
     if (gameNs.playScene.otherPlayer.moveY == null && gameNs.playScene.otherPlayer.moveX == null){
       gameNs.playScene.otherPlayer.idle= true;
       this.direction = 0;
     }
     else{
       gameNs.playScene.otherPlayer.idle= false;
     }
   }

   var image = this.img;

  if (this.moveX == false)
   {
     gameNs.ctx.drawImage(image, this.index* 80 , 100, 80, 100 ,this.x,this.y, this.width,this.height);
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

   if(this.moveX== null && this.moveY ==null)
   {
     if(this.direction == 1)
     {

       gameNs.ctx.drawImage(image, 80 , 300,80, 100 ,this.x,this.y, this.width,this.height);

     }
     else if(this.direction == 2)
     {

       gameNs.ctx.drawImage(image, 80 , 300,80, 100 ,this.x,this.y, this.width,this.height);
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

   if(this.play===true)
   {
     gameNs.soundManager.playSound("backGround", true, gameNs.volume)
     this.play=false
   }
   this.collectPowerUp(level);
   this.collectEndTile(level);

   this.healthSystem.update();
   this.scoreSystem.update();


}

  plantBomb(level)
  {
    this.bomb.place({x:this.col - 1, y:this.row})
    level.mazeSquares[this.i].containsBomb = true;
    this.bombVal = this.i;

  }

  checkCollisionMapLeft(level)
  {

      if(this.direction == 4 )
      {
        if(level.mazeSquares[this.i - 1].containsWall === true || level.mazeSquares[this.i - 1].breakWall === true ||
           level.mazeSquares[this.i - 1].containsBomb === true)
        {
          if(this.x <= level.mazeSquares[this.i - 1].x + (this.squareSize - 6)   )
          {
            this.moveX = null;
            this.moveY = null;
            this.collisionLeft = true;
            this.x+=5.1;
            console.log("Left collision")
            if(this.moved==false)
            {
              this.moved=true;
            }
          }
          else
           {
             this.moved=false;
             this.collisionLeft = false;
          }
        }

    }

    if(this.collisionLeft == true){
      return true;
    }
    else {
      return false;
    }

}
checkCollisionMapRight(level)
{

  if(this.direction == 2  )
  {
    if(level.mazeSquares[this.i+1].containsWall === true || level.mazeSquares[this.i+1].breakWall === true ||
        level.mazeSquares[this.i+1].containsBomb === true)
    {
      if(level.mazeSquares[this.i+1].x <= this.x+this.width - 6)
      {
        this.moveX = null;
        this.moveY = null;
        this.collisionRight = true;
        console.log("Right Collision")
        this.x-=5.1;
        if(this.moved==false)
        {

          this.moved=true;
        }
      }
      else
       {
         this.moved=false;
         this.collisionRight = false;
      }
    }
  }

  if(this.collisionRight == true)
  {
    return true;
  }
  else {
    return false;
  }
}
checkCollisionMapUp(level)
{

  if(this.direction == 1)
  {
    if(level.mazeSquares[this.i - this.maxCols].containsWall ===true || level.mazeSquares[this.i - this.maxCols].breakWall ===true ||
      level.mazeSquares[this.i - this.maxCols].containsBomb === true)
    {
      if(this.y + (this.height / 2) + 5<= level.mazeSquares[this.i-this.maxCols].y + this.squareSize)
      {
        this.moveX = null;
        this.moveY = null;
        this.collisionUp = true;
        console.log("Up collision")
        this.y+=5.1;
        if(this.moved==false)
        {
          this.moved=true;
        }
        if(this.moved==false)
        {
          this.moved=true;
        }
      }
      else
       {
         this.moved=false;
         this.collisionUp = false;
      }
    }

  }

  if(this.collisionUp == true)
  {
    return true;
  }
  else {
    return false;
  }

}
checkCollisionMapDown(level)
{

    if(this.direction == 3)
    {
      if(level.mazeSquares[this.i + this.maxCols].containsWall===true || level.mazeSquares[this.i + this.maxCols].breakWall===true ||
          level.mazeSquares[this.i + this.maxCols].containsBomb === true)
      {
        if(this.y + this.height >= level.mazeSquares[this.i+this.maxCols].y)
        {
          this.moveX = null;
          this.moveY = null;
          this.collisionDown = true;
          console.log("Down collision")
          this.y-=5.1;
          if(this.moved==false)
          {
                      this.moved=true;
          }
        }
        else
         {
           this.moved=false;
           this.collisionDown = false;
        }
      }

    }

    if(this.collisionDown == true)
    {
      return true;
    }
    else {
      return false;
    }
}
  collectPowerUp(level)
  {
    if(level.mazeSquares[this.i].speedUp == true || level.mazeSquares[this.i].armour == true
    || level.mazeSquares[this.i].fire == true || level.mazeSquares[this.i].bomb == true
  || level.mazeSquares[this.i].oneup == true)
      {
        if(level.mazeSquares[this.i].speedUp == true){
          //output speed collected
          console.log("speed");
          this.powerSpeedUp();
          //console.log(this.speed);

        }
        if(level.mazeSquares[this.i].armour == true){
          //output speed collected
          console.log("armour");
          this.invincible = true;
          this.invincibleCount = 0;
        }
        if(level.mazeSquares[this.i].fire == true){
          //output speed collected
          console.log("fire");
        }
        if(level.mazeSquares[this.i].bomb == true){
          //output speed collected
          console.log("bomb");
        }
        if(level.mazeSquares[this.i].oneup == true){
          //output speed collected
          console.log("oneup");
        }

          level.mazeSquares[this.i].containsWall = false;
          level.mazeSquares[this.i].speedUp = false;
          level.mazeSquares[this.i].armour = false;
          level.mazeSquares[this.i].fire = false;
          level.mazeSquares[this.i].bomb = false;
          level.mazeSquares[this.i].oneup = false;

        }
    }


  collectEndTile(level)
  {
    if(level.mazeSquares[this.i].endtile == true )
      {
        //output speed collected
        console.log("game Over");
        level.mazeSquares[this.i].endtile = false;
    }
  }

  powerSpeedUp(){
    if(this.speed < 10){
      this.speed += 1;
    }
  }
}
