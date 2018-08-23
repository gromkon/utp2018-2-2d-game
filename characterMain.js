function Character() {
	this.tileFrom = [1, 1];
	this.tileTo = [1, 1];
	this.timeMoved = 0;
	this.dimensions = [30, 30];
	this.position = [45, 45];
	this.delayMove = 150;
	this.direction = directions.down;
	this.sprites = {};
	this.sprites[directions.down] = [{
		x: 4,
		y: 20,
		w: 20,
		h: 30
	}];
	this.sprites[directions.up] = [{
		x: 4,
		y: 320,
		w: 20,
		h: 30
	}];
	this.sprites[directions.left] = [{
		x: 4,
		y: 120,
		w: 18,
		h: 30
	}];
	this.sprites[directions.right] = [{
		x: 4,
		y: 220,
		w: 18,
		h: 30
	}];
	this.inventory = new Inventory(10);
}
