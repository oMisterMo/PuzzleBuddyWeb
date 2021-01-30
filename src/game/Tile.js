"use strict";
console.log("Tile loading...");
var Tile = /** @class */ (function () {
    function Tile(x, y, type, tile, 
    // sprite: PIXI.Sprite,
    stage) {
        //HOME/PLAYER/HOME...
        this.tileType = Tile.EMPTY;
        this.x = x;
        this.y = y;
        this.tileType = type; //Should be initialised with empty
        this.pos = tile;
        // this.playerTile = { x: tile.x, y: tile.y };
        //Add sprite
        switch (this.tileType) {
            case Tile.EMPTY:
                this.sprite = new Sprite(resources[TILE_BLANK].texture);
                break;
            case Tile.BOX:
                this.sprite = new Sprite(resources[TILE_BOX].texture);
                break;
            case Tile.BOX_HOME:
                this.sprite = new Sprite(resources[TILE_BOX_HOME].texture);
                break;
            case Tile.BLOCK:
                this.sprite = new Sprite(resources[TILE_BLOCK].texture);
                break;
            case Tile.HOME:
                this.sprite = new Sprite(resources[TILE_HOME].texture);
                break;
            case Tile.PLAYER:
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
    Tile.EMPTY = "EMPTY";
    Tile.BOX = "BOX";
    Tile.BOX_HOME = "BOX_HOME";
    Tile.BLOCK = "BLOCK";
    Tile.HOME = "HOME";
    Tile.PLAYER = "PLAYER";
    return Tile;
}());
