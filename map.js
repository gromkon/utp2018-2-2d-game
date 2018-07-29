"use strict";
let ctx = null,
    tileW = 40, tileH = tileW,
    mapW = 25, mapH = 25,
    mapSW = mapW*tileW, mapSH = mapH*tileH,
    currentSecond = 0, frameCount = 0, framesLastSecond = 0,
    lastFrameTime = 0;
let keysDown = {
    37: false,
    38: false,
    39: false,
    40: false
};

let  floorTypes ={
  solid   : 0,
  path    : 1,
  water   : 2
};

let tileTypes = {
  0: {colour:"#685b48", floor:floorTypes.solid},//стена
  1: {colour:"#5aa457", floor:floorTypes.path},//трава
  2: {colour:"#e8bd7a", floor:floorTypes.path},//дорога
  3: {colour:"#286625", floor:floorTypes.solid},//доревья
  4: {colour:"#678fd9", floor:floorTypes.water},//вода
  5: {colour:"#026809", floor:floorTypes.path},//кусты
  6: {colour:"#ebf8f6", floor:floorTypes.path},//снег
  7: {colour:"#fffcac", floor:floorTypes.path},//песок
  8: {colour:"#acfff4", floor:floorTypes.path},//лед
  9: {colour:"#9d2c0e", floor:floorTypes.path}//мост
};

