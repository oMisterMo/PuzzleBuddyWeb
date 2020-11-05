// class Assets{

// }

//Level
const levels = "assets/levels/levels.json";

//Main tiles
const TILE_BLANK = "assets/tile_blank.png";
const TILE_BOX = "assets/wooden_box.png";
const TILE_BOX_HOME = "assets/wooden_box_home.png";
const TILE_BLOCK = "assets/tile_block.png";
const TILE_PLAYER = "assets/player0.png";

//Extras
const TILE_MO = "assets/mo.png";
const TILE_HOME = "assets/home.png";
const TILE_LEFT = "assets/lefta.png";
const TILE_RIGHT = "assets/righta.png";
const TILE_SKULL = "assets/skull.png";
const TILE_SKULL2 = "assets/skull2.png";
const TILE_SKULL3 = "assets/skull3.png";

//Clouds
const NO_OF_CLOUDS = 7;
const CLOUDS = (() => {
  const arr = [];
  for (let i = 0; i < NO_OF_CLOUDS; i++) {
    arr.push("assets/sky/cloud" + (i + 1 + ".png"));
  }
  return arr;
})();

const NO_OF_WORLD1 = 9;
const WORLD1 = (() => {
  const arr = [];
  for (let i = 0; i < NO_OF_WORLD1; i++) {
    arr.push("assets/levels/world1/level" + (i + 1) + ".png");
  }
  return arr;
})();

console.log("WORLD1: ", WORLD1);

function loadAssets() {
  let assets = [
    TILE_BLANK,
    TILE_BOX,
    TILE_BOX_HOME,
    TILE_BLOCK,
    TILE_PLAYER,
    TILE_MO,
    TILE_HOME,
    TILE_LEFT,
    TILE_RIGHT,
    TILE_SKULL,
    TILE_SKULL2,
    TILE_SKULL3
  ];

  let world1: string[] = [];
  for (let i = 0; i < 9; i++) {
    world1[i] = "assets/levels/world1/level" + (i + 1) + ".png";
  }

  assets = assets
    .concat(CLOUDS)
    .concat(WORLD1)
    .concat(["assets/levels/world1/level1.txt"])
    .concat(["assets/levels/levels.json"]);
  return assets;
}
