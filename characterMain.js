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

const stats = {
	courage: 0,
	intelegent: 1,
	charisma: 2,
	strength: 3,
	stealthiness: 4
}
const subjects = {
	IT: 0, //Информатика
	MA: 1, //Математический анализ
	LAAAG: 2, //Линейная алгебра
	IL: 3, //Иностранные языки
	SS: 4, //Социальные науки
	LAP: 5, //Языки и методы программирования
	PE: 6 // Физическая культура
}

this.stat = {};
this.stat[stats.courage] = {
	Points: 0,
	Lv: 0,
	ToNext: 0
};
this.stat[stats.intelegent] = {
	Points: 0,
	Lv: 0,
	ToNext: 0
};
this.stat[stats.charisma] = {
	Points: 0,
	Lv: 0,
	ToNext: 0
};
this.stat[stats.strength] = {
	Points: 0,
	Lv: 0,
	ToNext: 0
};
this.stat[stats.stealthiness] = {
	Points: 0,
	Lv: 0,
	ToNext: 0
};
this.subject = {};
this.subject[subjects.IT] = {
	Points: 0,
	Understanding: 0,
	Bonus: 0
};
this.subject[subjects.MA] = {
	Points: 0,
	Understanding: 0,
	Bonus: 0
};
this.subject[subjects.LAAAG] = {
	Points: 0,
	Understanding: 0,
	Bonus: 0
};
this.subject[subjects.IL] = {
	Points: 0,
	Understanding: 0,
	Bonus: 0
};
this.subject[subjects.SS] = {
	Points: 0,
	Understanding: 0,
	Bonus: 0
};
this.subject[subjects.LAP] = {
	Points: 0,
	Understanding: 0,
	Bonus: 0
};
this.subject[subjects.PE] = {
	Points: 0,
	Understanding: 0,
	Bonus: 0
};
