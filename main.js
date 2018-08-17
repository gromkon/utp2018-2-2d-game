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
  this.layer = 4;
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
    if(mapTileData[mapN].map[toIndex(this.x, this.y)].object == this) {
        mapTileData[mapN].map[toIndex(this.x, this.y)].object = null;
    }
    
    this.x = nx;
    this.y = ny;
    
    let tmp = mapNo;
    mapNo = mapN;
    
    mapTileData[mapN].map[toIndex(nx, ny)].object = this;
    
    mapNo = tmp;
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
      
    this.startTile[0] = tile[0] - 5 - Math.ceil((this.screen[0]) / tileW);
    this.startTile[1] = tile[1] - 5 - Math.ceil((this.screen[1]) / tileH);
      
    if(this.startTile[0] < 0) {
      this.startTile[0] = 0;
    }
      if(this.startTile[1] < 0) {
      this.startTile[1] = 0;
    }
      
    this.endTile[0] = tile[0] + 5 + Math.ceil((this.screen[0] / 2) / tileW);
    this.endTile[1] = tile[1] + 5 + Math.ceil((this.screen[1] / 2) / tileH);
      
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
      if(e.keyCode == 83) {
        currentSpeed = (currentSpeed >= (gameSpeeds.length - 1) ? 0 : currentSpeed + 1)
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

    mapTileData[0].map[((5*mapW[0]) + 14)].eventEnter = function(c) {
      if(player.direction == directions.right) {
        mapNo = 1;
        player.direction = directions.up;
        c.placeAt(5, 22);
      }
    };

    mapTileData[0].map[((10*mapW[0]) + 10)].eventEnter = function(c) {
      if(player.direction == directions.up) {
        mapNo = 2;
        c.placeAt(8,10);
      }
    };

    mapTileData[0].map[((12*mapW[0]) + 18)].eventEnter = function(c) {
      if(player.direction == directions.up) {
        mapNo = 3;
        c.placeAt(4,10);
      }
    };

    mapTileData[0].map[((12*mapW[0]) + 19)].eventEnter = function(c) {
      if(player.direction == directions.up) {
        mapNo = 3;
        c.placeAt(5,10);
      }
    };

    mapTileData[0].map[((19*mapW[0]) + 18)].eventEnter = function(c) {
      if(player.direction == directions.up) {
        mapNo = 4;
        c.placeAt(4,10);
      }
    };

    mapTileData[0].map[((19*mapW[0]) + 19)].eventEnter = function(c) {
      if(player.direction == directions.up) {
        mapNo = 4;
        c.placeAt(5,10);
      }
    };

    mapTileData[1].map[((23*mapW[1]) + 5)].eventEnter = function(c) {
      if(player.direction == directions.down) {
        mapNo = 0;
        player.direction = directions.left;
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
    
    let tree01 = new MapObject(1),
        tree02 = new MapObject(1),
        grass1 = new MapObject(2),
        grass2 = new MapObject(2),
        stone1 = new MapObject(3),
        stone2 = new MapObject(3),
        
        roof01 = new MapObject(4),
        roof02 = new MapObject(4),
        
        roof1 = new MapObject(5),
        roof2 = new MapObject(6),
        roof3 = new MapObject(7),
        roof31 = new MapObject(8),
        roof32 = new MapObject(8),
        
        tree11 = new MapObject(1),
        tree12 = new MapObject(1),
        tree13 = new MapObject(1),
        tree14 = new MapObject(1),
        tree15 = new MapObject(1),
        
        fountain = new MapObject(9);
    
    tree01.placeAt(2, 13, 0);
    tree02.placeAt(9, 9, 0);
    grass1.placeAt(2, 10, 0);
    grass2.placeAt(2, 11, 0);
    stone1.placeAt(2, 2, 0);
    stone2.placeAt(7, 10, 0);
    
    roof01.placeAt(1, 23, 1);
    roof02.placeAt(36, 23, 1);
    
    roof1.placeAt(0, 0, 1);
    roof2.placeAt(30, 0, 1);
    roof3.placeAt(18, 0, 1);
    roof31.placeAt(13, 0, 1);
    roof32.placeAt(25, 0, 1);
    
    tree11.placeAt(12, 20, 1);
    tree12.placeAt(13, 17, 1);
    tree13.placeAt(29, 18, 1);
    tree14.placeAt(31, 21, 1);
    tree15.placeAt(27, 20, 1);
    
    
    fountain.placeAt(19, 16, 1);

};
