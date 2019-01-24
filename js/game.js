var gameNs = {};
class Game
{
  /**
  *helper funtion that constructs game setting up each of the animated sprites
  *can also set ptoperties of the sprite objects, width, height, image, its y position and fps
  */
  constructor()
  {
    console.log("game constructed");

  }
  /**
  *helper funtion that records the time when the application is loaded
  */
  initWorld() //prints out “Initialising game world”
  {
    var message = {}
     //this.ws = new WebSocket("ws://149.153.106.133:8080/wstest");

    //this.touchTest = new TouchTest();
    gameNs.sceneManager = new SceneManager();
    gameNs.menuScene = new MenuScene('Too Many Walls');
    gameNs.playScene = new PlayScene('Play');
    gameNs.optionsScene = new optionsScene('Options')
    gameNs.helpScene = new HelpScene('Help')
    gameNs.hintsScene = new HintsScene('Hints')
    gameNs.tutorialScene = new TutorialScene('tutorial')
    gameNs.splashScene = new SplashScene('Splash')

    gameNs.sceneManager.addScene(gameNs.menuScene);
    gameNs.sceneManager.addScene(gameNs.playScene);
    gameNs.sceneManager.addScene(gameNs.optionsScene);
    gameNs.sceneManager.addScene(gameNs.helpScene)
    gameNs.sceneManager.addScene(gameNs.hintsScene)
    gameNs.sceneManager.addScene(gameNs.tutorialScene)
    gameNs.sceneManager.addScene(gameNs.splashScene)
    gameNs.sceneManager.goToScene(gameNs.splashScene.title);

    // Audio sceneManager
    gameNs.audioManager = new AudioManager();
    gameNs.audioManager.init();
    gameNs.audioManager.loadSoundFile("bg", "img/audio/backGround.mp3");
    gameNs.audioManager.loadSoundFile("drop", "img/audio/Drop.mp3");
    gameNs.audioManager.loadSoundFile("goal", "img/audio/Goal.mp3");
    gameNs.audioManager.loadSoundFile("rocks", "img/audio/rocks.mp3");
    gameNs.audioManager.loadSoundFile("swoosh", "img/audio/swoosh.mp3");
  }
  /**
  *Update function called every frame. sets the current time when the function is called
  * calls updates for each sprite object and clears the screen
  */
  update()
  {
    window.requestAnimationFrame(gameNs.game.update);
    gameNs.sceneManager.update();
    gameNs.sceneManager.render();
  }
  draw()
  {
    window.requestAnimationFrame(gameNs.game.draw);
    gameNs.sceneManager.render();


  }

}
