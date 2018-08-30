let dayNo = 0;
let events = 0;
let visit = {}
visit[0] = false;
visit[1] = false;
visit[2] = false;
visit[3] = false;
visit[4] = false;
visit[5] = false;

function nextDay() {
	dayNo++;
	visit[0] = false;
	visit[1] = false;
	visit[2] = false;
	visit[3] = false;
	visit[4] = false;
	visit[5] = false;
	events = 0;
}

function attendingLesson(a, b, c) {
	events++;
	if (a != 6) {
		if (b == 0) { // Принял участие в уроке
			player.subject[a].Points += 2;
			player.subject[a].Understanding += player.stat[stats.intelegent].Lv + 1 + player.subject[a].bonus;
			lOE[dayNo][a][b][c];
		}
		if (b == 1) { // Разговор с однокласниками.
			player.subject[a].Points += 2;
			player.stat[stats.charisma].Points += 2;
		}
		if (b == 2) { // Попытался сбежать с урока.
			lOE[dayNo][a][b][c];
		}
	}
}
