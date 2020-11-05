"use strict";
// class Assets{
// }
//Level
var levels = "assets/levels/levels.json";
//Main tiles
var TILE_BLANK = "assets/tile_blank.png";
var TILE_BOX = "assets/wooden_box.png";
var TILE_BOX_HOME = "assets/wooden_box_home.png";
var TILE_BLOCK = "assets/tile_block.png";
var TILE_PLAYER = "assets/player0.png";
//Extras
var TILE_MO = "assets/mo.png";
var TILE_HOME = "assets/home.png";
var TILE_LEFT = "assets/lefta.png";
var TILE_RIGHT = "assets/righta.png";
var TILE_SKULL = "assets/skull.png";
var TILE_SKULL2 = "assets/skull2.png";
var TILE_SKULL3 = "assets/skull3.png";
//Clouds
var NO_OF_CLOUDS = 7;
var CLOUDS = (function () {
    var arr = [];
    for (var i = 0; i < NO_OF_CLOUDS; i++) {
        arr.push("assets/sky/cloud" + (i + 1 + ".png"));
    }
    return arr;
})();
var NO_OF_WORLD1 = 9;
var WORLD1 = (function () {
    var arr = [];
    for (var i = 0; i < NO_OF_WORLD1; i++) {
        arr.push("assets/levels/world1/level" + (i + 1) + ".png");
    }
    return arr;
})();
console.log("WORLD1: ", WORLD1);
function loadAssets() {
    var assets = [
        TILE_BLANK,
        TILE_BOX,
        TILE_BOX_HOME,
        TILE_BLOCK,
        TILE_PLAYER,
        TILE_MO,
        TILE_HOME,
        TILE_LEFT,
        TILE_RIGHT,
        TILE_SKULL,
        TILE_SKULL2,
        TILE_SKULL3
    ];
    var world1 = [];
    for (var i = 0; i < 9; i++) {
        world1[i] = "assets/levels/world1/level" + (i + 1) + ".png";
    }
    assets = assets
        .concat(CLOUDS)
        .concat(WORLD1)
        .concat(["assets/levels/world1/level1.txt"])
        .concat(["assets/levels/levels.json"]);
    return assets;
}