let player = new Character();
let gameMap0 =[
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
    0, 2, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 2, 1, 1, 1, 1, 1, 6, 8, 8, 8, 8, 2, 0,
    0, 2, 7, 4, 4, 4, 4, 4, 4, 7, 1, 1, 2, 1, 1, 1, 1, 1, 6, 6, 8, 8, 8, 2, 0,
    0, 2, 7, 4, 4, 4, 4, 4, 4, 7, 1, 1, 2, 1, 0, 0, 1, 1, 1, 6, 6, 8, 8, 2, 0,
    0, 2, 7, 4, 4, 4, 4, 4, 4, 7, 1, 1, 2, 2, 0, 0, 1, 1, 1, 1, 6, 6, 8, 2, 0,
    0, 2, 7, 4, 4, 4, 4, 4, 7, 7, 1, 1, 2, 1, 0, 0, 1, 1, 1, 1, 1, 6, 6, 2, 0,
    0, 2, 7, 4, 4, 4, 4, 7, 7, 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0,
    0, 2, 7, 7, 4, 4, 7, 7, 1, 0, 0, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 0,
    0, 2, 7, 7, 7, 4, 7, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 2, 0,
    0, 2, 1, 1, 1, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0, 1, 1, 2, 0,
    0, 2, 1, 1, 1, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 5, 5, 2, 2, 5, 5, 1, 2, 0,
    0, 2, 2, 2, 2, 9, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
    0, 2, 1, 1, 1, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0,
    0, 2, 1, 1, 1, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0,
    0, 2, 1, 5, 1, 4, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0,
    0, 2, 1, 5, 1, 4, 1, 1, 3, 3, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0,
    0, 2, 1, 5, 1, 4, 1, 1, 3, 3, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0,
    0, 2, 1, 5, 1, 4, 4, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 2, 0,
    0, 2, 1, 5, 1, 1, 4, 4, 4, 4, 4, 4, 9, 4, 4, 4, 4, 4, 9, 9, 4, 4, 4, 9, 0,
    0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0,
    0, 2, 1, 3, 1, 1, 1, 1, 1, 3, 1, 5, 2, 5, 1, 1, 1, 3, 2, 2, 3, 1, 1, 2, 0,
    0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 2, 5, 1, 1, 1, 1, 2, 2, 1, 1, 1, 2, 0,
    0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
let viewport = {
  screen    :[0, 0],
  startTile :[0, 0],
  endTile   :[0, 0],
  offset    :[0, 0],
  update    :function(px, py){
    this.offset[0] =Math.floor((this.screen[0]/2)-px);
    this.offset[1] =Math.floor((this.screen[1]/2)-py);
    var tile = [
      Math.floor(px/ tileW),
      Math.floor(py/ tileH)
    ];
    this.startTile[0] = tile[0] - 1 - Math.ceil((this.screen[0]/2)/tileW);
    this.startTile[1] = tile[1] - 1- Math.ceil((this.screen[1]/2)/tileH);
    if(this.startTile[0]<0){
      this.startTile[0] = 0;
    }
    if(this.startTile[1]<0){
      this.startTile[1] = 0;
    }
    this.endTile[0] = tile[0]+1+Math.ceil((this.screen[0]/2)/tileW);
    this.endTile[1] = tile[1]+1+Math.ceil((this.screen[1]/2)/tileH);
    if(this.endTile[0]>= mapW) {
      this.endTile[0] = mapW -1;
    }
    if(this.endTile[1]>= mapH) {
      this.endTile[1] = mapH -1;
    }
  }
};
let gameMap1 =[
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];
function Character(){
  //Параметры героя.
  this.MaxHp = 100,//Максимальное колличество здоровья.
  this.CurrentHp = 100,//Сколько сейчас у героя здоровья.
  this.MaxMp = 20,//Максимальное колличество манны.
  this.CurrentMp = 20,//Сколько сейчас у героя манны.
  this.Lv = 1,//Уровень героя.
  this.ExpEarned = 0,//Счетчик опыта. Не обнуляется.
  this.ExpToNextLv = 10,//Сколько тебуется опыта до следующего уровня.
  this.Atc = 1,//Определяет силу героя.
  this.Def = 1,//Определяет сколько будет заблокированно урона.
  this.Sp = 1,//Определяет кто во время битвы ходит первым.
  this.Acc = 1,//Определяет меткость героя.
  this.Crit = 1,//Шанс нанести критический урон.
  this.dodge = 1,//Шанс увернуться от атаки.
  //Инвентарь героя.
  this.money = 0//Колличество денег.
  //Герой может надеть на себя три вещи: оружие, броню и укращение, которое дает какой-то бонус.
  //Пусть в инвентаре героя будет 12 мест. Вещи нельзя стаковать.
  //Координаты и скорость перемещения героя.
  this.tileFrom = [1,1];
  this.tileTo = [1,1];
  this.timeMoved = 0;
  this.dimensions = [30,30];
  this.position = [45,45];
  this.delayMove = 100;
}
Character.prototype.placeAt = function(x, y){
  this.tileFrom = [x, y];
  this.tileTo = [x, y];
  this.position = [((tileW*x) + ((tileW-this.dimensions[0])/2)),
                   ((tileH*y) + ((tileH-this.dimensions[1])/2))];
};
Character.prototype.processMovement = function(t){
    if(this.tileFrom[0]==this.tileTo[0] && this.tileFrom[1]==this.tileTo[1]){
      return false;
    }
    if((t - this.timeMoved)>=this.delayMove){
      this.placeAt(this.tileTo[0], this.tileTo[1]);
    }
    else{
      this.position[0] = (this.tileFrom[0]*tileW)+ ((tileW - this.dimensions[0])/2);
      this.position[1] = (this.tileFrom[1]*tileH)+ ((tileH - this.dimensions[1])/2);
      if(this.tileTo[0] != this.tileFrom[0]){
        let diff = (tileW / this.delayMove)*(t - this.timeMoved);
        this.position[0] += (this.tileTo[0]<this.tileFrom[0] ?
        0 - diff : diff);
      }
      if(this.tileTo[1] != this.tileFrom[1]){
        let diff = (tileH / this.delayMove)*(t - this.timeMoved);
        this.position[1] += (this.tileTo[1]<this.tileFrom[1] ?
        0 - diff : diff);
      }
      this.position[0]= Math.round(this.position[0]);
      this.position[1]= Math.round(this.position[1]);
    }
    return true;
};

Character.prototype.canMoveTo = function(x, y){
  if(x<0 || x>=mapW || y<0 || y>=mapH){
    return false;
  }
  if(tileTypes[gameMap0[toIndex(x, y)]].floor!=floorTypes.path){
    return false;
  }
  return true;
};

Character.prototype.canMoveUp = function(){
  return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]-1);
};
Character.prototype.canMoveDown = function(){
  return this.canMoveTo(this.tileFrom[0], this.tileFrom[1]+1);
};
Character.prototype.canMoveRight = function(){
  return this.canMoveTo(this.tileFrom[0]+1, this.tileFrom[1]);
};
Character.prototype.canMoveLeft = function(){
  return this.canMoveTo(this.tileFrom[0]-1, this.tileFrom[1]);
};

