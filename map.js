'use strict';
let mapW = {};
let mapH = {};
let mapNo = 0;
mapW[0] = 25;
mapH[0] = 25;
mapW[1] = 10;
mapH[1] = 11;
mapW[2] = 10;
mapH[2] = 11;
mapW[3] = 10;
mapH[3] = 11;
mapW[4] = 10;
mapH[4] = 11;
let ctx = null,
    tileW = 40, tileH = 40,    
    currentSecond = 0, frameCount = 0, framesLastSecond = 0,
    lastFrameTime = 0;

let keysDown = {
    16: false,
    37: false,
    38: false,
    39: false,
    40: false,
    101: false
};

let directions = {
  up    : 0,
  rigth : 1,
  down  : 2,
  left  : 3
};

let  floorTypes = {
  solid   : 0,
  path    : 1,
  water   : 2,
  ice     : 3
};

let water = new Image(),
    path = new Image(),
    grass = new Image(),
    wall = new Image(),
    tree = new Image(),
    snow = new Image(),
    ice = new Image(),
    sand = new Image(),
    bush = new Image(),
    objectTree = new Image(),
    stone = new Image(),
    tallGrass = new Image(),
    hero = new Image();

water.src = 'sprites/water.jpg';
path.src = 'sprites/path.jpg';
grass.src = 'sprites/grass.jpg';
wall.src = 'sprites/wall.jpg';
tree.src = 'sprites/tree.jpg';
snow.src = 'sprites/snow.jpg';
ice.src = 'sprites/ice.jpg';
sand.src = 'sprites/sand.jpg';
bush.src = 'sprites/bush.jpg';
hero.src = 'sprites/hero.png';
tallGrass.src = 'sprites/grass.png';
stone.src = 'sprites/stone.png';
objectTree.src = 'sprites/tree.png';

let tileTypes = {
  0: {floor:floorTypes.solid, sprite: wall}, //стена
  1: {floor:floorTypes.path, sprite: grass}, //трава
  2: {floor:floorTypes.path, sprite: path}, //дорога
  3: {floor:floorTypes.solid, sprite: tree}, //деревья
  4: {floor:floorTypes.water, sprite: water}, //вода
  5: {floor:floorTypes.path, sprite: bush}, //кусты
  6: {floor:floorTypes.path, sprite: snow}, //снег
  7: {floor:floorTypes.path, sprite: sand}, //песок
  8: {floor:floorTypes.ice, sprite: ice} //лед
};

function Tile(tx, ty, tt){
  this.x          = tx;
  this.y          = ty;
  this.type       = tt;
  this.eventEnter = null;
  this.object     = null;
}

function TileMap() {
  this.map   = [];
  this.w     = 0;
  this.h     = 0;
  this.layar = 4;
}

TileMap.prototype.buildMapFromData = function(d, w, h) {
  this.w = w;
  this.h = h;
  if(d.length != (w*h)) {
    return false;
  }
  this.map.length = 0;
  for(let y = 0; y < h; y++) {
    for(let x = 0; x < w; x++) {
      this.map.push(new Tile(x, y, d[((y*w) + x)]));
    }
  }
  return true;
}

let objectCollision = {
  none     : 0,
  solid    : 1,
  moveable : 2
};

let objectTypes = {
  1 : {
    name : "Tree",
    sp : objectTree,
    sprite : [{x:0, y:0, w:80, h:100}],
    offset : [-20, -60],
    collision : objectCollision.solid,
    zIndex : 3
  },
  2 : {
    name : "Tall Grass",
    sp : tallGrass,
    sprite : [{x:0, y:0, w:40, h:50}],
    offset : [0, -10],
    collision : objectCollision.none,
    zIndex : 2
  },
  3 : {
    name : "Stone",
    sp : stone,
    sprite : [{x:0, y:0, w:40, h:44}],
    offset : [0,-4],
    collision : objectCollision.solid,
    zIndex : 2
  }
}

function MapObject(a) {
  this.x    = 0;
  this.y    = 0;
  this.type = a;
}

