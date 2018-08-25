let water = new Image(),
	waterLoaded = false,
	path = new Image(),
	pathLoaded = false,
	asphalt = new Image(),
	asphaltLoaded = false,
	grass = new Image(),
	grassLoaded = false,
	wall = new Image(),
	wallLoaded = false,
	tree = new Image(),
	treeLoaded = false,
	snow = new Image(),
	snowLoaded = false,
	ice = new Image(),
	iceLoaded = false,
	sand = new Image(),
	sandLoaded = false,
	bush = new Image(),
	bushLoaded = false,
	stairs = new Image(),
	stairsLoaded = false,

	objectTree = new Image(),
	objectTreeLoaded = false,
	objectStone = new Image(),
	objectStoneLoaded = false,
	objectGrass = new Image(),
	objectGrassLoaded = false,

	objectRoof = new Image(),
	objectRoofLoaded = false,
	objectRoof1 = new Image(),
	objectRoof1Loaded = false,
	objectRoof2 = new Image(),
	objectRoof2Loaded = false,
	objectRoof3 = new Image(),
	objectRoof3Loaded = false,
	objectRoof31 = new Image(),
	objectRoof31Loaded = false,

	objectFountain = new Image(),
	objectFountainLoaded = false,

	hero = new Image(),
	heroLoaded = false;

let loaded = {
	1: {
		sprite: water,
		spriteLoaded: waterLoaded
	},
	2: {
		sprite: path,
		spriteLoaded: pathLoaded
	},
	3: {
		sprite: asphalt,
		spriteLoaded: asphaltLoaded
	},
	4: {
		sprite: grass,
		spriteLoaded: grassLoaded
	},
	5: {
		sprite: wall,
		spriteLoaded: wallLoaded
	},
	6: {
		sprite: tree,
		spriteLoaded: treeLoaded
	},
	7: {
		sprite: snow,
		spriteLoaded: snowLoaded
	},
	8: {
		sprite: ice,
		spriteLoaded: iceLoaded
	},
	9: {
		sprite: sand,
		spriteLoaded: sandLoaded
	},
	10: {
		sprite: bush,
		spriteLoaded: bushLoaded
	},
	11: {
		sprite: stairs,
		spriteLoaded: stairsLoaded
	},

	12: {
		sprite: objectTree,
		spriteLoaded: objectTreeLoaded
	},
	13: {
		sprite: objectStone,
		spriteLoaded: objectStoneLoaded
	},
	14: {
		sprite: objectGrass,
		spriteLoaded: objectGrassLoaded
	},

	15: {
		sprite: objectRoof,
		spriteLoaded: objectRoofLoaded
	},
	16: {
		sprite: objectRoof1,
		spriteLoaded: objectRoof1Loaded
	},
	17: {
		sprite: objectRoof2,
		spriteLoaded: objectRoof2Loaded
	},
	18: {
		sprite: objectRoof3,
		spriteLoaded: objectRoof3Loaded
	},
	19: {
		sprite: objectRoof31,
		spriteLoaded: objectRoof31Loaded
	},

	20: {
		sprite: objectFountain,
		spriteLoaded: objectFountainLoaded
	},

	21: {
		sprite: hero,
		spriteLoaded: heroLoaded
	},
}

let isAllLoaded = true;

for (let i in loaded) {
	loaded[i].sprite.onerror = function() {
		alert("Failed loading sprite");
	}
	loaded[i].sprite.onload = function() {
		loaded[i].spriteLoaded = true;
	}
}

(function(isAllLoaded) {
	for (let i in loaded) {
		if (loaded[i].spriteLoaded == false) {
			isAllLoaded = false;
		}
	}
})(isAllLoaded);

water.src = 'sprites/water.jpg';
path.src = 'sprites/path.jpg';
asphalt.src = 'sprites/asphalt.png';
grass.src = 'sprites/grass.jpg';
wall.src = 'sprites/wall.jpg';
tree.src = 'sprites/tree.jpg';
snow.src = 'sprites/snow.jpg';
ice.src = 'sprites/ice.jpg';
sand.src = 'sprites/sand.jpg';
bush.src = 'sprites/bush.jpg';
stairs.src = 'sprites/stairs.png';

objectTree.src = 'sprites/tree.png';
objectStone.src = 'sprites/stone.png';
objectGrass.src = 'sprites/grass.png';

objectRoof.src = 'sprites/roof.png';
objectRoof1.src = 'sprites/roof1.png';
objectRoof2.src = 'sprites/roof2.png';
objectRoof3.src = 'sprites/roof3.png';
objectRoof31.src = 'sprites/roof31.png';

objectFountain.src = 'sprites/fountain.png';

hero.src = 'sprites/hero.png';
