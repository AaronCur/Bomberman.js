/**
 * MenuScene class inherits Scene
 *
 */
class MenuScene
{
  /**
   * Constructor function , creates a scene with parameters which are passed in on construction
   * @param {String} title - passes in a string whihc is set in the main
   */
  constructor(title)
  {
    this.title = title;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.BGimg = new Image()
    this.BGimg.src = "img/Assets/Assets/Logo.png"
  }
   createDiv(divId)
  {

      var div = document.createElement("div");
      div.id = divId;
      if(div.id === "Play")
      {
        div.innerHTML = "<img src=\'img/playbutton.png\'>";
        this.div = div;
        //var d = document.getElementById('yourDivId');
        div.style.position = "absolute";
        div.style.left = (this.width/ 2) - 150 +"px";
        div.style.top = (this.height/ 8) *4 + 80 +'px';
      }
      else if(div.id === "Options")
      {
        div.innerHTML = "<img src=\'img/optionsbutton.png\'>";
        this.div = div;

        div.style.position = "absolute";
        div.style.left = (this.width/ 2) - 150 +"px";
        div.style.top = (this.height/ 8) * 5 + 80 +'px';
      }
      else if(div.id === "Tutorial")
      {
        div.innerHTML = "<img src=\'img/tutorialbutton.png\'>";
        this.div = div;

        div.style.position = "absolute";
        div.style.left = (this.width/ 2) - 150 +"px";
        div.style.top = (this.height/8) * 6 + 80 +'px';
      }

    div.addEventListener("click", this.onTouchStart,{passive:false});
    document.body.appendChild(div);

  }
  onTouchStart(e)
  {
    gameNs.audioManager.playAudio("menu", false, gameNs.volume);
    //gameNs.sceneManager.goToScene(gameNs.optionsScene.title);

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
         if(filename === "playbutton.png")
         {
           ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
           ctx.translate((window.innerWidth / 2)- (7.5*(75 * 0.8)), 0);
           gameNs.sceneManager.goToScene(gameNs.playScene.title);
           gameNs.playScene.initWorld();
           gameNs.timerStart = true;
           gameNs.start = Date.now();

         }
         else if (filename === "optionsbutton.png" )
         {
          // gameNs.soundManager.playSound("Concentrate", true, 0.2);
           gameNs.sceneManager.goToScene(gameNs.optionsScene.title);
           gameNs.optionsScene.createDiv("Mute");
           gameNs.optionsScene.createDiv("VolumeUp");
           gameNs.optionsScene.createDiv("VolumeDown");
           gameNs.optionsScene.createDiv("Back");
           gameNs.optionsScene.createDiv("HelpScreen");

         }
         else if (filename === "tutorialbutton.png" )
         {
           ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
           ctx.translate((window.innerWidth / 2)- (7.5*(75 * 0.8)), 0);
           gameNs.sceneManager.goToScene(gameNs.tutorialScene.title);
           gameNs.tutorialScene.createDiv("return")
         }

         if(gameNs.sceneManager.currentScene != gameNs.menuScene.title)
      {
         var el = document.getElementById( 'Play' );
         el.parentNode.removeChild( el );
         var el = document.getElementById( 'Options' );
         el.parentNode.removeChild( el );
         var el = document.getElementById( 'Tutorial' );
         el.parentNode.removeChild( el );
       }


      }
    }
 }
 update()
 {

 }
  render()
  {

    var canvas = document.createElement("mycanvas");
    var ctx = mycanvas.getContext("2d");
    ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    var img = this.BGimg
    ctx.drawImage(img,0,0,this.width,this.height)
    document.body.style.background = "#bbcfed";
    ctx.font = '55px Adventure Regular';

  }
}
