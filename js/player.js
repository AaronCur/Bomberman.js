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

    // From left to ...
    this.eventLeftRight = new Event("Left_Right", this.stateLeft, this.stateRight, true);
    this.eventLeftUp = new Event("Left_Up", this.stateLeft, this.stateUp, true);
    this.eventLeftDown = new Event("Left_Down", this.stateLeft, this.stateDown, true);
    this.eventLeftDie = new Event("Left_Die", this.stateLeft, this.stateDie, true);

    // From right to ...
    this.eventRightUp = new Event("Right_Up", this.stateRight, this.stateUp, true);
    this.eventRightDown = new Event("Right_Down", this.stateRight, this.stateDown, true);
    this.eventRightDie = new Event("Right_Die", this.stateRight, this.stateDie, true);

    // From up to ...
    this.eventUpDown = new Event("Up_Down", this.stateUp, this.stateDown, true);
    this.eventUpDie = new Event("Up_Die", this.stateUp, this.stateDie, true);

    // From down to die
    this.eventDownDie = new Event("Down_Die", this.stateDown, this.stateDie, true);


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


    // Left to ...
    this.eventLeftRight.addTrigger({
      id: "LeftToRight",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)
    this.eventLeftUp.addTrigger({
      id: "LeftToUp",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)
    this.eventLeftDown.addTrigger({
      id: "LeftToDown",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)
    this.eventLeftDie.addTrigger({
      id: "LeftToDie",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)

    // Right to ...
    this.eventRightUp.addTrigger({
      id: "RightToUp",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)
    this.eventRightDown.addTrigger({
      id: "RightToDown",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)
    this.eventRightDie.addTrigger({
      id: "RightToDie",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)

    // Up to ...
    this.eventUpDown.addTrigger({
      id: "UpToDown",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)
    this.eventUpDie.addTrigger({
      id: "UpToDie",
      width: 0,
      height: 0,
      image: new Image()
    }, this.fsm)

    // Down to die
    this.eventDownDie.addTrigger({
      id: "DownToDie",
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

    this.fsm.addEvent(this.eventLeftRight)
    this.fsm.addEvent(this.eventLeftUp)
    this.fsm.addEvent(this.eventLeftDown)
    this.fsm.addEvent(this.eventLeftDie)

    this.fsm.addEvent(this.eventRightUp)
    this.fsm.addEvent(this.eventRightDown)
    this.fsm.addEvent(this.eventRightDie)

    this.fsm.addEvent(this.eventUpDown)
    this.fsm.addEvent(this.eventUpDie)

    this.fsm.addEvent(this.eventDownDie)

    // Animation timers
    this.animeTimer = 0;
    this.animeTimerLimit = 5;
    this.animeCounter = 0;

    // Death animation
    this.dieAnimeTimer = 0;
    this.dieAnimeTimerLimit = 3;
    this.dieAnimeCounter = 0;

    this.dieImg = new Image();
    this.dieImg.src = "img/DyingSheet.png";

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



    this.maxRows=13
    this.maxCols=15

    this.moved =false
    gameNs.collides = false;

    //power up
    this.speed = 5;
    this.invincible = false;
    this.invincibleCount = 0;
    this.endtileCollected = false;
    this.imgInvincible=new Image();
    this.imgInvincible.src = "img/power/armour.png";



    this.imgB=new Image();
    this.imgB.src = "img/BombSheet.png";
    this.tile = {};
    this.tile.width = 75;
    this.tile.height = 75;

    var bomb = new Bomb({
      width: 300,
      height: 75,
      image: this.imgB
    }, 10, this.tile)

    this.bombs = []

    this.bombs.push(bomb)

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

    this.fsm.changeState(this.eventDie);
    // Make invinciple for 5 seconds
  }

  checkEnemyBomb(bombP, id, i)
  {
    if(this.invincible == false){

      if(this.id === 2)
      {
        var boost = gameNs.playScene.player.bombs[i].firePowerUp
        var walls =  gameNs.playScene.player.bombs[i].surroundingWalls
      }
      else
      {
        var boost = gameNs.playScene.otherPlayer.bombs[i].firePowerUp
        var walls =  gameNs.playScene.otherPlayer.bombs[i].surroundingWalls
      }

      if(boost)
      {
        var explosionSize = 2;
      }
      else {
        var explosionSize = 1;
      }

      if(((this.col - 1) >= bombP.x - explosionSize &&
        (this.col - 1) <= bombP.x + explosionSize &&
        this.row == bombP.y)||
        ((this.col - 1) == bombP.x &&
        this.row >= bombP.y - explosionSize &&
        this.row <= bombP.y + explosionSize))
        {
          if(this.id === 2)
          {
            if(this.fsm.currentState != this.stateDie)
            {
              gameNs.playScene.player.scoreSystem.scoreVal += 200;
            }
          }
          else
          {
            if(this.fsm.currentState != this.stateDie)
            {
              gameNs.playScene.otherPlayer.scoreSystem.scoreVal += 200;
            }
          }
          if((this.col - 1) > bombP.x )
          {
            // Right
            var diff  = (this.col - 1) - bombP.x;
            if(diff === 1 || !walls["Right1"])
            {
              this.dieAnime();
            }
          }
          else if((this.col - 1) < bombP.x)
          {
            // Left
            var diff  = bombP.x - (this.col - 1);
            if(diff === 1 || !walls["Left1"])
            {
              this.dieAnime();
            }
          }
          else if(this.row > bombP.y)
          {
            // Down
            var diff  = this.row - bombP.y;
            if(diff === 1 || !walls["Down1"])
            {
              this.dieAnime();
            }
          }
          else if(this.row < bombP.y)
          {
            // Up
            var diff  = bombP.y - this.row;
            if(diff === 1 || !walls["Up1"])
            {
              this.dieAnime();
            }
          }
          this.invincibleCount =0;
          this.invincible = true;
        }
      }
  }

  checkBomb(level)
  {
    for (var i = 0; i < this.bombs.length; i++) {

      if(this.bombs[i].firePowerUp)
      {
        var explosionSize = 2;
      }
      else {
        var explosionSize = 1;
      }

      var explosionSrc = this.bombs[i].onExplode(level.mazeSquares, this.bombVal);

      if(((this.col - 1) >= explosionSrc.x - explosionSize &&
        (this.col - 1) <= explosionSrc.x + explosionSize &&
        this.row == explosionSrc.y)||
        ((this.col - 1) == explosionSrc.x &&
        this.row >= explosionSrc.y - explosionSize &&
        this.row <= explosionSrc.y + explosionSize))
        {
          if(this.invincible == false){
            if((this.col - 1) > explosionSrc.x )
            {
              // Right
              var diff  = (this.col - 1) - explosionSrc.x;
              if(diff === 1 || !this.bombs[i].surroundingWalls["Right1"])
              {
                this.dieAnime();
              }
            }
            else if((this.col - 1) < explosionSrc.x)
            {
              // Left
              var diff  = explosionSrc.x - (this.col - 1);
              if(diff === 1 || !this.bombs[i].surroundingWalls["Left1"])
              {
                this.dieAnime();
              }
            }
            else if(this.row > explosionSrc.y)
            {
              // Down
              var diff  = this.row - explosionSrc.y;
              if(diff === 1 || !this.bombs[i].surroundingWalls["Down1"])
              {
                this.dieAnime();
              }
            }
            else if(this.row < explosionSrc.y)
            {
              // Up
              var diff  = explosionSrc.y - this.row;
              if(diff === 1 || !this.bombs[i].surroundingWalls["Up1"])
              {
                this.dieAnime();
              }
            }
          }
          this.invincibleCount =0;
          this.invincible = true;
        }
      }
  }

  dieAnime()
  {
    if(this.fsm.currentState === this.stateIdle)
    {
      this.fsm.changeState(this.eventDie);
      gameNs.audioManager.playAudio("die", false, gameNs.volume);
    }
  }

  checkCollisionAi(level, ai)
  {
      if(level.mazeSquares[this.i] == level.mazeSquares[ai.i])
        {
          if(this.invincible == false){
            this.dieAnime();
          }
          this.invincibleCount =0;
          this.invincible = true;
        }
   }

 update(level)
 {
   drawParticles();
   for (var i = 0; i < this.bombs.length; i++) {
     this.bombs[i].draw()
   }

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
     for (var i = 0; i < this.bombs.length; i++) {
       this.bombs[i].update();
     }

     if(this.moveX == false && this.x> 0)
      {
        gameNs.emitters = [new Emitter(new VectorTwo(this.x +40, this.y +75), VectorTwo.fromAngle(0.5, 2))];

        if(this.fsm.currentState === this.stateIdle)
        {
          this.fsm.changeState(this.eventLeft);
        }
        else if(this.fsm.currentState === this.stateRight)
        {
            this.fsm.changeState(this.eventLeftRight);
        }
        else if(this.fsm.currentState === this.stateUp)
        {
            this.fsm.changeState(this.eventLeftUp);
        }
        else if(this.fsm.currentState === this.stateDown)
        {
            this.fsm.changeState(this.eventLeftDown);
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

        if(this.fsm.currentState === this.stateIdle)
        {
          this.fsm.changeState(this.eventRight);
        }
        else if(this.fsm.currentState === this.stateLeft)
        {
            this.fsm.changeState(this.eventLeftRight);
        }
        else if(this.fsm.currentState === this.stateUp)
        {
            this.fsm.changeState(this.eventRightUp);
        }
        else if(this.fsm.currentState === this.stateDown)
        {
            this.fsm.changeState(this.eventRightDown);
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


         if(this.fsm.currentState === this.stateIdle)
         {
           this.fsm.changeState(this.eventUp);
         }
         else if(this.fsm.currentState === this.stateLeft)
         {
             this.fsm.changeState(this.eventLeftUp);
         }
         else if(this.fsm.currentState === this.stateRight)
         {
             this.fsm.changeState(this.eventRightUp);
         }
         else if(this.fsm.currentState === this.stateDown)
         {
             this.fsm.changeState(this.eventUpDown);
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

        if(this.fsm.currentState === this.stateIdle)
        {
          this.fsm.changeState(this.eventDown);
        }
        else if(this.fsm.currentState === this.stateLeft)
        {
            this.fsm.changeState(this.eventLeftDown);
        }
        else if(this.fsm.currentState === this.stateRight)
        {
            this.fsm.changeState(this.eventRightDown);
        }
        else if(this.fsm.currentState === this.stateUp)
        {
            this.fsm.changeState(this.eventUpDown);
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


   if(this.animeTimer > this.animeTimerLimit)
   {
     this.animeCounter++;
     if(this.animeCounter === 3)
     {
       this.animeCounter = 0;
     }
     this.animeTimer = 0;
   }
   else
   {
     this.animeTimer++;
   }

   if(this.fsm.currentState === this.stateDie)
   {
     if(this.dieAnimeTimer > this.dieAnimeTimerLimit)
     {
       this.dieAnimeCounter++;
       if(this.dieAnimeCounter === 7)
       {
         this.dieAnimeCounter = 0;
         if(this.fsm.currentState === this.stateIdle)
         {
           this.fsm.changeState(this.eventDie)
         }
         else if(this.fsm.currentState === this.stateLeft)
         {
           this.fsm.changeState(this.eventLeftDie)
         }
         else if(this.fsm.currentState === this.stateRight)
         {
           this.fsm.changeState(this.eventRightDie)
         }
         else if(this.fsm.currentState === this.stateUp)
         {
           this.fsm.changeState(this.eventUpDie)
         }
         else if(this.fsm.currentState === this.stateDown)
         {
           this.fsm.changeState(this.eventDownDie)
         }


         this.die();
       }
       this.dieAnimeTimer = 0;
     }
     else
     {
       this.dieAnimeTimer++;
     }
   }
   if(this.stateUp === this.fsm.currentState)
   {
     gameNs.ctx.drawImage(image, 80 * this.animeCounter, 300,80, 100 ,this.x,this.y, this.width,this.height);
   }
   else if(this.stateRight === this.fsm.currentState)
   {
     gameNs.ctx.drawImage(image, 80 * this.animeCounter , 200,80, 100 ,this.x,this.y, this.width,this.height);
   }
   else if(this.stateDown === this.fsm.currentState)
   {
     gameNs.ctx.drawImage(image, 80 * this.animeCounter, 0,80, 100 ,this.x,this.y, this.width,this.height);
   }
   else if(this.stateLeft === this.fsm.currentState)
   {
     gameNs.ctx.drawImage(image, 80 * this.animeCounter, 100,80, 100 ,this.x,this.y, this.width,this.height);
   }
   else if(this.stateIdle === this.fsm.currentState)
   {
      gameNs.ctx.drawImage(image, 80 , 0,80, 100 ,this.x,this.y, this.width,this.height);
   }
   else if(this.stateDie === this.fsm.currentState)
   {
      gameNs.ctx.drawImage(this.dieImg, 80 * this.dieAnimeCounter , 0,80, 100 ,this.x,this.y, this.width,this.height);
   }

   if(this.moveX== null && this.moveY ==null)
   {

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
    // Place one
    for (var i = 0; i < this.bombs.length; i++) {
      if(!this.bombs[i].alive && !this.bombs[i].exploding)
      {
        this.bombs[i].place({x:this.col - 1, y:this.row})
        break;
      }
    }
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

        gameNs.audioManager.playAudio("drop", false, gameNs.volume);
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
          for (var i = 0; i < this.bombs.length; i++) {
            this.bombs[i].fireBoost(true)
          }
        }
        if(level.mazeSquares[this.i].bomb == true){
          //output speed collected
          console.log("bomb");
          var bomb = new Bomb({
              width: 300,
              height: 75,
              image: this.imgB
            }, 10, this.tile)

            this.bombs.push(bomb)
            console.log(this.bombs.length)
        }
        if(level.mazeSquares[this.i].oneup == true){
          //output speed collected
          console.log("oneup");
          this.healthSystem.healthIncrease()
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
        this.endtileCollected = true;
        gameNs.audioManager.playAudio("goal", false, gameNs.volume);

    }
  }

  powerSpeedUp(){
    if(this.speed < 10){
      this.speed += 1;
    }
  }
}
