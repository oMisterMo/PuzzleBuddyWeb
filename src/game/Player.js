"use strict";
console.log("Player loading...");
var Player = /** @class */ (function () {
    function Player(x, y) {
        this.position = { x: x, y: y };
        this.sprite = new Sprite(resources[TILE_PLAYER].texture);
    }
    Player.prototype.move = function (x, y) {
        // console.log("MOOOVE it move it");
        this.sprite.position.set(x, y);
    };
    Player.prototype.setPosition = function (x, y) {
        this.position.x = x;
        this.position.y = y;
    };
    Player.prototype.getPosition = function () {
        return this.position;
    };
    return Player;
}());
