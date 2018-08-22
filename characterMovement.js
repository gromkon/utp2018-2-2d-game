Character.prototype.placeAt = function(x, y) {
  this.tileFrom = [x, y];
  this.tileTo = [x, y];
  this.position = [((tileW*x) + ((tileW - this.dimensions[0]) / 2)),
                   ((tileH*y) + ((tileH - this.dimensions[1]) / 2))];
};

Character.prototype.processMovement = function(t) {
    if (this.tileFrom[0] == this.tileTo[0] && this.tileFrom[1] == this.tileTo[1]) {
      return false;
    }

    if((t - this.timeMoved) >= this.delayMove) {
      this.placeAt(this.tileTo[0], this.tileTo[1]);

      if(mapTileData[mapNo].map[toIndex(this.tileTo[0], this.tileTo[1])].eventEnter != null) {
        mapTileData[mapNo].map[toIndex(this.tileTo[0], this.tileTo[1])].eventEnter(this);
      }

      let tileFloor = tileTypes[mapTileData[mapNo].map[toIndex(this.tileFrom[0], this.tileFrom[1])].type].floor;
      if(tileFloor == floorTypes.ice) {
        if(this.canMoveDirection(this.direction)) {
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
  if(tileTypes[mapTileData[mapNo].map[toIndex(x, y)].type].floor != floorTypes.path && tileTypes[mapTileData[mapNo].map[toIndex(x, y)].type].floor != floorTypes.ice) {
      return false;
  }
  if(mapTileData[mapNo].map[toIndex(x, y)].object != null) {
    let o = mapTileData[mapNo].map[toIndex(x, y)].object;
    if(objectTypes[o.type].collision == objectCollision.solid) {
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
  this.tileTo[0]-- ;
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

Character.prototype.pickUp = function() {
  if(this.tileTo[0] != this.tileFrom[0] ||
     this.tileTo[1] != this.tileFrom[1]) {
   return false;
  }
  let is = mapTileData.map[toIndex(this.tileFrom[0], this.tileFrom[1])].itemStack;
  if(is != null) {
    let remains = this.inventory.addItems(is.type, is.qty);
    if(remains) {
      is.qty = remains;
    }
    else{
      mapTileData.map[toIndex(this.ti)][toIndex(this.tileFrom[0], this.tileFrom[1])].itemStack = null;
    }
  }
  return true;
};
