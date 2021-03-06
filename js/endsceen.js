class EndScene
{
  /**
   * Constructor function , creates a scene with parameters which are passed in on construction
   * @param {String} title - passes in a string whihc is set in the main
   */
  constructor(title)
  {
    this.title = title;
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.bgimg = new Image();
    this.bgimg.src ="img/gameoverbg.png"
  }

  /**
   * render function which will overwrite the one inherited by scene
   * it defines a font and its size along with the background colour
   */
  render()
  {

    var canvas = document.createElement("mycanvas");
    var ctx = mycanvas.getContext("2d");
    var imagebg = this.bgimg;
    var image = this.img;
    ctx.drawImage(imagebg, 0 , 90);

  }


}
