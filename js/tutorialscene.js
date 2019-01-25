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
     this.img.src = "img/playerSheet.png";
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

    ctx.translate((window.innerWidth / 2)- (7.5*(75 * 0.8)), 0);


   }
   initWorld() //prints out “Initialising game world”
   {
     console.log("Initialising game world");
   }

   createDiv(divID)
   {
     var div = document.createElement("div");
     div.id = divID;
     if(div.id === "return")
     {
       console.log("return button created");
       div.innerHTML = "<img src=\'img/back.png\'>";
       this.div = div;

       div.style.visibility = "visible";
       div.style.position = "absolute";
       div.style.left = (this.width/ 2) - 450 +"px";
       div.style.top = (this.height/8) - 100 +'px';
     }
     div.addEventListener("click", this.onTouchStart,{passive:false});
     document.body.appendChild(div);
   }

   onTouchStart(e)
 {
   e.preventDefault();
   var currentElement = e.target;
   var parentDiv = currentElement.parentNode;
   console.log("Div id = " + parentDiv.id);
   console.log("Image URL = " + currentElement.src);

   var parentDiv = currentElement.parentNode;
   var fullPath = currentElement.src;
   console.log("Current element" + fullPath);

   if (fullPath !== undefined)
   {
     console.log(gameNs.count);
     var index = fullPath.lastIndexOf("/");
     console.log("Path: " + index);
     var filename = fullPath;
     if(index !== -1)
     {
       gameNs.count += 1;
       var canvas = document.getElementById('mycanvas');
       var ctx = canvas.getContext('2d');
        filename = fullPath.substring(index+1,fullPath.length);
        console.log(filename);
        if(filename === "back.png")
        {
          gameNs.sceneManager.goToScene(gameNs.menuScene.title);
          ctx.translate((window.innerWidth / 10)- (7.5*(106.75 * 0.9)), 0);
          var el = document.getElementById('return')
          el.parentNode.removeChild(el)
          gameNs.menuScene.createDiv("Play");
          gameNs.menuScene.createDiv("Options");
          gameNs.menuScene.createDiv("Tutorial");
          gameNs.ctx.clearRect(0,0,mycanvas.width,mycanvas.height)
        }
     }
   }
 }

   update()
   {
     var canvas = document.getElementById('mycanvas');
     var ctx = canvas.getContext('2d');
     ctx.clearRect(0,0, canvas.width, canvas.height);
     ctx.save();
     //  if( this.player.y > canvas.height/2 &&this.player.y < (14 * 60) - canvas.height/ 2)
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
         if(gameNs.tipsText.wall === true)
         {
          gameNs.tipsText.wall = false
           gameNs.tipsText.breakwall = true;
         }
         else if(gameNs.tipsText.breakwall === true)
         {
           gameNs.tipsText.breakwall = false
           gameNs.tipsText.goalwall = true
         }
         else if (gameNs.tipsText.goalwall === true)
         {
           gameNs.tipsText.goalwall = false
           gameNs.display = false
         }
       }
       if(e.keyCode === 32)
       {
         gameNs.tipsText.spacePressed = true
       }
       gameNs.tipsText.Leveltipdisplay()
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
