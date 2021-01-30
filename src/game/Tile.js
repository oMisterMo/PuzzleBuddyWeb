"use strict";
console.log("Tile loading...");
var Tile = /** @class */ (function () {
    function Tile(x, y, type, tile, 
    // sprite: PIXI.Sprite,
    stage) {
        //All type of tiles
        // public static TILE_EMPTY = 0;
        // public static TILE_BOX = 1;
        // public static TILE_BOX_HOME = 2;
        // public static TILE_BLOCK = 3;
        // public static TILE_HOME = 4;
        // public static TILE_PLAYER = 5;
        // protected tileType = Tile.TILE_EMPTY;
        this.tileType = "EMPTY";
        this.x = x;
        this.y = y;
        this.tileType = type; //Should be initialised with empty
        this.pos = tile;
        // this.playerTile = { x: tile.x, y: tile.y };
        //Add sprite
        switch (this.tileType) {
            case "EMPTY":
                this.sprite = new Sprite(resources[TILE_BLANK].texture);
                break;
            case "BOX":
                this.sprite = new Sprite(resources[TILE_BOX].texture);
                break;
            case "BOX_HOME":
                this.sprite = new Sprite(resources[TILE_BOX_HOME].texture);
                break;
            case "BLOCK":
                this.sprite = new Sprite(resources[TILE_BLOCK].texture);
                break;
            case "HOME":
                this.sprite = new Sprite(resources[TILE_HOME].texture);
                break;
            case "PLAYER":
                //Player tile left blank, use class player.
                this.sprite = new Sprite(resources[TILE_BLANK].texture);
                break;
            default:
                // throw new Error();
                this.sprite = new Sprite(resources[TILE_BLANK].texture);
        }
        stage.addChild(this.sprite);
        this.sprite.position.set(x, y);
    }
    Tile.prototype.setTileType = function (type) {
        this.tileType = type;
    };
    Tile.prototype.getTileType = function () {
        return this.tileType;
    };
    Tile.prototype.getX = function () {
        return this.x;
    };
    Tile.prototype.getY = function () {
        return this.y;
    };
    Tile.prototype.getSprite = function () {
        return this.sprite;
    };
    return Tile;
}());
