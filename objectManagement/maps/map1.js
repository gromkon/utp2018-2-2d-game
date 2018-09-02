const roof01 = new MapObject(4),
	  roof02 = new MapObject(4),

	  roof1 = new MapObject(5),
	  roof2 = new MapObject(6),
	  roof3 = new MapObject(7),
	  roof31 = new MapObject(8),
	  roof32 = new MapObject(8),

	  tree11 = new MapObject(1),
	  tree12 = new MapObject(1),
	  tree13 = new MapObject(1),
	  tree14 = new MapObject(1),
	  tree15 = new MapObject(1),
		  
	  fountain = new MapObject(9);

function objectsMap1() {
	
	roof01.placeAt(1, 23, 1);
	roof02.placeAt(36, 23, 1);

	roof1.placeAt(0, 0, 1);
	roof2.placeAt(30, 0, 1);
	roof3.placeAt(18, 0, 1);
	roof31.placeAt(13, 0, 1);
	roof32.placeAt(25, 0, 1);

	tree11.placeAt(12, 20, 1);
	tree12.placeAt(13, 17, 1);
	tree13.placeAt(29, 18, 1);
	tree14.placeAt(31, 21, 1);
	tree15.placeAt(27, 20, 1);

	fountain.placeAt(21, 19, 1);
}