MapObject.prototype.placeAt = function(nx, ny, mapN) {
  if(mapTileData[mapN].map[toIndex(this.x, this.y)].object == this){
    mapTileData[mapN].map[toIndex(this.x, this.y)].object = null;
  }
  this.x = nx;
  this.y = ny;
  mapTileData[mapN].map[toIndex(nx, ny)].object = this;
};

let mapTileData = {}
mapTileData[0] = new TileMap();
mapTileData[1] = new TileMap();
mapTileData[2] = new TileMap();
mapTileData[3] = new TileMap();
mapTileData[4] = new TileMap();

let player = new Character();

let gameMap = {};
    gameMap[0] =[
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
    0, 2, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 2, 1, 1, 1, 1, 1, 6, 8, 8, 8, 8, 2, 0,
    0, 2, 7, 4, 4, 4, 4, 4, 4, 7, 1, 1, 2, 1, 1, 1, 1, 1, 6, 6, 8, 8, 8, 2, 0,
    0, 2, 7, 4, 4, 4, 4, 4, 4, 7, 1, 1, 2, 1, 0, 0, 1, 1, 1, 6, 6, 8, 8, 2, 0,
    0, 2, 7, 4, 4, 4, 4, 4, 4, 7, 1, 1, 2, 2, 0, 0, 1, 1, 1, 1, 6, 6, 8, 2, 0,
    0, 2, 7, 4, 4, 4, 4, 4, 7, 7, 1, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 6, 6, 2, 0,
    0, 2, 7, 4, 4, 4, 4, 7, 7, 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0,
    0, 2, 7, 7, 4, 4, 7, 7, 1, 0, 0, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 0,
    0, 2, 7, 7, 7, 4, 7, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 0,
    0, 2, 1, 1, 1, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 1, 1, 2, 0,
    0, 2, 1, 1, 1, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 5, 5, 2, 2, 5, 5, 1, 2, 0,
    0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
    0, 2, 1, 1, 1, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0,
    0, 2, 1, 1, 1, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0,
    0, 2, 1, 5, 1, 4, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0,
    0, 2, 1, 5, 1, 4, 1, 1, 3, 3, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0,
    0, 2, 1, 5, 1, 4, 1, 1, 3, 3, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0,
    0, 2, 1, 5, 1, 4, 4, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 2, 0,
    0, 2, 1, 5, 1, 1, 4, 4, 4, 4, 4, 4, 2, 4, 4, 4, 4, 4, 2, 2, 4, 4, 4, 2, 0,
    0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0,
    0, 2, 1, 3, 1, 1, 1, 1, 1, 3, 1, 5, 2, 5, 1, 1, 1, 3, 2, 2, 3, 1, 1, 2, 0,
    0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 5, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0,
    0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

gameMap[1] =[
     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
     0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
     0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
     0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
     0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
     2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
     0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
     0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
     0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
     0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
     0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

gameMap[2] = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 2, 0,
];

gameMap[3] = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 0, 0, 0, 2, 2, 0, 0, 0, 0,
];

gameMap[4] = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 2, 2, 2, 2, 2, 2, 2, 2, 0,
  0, 0, 0, 0, 2, 2, 0, 0, 0, 0,
];

let viewport = {
  screen    :[0, 0],
  startTile :[0, 0],
  endTile   :[0, 0],
  offset    :[0, 0],
    
  update    :function(px, py) {
    this.offset[0] = Math.floor((this.screen[0] / 2) - px);
    this.offset[1] = Math.floor((this.screen[1] / 2) - py);
      
    var tile = [
      Math.floor(px / tileW),
      Math.floor(py / tileH)
    ];
      
    this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0] / 2) / tileW);
    this.startTile[1] = tile[1] - 1 - Math.ceil((this.screen[1] / 2) / tileH);
      
    if(this.startTile[0] < 0){
      this.startTile[0] = 0;
    }
      if(this.startTile[1] < 0){
      this.startTile[1] = 0;
    }
      
    this.endTile[0] = tile[0] + 1 + Math.ceil((this.screen[0] / 2) / tileW);
    this.endTile[1] = tile[1] + 1 + Math.ceil((this.screen[1] / 2) / tileH);
      
    if(this.endTile[0] >= mapW[mapNo]) {
      this.endTile[0] = mapW[mapNo] - 1;
    }
    if(this.endTile[1] >= mapH[mapNo]) {
      this.endTile[1] = mapH[mapNo] - 1;
    }
  }
};

