class ScoreSystem
{
  /**
   * Constructor function , creates a scene with parameters which are passed in on construction
   * @param {String} title - passes in a string whihc is set in the main
   */
  constructor(val)
  {
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.scoreVal = 0;
    this.playerID = val;
    this.positionX;
    this.positionY;
  }
  update()
  {
    if(this.playerID == 1)
    {
      this.positionX = 0;
      this.positionY = 930;
    }
    else {
      this.positionX = 640;
      this.positionY = 930;

    }
    if(this.scoreVal <= 0)
    {
      this.scoreval = 0;
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
    ctx.font = '55px Adventure';
    if(this.playerID == 1){
      ctx.fillStyle = '#D91D1D'
      ctx.lineWidth = 3
      ctx.strokeStyle = '#F34D4D';
    }
    else{
      ctx.fillStyle = '#1D9DD9'
      ctx.lineWidth = 3
      ctx.strokeStyle = '#4EBFF4';
    }

    ctx.fillText("SCORE : " + this.scoreVal, this.positionX,this.positionY)
    ctx.strokeText("SCORE : " + this.scoreVal, this.positionX,this.positionY)

  }


}
