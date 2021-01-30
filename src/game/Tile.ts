console.log("Tile loading...");
class Tile {
  public static EMPTY: TileType = "EMPTY";
  public static BOX: TileType = "BOX";
  public static BOX_HOME: TileType = "BOX_HOME";
  public static BLOCK: TileType = "BLOCK";
  public static HOME: TileType = "HOME";
  public static PLAYER: TileType = "PLAYER";

  //HOME/PLAYER/HOME...
  protected tileType: TileType = Tile.EMPTY;

  //The screen coordinates
  private x: number;
  private y: number;
  //currents tile position in the array (const)
  public pos: Point;

  //The sprite holds the postion drawn to the screen
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
