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
    this.img.src = "img/player.png";
    var canvas = document.getElementById('mycanvas');
    var ctx = canvas.getContext('2d');

    this.player = new Player(ctx, {
    width: 78 * 0.8,
    height: 108 * 0.8,
    image: this.img
  }, 10, 100, 50);


    this.scoreboard = new ScoreboardManager();
    this.scoreboard.initBoard("Local");



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

    this.level.update();
    if(this.player.direction === 1)
    {
      this.player.update(this.level);
    }
    else {

      this.player.update(this.level);

    }


    this.time = this.scoreboard.getDisplayTimer();
    //console.log(this.time);

    if(this.time == "20:22"){
      this.endScene.render();
     this.scoreboard.addToBoard(40);
     this.scoreboard.filterTime(1);
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
   document.body.style.background = "#ffffff";

   ctx.fillStyle ='white';
  ctx.font = '55px Adventure Regular';
  ctx.strokeStyle = 'black';
  ctx.fillText(this.time,100,100);
  ctx.strokeText(this.time,100,100);

  }
}
