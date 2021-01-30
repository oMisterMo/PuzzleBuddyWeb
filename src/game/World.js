"use strict";
console.log("World loading...");
var World = /** @class */ (function () {
    function World(stage) {
        var _this = this;
        this.TILE_WIDTH = 64;
        this.TILE_HEIGHT = 64;
        this.NO_OF_LEVELS = 24; //Total number of levels (update with new world)
        this.x_tiles = 0;
        this.y_tiles = 0;
        //Moves the world (x, y) units
        this.xShift = 0;
        this.yShift = 0;
        this.player = new Player(0, 0);
        //The container level we are playing
        var currentLevel = new PIXI.Container();
        //set up stuff
        var level = resources["assets/levels/levels.json"];
        console.log("level: ", level.data);
        var levelJson = level.data.levels;
        console.log("levelJson: ", levelJson);
        var level1 = levelJson[0];
        console.log("first level: ", level1);
        this.x_tiles = level1.width;
        this.y_tiles = level1.height;
        console.log("width: ", this.x_tiles);
        console.log("height: ", this.y_tiles);
        // Initialise the multidimensional array
        var i = 0;
        this.tiles = new Array(this.y_tiles); //[tile, tile, tile]
        for (var y = 0; y < this.y_tiles; y++) {
            this.tiles[y] = new Array(this.x_tiles);
        }
        for (var y = 0; y < this.y_tiles; y++) {
            for (var x = 0; x < this.x_tiles; x++) {
                var tile = "EMPTY";
                var tileType = level1.data.charAt(i);
                switch (tileType) {
                    case ".":
                        //blank = 0
                        tile = "EMPTY";
                        break;
                    case "x":
                        //wall = 3
                        tile = "BLOCK";
                        break;
                    case "o":
                        //box = 1
                        tile = "BOX";
                        break;
                    case "O":
                        //box on home = 2
                        tile = "BOX_HOME";
                        break;
                    case "p":
                        //player = 5
                        tile = "PLAYER";
                        this.player.setPosition(x, y);
                        // this.player.position.x = x;
                        // this.player.position.y = y;
                        break;
                    case "h":
                        //home = 4
                        tile = "HOME";
                        break;
                    default:
                        tile = "EMPTY";
                }
                this.tiles[y][x] = new Tile(x * this.TILE_WIDTH, y * this.TILE_HEIGHT, tile, { x: x, y: y }, currentLevel);
                if (this.tiles[y][x].getTileType() == "PLAYER") {
                    // this.player = this.tiles[y][x];
                    // this.player = new Player(x, y);
                    this.tiles[y][x].setTileType("EMPTY"); //The player is drawn on its own layer
                    this.playerTile = this.tiles[y][x];
                    this.player.move(this.playerTile.getX(), this.playerTile.getY());
                    console.log("playerrr: ", this.player);
                }
                i++;
            }
        }
        //Add player sprite above the world layers
        currentLevel.addChild(this.player.sprite);
        //Add the boxes above the world
        //Center world
        this.xShift = SCREEN_WIDTH / 2 - currentLevel.width / 2;
        this.yShift = SCREEN_HEIGHT / 2 - currentLevel.height / 2;
        currentLevel.position.x = this.xShift;
        currentLevel.position.y = this.yShift;
        //Enable touch
        currentLevel.interactive = true;
        stage.addChild(currentLevel);
        // const extract: PIXI.Extract = app.renderer.plugins.extract;
        // console.log("extract: ", extract);
        // let pixels = extract.pixels(level);
        // console.log("pixels: ", pixels);
        console.log("player is: ", this.player);
        //Touch listener for game world
        currentLevel.on("mousedown", function (e) {
            //adjust touch based on world shift
            var touchX = e.data.global.x - _this.xShift;
            var touchY = e.data.global.y - _this.yShift;
            // console.log(touchX, ", ", touchY);
            var x = Math.floor(touchX / 64);
            var y = Math.floor(touchY / 64);
            console.log(x, ",", y);
            var touch = { x: x, y: y };
            //Move player if valid tile
            // this.graphics.clear();
            _this.isValidMove(touch);
        });
        this.graphics = new PIXI.Graphics();
        this.leftButton = new PIXI.RoundedRectangle();
        this.rightButton = new PIXI.RoundedRectangle();
        this.upButton = new PIXI.RoundedRectangle();
        this.downButton = new PIXI.RoundedRectangle();
        // this.graphics.beginFill(0xffffff);
        this.graphics.lineStyle(1, 0x00ff00);
        //set up controller
        this.controller = new PIXI.Graphics();
        this.controller.lineStyle(1, 0x0000ff);
        this.addController(stage);
        stage.addChild(this.graphics);
        stage.addChild(this.controller);
        //Register touch listener to screen
        renderer.plugins.interaction.on("pointerdown", function (e) {
            //Get the screen coords
            var x = e.data.global.x;
            var y = e.data.global.y;
            //Get adjacent tiles
            var pos = _this.player.getPosition();
            var top = _this.getTile(pos.x, pos.y - 1);
            var bottom = _this.getTile(pos.x, pos.y + 1);
            var left = _this.getTile(pos.x - 1, pos.y);
            var right = _this.getTile(pos.x + 1, pos.y);
            if (_this.upButton.contains(x, y)) {
                console.log("MOVE UP");
                if (top) {
                    _this.move("UP", top);
                }
            }
            if (_this.downButton.contains(x, y)) {
                console.log("MOVE DOWN");
                if (bottom) {
                    _this.move("DOWN", bottom);
                }
            }
            if (_this.leftButton.contains(x, y)) {
                console.log("MOVE LEFT");
                console.log("left tile is: ", left);
                if (left) {
                    _this.move("LEFT", left);
                }
            }
            if (_this.rightButton.contains(x, y)) {
                console.log("MOVE RIGHT");
                if (right) {
                    _this.move("RIGHT", right);
                }
            }
        });
    } //END CONSTRUCTOR
    World.prototype.addController = function (stage) {
        var width = 64;
        var height = 64;
        this.leftButton.x = 50;
        this.leftButton.y = 500;
        this.leftButton.width = width;
        this.leftButton.height = height;
        this.rightButton.x = 50 + width * 2;
        this.rightButton.y = 500;
        this.rightButton.width = width;
        this.rightButton.height = height;
        this.upButton.x = this.leftButton.x + this.leftButton.width;
        this.upButton.y = this.leftButton.y - this.leftButton.height;
        this.upButton.width = width;
        this.upButton.height = height;
        this.downButton.x = this.leftButton.x + this.leftButton.width;
        this.downButton.y = 500;
        this.downButton.width = width;
        this.downButton.height = height;
        // stage.addChild(this.graphics.drawCircle(100, 600, 25));
        stage.addChild(this.controller.drawRect(this.leftButton.x, this.leftButton.y, this.leftButton.width, this.leftButton.height));
        stage.addChild(this.controller.drawRect(this.rightButton.x, this.rightButton.y, this.rightButton.width, this.rightButton.height));
        stage.addChild(this.controller.drawRect(this.upButton.x, this.upButton.y, this.upButton.width, this.upButton.height));
        stage.addChild(this.controller.drawRect(this.downButton.x, this.downButton.y, this.downButton.width, this.downButton.height));
    };
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
    World.prototype.isValidMove = function (touch) {
        // console.log("isVaidMove...");
        if (this.player) {
            var pos = this.player.getPosition();
            var x = pos.x;
            var y = pos.y;
            var p = { x: x, y: y };
            //get the players tile
            // console.log("player tile: ", p);
            //get the touches tile
            // console.log("touch: ", touch);
            //get adjacent tiles to player
            var adjTilesPlayer = [];
            var top_1 = this.getTile(x, y - 1);
            var bottom = this.getTile(x, y + 1);
            var left = this.getTile(x - 1, y);
            var right = this.getTile(x + 1, y);
            if (top_1) {
                adjTilesPlayer.push(top_1);
                if (debug) {
                    this.drawBounds(top_1);
                }
                if (touch.x == top_1.pos.x && touch.y == top_1.pos.y) {
                    this.move("UP", top_1);
                }
            }
            if (bottom) {
                adjTilesPlayer.push(bottom);
                if (debug) {
                    this.drawBounds(bottom);
                }
                if (touch.x == bottom.pos.x && touch.y == bottom.pos.y) {
                    this.move("DOWN", bottom);
                }
            }
            if (left) {
                adjTilesPlayer.push(left);
                if (debug) {
                    this.drawBounds(left);
                }
                if (touch.x == left.pos.x && touch.y == left.pos.y) {
                    this.move("LEFT", left);
                }
            }
            if (right) {
                adjTilesPlayer.push(right);
                if (debug) {
                    this.drawBounds(right);
                }
                if (touch.x == right.pos.x && touch.y == right.pos.y) {
                    this.move("RIGHT", right);
                }
            }
            // let validTouch: Point = this.isAdj(adjTilesPlayer, touch);
            // console.log("before swap: ", this.tiles);
            // if (validTouch) {
            //   console.log("touched: ", validTouch);
            //   this.swap(this.tiles[validTouch.y][validTouch.x], this.player);
            //   // this.swapp();
            // } else {
            //   console.log("bad move cotton...");
            // }
        }
        //check if adjacent
    };
    World.prototype.isAdj = function (adjTilesPlayer, touch) {
        var found = null;
        adjTilesPlayer.forEach(function (element) {
            // element.setPos(element.getX() + 10, element.getY());
            if (element) {
                if (touch.x == element.pos.x && touch.y == element.pos.y) {
                    found = touch;
                    return found;
                }
            }
            else {
                console.log("adjacent tile is out of map");
            }
        });
        return found;
    };
    World.prototype.swap = function (t1, t2) {
        console.log("swapping...");
        // const t = t1;
        // // t1 = t2;
        // // t2 = t;
        // t1.setPos(t2.getX(), t2.getY());
        // t2.setPos(t.getX(), t.getY());
        // t1 = t2;
        // t2 = t;
        // t1.update(t2.getX(), t2.getY(), t2.getTileType(), t2.tile, t2.getSprite());
        // t2.update(t.getX(), t.getY(), t.getTileType(), t.tile, t.getSprite());
    };
    World.prototype.inWorld = function (x, y) {
        return x >= 0 && x < this.x_tiles && y >= 0 && y < this.y_tiles;
    };
    World.prototype.getTile = function (x, y) {
        if (this.inWorld(x, y)) {
            return this.tiles[y][x];
        }
    };
    World.prototype.move = function (dir, tile) {
        // if (this.playerTile) {
        switch (dir) {
            case "UP":
                if (tile.getTileType() != "BLOCK") {
                    console.log("move up...");
                    // this.playerTile.move(tile.getX(), tile.getY());
                    this.player.move(tile.getX(), tile.getY());
                    this.player.setPosition(tile.pos.x, tile.pos.y);
                    // this.player.position.x = tile.tile.x;
                    // this.player.position.y = tile.tile.y;
                }
                else {
                    console.log("wall above");
                }
                break;
            case "DOWN":
                if (tile.getTileType() != "BLOCK") {
                    console.log("move down...");
                    this.player.move(tile.getX(), tile.getY());
                    this.player.setPosition(tile.pos.x, tile.pos.y);
                }
                else {
                    console.log("wall below");
                }
                break;
            case "LEFT":
                if (tile.getTileType() != "BLOCK") {
                    console.log("move left...");
                    this.player.move(tile.getX(), tile.getY());
                    this.player.setPosition(tile.pos.x, tile.pos.y);
                }
                else {
                    console.log("wall left");
                }
                break;
            case "RIGHT":
                if (tile.getTileType() != "BLOCK") {
                    console.log("move right...");
                    this.player.move(tile.getX(), tile.getY());
                    this.player.setPosition(tile.pos.x, tile.pos.y);
                }
                else {
                    console.log("wall right");
                }
                break;
        }
        // }
    };
    //===============================================================================
    // private resetAlpha() {
    //   for (let y = 0; y < this.height; y++) {
    //     for (let x = 0; x < this.width; x++) {
    //       this.tiles[y][x].getSprite().alpha = 1;
    //     }
    //   }
    // }
    World.prototype.drawBounds = function (tile) {
        this.graphics.drawRect(tile.getX() + this.xShift, tile.getY() + this.yShift, 64, 64);
    };
    //The largest size of our world
    World.NO_OF_TILES_X = 18; //20 total tiles (-2 padding)
    World.NO_OF_TILES_Y = 9; //11 total tiles (-2 tile down)
    World.NO_OF_LEVELS = 24; //Total number of levels (update with new world)
    return World;
}());
