"use strict";
console.log("Sky loading...");
var Sky = /** @class */ (function () {
    function Sky(stage) {
        this.NO_OF_CLOUDS = 2; //7 clouds available
        this.sky = new Container();
        this.clouds = new Array(this.NO_OF_CLOUDS);
        for (var i = 0; i < this.NO_OF_CLOUDS; i++) {
            this.clouds[i] = new Sprite(resources[CLOUDS[i]].texture);
        }
        //Add clouds to scene
        for (var _i = 0, _a = this.clouds; _i < _a.length; _i++) {
            var cloud = _a[_i];
            //set random pos
            cloud.x = Math.random() * SCREEN_WIDTH + cloud.width;
            cloud.y = Math.random() * SCREEN_HEIGHT - cloud.height;
            //add cloud
            this.sky.addChild(cloud);
        }
        stage.addChild(this.sky);
    }
    Sky.prototype.update = function (delta) {
        for (var _i = 0, _a = this.clouds; _i < _a.length; _i++) {
            var cloud = _a[_i];
            cloud.x -= 2 * delta;
            if (cloud.x < 0 - cloud.width) {
                cloud.x = SCREEN_WIDTH + 10;
                cloud.y = Math.random() * SCREEN_HEIGHT - cloud.height;
                // console.log("new y: ", cloud.y);
            }
        }
    };
    Sky.prototype.draw = function (delta) { };
    return Sky;
}());
