let water = new Image(),
    path = new Image(),
    asphalt = new Image(),
    grass = new Image(),
    clear = new Image(),
    tree = new Image(),
    snow = new Image(),
    ice = new Image(),
    sand = new Image(),
    bush = new Image(),
    stairs = new Image(),
    
    floor1 = new Image(),
    floor11 = new Image(),
    floor12 = new Image(),
    floor2 = new Image(),
    floor21 = new Image(),
    floor22 = new Image(),
    floor3 = new Image(),
    floor31 = new Image(),
    floor32 = new Image(),
    floorHall = new Image(),
    
    wall11 = new Image(),
    wall12 = new Image(),
    wall13 = new Image(),
    wall14 = new Image(),
    
    corner11 = new Image(),
    corner12 = new Image(),
    corner13 = new Image(),
    corner14 = new Image(),
    corner15 = new Image(),
    corner16 = new Image(),
    corner17 = new Image(),
    corner18 = new Image(),
	
    glass1 = new Image(),
    glass2 = new Image(),
    glass3 = new Image(),
    glass4 = new Image(),
	
    door1 = new Image(),
    door2 = new Image(),
    door3 = new Image(),
    door4 = new Image(),
    
    objectTree = new Image(),
	
    objectDesk1 = new Image(),
    objectDesk2 = new Image(),
    objectDesk3 = new Image(),
	
    objectBed = new Image(),
    
    objectRoof = new Image(),
    objectRoof1 = new Image(),
    objectRoof2 = new Image(),
    objectRoof3 = new Image(),
    objectRoof31 = new Image(),
    
    objectFountain = new Image(),
    
    hero = new Image(),
    tMap3 = new Image(),
    tMap4 = new Image(),
    tMap71 = new Image(),
    tMap72 = new Image(),
    tMap8 = new Image(),
    
    object201 = new Image(),
	object202 = new Image(),
	object203 = new Image(),
	object204 = new Image(),
	object205 = new Image(),
	object206 = new Image(),
	object309 = new Image(),
    
    waterLoaded = false,
    pathLoaded = false,
    asphaltLoaded = false,
    grassLoaded = false,
    clearLoaded = false,
    treeLoaded = false,
    snowLoaded = false,
    iceLoaded = false,
    sandLoaded = false,
    bushLoaded = false,
    stairsLoaded = false,

    floor1Loaded = false,
    floor11Loaded = false,
    floor12Loaded = false,
    floor2Loaded = false,
    floor21Loaded = false,
    floor22Loaded = false,
    floor3Loaded = false,
    floor31Loaded = false,
    floor32Loaded = false,
    floorHallLoaded = false,

    wall11Loaded = false,
    wall12Loaded = false,
    wall13Loaded = false,
    wall14Loaded = false,
    wall15Loaded = false,
    wall16Loaded = false,
    wall17Loaded = false,
    wall18Loaded = false,

    corner11Loaded = false,
    corner12Loaded = false,
    corner13Loaded = false,
    corner14Loaded = false,
    corner15Loaded = false,
    corner16Loaded = false,
    corner17Loaded = false,
    corner18Loaded = false,
	
    glass1Loaded = false,
    glass2Loaded = false,
    glass3Loaded = false,
    glass4Loaded = false,
	
    door1Loaded = false,
    door2Loaded = false,
    door3Loaded = false,
    door4Loaded = false,

    objectTreeLoaded = false,
	
    objectDesk1Loaded = false,
    objectDesk2Loaded = false,
    objectDesk3Loaded = false,
	
    objectBedLoaded = false,

    objectRoofLoaded = false,
    objectRoof1Loaded = false,
    objectRoof2Loaded = false,
    objectRoof3Loaded = false,
    objectRoof31Loaded = false,

    objectFountainLoaded = false,

    heroLoaded = false,
	
	object201Loaded = false,
	object202Loaded = false,
	object203Loaded = false,
    object204Loaded = false,
	object205Loaded = false,
	object206Loaded = false,
	object309Loaded = false,
	
    tMap3Loaded = false,
    tMap4Loaded = false,
    tMap71Loaded = false,
    tMap72Loaded = false,
    tMap8Loaded = false;

