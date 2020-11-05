"use strict";
var Tile = /** @class */ (function () {
    function Tile(x, y, type, 
    // sprite: PIXI.Sprite,
    stage) {
        this.tileType = Tile.TILE_EMPTY;
        //Set sprite box
        this.x = x;
        this.y = y;
        this.tileType = type; //Should be initialised with empty
        //Add sprite
        switch (this.tileType) {
            case Tile.TILE_EMPTY:
                this.sprite = new Sprite(resources[TILE_BLANK].texture);
                break;
            case Tile.TILE_BOX:
                this.sprite = new Sprite(resources[TILE_BOX].texture);
                break;
            case Tile.TILE_BOX_HOME:
                this.sprite = new Sprite(resources[TILE_BOX_HOME].texture);
                break;
            case Tile.TILE_BLOCK:
                this.sprite = new Sprite(resources[TILE_BLOCK].texture);
                break;
            case Tile.TILE_HOME:
                this.sprite = new Sprite(resources[TILE_HOME].texture);
                break;
            case Tile.TILE_PLAYER:
                this.sprite = new Sprite(resources[TILE_PLAYER].texture);
                break;
            default:
                // throw new Error();
                this.sprite = new Sprite(resources[TILE_BLANK].texture);
        }
        stage.addChild(this.sprite);
        this.sprite.position.set(x, y);
    }
    Tile.prototype.setPos = function (x, y) {
        this.sprite.position.set(x, y);
    };
    Tile.prototype.setTileType = function (tileType) {
        this.tileType = tileType;
        this.updateSprite();
    };
    Tile.prototype.updateSprite = function () {
        switch (this.tileType) {
            case Tile.TILE_EMPTY:
                this.sprite = new Sprite(resources[TILE_BLANK].texture);
                break;
            case Tile.TILE_BOX:
                this.sprite = new Sprite(resources[TILE_BOX].texture);
                break;
            case Tile.TILE_BOX_HOME:
                this.sprite = new Sprite(resources[TILE_BOX_HOME].texture);
                break;
            case Tile.TILE_BLOCK:
                this.sprite = new Sprite(resources[TILE_BLOCK].texture);
                break;
            case Tile.TILE_HOME:
                this.sprite = new Sprite(resources[TILE_HOME].texture);
                break;
            case Tile.TILE_PLAYER:
                this.sprite = new Sprite(resources[TILE_PLAYER].texture);
                break;
            default:
                // throw new Error();
                this.sprite = new Sprite(resources[TILE_BLANK].texture);
        }
    };
    //All type of tiles
    Tile.TILE_EMPTY = 0;
    Tile.TILE_BOX = 1;
    Tile.TILE_BOX_HOME = 2;
    Tile.TILE_BLOCK = 3;
    Tile.TILE_HOME = 4;
    Tile.TILE_PLAYER = 5;
    return Tile;
}());
