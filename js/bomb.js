class Bomb
{
  constructor( imageOptions, fps, tile)
  {
    this.x = 0;
    this.y = 0;
    this.gridPos = {};
    this.gridPos.x;
    this.gridPos.y;
    this.alive = false;
    this.exploding = false;

    this.img = imageOptions.image;
    this.fps = fps;

    this.width = imageOptions.width;
    this.height = imageOptions.height;

    this.time = 0;
    this.timeExplode = 0;
    this.fuse = 1000 * this.fps;
    this.explosionTime = 100 * this.fps;
    this.ticksPerFrame = 1000/this.fps;
    this.tileWidth = tile.width;
    this.tileHeight = tile.height;

    this.explosionImg = new Image()
    this.explosionImg.src = "img/ExplosionSheet.png";

    // Animation
    this.animeTimer = 0;
    this.animeTimerLimit = 5;
    this.animeCounter = 0;

    this.firePowerUp = false;

    this.surroundingWalls = {};
    this.surroundingWalls["Up1"] = false;
    this.surroundingWalls["Down1"] = false;
    this.surroundingWalls["Left1"] = false;
    this.surroundingWalls["Right1"] = false;
    this.surroundingWalls["Up2"] = false;
    this.surroundingWalls["Down2"] = false;
    this.surroundingWalls["Left2"] = false;
    this.surroundingWalls["Right2"] = false;

  }

  fireBoost(fb)
  {
    this.firePowerUp = fb;
  }

  place(pos)
  {
    if(!this.alive && !this.exploding)
    {
      this.alive = true;
      this.time = 0;
      this.timeExplode = 0;
      this.gridPos.x = pos.x;
      this.gridPos.y = pos.y;
      this.x = (this.gridPos.x * this.tileWidth * .8) + 10;
      this.y = (this.gridPos.y * this.tileHeight * .8) + 90;
      this.animeCounter = 0;
      this.animeTimer = 0;
      this.surroundingWalls["Up1"] = false;
      this.surroundingWalls["Down1"] = false;
      this.surroundingWalls["Left1"] = false;
      this.surroundingWalls["Right1"] = false;
      this.surroundingWalls["Up2"] = false;
      this.surroundingWalls["Down2"] = false;
      this.surroundingWalls["Left2"] = false;
      this.surroundingWalls["Right2"] = false;
    }
  }

  update()
  {
    if(this.alive || this.exploding)
    {
      if(this.alive)
      {
         if(this.animeTimer > this.animeTimerLimit)
         {
           this.animeCounter++;
           if(this.animeCounter === 4)
           {
             this.animeCounter = 0;
           }
           this.animeTimer = 0;
         }
         else
         {
           this.animeTimer++;
         }

      }

      if(this.time > this.fuse)
      {
        this.alive = false;
        this.timeExplode = this.timeExplode + this.ticksPerFrame;
        this.exploding = true;
        if (this.timeExplode > this.explosionTime)
        {
          this.exploding = false;
        }
      }
      this.time = this.time + this.ticksPerFrame;
    }

  }

  onExplode(level, i)
  {
    if(this.exploding)
    {
      if(level != undefined)
      {
        level[i].containsBomb = false;
        level[i].containsWall = false;
      }
      return this.gridPos;



    }
    else {
      return {x:-10, y:-10};
    }
  }


  addWall(key, wall)
  {
    this.surroundingWalls[key] = wall;
  }

  draw()
  {
    if(this.alive)
    {
      var canvas = document.getElementById('mycanvas');
      var ctx = canvas.getContext('2d');

      ctx.drawImage(this.img, 75 * this.animeCounter, 0,this.tileWidth, this.height ,this.x - 10,this.y - 10, this.tileWidth - 15,this.height - 15);
    }
    else if(this.exploding)
    {
      var canvas = document.getElementById('mycanvas');
      var ctx = canvas.getContext('2d');

      ctx.drawImage(this.explosionImg, 0, 0,this.tileWidth, this.height ,this.x - 10, this.y - 10, this.tileWidth - 15,this.height - 15);

      if(!this.surroundingWalls["Right1"])
      {
        if(!this.surroundingWalls["Right2"] && this.firePowerUp)
        {
          ctx.drawImage(this.explosionImg, 0, 0,this.tileWidth, this.height ,this.x - 10 + 55, this.y - 10 , this.tileWidth - 15,this.height - 15);
          ctx.drawImage(this.explosionImg, 150, 0,this.tileWidth, this.height ,this.x - 10 + 100, this.y - 10, this.tileWidth - 15,this.height - 15);
        }
        else {
          ctx.drawImage(this.explosionImg, 150, 0,this.tileWidth, this.height ,this.x - 10 + 45, this.y - 10, this.tileWidth - 15,this.height - 15);
        }
      }

      if(!this.surroundingWalls["Left1"])
      {
        if(!this.surroundingWalls["Left2"] && this.firePowerUp)
        {
          ctx.drawImage(this.explosionImg, 0, 0,this.tileWidth, this.height ,this.x - 10 - 55, this.y - 10 , this.tileWidth - 15,this.height - 15);
          ctx.drawImage(this.explosionImg, 300, 0,this.tileWidth, this.height ,this.x - 10 - 100, this.y - 10, this.tileWidth - 15,this.height - 15);
        }
        else {
          ctx.drawImage(this.explosionImg, 300, 0,this.tileWidth, this.height ,this.x - 10 - 45, this.y - 10, this.tileWidth - 15,this.height - 15);
        }
      }

      if(!this.surroundingWalls["Down1"])
      {
        if(!this.surroundingWalls["Down2"] && this.firePowerUp)
        {
          ctx.drawImage(this.explosionImg, 0, 0,this.tileWidth, this.height ,this.x - 10, this.y - 10 + 55, this.tileWidth - 15,this.height - 15);
          ctx.drawImage(this.explosionImg, 225, 0,this.tileWidth, this.height ,this.x - 10, this.y - 10 + 100, this.tileWidth - 15,this.height - 15);
        }
        else {
          ctx.drawImage(this.explosionImg, 225, 0,this.tileWidth, this.height ,this.x - 10, this.y - 10 + 45, this.tileWidth - 15,this.height - 15);
        }
      }

      if(!this.surroundingWalls["Up1"])
      {
        if(!this.surroundingWalls["Up2"] && this.firePowerUp)
        {
          ctx.drawImage(this.explosionImg, 0, 0,this.tileWidth, this.height ,this.x - 10, this.y - 10 - 55, this.tileWidth - 15,this.height - 15);
          ctx.drawImage(this.explosionImg, 75, 0,this.tileWidth, this.height ,this.x - 10, this.y - 10 - 100, this.tileWidth - 15,this.height - 15);
        }
        else {
          ctx.drawImage(this.explosionImg, 75, 0,this.tileWidth, this.height ,this.x - 10, this.y - 10 - 45, this.tileWidth - 15,this.height - 15);
        }
      }
    }

  }
}
