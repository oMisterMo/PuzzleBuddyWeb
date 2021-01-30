console.log("Tile loading...");
class Tile {
  //All type of tiles
  // public static TILE_EMPTY = 0;
  // public static TILE_BOX = 1;
  // public static TILE_BOX_HOME = 2;
  // public static TILE_BLOCK = 3;
  // public static TILE_HOME = 4;
  // public static TILE_PLAYER = 5;
  // protected tileType = Tile.TILE_EMPTY;
  protected tileType: TileType = "EMPTY";

  private x: number;
  private y: number;
  public pos: Point; //currents tile position in the array (const)
  // public playerTile: Point;

  // private sprite = new PIXI.Sprite();
  protected sprite: PIXI.Sprite;

  constructor(
    x: number,
    y: number,
    type: TileType,
    tile: Point,
    // sprite: PIXI.Sprite,
    stage: PIXI.Container
  ) {
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

  public setTileType(type: TileType) {
    this.tileType = type;
  }

  public getTileType() {
    return this.tileType;
  }

  public getX() {
    return this.x;
  }

  public getY() {
    return this.y;
  }

  public getSprite() {
    return this.sprite;
  }
}
