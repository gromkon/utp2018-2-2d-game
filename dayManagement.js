let dayNo = 1;
let events = 0;
let visit = {}
visit[0] = false;
visit[1] = false;
visit[2] = false;
visit[3] = false;
visit[4] = false;
visit[5] = false;

function nextDay() {
	if (dayNo < 13) {
		dayNo++;
		visit[0] = false;
		visit[1] = false;
		visit[2] = false;
		visit[3] = false;
		visit[4] = false;
		visit[5] = false;
		events = 0;
	}
}

function newGame() {
	mapNo = 0;
	passed = 0;
	exams = 0;
	player.placeAt(1, 1);
	dayNo = 0;
	for (i = 0; i < 6; i++) {
		subject[i].Points = 0;
		subject[i].Res = 'н/а';
	}
	nextDay();
}