class HealthSystem
{
  /**
   * Constructor function , creates a scene with parameters which are passed in on construction
   * @param {String} title - passes in a string whihc is set in the main
   */
  constructor(val)
  {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
   this.heartimg = new Image();
    this.heartimg.src ="img/gameoverbg.png"
    this.healthVal = 2;
    this.playerID = val;
    this.positionX;
    this.positionY;
  }
  update()
  {
    if(this.playerID == 1)
    {
      this.positionX = 0;
      this.positionY = 0;
        switch(this.healthVal) {
      case 3:
        this.heartimg.src ="img/health3_0.png"
        break;
      case 2:
        this.heartimg.src ="img/health2_0.png"
        break;
      case 1:
        this.heartimg.src ="img/health1_0.png"
        break;
      case 0:
        this.heartimg.src ="img/health0_0.png"
        break;
      default:
      }
      // code block
    }
    else {
      this.positionX = 1000;
      this.positionY = 0;
      switch(this.healthVal) {
    case 3:
      this.heartimg.src ="img/health3_0P2.png"
      break;
    case 2:
      this.heartimg.src ="img/health2_0P2.png"
      break;
    case 1:
      this.heartimg.src ="img/health1_0P2.png"
      break;
    case 0:
      this.heartimg.src ="img/health0_0P2.png"
      break;
    default:
    }

    }
    this.render();
  }

  /**
   * render function which will overwrite the one inherited by scene
   * it defines a font and its size along with the background colour
   */
  render()
  {

    var canvas = document.createElement("mycanvas");
    var ctx = mycanvas.getContext("2d");
    var imageHeart = this.heartimg;
    ctx.drawImage(imageHeart, this.positionX , this.positionY);



  }


}