function Character() {
  this.tileFrom = [1, 1];
  this.tileTo = [1, 1];
  this.timeMoved = 0;
  this.dimensions = [30, 30];
  this.position = [45, 45];
  this.delayMove = 150;
  this.direction = directions.down;
  this.sprites = {};
  this.sprites[directions.down] = [{x:4, y:20, w:20, h:30}];
  this.sprites[directions.up] = [{x:4, y:320, w:20, h:30}];
  this.sprites[directions.left] = [{x:4, y:120, w:18, h:30}];
  this.sprites[directions.right] = [{x:4, y:220, w:18, h:30}];
}

Character.prototype.placeAt = function(x, y){
  this.tileFrom = [x, y];
  this.tileTo = [x, y];
  this.position = [((tileW*x) + ((tileW - this.dimensions[0]) / 2)),
                   ((tileH*y) + ((tileH - this.dimensions[1]) / 2))];
};

Character.prototype.processMovement = function(t) {
    if(this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) {
      return false;
    }
    
    if((t - this.timeMoved) >= this.delayMove) {
      this.placeAt(this.tileTo[0], this.tileTo[1]);
      
      if(mapTileData[mapNo].map[toIndex(this.tileTo[0], this.tileTo[1])].eventEnter != null){
        mapTileData[mapNo].map[toIndex(this.tileTo[0], this.tileTo[1])].eventEnter(this);
      }
        
      let tileFloor = tileTypes[mapTileData[mapNo].map[toIndex(this.tileFrom[0], this.tileFrom[1])]].floor;
      if(tileFloor == floorTypes.ice){
        if(this.canMoveDirection(this.direction)){
          this.moveDirection(this.direction, t);
        }
      }
    }
    
    else {
      this.position[0] = (this.tileFrom[0]*tileW) + ((tileW - this.dimensions[0])/2);
      this.position[1] = (this.tileFrom[1]*tileH) + ((tileH - this.dimensions[1])/2);
        
      if(this.tileTo[0] != this.tileFrom[0]) {
        let diff = (tileW / this.delayMove)*(t - this.timeMoved);
        this.position[0] += (this.tileTo[0] < this.tileFrom[0] ? 0 - diff : diff);
      }
        
      if(this.tileTo[1] != this.tileFrom[1]) {
        let diff = (tileH / this.delayMove)*(t - this.timeMoved);
        this.position[1] += (this.tileTo[1] < this.tileFrom[1] ? 0 - diff : diff);
      }
        
      this.position[0] = Math.round(this.position[0]);
      this.position[1] = Math.round(this.position[1]);
    }
    return true;
};

Character.prototype.canMoveTo = function(x, y) {
  if(x < 0 || x >= mapW[mapNo] || y < 0 || y >= mapH[mapNo]) {
      return false;
  }
  if(tileTypes[mapTileData[mapNo].map[toIndex(x, y)]].floor != floorTypes.path && tileTypes[mapTileData[mapNo].map[toIndex(x, y)]].floor != floorTypes.ice) {
      return false;
  }
  if(mapTileData[mapNo].map[toIndex(x, y)].object != null){
    let o = mapTileData[mapNo].map[toIndex(x, y)].object;
    if(objectTypes[o.type].collision == objectCollision.solid){
      return false;
    }
  }
  return true;
};

Character.prototype.canMoveLeft = function() {
  return this.canMoveTo(this.tileFrom[0] - 1, this.tileFrom[1]);
};
Character.prototype.canMoveRight = function() {
  return this.canMoveTo(this.tileFrom[0] + 1, this.tileFrom[1]);
};
Character.prototype.canMoveDown = function() {
  return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] + 1);
};
Character.prototype.canMoveUp = function() {
  return this.canMoveTo(this.tileFrom[0], this.tileFrom[1] - 1);
};

Character.prototype.canMoveDirection = function(d){
  switch(d){
    case directions.up:
      return this.canMoveUp();
    case directions.down:
      return this.canMoveDown();
    case directions.left:
      return this.canMoveLeft();
    case directions.right:
      return this.canMoveRight();
  }
};

