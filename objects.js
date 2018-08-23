const objectCollision = {
	none: 0,
	solid: 1,
	moveable: 2
};

const objectTypes = {
	1: {
		name: "Tree",
		sp: objectTree,
		sprite: [{
			x: 0,
			y: 0,
			w: 80,
			h: 100
		}],
		offset: [-20, -60],
		collision: objectCollision.solid,
		zIndex: 3
	},
	2: {
		name: "Tall Grass",
		sp: objectGrass,
		sprite: [{
			x: 0,
			y: 0,
			w: 40,
			h: 50
		}],
		offset: [0, -10],
		collision: objectCollision.none,
		zIndex: 2
	},
	3: {
		name: "Stone",
		sp: objectStone,
		sprite: [{
			x: 0,
			y: 0,
			w: 40,
			h: 44
		}],
		offset: [0, -4],
		collision: objectCollision.solid,
		zIndex: 2
	},
	4: {
		name: "Roof",
		sp: objectRoof,
		sprite: [{
			x: 0,
			y: 0,
			w: 240,
			h: 80
		}],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 2
	},
	5: {
		name: "Roof 1",
		sp: objectRoof1,
		sprite: [{
			x: 0,
			y: 0,
			w: 520,
			h: 280
		}],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 3
	},
	6: {
		name: "Roof 2",
		sp: objectRoof2,
		sprite: [{
			x: 0,
			y: 0,
			w: 520,
			h: 280
		}],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 3
	},
	7: {
		name: "Roof 3",
		sp: objectRoof3,
		sprite: [{
			x: 0,
			y: 0,
			w: 280,
			h: 40
		}],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 3
	},
	8: {
		name: "Roof 3 1",
		sp: objectRoof31,
		sprite: [{
			x: 0,
			y: 0,
			w: 200,
			h: 40
		}],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 3
	},
	9: {
		name: "Fountain",
		sp: objectFountain,
		sprite: [{
			x: 0,
			y: 0,
			w: 200,
			h: 200
		}],
		offset: [-80, -95],
		collision: objectCollision.solid,
		zIndex: 2
	}
}

function MapObject(a) {
	this.x = 0;
	this.y = 0;
	this.type = a;
}
