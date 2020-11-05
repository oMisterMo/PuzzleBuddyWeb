class Tile {
  //All type of tiles
  public static TILE_EMPTY = 0;
  public static TILE_BOX = 1;
  public static TILE_BOX_HOME = 2;
  public static TILE_BLOCK = 3;
  public static TILE_HOME = 4;
  public static TILE_PLAYER = 5;
  private tileType = Tile.TILE_EMPTY;

  private x: number;
  private y: number;

  // private sprite = new PIXI.Sprite();
  private sprite: PIXI.Sprite;

  constructor(
    x: number,
    y: number,
    type: number,
    // sprite: PIXI.Sprite,
    stage: PIXI.Container
  ) {
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

  public setPos(x: number, y: number) {
    this.sprite.position.set(x, y);
  }

  public setTileType(tileType: number) {
    this.tileType = tileType;
    this.updateSprite();
  }

  public updateSprite() {
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
  }
}
