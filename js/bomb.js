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

    this.surroundingWalls = {};
    this.surroundingWalls["Up"] = false;
    this.surroundingWalls["Down"] = false;
    this.surroundingWalls["Left"] = false;
    this.surroundingWalls["Right"] = false;

  }

  place(pos)
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
    this.surroundingWalls["Up"] = false;
    this.surroundingWalls["Down"] = false;
    this.surroundingWalls["Left"] = false;
    this.surroundingWalls["Right"] = false;
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
    console.log(key)
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

      if(!this.surroundingWalls["Right"])
      {
        ctx.drawImage(this.explosionImg, 150, 0,this.tileWidth, this.height ,this.x - 10 + 45, this.y - 10, this.tileWidth - 15,this.height - 15);
      }

      if(!this.surroundingWalls["Left"])
      {
        ctx.drawImage(this.explosionImg, 300, 0,this.tileWidth, this.height ,this.x - 10 - 45, this.y - 10, this.tileWidth - 15,this.height - 15);
      }

      if(!this.surroundingWalls["Down"])
      {
        ctx.drawImage(this.explosionImg, 225, 0,this.tileWidth, this.height ,this.x - 10, this.y - 10 + 45, this.tileWidth - 15,this.height - 15);
      }

      if(!this.surroundingWalls["Up"])
      {
        ctx.drawImage(this.explosionImg, 75, 0,this.tileWidth, this.height ,this.x - 10, this.y - 10 - 45, this.tileWidth - 15,this.height - 15);
      }
    }

  }
}
