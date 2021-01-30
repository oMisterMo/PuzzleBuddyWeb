// import * as PIXI from "pixi.js";

console.log("maing game loading...");
PIXI.utils.sayHello("hello mo");
const SCREEN_WIDTH = 640 * 2;
const SCREEN_HEIGHT = 360 * 2;

//Aliases
let Application = PIXI.Application,
  // loader = PIXI.loader,
  // resources = PIXI.loader.resources,
  Sprite = PIXI.Sprite,
  Container = PIXI.Container;
let loader = new PIXI.Loader(); //Pixi loader now a class in 5.3.3
let resources = loader.resources;

//Create a Pixi Application
let app = new Application({
  width: SCREEN_WIDTH, // default: 800
  height: SCREEN_HEIGHT, // default: 600
  antialias: false, // default: false
  transparent: false, // default: false
  resolution: 1 // default: 1
});

console.log("app: ", app);

app.renderer.backgroundColor = 0x0;
// app.ticker.minFPS = 30;
// app.ticker.maxFPS = 30;
// app.renderer.view.style.display = "flex";

//LOAD ASSETS
console.log("PIXI.TextureCache", PIXI.utils.TextureCache);
const assets = loadAssets();
console.log("assets: ", assets);
loader.add(assets).load(setup);
console.log("PIXI.TextureCache", PIXI.utils.TextureCache);

let state: (delta: number) => void;

let gameScene: PIXI.Container;
let mainMenu: PIXI.Container;
let sky: Sky;
let world: World;
// let tiles = world.getTiles();

let debug = 0; //0 false
// let graphic: PIXI.Graphics;
let debugText = "Puzzle Buddy! by DsMo";
let text = new PIXI.Text(debugText, {
  fontFamily: "Arial",
  fontSize: 24,
  fill: 0xffffff
  // align: "center"
});
text.x = SCREEN_WIDTH - text.width;
// let renderer = new PIXI.Renderer();
let renderer = app.renderer;
console.log("renderer: ", renderer);

function initGame() {
  gameScene = new Container();
  mainMenu = new Container();
  sky = new Sky(gameScene);

  //Create and add cloud to sky
  // cloud = new Sprite(resources["assets/sky/cloud1.png"].texture);
  // cloud.y = Math.random() * SCREEN_HEIGHT - cloud.height;
  // sky.addChild(cloud);

  //Add sky layer to game scene
  // gameScene.addChild(sky);

  //Create world and add world to gameScene
  world = new World(gameScene);

  // graphic = new PIXI.Graphics();

  if (debug) {
    gameScene.interactive = true;
    gameScene.addChild(text);
    // gameScene.on("touchstart", () => {
    //   renderer.backgroundColor = 0xffffff;
    // });
    gameScene.on("mousedown", () => {
      // renderer.backgroundColor = 0xffffff;
      text.text = "moooo";
      text.calculateBounds();
      text.x = SCREEN_WIDTH - text.width;
    });
  }
  app.stage.addChild(gameScene); //stage is the root display container that
  //app.stage.removeChile(sprite) or (better) sprite.visible = false;
}

//Setup Pixi and load the texture atlas files - call the `setup`
//function when they've loaded
function setup() {
  console.log("Setup called...");
  initGame();

  state = play;
  //Start the game loop
  app.ticker.add((delta: number) => gameLoop(delta));
  console.log("...set up done, starting game loop.");
}

//Update
function gameLoop(delta: number) {
  //Update cloud
  sky.update(delta);

  // console.log(delta);
  state(delta); //state runs a single funtions (currently 'play')
}

//Draw
function play(delta: number) {
  //All the game logic goes here
  // if (debug) {
  // console.log("render text");
  // renderer.render(text);
  // }
}

function end() {
  //All the code that should run at the end of the game
  app.stop();
}

//The game's helper functions:
//`keyboard`, `hitTestRectangle`, `contain` and `randomInt`

//-----------------------END GAME
//Add the canvas that Pixi automatically created for you to the HTML document
let canvas = document.getElementById("canvas");
if (canvas) {
  canvas.appendChild(app.view);
}
