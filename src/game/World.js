"use strict";
var World = /** @class */ (function () {
    function World(stage) {
        this.TILE_WIDTH = 64;
        this.TILE_HEIGHT = 64;
        this.NO_OF_LEVELS = 24; //Total number of levels (update with new world)
        //Moves the world (x, y) units
        this.xShift = 0;
        this.yShift = 0;
        //The container level we are playing
        var currentLevel = new PIXI.Container();
        //set up stuff
        var level = resources["assets/levels/levels.json"];
        console.log("level: ", level.data);
        console.log("leve type: ", typeof level.data);
        var levelJson = level.data.levels;
        console.log("levelJson: ", levelJson);
        var level1 = levelJson[0];
        console.log("first level: ", level1);
        var width = level1.width;
        var height = level1.height;
        console.log("width: ", width);
        console.log("height: ", height);
        // Initilise the multiple dimential array
        var i = 0;
        this.tiles = new Array(height); //[tile, tile, tile]
        for (var y = 0; y < height; y++) {
            this.tiles[y] = new Array(width);
        }
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                var tile = Tile.TILE_EMPTY;
                var tileType = level1.data.charAt(i);
                switch (tileType) {
                    case ".":
                        //blank = 0
                        tile = Tile.TILE_EMPTY;
                        break;
                    case "x":
                        tile = Tile.TILE_BLOCK;
                        break;
                    case "o":
                        tile = Tile.TILE_BOX;
                        break;
                    case "O":
                        tile = Tile.TILE_BOX_HOME;
                        break;
                    case "p":
                        tile = Tile.TILE_PLAYER;
                        break;
                    case "h":
                        tile = Tile.TILE_HOME;
                        break;
                }
                console.log("tile: ", tile);
                this.tiles[y][x] = new Tile(x * this.TILE_WIDTH, y * this.TILE_HEIGHT, tile, currentLevel);
                i++;
            }
        }
        stage.addChild(currentLevel);
        // const extract: PIXI.Extract = app.renderer.plugins.extract;
        // console.log("extract: ", extract);
        // let pixels = extract.pixels(level);
        // console.log("pixels: ", pixels);
    }
    World.prototype.loadLevel = function () {
        // const level = document.getElementById("#idHEre");
    };
    World.prototype.getTiles = function () {
        return this.tiles;
    };
    // public nullBoard() {
    //   for (let y = 0; y < World.NO_OF_TILES_Y; y++) {
    //     for (let x = 0; x < World.NO_OF_TILES_X; x++) {
    //       this.tiles[y][x] = null;
    //     }
    //   }
    // }
    World.prototype.doStuff = function () { };
    //The largest size of our world
    World.NO_OF_TILES_X = 18; //20 total tiles (-2 padding)
    World.NO_OF_TILES_Y = 9; //11 total tiles (-2 tile down)
    World.NO_OF_LEVELS = 24; //Total number of levels (update with new world)
    return World;
}());
