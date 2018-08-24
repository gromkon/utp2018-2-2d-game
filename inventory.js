let itemTypes = {
	1: {
		name: null,
		maxStack: null,
		sprite: null,
		offset: null
	}
};

function Stack(id, qty) {
	this.id = id;
	this.qty = qty;
}

function Inventory(s) {
	this.spaces = s;
	this.stacks = [];
}

Inventory.prototype.addItems = function(id, qty) {
	for (let i = 0; i < this.spaces; i++) {
		if (this.stacks.length <= i) {
			let maxHere;
			if (qty > itemTypes[id].maxStack) {
				maxHere = itemTypes[id].maxStack;
			} else {
				maxHere = qty;
			}
			this.stacks.push(new Stack(id, maxHere));
			qty -= maxHere;
		} else if (this.stacks[i].type == id &&
			this.stacks[i].aty < itemTypes[id].maxStack) {
			let maxHere;
			if (itemTypes[id].maxStack - this.stacks[i].qty > qty) {
				maxHere = qty;
			} else {
				maxHere = itemTypes[id].maxStack - this.stacks[i].qty
			}
			this.stacks[i].qty += maxHere;
			qty -= maxHere;
		}
		if (qty == 0) {
			return 0;
		}
	}
	return qty;
}

function PlacedItemStack(id, qty) {
	this.type = id;
	this.qty = qty;
	this.x = 0;
	this.y = 0;
	this.mapN = 0;
}

PlacedItemStack.prototype.placeAt = function(nx, ny, mapN) {
	if (mapTileData[mapN].map[toIndex(this.x, this.y)].itemStack == this) {
		mapTileData[mapN].map[toIndex(this.x, this.y)].itemStack = null;
	}
	this.x = nx;
	this.y = ny;
	this.mapN = mapN;
	mapTileData[mapN].map[toIndex(nx, ny)].itemStack = this;
};
