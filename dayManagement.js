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
	dayNo++;
	visit[0] = false;
	visit[1] = false;
	visit[2] = false;
	visit[3] = false;
	visit[4] = false;
	visit[5] = false;
	events = 0;
}
