console.log("Player loading...");
class Player {
  private pos: Point;
  public sprite: PIXI.Sprite;

  constructor(x: number, y: number) {
    this.pos = { x, y };
    this.sprite = new Sprite(resources[TILE_PLAYER].texture);
  }

  public move(x: number, y: number) {
    // console.log("MOOOVE it move it");
    this.sprite.position.set(x, y);
  }

  public setPosition(x: number, y: number) {
    this.pos.x = x;
    this.pos.y = y;
  }

  public getPosition() {
    return this.pos;
  }
}