Character.prototype.MoveLeft = function(t){
  this.tileTo[0]-=1;
  this.timeMoved = t;
};
Character.prototype.MoveRight = function(t){
  this.tileTo[0]+=1;
  this.timeMoved = t;
};
Character.prototype.MoveDown = function(t){
  this.tileTo[1]+=1;
  this.timeMoved = t;
};
Character.prototype.MoveUp = function(t){
  this.tileTo[1]-=1;
  this.timeMoved = t;
};
function toIndex(x, y){
  return ((y * mapW) + x);
}

window.onload = function(){
    ctx = document.getElementById('game').getContext('2d');
    requestAnimationFrame(drawGame);
    ctx.font = "bold 10pt sans-serif";
    window.addEventListener("keydown", function(e){
      if(e.keyCode>=37 && e.keyCode<=40){
        keysDown[e.keyCode] = true;
      }
    });
    window.addEventListener("keyup", function(e){
      if(e.keyCode>=37 && e.keyCode<=40){
        keysDown[e.keyCode]= false;
      }
    });
    viewport.screen =[
      document.getElementById('game').width,
      document.getElementById('game').height
    ];
};
function drawGame(){
    if(ctx == null){
      return;
    }
    let currentFrameTime = Date.now(),
        timeElapsed = currentFrameTime -lastFrameTime;
    let sec = Math.floor(Date.now()/1000);
    if(sec!= currentSecond){
      currentSecond = sec;
      framesLastSecond = frameCount;
      frameCount = 1;
    }
    else{
      frameCount++;
    }
    if(!player.processMovement(currentFrameTime)){
      if(keysDown[38] && player.canMoveUp()){
        player.MoveUp(currentFrameTime);
      }
      else if(keysDown[40] && player.canMoveDown()){
        player.MoveDown(currentFrameTime);
      }
      else if(keysDown[39] && player.canMoveRight()){
        player.MoveRight(currentFrameTime);
      }
      else if(keysDown[37] && player.canMoveLeft()){
        player.MoveLeft(currentFrameTime);
      }
    }

    viewport.update(
      player.position[0] + (player.dimensions[0]/2),
      player.position[1] + (player.dimensions[1]/2),
    );

    ctx.fillStyle ="#000000"
    ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);

    for(let y = viewport.startTile[1]; y <=viewport.endTile[1]; y++){
      for(let x = viewport.startTile[0]; x <=viewport.endTile[0]; x++){
        ctx.fillStyle = tileTypes[gameMap0[toIndex(x, y)]].colour;
        ctx.fillRect(viewport.offset[0] + x*tileW, viewport.offset[1] + y*tileH, tileW, tileH);
      }
    }
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(viewport.offset[0] + player.position[0], viewport.offset[1] + player.position[1],
    player.dimensions[0], player.dimensions[1]);
    ctx.fillStyle = "#ff0000";
    ctx.fillText("FPS: " + framesLastSecond, 10, 20);
    lastFrameTime = currentFrameTime;
    requestAnimationFrame(drawGame);
}
