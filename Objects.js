let objectCollision = {
  none     : 0,
  solid    : 1,
  moveable : 2
};

let objectTypes = {
  1 : {
    name : "Tree",
    sp : objectTree,
    sp2: null,
    sprite : [{x:0, y:0, w:80, h:100}],
    sprite2: null,
    offset : [-20, -60],
    offset2: null,
    collision : objectCollision.solid,
    zIndex : 3
  },
  2 : {
    name : "Tall Grass",
    sp : tallGrass,
    sp2: tallGrass2,
    sprite : [{x:0, y:0, w:40, h:50}],
    sprite2: [{x:0, y:0, w:40, h:50}],
    offset : [0, -10],
    offset2: [0, -10],
    collision : objectCollision.none,
    zIndex : 2
  },
  3 : {
    name : "Stone",
    sp : stone,
    sp2: null,
    sprite : [{x:0, y:0, w:40, h:44}],
    sprite2: null,
    offset : [0,-4],
    offset2: null,
    collision : objectCollision.solid,
    zIndex : 2
  }
}

function MapObject(a) {
  this.x    = 0;
  this.y    = 0;
  this.type = a;
}
