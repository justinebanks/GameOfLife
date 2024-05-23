// Recreation of the Cellular Automation "Conway's Game of Life" using the HTML Canvas API
// Mor information at https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const populationLabel = document.querySelector("#population");
const generationLabel = document.querySelector("#generation");


canvas.width = document.body.clientWidth - 4;
canvas.height = 730;


// Checks if a is a multiple of b
function isMultipleOf(a, b) {
	// b*n = a
	if (a/b == Math.floor(a/b)) {
		return true;
	}
	else {
		return false;
	}
}


const gameOfLife = new Game(72, 136, 10);

createGosperGliderGun(gameOfLife, 0, 40);
createSimkinGliderGun(gameOfLife, 40, 40);
createPulsar(gameOfLife,20, 100)
createPentadecathlon(gameOfLife, 30, 10)


// =========== USED TO HIGHLIGHT GRID BORDER ==============
/*
for (let column of gameOfLife.cells) {
	for (let cell of column) {
		if (cell.row == gameOfLife.rows - 1 || cell.column == gameOfLife.columns-1) {
			cell.isAlive = true;
		}
	}
}*/


let frame = 0;
let generation = 1

function animation() {
	requestAnimationFrame(animation);
	c.clearRect(0, 0, canvas.width, canvas.height);
	frame++;

	gameOfLife.run()

	if (isMultipleOf(frame, 5)) {
		generation++
		gameOfLife.update();

		populationLabel.innerText = "Population: " + gameOfLife.getPopulation().toString();
		generationLabel.innerText = "Generation " + generation.toString();
	}
	
}

animation();