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
    this.posX = 0;
    this.posY = 0;
    this.title = title;
    this.img=new Image();
    this.img.src = "img/player.png";
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');

    this.player = new Player(ctx, {
    width: 78 * 0.8,
    height: 108 * 0.8,
    image: this.img
  }, 10, 100, 50);

    this.ready = false;

    this.canvas = document.getElementById('mycanvas');
    this.ctx = canvas.getContext('2d');
    this.ctx.scale(1,1);
    //gameNs.previousTime = Date.now();	// previousTime is initially 0

    this.scoreboard = new ScoreboardManager();
    this.scoreboard.initBoard("Local");

    this.initWorld();


  }
  initWorld() //prints out “Initialising game world”
  {
    this.scoreboard.startTimer();

  }


  update()
  {


    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.save();

    //  if( this.player.y > canvas.height/2 &&this.player.y < (14 * 60) - canvas.height/ 2)
      this.player.breakWall(this.level);
      this.player.moveWall(this.level);
    //  this.otherPlayer.breakWall(this.level);
    //  this.otherPlayer.moveWall(this.level);

    this.level.update();

    if(this.player.direction === 1)
    {
      this.player.update(this.level);
    }
    else {

      this.player.update(this.level);

    }


    if(this.gameover == true)
    {
      var message = {};
      message.type = "EndGame";
      {
        gameNs.ws.send(JSON.stringify(message));
      }
      ctx.translate(0, 0);
      this.gameoverscreen.getScoreTable();
      this.gameoverscreen.render();

    }

    this.time = this.scoreboard.getDisplayTimer();
    console.log(this.time);

    if(this.time == "00:22"){
      this.endScene.render();
     this.scoreboard.addToBoard(40);
     this.scoreboard.filterTime(1);
     console.log(this.scoreboard.getBoard());
     this.scoreboard.generate_table();

   }

    this.ctx.restore();
  }
  /**
   * render function which will overwrite the one inherited by scene
   * it defines a font and its size along with the background colour
   */
  render()
  {

   var canvas = document.createElement("mycanvas");
   var ctx = mycanvas.getContext("2d");
   document.body.style.background = "#ffffff";
   ctx.fillStyle ='white';
  ctx.font = '55px Adventure Regular';
  ctx.strokeStyle = 'black';
  ctx.fillText(this.time,100,100);
  ctx.strokeText(this.time,100,100);






  }


}
