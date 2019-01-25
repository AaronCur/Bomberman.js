class PlayScene
{
  /**
   * Constructor function , creates a scene with parameters which are passed in on construction
   * @param {String} title - passes in a string whihc is set in the main
   */
  constructor(title)
  {
    this.endScene = new EndScene();
    this.gameover = false;
    this.level = new LevelLoader();
    this.title = title;
    this.img=new Image();
    this.img.src = "img/playerSheet.png";
    this.imgAi=new Image();
    this.imgAi.src = "img/ai/ai.png";
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');

    this.player = new Player(ctx, {
    width: 80 * 0.8,
    height: 100 * 0.8,
    image: this.img
  }, 10, 100, 50, 1);

    this.otherPlayer = new Player(ctx, {
    width: 80 * 0.8,
    height: 100 * 0.8,
    image: this.img
  }, 10, 700, 790, 2);

    this.ai = new Ai(ctx, {
    width: 78 * 0.8,
    height: 108 * 0.8,
    image: this.imgAi
  }, 10, 245, 425);

    this.ai1 = new Ai(ctx, {
    width: 78 * 0.8,
    height: 108 * 0.8,
    image: this.imgAi
  }, 10, 365, 180);

    this.ai2 = new Ai(ctx, {
    width: 78 * 0.8,
    height: 108 * 0.8,
    image: this.imgAi
  }, 10, 605, 660);


    this.scoreboard = new ScoreboardManager();
    this.scoreboard.initBoard("Local");

   ctx.translate((window.innerWidth / 2)- (7.5*(75 * 0.8)), 0);

  }
  initWorld() //prints out “Initialising game world”
  {
    this.scoreboard.startTimer();
    gameNs.audioManager.playAudio("bg", true, gameNs.volume);
  }


  update()
  {
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.save();

    if(this.player.healthSystem.healthVal !=0 || this.otherPlayer.healthSystem.healthVal !=0)
    {

    //invincible indicater
    if(this.player.invincible == true){
      gameNs.ctx.font = "30px Arial";
      gameNs.ctx.fillText("Invincible", 250, 65);
    }
    else{
      gameNs.ctx.fillText("", 0, 100);
    }

    if(this.otherPlayer.invincible == true){
      gameNs.ctx.font = "30px Arial";
      gameNs.ctx.fillText("Invincible", 550, 65);
    }
    else{
      gameNs.ctx.fillText("", 0, 100);
    }

          this.level.update();

          this.player.update(this.level);
          this.otherPlayer.update(this.level);
          //ai - player collision
          if(this.ai.alive == true){
            this.ai.update(this.level);
          }
          if(this.ai1.alive == true){
            this.ai1.update(this.level);
          }
          if(this.ai2.alive == true){
            this.ai2.update(this.level);
          }
          //ai - ai collision
          this.ai.checkCollision(this.level, this.ai1);
          this.ai.checkCollision(this.level, this.ai2);
          //ai1 - ai colllision
          this.ai1.checkCollision(this.level, this.ai);
          this.ai1.checkCollision(this.level, this.ai2);
          //ai2 - ai colllision
          this.ai2.checkCollision(this.level, this.ai);
          this.ai2.checkCollision(this.level, this.ai1);

          //check player - ai
          if(this.ai.alive == true){
            this.player.checkCollisionAi(this.level, this.ai);
            this.otherPlayer.checkCollisionAi(this.level, this.ai);
          }
          if(this.ai1.alive == true){
            this.player.checkCollisionAi(this.level, this.ai1);
            this.otherPlayer.checkCollisionAi(this.level, this.ai1);
          }
          if(this.ai2.alive == true){
            this.player.checkCollisionAi(this.level, this.ai2);
            this.otherPlayer.checkCollisionAi(this.level, this.ai2);
          }

          this.player.checkEnemyBomb(this.otherPlayer.bomb.onExplode(), 1);
          this.otherPlayer.checkEnemyBomb(this.player.bomb.onExplode(), 2);

          //Check if ai is bombed
          this.ai.checkEnemyBomb(this.otherPlayer.bomb.onExplode(), 2);

          this.ai.checkEnemyBomb(this.player.bomb.onExplode(), 1);

          this.ai1.checkEnemyBomb(this.otherPlayer.bomb.onExplode(), 2);

          this.ai1.checkEnemyBomb(this.player.bomb.onExplode(), 1);

          this.ai2.checkEnemyBomb(this.otherPlayer.bomb.onExplode(), 2);

          this.ai2.checkEnemyBomb(this.player.bomb.onExplode(), 1);

          this.time = this.scoreboard.getDisplayTimer();


    }

    //console.log(this.time);
    if(this.otherPlayer.healthSystem.healthVal == 0 || this.player.healthSystem.healthVal == 0 || this.player.endtileCollected == true)
    {

     this.level.NextLevel()
     this.player.x = this.player.spawnX
     this.player.y = this.player.spawnY
     this.otherPlayer.x = this.otherPlayer.spawnX
     this.otherPlayer.y = this.otherPlayer.spawnY
     this.ai.alive = true
     this.ai1.alive = true
     this.ai1.alive = true
     this.player.healthSystem.healthVal = 3
     this.otherPlayer.healthSystem.healthVal = 3
     this.player.endtileCollected = false;
     this.player.invincible = false;
     this.otherPlayer.invincible = false;

   }
   console.log(this.player.endtileCollected);
    if(this.otherPlayer.healthSystem.healthVal == 0|| this.player.endtileCollected == true
      && gameNs.map3 === true){
      this.player.endtileCollected = false;
      this.endScene.render();
      this.scoreboard.addToBoard(this.player.scoreSystem.scoreVal);
      this.scoreboard.filterTime(1);
      console.log(this.scoreboard.getBoard());
      this.scoreboard.generate_table();
   }
   else if (this.otherPlayer.endtileCollected == true || this.player.healthSystem.healthVal == 0  && gameNs.map3 === true){

      this.endScene.render();
      this.scoreboard.addToBoard(this.otherPlayer.scoreSystem.scoreVal);
      this.scoreboard.filterSPM(-1);
      console.log(this.scoreboard.getBoard());
      this.scoreboard.generate_table();

   }


  }
  /**
   * render function which will overwrite the one inherited by scene
   * it defines a font and its size along with the background colour
   */
  render()
  {

   var canvas = document.createElement("mycanvas");
   var ctx = mycanvas.getContext("2d");
   document.body.style.background = "#000000";

    ctx.fillStyle ='white';
    ctx.font = '55px Adventure Regular';
    ctx.strokeStyle = 'black';
    ctx.fillText(this.time,390,60);
    ctx.strokeText(this.time,390,60);

  }
}
