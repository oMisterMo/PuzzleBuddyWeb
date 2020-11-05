"use strict";
// import * as PIXI from "pixi.js";
PIXI.utils.sayHello("hello mo");
console.log("pixi.js app");
var SCREEN_WIDTH = 640 * 2;
var SCREEN_HEIGHT = 360 * 2;
//Aliases
var Application = PIXI.Application, 
// loader = PIXI.loader,
// resources = PIXI.loader.resources,
Sprite = PIXI.Sprite, Container = PIXI.Container;
var loader = new PIXI.Loader(); //Pixi loader now a class in 5.3.3
var resources = loader.resources;
//Create a Pixi Application
var app = new Application({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    antialias: false,
    transparent: false,
    resolution: 1 // default: 1
});
console.log("app: ", app);
app.renderer.backgroundColor = 0x0;
// app.ticker.minFPS = 30;
// app.ticker.maxFPS = 30;
// app.renderer.view.style.display = "flex";
//LOAD ASSETS
var assets = loadAssets();
console.log("assets: ", assets);
loader.add(assets).load(setup);
var state;
var gameScene;
var mainMenu;
var sky;
var world;
// let tiles = world.getTiles();
var debug = 1; //0 for none
var graphic;
var debugText = "Puzzle Buddy! by DsMo";
var text = new PIXI.Text(debugText, {
    fontFamily: "Arial",
    fontSize: 24,
    fill: 0xffffff
    // align: "center"
});
text.x = SCREEN_WIDTH - text.width;
// let renderer = new PIXI.Renderer();
var renderer = app.renderer;
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
    graphic = new PIXI.Graphics();
    if (debug) {
        gameScene.interactive = true;
        gameScene.addChild(text);
        // gameScene.on("touchstart", () => {
        //   renderer.backgroundColor = 0xffffff;
        // });
        gameScene.on("mousedown", function () {
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
    app.ticker.add(function (delta) { return gameLoop(delta); });
    console.log("...set up done, starting game loop.");
}
//Update
function gameLoop(delta) {
    //Update cloud
    sky.update(delta);
    // console.log(delta);
    state(delta); //state runs a single funtions (currently 'play')
}
//Draw
function play(delta) {
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
var canvas = document.getElementById("canvas");
if (canvas) {
    canvas.appendChild(app.view);
}
