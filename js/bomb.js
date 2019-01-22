class Bomb
{
  constructor( imageOptions, fps)
  {
    this.x = 0;
    this.y = 0;
    this.gridPos = {};
    this.gridPos.x;
    this.gridPos.y;
    this.alive = true;

    this.img = imageOptions.image;
    this.fps = fps;

    this.width = imageOptions.width;
    this.height = imageOptions.height;

    this.time = 0;
    this.fuse = 1000 * this.fps;
    this.ticksPerFrame = 1000/this.fps;

  }

  place(pos)
  {

  }

  update()
  {
    if(this.alive)
    {
      console.log(this.ticksPerFrame)
      if(this.time > this.fuse)
      {
        this.alive = false;
      }
      this.time = this.time + this.ticksPerFrame;
    }
  }

  draw()
  {
    if(this.alive)
    {
      var canvas = document.getElementById('mycanvas');
      var ctx = canvas.getContext('2d');

      ctx.drawImage(this.img, 0, 0,this.width, this.height ,this.x,this.y, this.width / 5,this.height / 5);
    }

  }
}
