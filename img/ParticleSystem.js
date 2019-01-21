class ParticleSystem
{
  constructor(x , y)
  {
    console.log("game constructed")
    gameNs.particles = []
  }


  update()
  {
    var canvas = document.getElementById('mycanvas')
    var ctx = canvas.getContext('2d')


    if(gameNs.particles.length < 20000)
    {
        gameNs.particles.push(new Particle(650,950))
    }

    for(var i =0; i < gameNs.particles.length; i++)
    {
      gameNs.particles[i].run()
      if(gameNs.particles[i].lifespan <0.1)
      {
          gameNs.particles.splice(i,1)
      }

    }

  }

}
