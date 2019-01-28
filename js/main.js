/**
 * @fileoverview
 * @author Aaron Curry
 */
//

var gameNs = {};

function main()
{
  initCanvas();
  var game = new Game();
  gameNs.game = game;
   gameNs.touchStart = false;
  game.initWorld();
  game.update();
  console.log(gameNs.onTouchStart)
  game.draw();

  //document.addEventListener("click", clickHandler.bind(null, sceneManager));

}
function keyDownHandler(e)
{

  if(gameNs.sceneManager.currentScene.title === gameNs.playScene.title )
  {
    if(gameNs.playScene.player.fsm.currentState != gameNs.playScene.player.stateDie)
    {
      //Player 1
      if(e.keyCode === 32)
    	{
        gameNs.playScene.player.plantBomb(gameNs.playScene.level);
      }

      if(e.keyCode === 65 && gameNs.playScene.player.collisionLeft == false) //65
    	{
    		gameNs.playScene.player.moveX = false;


    	}
       if(e.keyCode === 68 && gameNs.playScene.player.collisionRight == false) // 68
    	{
    		gameNs.playScene.player.moveX = true;

    	}

    //code triggered when UP arrow is pressed
    	if(e.keyCode === 87 && gameNs.playScene.player.collisionUp == false) //87
    	{
    		gameNs.playScene.player.moveY = false;
    	}
      if(e.keyCode === 83 && gameNs.playScene.player.collisionDown == false) // 83
    	{
    		gameNs.playScene.player.moveY = true;
    	}
    }


    if(gameNs.playScene.otherPlayer.fsm.currentState != gameNs.playScene.otherPlayer.stateDie)
    {
      //Player 2

      if(e.keyCode === 96)  // 0 button
      {
        console.log("Pressed 0");
        gameNs.playScene.otherPlayer.plantBomb(gameNs.playScene.level);
      }

      if(e.keyCode === 37 && gameNs.playScene.otherPlayer.collisionLeft == false) // 37
      {
        gameNs.playScene.otherPlayer.moveX = false;
      }


      if(e.keyCode === 39 && gameNs.playScene.otherPlayer.collisionRight == false) // 39
      {
           gameNs.playScene.otherPlayer.moveX = true;
      }
      //code triggered when UP arrow is pressed
      if(e.keyCode === 38 && gameNs.playScene.otherPlayer.collisionUp == false)  // 38
      {
        gameNs.playScene.otherPlayer.moveY = false;
      }
      if(e.keyCode === 40 && gameNs.playScene.otherPlayer.collisionDown == false) // 40
      {
        gameNs.playScene.otherPlayer.moveY = true;
      }

    }

    if(gameNs.playScene.drawText===true && e.keyCode === 77)
    {
      var canvas = document.createElement("mycanvas");
      var ctx = mycanvas.getContext("2d");
      ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
      ctx.translate((window.innerWidth / 10)- (7.5*(106.75 * 0.9)), 0);
      document.getElementById("table").style.display = "none";
      gameNs.sceneManager.goToScene(gameNs.menuScene.title)
      gameNs.menuScene.createDiv("Play")
      gameNs.menuScene.createDiv("Options")
      gameNs.menuScene.createDiv("Tutorial")
      gameNs.playScene.drawText=false
      gameNs.map3 = false
      gameNs.lastLevel = false
      gameNs.map2 = false
      gameNs.map1 = true
      gameNs.called = true

    }
    else if(gameNs.playScene.drawText===true && e.keyCode === 82)
    {
      var canvas = document.createElement("mycanvas");
      var ctx = mycanvas.getContext("2d");
      ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
      document.getElementById("table").style.display = "none";
      gameNs.playScene.level.Level1()
      gameNs.sceneManager.goToScene(gameNs.playScene.title);
      gameNs.playScene.initWorld();
      gameNs.timerStart = true;
      gameNs.start = Date.now();
      gameNs.playScene.drawText=false
      gameNs.map3 = false
      gameNs.lastLevel = false
      gameNs.map2 = false
      gameNs.map1 = true
      gameNs.called = true

    }
}


  if(gameNs.sceneManager.currentScene.title === gameNs.tutorialScene.title)
  {
    if(e.keyCode === 32)
  	{
      gameNs.tutorialScene.player.plantBomb(gameNs.tutorialScene.level);
    }

    if(e.keyCode === 65 && gameNs.tutorialScene.player.collisionLeft == false
    && gameNs.display === false) //65
  	{
  		gameNs.tutorialScene.player.moveX = false;


  	}
     if(e.keyCode === 68 && gameNs.tutorialScene.player.collisionRight == false
     && gameNs.display === false) // 68
  	{
  		gameNs.tutorialScene.player.moveX = true;

  	}

  //code triggered when UP arrow is pressed
  	if(e.keyCode === 87 && gameNs.tutorialScene.player.collisionUp == false
      && gameNs.display === false) //87
  	{
  		gameNs.tutorialScene.player.moveY = false;
  	}
    if(e.keyCode === 83 && gameNs.tutorialScene.player.collisionDown == false
    && gameNs.display === false) // 83
  	{
  		gameNs.tutorialScene.player.moveY = true;
  	}
  }
}


