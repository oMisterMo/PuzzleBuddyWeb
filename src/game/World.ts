console.log("World loading...");
class World {
  public TILE_WIDTH = 64;
  public TILE_HEIGHT = 64;

  //The largest size of our world
  public static NO_OF_TILES_X = 18; //20 total tiles (-2 padding)
  public static NO_OF_TILES_Y = 9; //11 total tiles (-2 tile down)
  public static NO_OF_LEVELS = 24; //Total number of levels (update with new world)
  public NO_OF_LEVELS = 24; //Total number of levels (update with new world)

  private tiles: Array<Array<Tile>>; //multidimensional array

  private x_tiles: number = 0;
  private y_tiles: number = 0;
  //Moves the world (x, y) units
  private xShift = 0;
  private yShift = 0;

  //Referece to the player tile
  private player: Player;
  private playerTile: Tile | undefined;

  //Graphics to draw pimitives
  private graphics: PIXI.Graphics;
  private controller: PIXI.Graphics;
  private leftButton: PIXI.RoundedRectangle;
  private rightButton: PIXI.RoundedRectangle;
  private upButton: PIXI.RoundedRectangle;
  private downButton: PIXI.RoundedRectangle;

  constructor(stage: PIXI.Container) {
    interface Level {
      width: number;
      height: number;
      data: string;
    }
    this.player = new Player(0, 0);
    //The container level we are playing
    const currentLevel: PIXI.Container = new PIXI.Container();
    //set up stuff
    const level = resources["assets/levels/levels.json"];
    console.log("level: ", level.data);
    const levelJson: Array<Level> = level.data.levels;
    console.log("levelJson: ", levelJson);
    const level1 = levelJson[0];
    console.log("first level: ", level1);
    this.x_tiles = level1.width;
    this.y_tiles = level1.height;
    console.log("width: ", this.x_tiles);
    console.log("height: ", this.y_tiles);

    // Initialise the multidimensional array
    let i = 0;
    this.tiles = new Array(this.y_tiles); //[tile, tile, tile]
    for (let y = 0; y < this.y_tiles; y++) {
      this.tiles[y] = new Array(this.x_tiles);
    }
    for (let y = 0; y < this.y_tiles; y++) {
      for (let x = 0; x < this.x_tiles; x++) {
        let tile: TileType = Tile.EMPTY;
        const pixel = level1.data.charAt(i);
        switch (pixel) {
          case ".":
            //blank = 0
            tile = Tile.EMPTY;
            break;
          case "x":
            //wall = 3
            tile = Tile.BLOCK;
            break;
          case "o":
            //box = 1
            tile = Tile.BOX;
            break;
          case "O":
            //box on home = 2
            tile = Tile.BOX_HOME;
            break;
          case "p":
            //player = 5
            tile = Tile.PLAYER;
            this.player.setPosition(x, y);
            // this.player.position.x = x;
            // this.player.position.y = y;

            break;
          case "h":
            //home = 4
            tile = Tile.HOME;
            break;
          default:
            tile = Tile.EMPTY;
        }

        this.tiles[y][x] = new Tile(
          x * this.TILE_WIDTH,
          y * this.TILE_HEIGHT,
          tile,
          { x, y },
          currentLevel
        );

        //Now init player if found
        if (this.tiles[y][x].getTileType() == Tile.PLAYER) {
          // this.player = this.tiles[y][x];
          // this.player = new Player(x, y);
          this.tiles[y][x].setTileType(Tile.EMPTY); //The player is drawn on its own layer

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
    currentLevel.on("mousedown", (e: any) => {
      //adjust touch based on world shift
      const touchX = e.data.global.x - this.xShift;
      const touchY = e.data.global.y - this.yShift;
      // console.log(touchX, ", ", touchY);
      const x = Math.floor(touchX / 64);
      const y = Math.floor(touchY / 64);
      console.log(x, ",", y);
      let touch: Point = { x, y };

      //Move player if valid tile
      // this.graphics.clear();
      this.isValidMove(touch);
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
    renderer.plugins.interaction.on("pointerdown", (e: any) => {
      //Get the screen coords
      const x = e.data.global.x;
      const y = e.data.global.y;

      //Get adjacent tiles
      const pos = this.player.getPosition();
      const top = this.getTile(pos.x, pos.y - 1);
      const bottom = this.getTile(pos.x, pos.y + 1);
      const left = this.getTile(pos.x - 1, pos.y);
      const right = this.getTile(pos.x + 1, pos.y);

      if (this.upButton.contains(x, y)) {
        console.log("MOVE UP");
        if (top) {
          this.move("UP", top);
        }
      }
      if (this.downButton.contains(x, y)) {
        console.log("MOVE DOWN");
        if (bottom) {
          this.move("DOWN", bottom);
        }
      }
      if (this.leftButton.contains(x, y)) {
        console.log("MOVE LEFT");
        console.log("left tile is: ", left);
        if (left) {
          this.move("LEFT", left);
        }
      }
      if (this.rightButton.contains(x, y)) {
        console.log("MOVE RIGHT");
        if (right) {
          this.move("RIGHT", right);
        }
      }
    });
  } //END CONSTRUCTOR

  private addController(stage: PIXI.Container) {
    const width = 64;
    const height = 64;
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
    stage.addChild(
      this.controller.drawRect(
        this.leftButton.x,
        this.leftButton.y,
        this.leftButton.width,
        this.leftButton.height
      )
    );
    stage.addChild(
      this.controller.drawRect(
        this.rightButton.x,
        this.rightButton.y,
        this.rightButton.width,
        this.rightButton.height
      )
    );
    stage.addChild(
      this.controller.drawRect(
        this.upButton.x,
        this.upButton.y,
        this.upButton.width,
        this.upButton.height
      )
    );
    stage.addChild(
      this.controller.drawRect(
        this.downButton.x,
        this.downButton.y,
        this.downButton.width,
        this.downButton.height
      )
    );
  }

  public loadLevel() {
    // const level = document.getElementById("#idHEre");
  }

  public getTiles() {
    return this.tiles;
  }

  // public nullBoard() {
  //   for (let y = 0; y < World.NO_OF_TILES_Y; y++) {
  //     for (let x = 0; x < World.NO_OF_TILES_X; x++) {
  //       this.tiles[y][x] = null;
  //     }
  //   }
  // }

  public doStuff() {}

  public isValidMove(touch: Point) {
    // console.log("isVaidMove...");
    if (this.player) {
      const pos = this.player.getPosition();
      const x = pos.x;
      const y = pos.y;
      let p: Point = { x, y };
      //get the players tile
      // console.log("player tile: ", p);

      //get the touches tile
      // console.log("touch: ", touch);

      //get adjacent tiles to player
      let adjTilesPlayer: Array<Tile> = [];
      const top = this.getTile(x, y - 1);
      const bottom = this.getTile(x, y + 1);
      const left = this.getTile(x - 1, y);
      const right = this.getTile(x + 1, y);
      if (top) {
        adjTilesPlayer.push(top);
        if (debug) {
          this.drawBounds(top);
        }
        if (touch.x == top.pos.x && touch.y == top.pos.y) {
          this.move("UP", top);
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
  }

  private isAdj(adjTilesPlayer: Array<Tile>, touch: Point) {
    let found = null;
    adjTilesPlayer.forEach(element => {
      // element.setPos(element.getX() + 10, element.getY());
      if (element) {
        if (touch.x == element.pos.x && touch.y == element.pos.y) {
          found = touch;
          return found;
        }
      } else {
        console.log("adjacent tile is out of map");
      }
    });
    return found;
  }

  private swap(t1: Tile, t2: Tile) {
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
  }

  private inWorld(x: number, y: number) {
    return x >= 0 && x < this.x_tiles && y >= 0 && y < this.y_tiles;
  }

  private getTile(x: number, y: number) {
    if (this.inWorld(x, y)) {
      return this.tiles[y][x];
    }
  }

  private move(dir: Dir, tile: Tile) {
    switch (dir) {
      case "UP":
        if (tile.getTileType() != Tile.BLOCK) {
          console.log("move up...");
          // this.playerTile.move(tile.getX(), tile.getY());

          this.player.move(tile.getX(), tile.getY());
          this.player.setPosition(tile.pos.x, tile.pos.y);
          // this.player.position.x = tile.tile.x;
          // this.player.position.y = tile.tile.y;
        } else {
          console.log("wall above");
        }
        break;
      case "DOWN":
        if (tile.getTileType() != Tile.BLOCK) {
          console.log("move down...");
          this.player.move(tile.getX(), tile.getY());
          this.player.setPosition(tile.pos.x, tile.pos.y);
        } else {
          console.log("wall below");
        }
        break;
      case "LEFT":
        if (tile.getTileType() != Tile.BLOCK) {
          console.log("move left...");
          this.player.move(tile.getX(), tile.getY());
          this.player.setPosition(tile.pos.x, tile.pos.y);
        } else {
          console.log("wall left");
        }
        break;
      case "RIGHT":
        if (tile.getTileType() != Tile.BLOCK) {
          console.log("move right...");
          this.player.move(tile.getX(), tile.getY());
          this.player.setPosition(tile.pos.x, tile.pos.y);
        } else {
          console.log("wall right");
        }
        break;
    }
    // }
  }

  //===============================================================================
  // private resetAlpha() {
  //   for (let y = 0; y < this.height; y++) {
  //     for (let x = 0; x < this.width; x++) {
  //       this.tiles[y][x].getSprite().alpha = 1;
  //     }
  //   }
  // }

  private drawBounds(tile: Tile) {
    this.graphics.drawRect(
      tile.getX() + this.xShift,
      tile.getY() + this.yShift,
      64,
      64
    );
  }
}
