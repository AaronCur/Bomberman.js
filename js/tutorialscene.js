var gameNs = {}
class TutorialScene
{
  /**
   * Constructor function , creates a scene with parameters which are passed in on construction
   * @param {String} title - passes in a string whihc is set in the main
   */
   constructor(title)
   {
     this.level = new LevelLoader();
     gameNs.tipsText = new levelTips()
     document.addEventListener("keydown", this.keyHandler, true)
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

     this.initWorld();


   }
   initWorld() //prints out “Initialising game world”
   {
     console.log("Initialising game world");


   }


   update()
   {
     var canvas = document.getElementById('mycanvas');
     var ctx = canvas.getContext('2d');
     ctx.clearRect(0,0, canvas.width, canvas.height);
     ctx.save();
     //  if( this.player.y > canvas.height/2 &&this.player.y < (14 * 60) - canvas.height/ 2)
       this.player.breakWall(this.level);
     //  this.otherPlayer.breakWall(this.level);
     //  this.otherPlayer.moveWall(this.level);

     this.level.update();
     gameNs.tipsText.update()
     if(this.player.direction === 1)
     {
       this.player.update(this.level);
     }
     else {

       this.player.update(this.level);
     }

     this.ctx.restore();
   }

   keyHandler(e)
   {
     if(gameNs.sceneManager.currentScene.title === gameNs.tutorialScene.title)
     {
       if(e.keyCode === 39 && gameNs.display === true)//w key
       {
         if(gameNs.wall === true)
         {
           gameNs.wall = false
           gameNs.breakwall = true;
         }
         else if(gameNs.breakwall === true)
         {
           gameNs.breakwall = false
           gameNs.goalwall = true
         }
         else if (gameNs.goalwall === true)
         {
           gameNs.goalwall = false
           gameNs.display = false
         }

         gameNs.tipsText.Leveltipdisplay()
       }
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
    gameNs.tipsText.render()
   }

}