Character.prototype.MoveLeft = function(t) {
  this.tileTo[0]--;
  this.timeMoved = t;
  this.direction = directions.left;
};
Character.prototype.MoveRight = function(t) {
  this.tileTo[0]++;
  this.timeMoved = t;
  this.direction = directions.right;
};
Character.prototype.MoveDown = function(t) {
  this.tileTo[1]++;
  this.timeMoved = t;
  this.direction = directions.down;
};
Character.prototype.MoveUp = function(t) {
  this.tileTo[1]--;
  this.timeMoved = t;
  this.direction = directions.up;
};

Character.prototype.moveDirection = function(d , t) {
  switch(d) {
    case directions.up:
      return this.MoveUp(t);
    case directions.down:
      return this.MoveDown(t);
    case directions.left:
      return this.MoveLeft(t);
    case directions.right:
      return this.MoveRight(t);
  }
};

function toIndex(x, y) {
  return ((y * mapW[mapNo]) + x);
}

window.onload = function() {
    
    ctx = document.getElementById('game').getContext('2d');
    requestAnimationFrame(drawGame);
    
    window.addEventListener("keydown", function(e) {
      if((e.keyCode >= 37 && e.keyCode <= 40) || (e.keyCode == 16) || (e.keyCode==101)) {
        keysDown[e.keyCode] = true;
      }
    });
    
    window.addEventListener("keyup", function(e) {
      if((e.keyCode >= 37 && e.keyCode <= 40) || (e.keyCode == 16) || (e.keyCode==101)) {
        keysDown[e.keyCode] = false;
      }
    });
    
    viewport.screen =[
      document.getElementById('game').width,
      document.getElementById('game').height
    ];
    
    hero.onerror = function() {
      ctx = null;
      alert("Не получилось загрузить спрайт");
    };
    mapTileData[0].buildMapFromData(gameMap[0], mapW[0], mapH[0]);
    mapTileData[1].buildMapFromData(gameMap[1], mapW[1], mapH[1]);
    mapTileData[2].buildMapFromData(gameMap[2], mapW[2], mapH[2]);
    mapTileData[3].buildMapFromData(gameMap[3], mapW[3], mapH[3]);
    mapTileData[4].buildMapFromData(gameMap[4], mapW[4], mapH[4]);

    mapTileData[0].map[((5*mapW[0]) + 13)].eventEnter = function(c){
      if(player.direction == directions.right){
        mapNo = 1;
        c.placeAt(0,5);
      }
    };

    mapTileData[0].map[((9*mapW[0]) + 10)].eventEnter = function(c){
      if(player.direction == directions.up){
        mapNo = 2;
        c.placeAt(8,9);
      }
    };

    mapTileData[0].map[((11*mapW[0]) + 18)].eventEnter = function(c){
      if(player.direction == directions.up){
        mapNo = 3;
        c.placeAt(4,9);
      }
    };

    mapTileData[0].map[((11*mapW[0]) + 19)].eventEnter = function(c){
      if(player.direction == directions.up){
        mapNo = 3;
        c.placeAt(5,9);
      }
    };

    mapTileData[0].map[((18*mapW[0]) + 18)].eventEnter = function(c){
      if(player.direction == directions.up){
        mapNo = 4;
        c.placeAt(4,9);
      }
    };

    mapTileData[0].map[((18*mapW[0]) + 19)].eventEnter = function(c){
      if(player.direction == directions.up){
        mapNo = 4;
        c.placeAt(5,9);
      }
    };

    mapTileData[1].map[((5*mapW[1]) + 0)].eventEnter = function(c){
      if(player.direction == directions.left){
        mapNo = 0;
        c.placeAt(13,5);
      }
    };

    mapTileData[2].map[((9*mapW[2]) + 8)].eventEnter = function(c){
      if(player.direction == directions.down){
        mapNo = 0;
        c.placeAt(10,9);
      }
    };

    mapTileData[3].map[((9*mapW[3]) + 4)].eventEnter = function(c){
      if(player.direction == directions.down){
        mapNo = 0;
        c.placeAt(18,11);
      }
    };

    mapTileData[3].map[((9*mapW[3]) + 5)].eventEnter = function(c){
      if(player.direction == directions.down){
        mapNo = 0;
        c.placeAt(19,11);
      }
    };

    mapTileData[4].map[((9*mapW[4]) + 4)].eventEnter = function(c){
      if(player.direction == directions.down){
        mapNo = 0;
        c.placeAt(18,18);
      }
    };

    mapTileData[4].map[((9*mapW[4]) + 5)].eventEnter = function(c){
      if(player.direction == directions.down){
        mapNo = 0;
        c.placeAt(19,18);
      }
    };

    let tree1 = new MapObject(1),
        tree2 = new MapObject(1),
        grass1 = new MapObject(2),
        grass2 = new MapObject(2),
        stone1 = new MapObject(3),
        stone2 = new MapObject(3);
    tree1.placeAt(2, 13, 0);
    tree2.placeAt(9, 9, 0);
    grass1.placeAt(2, 10, 0);
    grass2.placeAt(2, 11, 0);
    stone1.placeAt(2, 2, 0);
    stone2.placeAt(7, 10, 0);
};


