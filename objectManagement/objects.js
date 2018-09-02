const objectCollision = {
	none: 0,
	solid: 1,
	moveable: 2
};

const objectTypes = {
	1: {
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
		sp: objectDesk1,
		sprite: [{
			x: 0,
			y: 0,
			w: 80,
			h: 40
		}],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 1
	},
	3: {
		sp: objectDesk2,
		sprite: [{
			x: 0,
			y: 0,
			w: 120,
			h: 40
		}],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 1
	},
	10: {
		sp: objectDesk3,
		sprite: [{
			x: 0,
			y: 0,
			w: 80,
			h: 40
		}],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 1
	},
	15: {
		sp: objectBed,
		sprite: [{
			x: 0,
			y: 0,
			w: 80,
			h: 120
		}],
		offset: [0, 0],
		collision: objectCollision.solid,
		zIndex: 1
	},
	4: {
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
		sp: objectRoof3,
		sprite: [{
			x: 0,
			y: 0,
			w: 280,
			h: 40
		}],
		offset: [0, 0],
		collision: objectCollision.path,
		zIndex: 3
	},
	8: {
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
	},
	11: {
		sp: tMap3,
		sprite: [{
			x: 0,
			y: 0,
			w: 44,
			h: 72
		}],
		offset: [-4, -32],
		collision: objectCollision.solid,
		zIndex: 2
	},
	12: {
		sp: tMap4,
		sprite: [{
			x: 0,
			y: 0,
			w: 44,
			h: 64
		}],
		offset: [-4, -24],
		collision: objectCollision.solid,
		zIndex: 2
	},
	13: {
		sp: tMap71,
		sprite: [{
			x: 0,
			y: 0,
			w: 44,
			h: 66
		}],
		offset: [-4, -26],
		collision: objectCollision.solid,
		zIndex: 2
	},
	14: {
		sp: tMap8,
		sprite: [{
			x: 0,
			y: 0,
			w: 44,
			h: 66
		}],
		offset: [-4, -32],
		collision: objectCollision.solid,
		zIndex: 2
	},
	16: {
		sp: tMap72,
		sprite: [{
			x: 0,
			y: 0,
			w: 44,
			h: 70
		}],
		offset: [-4, -30],
		collision: objectCollision.solid,
		zIndex: 2
	},
	17: {
		name: "object201",
		sp: object201,
		sprite: [{
			x: 0,
			y: 0,
			w: 40,
			h: 40
		}],
		offset: [0, 20],
		collision: objectCollision.solid,
		zIndex: 3
	},
	18: {
		name: "object202",
		sp: object202,
		sprite: [{
			x: 0,
			y: 0,
			w: 40,
			h: 40
		}],
		offset: [0, 20],
		collision: objectCollision.solid,
		zIndex: 3
	},
	19: {
		name: "object203",
		sp: object203,
		sprite: [{
			x: 0,
			y: 0,
			w: 40,
			h: 40
		}],
		offset: [0, 20],
		collision: objectCollision.solid,
		zIndex: 3
	},
	20: {
		name: "object204",
		sp: object204,
		sprite: [{
			x: 0,
			y: 0,
			w: 40,
			h: 40
		}],
		offset: [0, 20],
		collision: objectCollision.solid,
		zIndex: 3
	},
	21: {
		name: "object205",
		sp: object205,
		sprite: [{
			x: 0,
			y: 0,
			w: 40,
			h: 40
		}],
		offset: [0, 20],
		collision: objectCollision.solid,
		zIndex: 3
	},
	22: {
		name: "object206",
		sp: object206,
		sprite: [{
			x: 0,
			y: 0,
			w: 40,
			h: 40
		}],
		offset: [0, 20],
		collision: objectCollision.solid,
		zIndex: 3
	},
	23: {
		name: "object309",
		sp: object309,
		sprite: [{
			x: 0,
			y: 0,
			w: 40,
			h: 40
		}],
		offset: [0, 20],
		collision: objectCollision.solid,
		zIndex: 3
	}
}

function MapObject(a) {
	this.x = 0;
	this.y = 0;
	this.type = a;
}
