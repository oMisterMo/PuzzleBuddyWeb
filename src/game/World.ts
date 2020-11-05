class World {
  public TILE_WIDTH = 64;
  public TILE_HEIGHT = 64;

  //The largest size of our world
  public static NO_OF_TILES_X = 18; //20 total tiles (-2 padding)
  public static NO_OF_TILES_Y = 9; //11 total tiles (-2 tile down)
  public static NO_OF_LEVELS = 24; //Total number of levels (update with new world)
  public NO_OF_LEVELS = 24; //Total number of levels (update with new world)

  private tiles: Array<Array<Tile>>; //multidimensional array

  //Moves the world (x, y) units
  private xShift = 0;
  private yShift = 0;

  constructor(stage: PIXI.Container) {
    interface Level {
      width: number;
      height: number;
      data: string;
    }
    //The container level we are playing
    const currentLevel: PIXI.Container = new PIXI.Container();
    //set up stuff
    const level = resources["assets/levels/levels.json"];
    console.log("level: ", level.data);
    console.log("leve type: ", typeof level.data);
    const levelJson: Array<Level> = level.data.levels;
    console.log("levelJson: ", levelJson);
    const level1 = levelJson[0];
    console.log("first level: ", level1);
    const width = level1.width;
    const height = level1.height;
    console.log("width: ", width);
    console.log("height: ", height);

    // Initilise the multiple dimential array
    let i = 0;
    this.tiles = new Array(height); //[tile, tile, tile]
    for (let y = 0; y < height; y++) {
      this.tiles[y] = new Array(width);
    }
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let tile = Tile.TILE_EMPTY;
        const tileType = level1.data.charAt(i);
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

        this.tiles[y][x] = new Tile(
          x * this.TILE_WIDTH,
          y * this.TILE_HEIGHT,
          tile,
          currentLevel
        );
        i++;
      }
    }

    stage.addChild(currentLevel);
    // const extract: PIXI.Extract = app.renderer.plugins.extract;
    // console.log("extract: ", extract);
    // let pixels = extract.pixels(level);
    // console.log("pixels: ", pixels);
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
}