function drawGame() {
    
    if(ctx == null) return;
    
    let currentFrameTime = Date.now(),
        timeElapsed = currentFrameTime - lastFrameTime;
    
    let sec = Math.floor(Date.now() / 1000);
    
    if(sec != currentSecond) {
      currentSecond = sec;
      framesLastSecond = frameCount;
      frameCount = 1;
    }
    else frameCount++;
    
    if(keysDown[16]) {
      player.delayMove = 75;
    }
    else {
      player.delayMove = 150;
    }
    
    if(!player.processMovement(currentFrameTime)) {
      if(keysDown[38]) {
        if(player.direction != directions.up) {
          player.direction = directions.up;
        }
        else
        if(player.canMoveUp()) {
          player.MoveUp(currentFrameTime);
        }
      }
      else if(keysDown[40]) {
        if(player.direction != directions.down) {
          player.direction = directions.down;
        }
        else
        if(player.canMoveDown()) {
          player.MoveDown(currentFrameTime);
        }
      }
      else if(keysDown[39]) {
        if(player.direction != directions.right) {
          player.direction = directions.right;
        }
        else
        if(player.canMoveRight()) {
          player.MoveRight(currentFrameTime);
        }
      }
      else if(keysDown[37]) {
        if(player.direction != directions.left) {
          player.direction = directions.left;
        }
        else
        if(player.canMoveLeft()) {
          player.MoveLeft(currentFrameTime);
        }
      }
    }

    viewport.update(
      player.position[0] + (player.dimensions[0] / 2),
      player.position[1] + (player.dimensions[1] / 2),
    );

    ctx.fillStyle ="#071408"
    ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);
    for(let z = 0; z < mapTileData[mapNo].layar; z++) {
      for(let y = viewport.startTile[1]; y <= viewport.endTile[1]; y++) {
         for(let x = viewport.startTile[0]; x <= viewport.endTile[0]; x++) {
           if(z == 0){
               ctx.drawImage(tileTypes[mapTileData[mapNo].map[toIndex(x, y)].type].sprite,
                         viewport.offset[0] + x*tileW, viewport.offset[1] + y*tileH,
                          tileW, tileH);
           }
           let o = mapTileData[mapNo].map[toIndex(x, y)].object;
           if(o != null && objectTypes[o.type].zIndex == z){
              let b = objectTypes[o.type];
              ctx.drawImage(b.sp, b.sprite[0].x, b.sprite[0].y, b.sprite[0].w, b.sprite[0].h, viewport.offset[0] + (x*tileW) + b.offset[0],
                           viewport.offset[1] + (y*tileH) + b.offset[1],
                           b.sprite[0].w, b.sprite[0].h);
              }
          }
      }
      if(z==1){
          ctx.fillStyle = "#0000ff";
          let sprite = player.sprites[player.direction];
          ctx.drawImage(hero, sprite[0].x, sprite[0].y, sprite[0].w, sprite[0].h, 
                       viewport.offset[0] + player.position[0], 
                       viewport.offset[1] + player.position[1], 
                       player.dimensions[0], player.dimensions[1]);
     }
  }
  lastFrameTime = currentFrameTime;
  requestAnimationFrame(drawGame);
}
