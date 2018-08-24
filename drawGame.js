function drawGame() {

    if(ctx == null) return;

    let currentFrameTime = Date.now(),
        timeElapsed = currentFrameTime - lastFrameTime;
    gameTime += Math.floor(timeElapsed * gameSpeeds[currentSpeed].mult);
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

    if(!player.processMovement(gameTime) && gameSpeeds[currentSpeed].mult != 0) {
      if((keysDown[38])||(keysDown[87])) {
        if(player.direction != directions.up) {
          player.direction = directions.up;
        }
        else
        if(player.canMoveUp()) {
          player.MoveUp(gameTime);
        }
      }
      else if((keysDown[40])||(keysDown[83])) {
        if(player.direction != directions.down) {
          player.direction = directions.down;
        }
        else
        if(player.canMoveDown()) {
          player.MoveDown(gameTime);
        }
      }
      else if((keysDown[39])||(keysDown[68])) {
        if(player.direction != directions.right) {
          player.direction = directions.right;
        }
        else
        if(player.canMoveRight()) {
          player.MoveRight(gameTime);
        }
      }
      else if((keysDown[37])||(keysDown[65])) {
        if(player.direction != directions.left) {
          player.direction = directions.left;
        }
        else
        if(player.canMoveLeft()) {
          player.MoveLeft(gameTime);
        }
      }
    }

    viewport.update(
      player.position[0] + (player.dimensions[0] / 2),
      player.position[1] + (player.dimensions[1] / 2),
    );

    ctx.fillStyle ="#071408"
    ctx.fillRect(0, 0, viewport.screen[0], viewport.screen[1]);
    
    for(let z = 0; z < mapTileData[mapNo].layer; z++) {
      for(let y = viewport.startTile[1]; y <= viewport.endTile[1]; y++) {
         for(let x = viewport.startTile[0]; x <= viewport.endTile[0]; x++) {
             
           if(z == 0) {
               ctx.drawImage(tileTypes[mapTileData[mapNo].map[toIndex(x, y)].type].sprite,
                             viewport.offset[0] + x*tileW,
                             viewport.offset[1] + y*tileH,
                             tileW, tileH);
           }
           else if (z == 1) {
             let is = mapTileData[mapNo].map[toIndex(x, y)].itemStack;
             if(is != null){
               var sprite = itemTypes[is.type].sprite;
               ctx.drawImage(tileset, sprite[0].x, sprite[0].y,
                             sprite[0].w, sptite[0].h,
                             viewport.offset[0] + (x*tileW) + itemTypes[is.type].offset[0],
                             viewport.offset[1] + (y*tileH) + itemTypes[is.type].offset[1],
                             sprite[0].w, sprite[0].h);
             }
           }
           let o = mapTileData[mapNo].map[toIndex(x, y)].object;
           if(o != null && objectTypes[o.type].zIndex == z) {
              let b = objectTypes[o.type];
              ctx.drawImage(b.sp,
                            b.sprite[0].x, b.sprite[0].y,
                            b.sprite[0].w, b.sprite[0].h,
                            viewport.offset[0] + (x*tileW) + b.offset[0],
                            viewport.offset[1] + (y*tileH) + b.offset[1],
                            b.sprite[0].w, b.sprite[0].h);
              }
          }
      }
        
      if(z == 1) {
          ctx.fillStyle = "#0000ff";
          let sprite = player.sprites[player.direction];
          ctx.drawImage(hero,
                        sprite[0].x, sprite[0].y,
                        sprite[0].w, sprite[0].h,
                        viewport.offset[0] + player.position[0],
                        viewport.offset[1] + player.position[1],
                        player.dimensions[0], player.dimensions[1]);
     }
  }
  ctx.textAlign = "right";
  for(let i = 0; i < player.inventory.spaces; i++) {
    ctx.fillStyle = "#ddccaa";
    ctx.fillRect(10 + (i * 41), 430, 40, 40);
    if(typeof player.inventory.stacks[i] != 'undefined') {
      let it = itemTypes[player.inventory.stacks[i].type];
      let sprite = it.sprite;
      ctx.drawImage(tileset, sprite[0].x, sprite[0].y,
                    sprite[0].w, sptite[0].h,
                    viewport.offset[0] + (x*tileW) + itemTypes[is.type].offset[0],
                    viewport.offset[1] + (y*tileH) + itemTypes[is.type].offset[1],
                    sprite[0].w, sprite[0].h);
      if(player.inventory.stacks[i].qty > 1) {
        ctx.fillStyle = "#000000";
        ctx.fillText("" + player.inventory.stacks[i].qty, 10 + (i * 41) + 38, 430 + 38);
      }
    }
  }
  ctx.textAlign = "left";
  ctx.fillText("Game speed: " + gameSpeeds[currentSpeed].name, 10, 40);
  lastFrameTime = currentFrameTime;
  requestAnimationFrame(drawGame);
}