let loaded = {
	1: { sprite: water, spriteLoaded: waterLoaded },
	2: { sprite: path, spriteLoaded: pathLoaded },
	3: { sprite: asphalt, spriteLoaded: asphaltLoaded },
	4: { sprite: grass, spriteLoaded: grassLoaded },
	5: { sprite: clear, spriteLoaded: clearLoaded },
	6: { sprite: tree, spriteLoaded: treeLoaded },
	7: { sprite: snow, spriteLoaded: snowLoaded },
	8: { sprite: ice, spriteLoaded: iceLoaded },
	9: { sprite: sand, spriteLoaded: sandLoaded },
	10: { sprite: bush, spriteLoaded: bushLoaded },
	11: { sprite: stairs, spriteLoaded: stairsLoaded },
    
	12: { sprite: floor1, spriteLoaded: floor1Loaded },
	13: { sprite: floor11, spriteLoaded: floor11Loaded },
	14: { sprite: floor12, spriteLoaded: floor12Loaded },
	15: { sprite: floor2, spriteLoaded: floor2Loaded },
	16: { sprite: floor21, spriteLoaded: floor21Loaded },
	17: { sprite: floor22, spriteLoaded: floor22Loaded },
	18: { sprite: floor3, spriteLoaded: floor3Loaded },
	19: { sprite: floor31, spriteLoaded: floor31Loaded },
	20: { sprite: floor32, spriteLoaded: floor32Loaded },
	21: { sprite: floorHall, spriteLoaded: floorHallLoaded },
    
	22: { sprite: wall11, spriteLoaded: wall11Loaded },
	23: { sprite: wall12, spriteLoaded: wall12Loaded },
	24: { sprite: wall13, spriteLoaded: wall13Loaded },
	25: { sprite: wall14, spriteLoaded: wall14Loaded },
	
	26: { sprite: tMap3, spriteLoaded: tMap3Loaded },
	27: { sprite: tMap4, spriteLoaded: tMap4Loaded },
	28: { sprite: tMap71, spriteLoaded: tMap71Loaded },
	29: { sprite: tMap72, spriteLoaded: tMap72Loaded },
	30: { sprite: tMap8, spriteLoaded: tMap8Loaded },
    
	31: { sprite: corner11, spriteLoaded: corner11Loaded },
	32: { sprite: corner12, spriteLoaded: corner12Loaded },
	33: { sprite: corner13, spriteLoaded: corner13Loaded },
	34: { sprite: corner14, spriteLoaded: corner14Loaded },
	35: { sprite: corner15, spriteLoaded: corner15Loaded },
	36: { sprite: corner16, spriteLoaded: corner16Loaded },
	37: { sprite: corner17, spriteLoaded: corner17Loaded },
	38: { sprite: corner18, spriteLoaded: corner18Loaded },
	
	39: { sprite: glass1, spriteLoaded: glass1Loaded },
	40: { sprite: glass2, spriteLoaded: glass2Loaded },
	41: { sprite: glass3, spriteLoaded: glass3Loaded },
	42: { sprite: glass4, spriteLoaded: glass4Loaded },
	
	43: { sprite: door1, spriteLoaded: door1Loaded },
	44: { sprite: door2, spriteLoaded: door2Loaded },
	45: { sprite: door3, spriteLoaded: door3Loaded },
	46: { sprite: door4, spriteLoaded: door4Loaded },
    
	47: { sprite: objectTree, spriteLoaded: objectTreeLoaded },
	
	48: { sprite: objectDesk1, spriteLoaded: objectDesk1Loaded },
	49: { sprite: objectDesk2, spriteLoaded: objectDesk2Loaded },
	50: { sprite: objectDesk3, spriteLoaded: objectDesk3Loaded },
	
	51: { sprite: objectBed, spriteLoaded: objectBedLoaded },
    	
	52: { sprite: objectRoof, spriteLoaded: objectRoofLoaded },
	53: { sprite: objectRoof1, spriteLoaded: objectRoof1Loaded },
	54: { sprite: objectRoof2, spriteLoaded: objectRoof2Loaded },
	55: { sprite: objectRoof3, spriteLoaded: objectRoof3Loaded },
	56: { sprite: objectRoof31, spriteLoaded: objectRoof31Loaded },
    
	57: { sprite: objectFountain, spriteLoaded: objectFountainLoaded },
    
	58: { sprite: hero, spriteLoaded: heroLoaded },
	
	59: { sprite: object201, spriteLoaded: object201Loaded },
	60: { sprite: object202, spriteLoaded: object202Loaded },
	61: { sprite: object203, spriteLoaded: object203Loaded },
	62: { sprite: object204, spriteLoaded: object204Loaded },
	63: { sprite: object205, spriteLoaded: object205Loaded },
	64: { sprite: object206, spriteLoaded: object206Loaded },
	65: { sprite: object203, spriteLoaded: object309Loaded }
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
clear.src = 'sprites/clear.png';
tree.src = 'sprites/tree.jpg';
snow.src = 'sprites/snow.jpg';
ice.src = 'sprites/ice.jpg';
sand.src = 'sprites/sand.jpg';
bush.src = 'sprites/bush.jpg';
stairs.src = 'sprites/stairs.png';

floor1.src = 'sprites/floor1.png';
floor11.src = 'sprites/floor11.png';
floor12.src = 'sprites/floor12.png';
floor2.src = 'sprites/floor2.png';
floor21.src = 'sprites/floor21.png';
floor22.src = 'sprites/floor22.png';
floor3.src = 'sprites/floor3.png';
floor31.src = 'sprites/floor31.png';
floor32.src = 'sprites/floor32.png';
floorHall.src = 'sprites/floor_hall.png';

wall11.src = 'sprites/wall11.png';
wall12.src = 'sprites/wall12.png';
wall13.src = 'sprites/wall13.png';
wall14.src = 'sprites/wall14.png';

corner11.src = 'sprites/corner11.png';
corner12.src = 'sprites/corner12.png';
corner13.src = 'sprites/corner13.png';
corner14.src = 'sprites/corner14.png';
corner15.src = 'sprites/corner15.png';
corner16.src = 'sprites/corner16.png';
corner17.src = 'sprites/corner17.png';
corner18.src = 'sprites/corner18.png';

glass1.src = 'sprites/glass1.png';
glass2.src = 'sprites/glass2.png';
glass3.src = 'sprites/glass3.png';
glass4.src = 'sprites/glass4.png';

door1.src = 'sprites/door1.png';
door2.src = 'sprites/door2.png';
door3.src = 'sprites/door3.png';
door4.src = 'sprites/door4.png';

objectTree.src = 'sprites/tree.png';

objectDesk1.src = 'sprites/desk1.png';
objectDesk2.src = 'sprites/desk2.png';
objectDesk3.src = 'sprites/desk3.png';

objectBed.src = 'sprites/bed.png';

objectRoof.src = 'sprites/roof.png';
objectRoof1.src = 'sprites/roof1.png';
objectRoof2.src = 'sprites/roof2.png';
objectRoof3.src = 'sprites/roof3.png';
objectRoof31.src = 'sprites/roof31.png';

objectFountain.src = 'sprites/fountain.png';

hero.src = 'sprites/characters/hero.png';
tMap3.src = 'sprites/characters/teacher3.png';
tMap4.src = 'sprites/characters/teacher4.png';
tMap71.src = 'sprites/characters/teacher71.png';
tMap72.src = 'sprites/characters/teacher72.png';
tMap8.src = 'sprites/characters/teacher8.png';

object201.src = 'sprites/201.png';
object202.src = 'sprites/202.png';
object203.src = 'sprites/203.png';
object204.src = 'sprites/204.png';
object205.src = 'sprites/205.png';
object206.src = 'sprites/206.png';
object309.src = 'sprites/309.png';