function keyUpHandler(e)
{
  //Player 1
  if(gameNs.sceneManager.currentScene.title === gameNs.playScene.title)
  {
    if(e.keyCode === 65 )
    {
      gameNs.playScene.player.moveX = null;
    }
    if(e.keyCode === 68 )
    {
      gameNs.playScene.player.moveX = null;
    }

  //code triggered when UP arrow is pressed
    if(e.keyCode === 87)
    {
      gameNs.playScene.player.moveY = null;
    }
    if(e.keyCode === 83)
    {
      gameNs.playScene.player.moveY = null;
    }

    ///Player 2
    if(e.keyCode === 37 )
    {
      gameNs.playScene.otherPlayer.moveX = null;
    }
    if(e.keyCode === 39 )
    {
      gameNs.playScene.otherPlayer.moveX = null;
    }

  //code triggered when UP arrow is pressed
    if(e.keyCode === 38)
    {
      gameNs.playScene.otherPlayer.moveY = null;
    }
    if(e.keyCode === 40)
    {
      gameNs.playScene.otherPlayer.moveY = null;
    }
  }

  else if(gameNs.sceneManager.currentScene.title === gameNs.tutorialScene.title)
  {
    if(e.keyCode === 65 )
    {
      gameNs.tutorialScene.player.moveX = null;
    }
  else if(e.keyCode === 68 )
    {
      gameNs.tutorialScene.player.moveX = null;
    }
  //code triggered when UP arrow is pressed
    else if(e.keyCode === 87)
    {
      gameNs.tutorialScene.player.moveY = null;
    }
    else if(e.keyCode === 83)
    {
      gameNs.tutorialScene.player.moveY = null;
    }
    else
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


/**
 * Initialises the canvas - the drawing surface. The canvas
 * is added to the document. When a HTML document is loaded into a
 * browser, it becomes a document object. This document object is
 * the root node of the HTML document and is considered the 'owner' of all other
 * nodes such as forms, buttons, the canvas etc.
 */
 function initCanvas()
 {
  document.addEventListener("keydown", this.keyDownHandler, true);
  document.addEventListener("keyup", this.keyUpHandler, true);
 	//Use the document object to create a new element canvas.
 	var canvas = document.createElement("canvas");
 	//Assign the canvas an id so we can reference it elsewhere.
 	canvas.id = 'mycanvas';
 	canvas.width = window.innerWidth;
 	canvas.height = window.innerHeight;
 	//We want this to be a 2D canvas.
 	var ctx = canvas.getContext("2D");
 	//Adds the canvas element to the document.
 	document.body.appendChild(canvas);
  document.addEventListener("touchstart", onTouchStart.bind(null,canvas));
  document.addEventListener("touchmove", onTouchMove, {passive:false});
  document.addEventListener("touchend", onTouchEnd);
 }
 window.addEventListener("keydown", function(e) {
     // Space and arrow keys
     if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
         e.preventDefault();
     }
 }, false);
 function onTouchStart(canvas, e)
 {
    touches = e.touches;
    // Print out (x,y) co-ords of touch: touches[0].clientX contains
    //  the x position.
    startX = touches[0].clientX;
    startY = touches[0].clientY;

    startPosX = startX;
    startPosY = startY;

    gameNs.time1 = new Date().getTime();
    var ctx = canvas.getContext("2d");
 }
 function onTouchMove(e)
 {
   gameNs.touchStart = true;
  e.preventDefault();
  var canvas = document.getElementById("mycanvas");
  var ctx = canvas.getContext("2d");
  //var touches = e.changedTouches;
  //var touches = e.touches;
  var change = e.changedTouches;
  endX = change[0].clientX;
  endY = change[0].clientY;

  ctx.beginPath();
  ctx.moveTo(startX,startY);    //the previous touch
  ctx.lineTo(endX,endY);    //the current touch
  ctx.stroke();

  startX = change[0].clientX;
  startY = change[0].clientY;

  endPosX = endX;
  endPosY = endY;
 }
 /**
  * function that calculates how long the line is between the first startpoint
  * and the last enpoint.
  * Then calculates if a line was a swipe or a drawing depending on the duration
  * of the tocuh and the length of the line
  * the two as the touch position moves
  * @param {Param} e - passes in touch end handler
  */
 function onTouchEnd(e)
 {
   var canvas = document.getElementById("mycanvas");
   var ctx = canvas.getContext("2d");
   console.log(gameNs.touchStart);

   var time2 = new Date().getTime();
   var elapsedTime = time2 - gameNs.time1;

   if( gameNs.sceneManager.currentScene.title == 'Play' || gameNs.sceneManager.currentScene.title == 'Tutorial' )
   {
   var a = startPosX - endPosX;
   var b = startPosY - endPosY;

   var distBetween = Math.sqrt(a *a + b * b);
   console.log(distBetween);
 //console.log(angle(a,b) );

   if(elapsedTime  > 0 && elapsedTime <= 300 && distBetween > 70 && gameNs.touchStart == true)
   {
     if(angle(a,b) > (180 - 45) || angle(a,b) < (-180 + 45) )
     {


         console.log("AngleRight");
         gameNs.playScene.player.moveX = true;
         gameNs.tutorialScene.player.moveX = true;
         gameNs.swipe = true;



     }
     else if (angle(a,b) < 45 && angle(a,b) > -45)
     {
       console.log("AngleLeft");
       gameNs.playScene.player.moveX = false;
       gameNs.tutorialScene.player.moveX = false;
       gameNs.swipe = true;
     }
     else
     {
       gameNs.playScene.player.moveX = null;
       gameNs.tutorialScene.player.moveX = null;
       gameNs.swipe = true;
     }
      if(angle(a,b) < (90 + 45) && angle(a,b) > 45)
     {
       console.log("AngleUp");
       gameNs.playScene.player.moveY = false;
       gameNs.tutorialScene.player.moveY = false;
       gameNs.swipe = true;
     }
     else if (angle(a,b) > ( -90 - 45) && angle(a,b) < ( -90 + 45) )
     {
       console.log("AngleDown");
       gameNs.playScene.player.moveY = true;
       gameNs.tutorialScene.player.moveY = true;
       gameNs.swipe = true;
     }
     else
     {
        gameNs.playScene.player.moveY = null;
        gameNs.tutorialScene.player.moveY = null;
     }

   }
   //If player taps stop all movement
    if (gameNs.touchStart == false)
    {
      gameNs.playScene.player.moveY = null;
      gameNs.tutorialScene.player.moveY = null;
      gameNs.playScene.player.moveX = null;
      gameNs.tutorialScene.player.moveX = null;

      console.log("Tap")

    }
    gameNs.touchStart = false;
  }
 }
 function angle(a,b) {
  var theta = Math.atan2(b, a); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  //if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}
 /**
  * Helper function that clamps value between min and max and returns value.
  * Example: clamp(10, 1, 3) will return 3
  * @param {Integer} value integer value to be clamped.
  * @param {Integer} min lower range value.
  * @param {Integer} max upper range value.
 * @return {Integer} min if value is less than min, max if max is less than value, otherwise value.
  */
 function clamp(value,min,max)
 {
 	if(max<min) {
 		var temp = min;
 		min = max;
 		max = temp;
 	}
 	return Math.max(min, Math.min(value, max));
 }
 /**
  * Helper function that returns a string of the form 'rgb(r,g,b)' where
  * r,g and b are numeric values.
  * @param {Number} r assumed numeric value for red.
  * @param {Number} g assumed numeric value for green.
  * @param {Number} b assumed numeric value for blue.
 * @return {String} a string of the form 'rgb(r,g,b)' where r,g and b are integers clamped between 0 and 255.
  */

 function rgb(r, g, b)
 {
 	return 'rgb('+clamp(Math.round(r),0,255)+', '+clamp(Math.round(g),0,255)+', '+clamp(Math.round(b),0,255)+')';
 }
/*
*helper function that draws background and font to screen
*/
function draw(game)
{
  game.draw();


}
