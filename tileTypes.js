const tileTypes = {
	0: { floor: floorTypes.solid, sprite: clear },
	1: { floor: floorTypes.path, sprite: grass },
	2: { floor: floorTypes.path, sprite: path },
	3: { floor: floorTypes.solid, sprite: tree },
	4: { floor: floorTypes.water, sprite: water },
	5: { floor: floorTypes.path, sprite: bush },
	6: { floor: floorTypes.path, sprite: snow },
	7: { floor: floorTypes.path, sprite: sand },
	8: { floor: floorTypes.ice, sprite: ice },
    
	9: { floor: floorTypes.path, sprite: asphalt },
	10: { floor: floorTypes.path, sprite: stairs },
    
	99: { floor: floorTypes.solid, sprite: asphalt },
	98: { floor: floorTypes.path, sprite: clear },
	97: { floor: floorTypes.solid, sprite: floor2 },
    
	11: { floor: floorTypes.path, sprite: floor1 },
	33: { floor: floorTypes.path, sprite: floor11 },
	34: { floor: floorTypes.path, sprite: floor12 },
	12: { floor: floorTypes.path, sprite: floor2 },
	39: { floor: floorTypes.path, sprite: floor21 },
	40: { floor: floorTypes.path, sprite: floor22 },
	13: { floor: floorTypes.path, sprite: floor3 },
	31: { floor: floorTypes.path, sprite: floor31 },
	32: { floor: floorTypes.path, sprite: floor32 },
	14: { floor: floorTypes.path, sprite: floorHall },
    
	15: { floor:floorTypes.solid, sprite: wall11 },
	16: { floor:floorTypes.solid, sprite: wall12 },
	17: { floor:floorTypes.solid, sprite: wall13 },
	18: { floor:floorTypes.solid, sprite: wall14 },

	/*27: { floor:floorTypes.solid, sprite: wall15 },
	28: { floor:floorTypes.solid, sprite: wall16 },
	29: { floor:floorTypes.solid, sprite: wall17 },
	30: { floor:floorTypes.solid, sprite: wall18 },*/
	
	19: { floor:floorTypes.solid, sprite: corner11 },
	20: { floor:floorTypes.solid, sprite: corner12 },
	21: { floor:floorTypes.solid, sprite: corner13 },
	22: { floor:floorTypes.solid, sprite: corner14 },
	23: { floor:floorTypes.solid, sprite: corner15 },
	24: { floor:floorTypes.solid, sprite: corner16 },
	25: { floor:floorTypes.solid, sprite: corner17 },
	26: { floor:floorTypes.solid, sprite: corner18 },
	
	35: { floor:floorTypes.solid, sprite: glass1 },
	36: { floor:floorTypes.solid, sprite: glass2 },
	37: { floor:floorTypes.solid, sprite: glass3 },
	38: { floor:floorTypes.solid, sprite: glass4 },
	
	41: { floor:floorTypes.solid, sprite: door1 },
	42: { floor:floorTypes.solid, sprite: door2 },
	43: { floor:floorTypes.solid, sprite: door3 },
	44: { floor:floorTypes.solid, sprite: door4 }	
};

