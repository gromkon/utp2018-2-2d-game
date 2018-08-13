'use strict';
let mapNo = 0;
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

function Tile(tx, ty, tt) {
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
      
    if(this.startTile[0] < 0) {
      this.startTile[0] = 0;
    }
      if(this.startTile[1] < 0) {
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

    mapTileData[0].map[((5*mapW[0]) + 13)].eventEnter = function(c) {
      if(player.direction == directions.right) {
        mapNo = 1;
        c.placeAt(0,5);
      }
    };

    mapTileData[0].map[((9*mapW[0]) + 10)].eventEnter = function(c) {
      if(player.direction == directions.up) {
        mapNo = 2;
        c.placeAt(8,9);
      }
    };

    mapTileData[0].map[((11*mapW[0]) + 18)].eventEnter = function(c) {
      if(player.direction == directions.up) {
        mapNo = 3;
        c.placeAt(4,9);
      }
    };

    mapTileData[0].map[((11*mapW[0]) + 19)].eventEnter = function(c) {
      if(player.direction == directions.up) {
        mapNo = 3;
        c.placeAt(5,9);
      }
    };

    mapTileData[0].map[((18*mapW[0]) + 18)].eventEnter = function(c) {
      if(player.direction == directions.up) {
        mapNo = 4;
        c.placeAt(4,9);
      }
    };

    mapTileData[0].map[((18*mapW[0]) + 19)].eventEnter = function(c) {
      if(player.direction == directions.up) {
        mapNo = 4;
        c.placeAt(5,9);
      }
    };

    mapTileData[1].map[((5*mapW[1]) + 0)].eventEnter = function(c) {
      if(player.direction == directions.left) {
        mapNo = 0;
        c.placeAt(13,5);
      }
    };

    mapTileData[2].map[((9*mapW[2]) + 8)].eventEnter = function(c) {
      if(player.direction == directions.down) {
        mapNo = 0;
        c.placeAt(10,9);
      }
    };

    mapTileData[3].map[((9*mapW[3]) + 4)].eventEnter = function(c) {
      if(player.direction == directions.down) {
        mapNo = 0;
        c.placeAt(18,11);
      }
    };

    mapTileData[3].map[((9*mapW[3]) + 5)].eventEnter = function(c) {
      if(player.direction == directions.down) {
        mapNo = 0;
        c.placeAt(19,11);
      }
    };

    mapTileData[4].map[((9*mapW[4]) + 4)].eventEnter = function(c) {
      if(player.direction == directions.down) {
        mapNo = 0;
        c.placeAt(18,18);
      }
    };

    mapTileData[4].map[((9*mapW[4]) + 5)].eventEnter = function(c) {
      if(player.direction == directions.down) {
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
