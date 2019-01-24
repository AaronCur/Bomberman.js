class SplashScene
{
  constructor(title)
  {
    this.title = title
    this.width = window.innerWidth
    this.height = window.innerHeight;
    this.img = new Image()
    this.img.src = "img/Assets/Assets/Logo.png"
    var canvas = document.getElementById("mycanvas")
    var ctx = mycanvas.getContext('2d');
    mycanvas.style.position = "absolute"
    mycanvas.style.left = this.img.offsetLeft
    mycanvas.style.top = this.img.offsetTop
    this.width = window.innerWidth
    this.height = window.innerHeight
    var startTxt = "Press enter to start!"
    this.startTxt = startTxt
    document.addEventListener("keydown", this.keyHandler, true);
    ctx.translate((window.innerWidth / 10)- (7.5*(106.75 * 0.9)), 0);
  }

  update()
  {
    var canvas = document.getElementById('mycanvas');
    var ctx = mycanvas.getContext('2d');
  }

  keyHandler(e)
  {
    if(gameNs.sceneManager.currentScene.title === gameNs.splashScene.title)
    {
      if(e.keyCode === 13)//w key
      {
        gameNs.sceneManager.goToScene(gameNs.menuScene.title)
        gameNs.menuScene.createDiv("Play");
        gameNs.menuScene.createDiv("Options");
        gameNs.menuScene.createDiv("Tutorial");
      }
    }
  }

  render()
  {
    var canvas = document.getElementById('mycanvas');
    var ctx = mycanvas.getContext('2d');
    var image = this.img;
    if(gameNs.sceneManager.currentScene.title === gameNs.splashScene.title)
    {
      ctx.drawImage(image, 0,0,this.width,this.height)
      ctx.font = "68px Adventure"
      ctx.fillStyle = "Black"
      ctx.fillText(this.startTxt, 800,900)
    }
    else {
        gameNs.ctx.clearRect(0,0,mycanvas.width,mycanvas.height)
    }

  }


}
