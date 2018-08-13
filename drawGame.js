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
                if(o != null && objectTypes[o.type].zIndex == z) {
                    let b = objectTypes[o.type];
                    if((b.sp2!= null) && (x == player.tileFrom[0]) && (y == player.tileFrom[1])) {
                        ctx.drawImage(b.sp2, b.sprite2[0].x, b.sprite2[0].y, b.sprite2[0].w, b.sprite2[0].h,
                                     viewport.offset[0] + (x*tileW) + b.offset2[0],
                                     viewport.offset[1] + (y*tileH) + b.offset2[1],
                                     b.sprite2[0].w, b.sprite2[0].h);
                    }
                    else{
                        ctx.drawImage(b.sp, b.sprite[0].x, b.sprite[0].y, b.sprite[0].w, b.sprite[0].h,
                                     viewport.offset[0] + (x*tileW) + b.offset[0],
                                     viewport.offset[1] + (y*tileH) + b.offset[1],
                                     b.sprite[0].w, b.sprite[0].h);
                    }
                }
            }
        }
        if(z==1) {
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
