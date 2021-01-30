console.log("Sky loading...");
class Sky {
  private sky: PIXI.Container;
  private NO_OF_CLOUDS = 2; //7 clouds available
  private clouds: Array<PIXI.Sprite>;

  constructor(stage: PIXI.Container) {
    this.sky = new Container();
    this.clouds = new Array<PIXI.Sprite>(this.NO_OF_CLOUDS);
    for (let i = 0; i < this.NO_OF_CLOUDS; i++) {
      this.clouds[i] = new Sprite(resources[CLOUDS[i]].texture);
    }

    //Add clouds to scene
    for (let cloud of this.clouds) {
      //set random pos
      cloud.x = Math.random() * SCREEN_WIDTH + cloud.width;
      cloud.y = Math.random() * SCREEN_HEIGHT - cloud.height;

      //add cloud
      this.sky.addChild(cloud);
    }

    stage.addChild(this.sky);
  }

  public update(delta: number) {
    for (let cloud of this.clouds) {
      cloud.x -= 2 * delta;
      if (cloud.x < 0 - cloud.width) {
        cloud.x = SCREEN_WIDTH + 10;
        cloud.y = Math.random() * SCREEN_HEIGHT - cloud.height;
        // console.log("new y: ", cloud.y);
      }
    }
  }

  public draw(delta: number) {}
}
