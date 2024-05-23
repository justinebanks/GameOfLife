

class Cell {
	constructor(game, row, column, isAlive) {
		this.game = game
		this.row = row;
		this.column = column;
		this.isAlive = isAlive;

		this.isAliveNext = isAlive;
	}


	getNeighbors() {
		let neighbors = {};

		try { neighbors.topLeft = this.game.cells[this.row-1][this.column-1] }
		catch (err) { neighbors.topLeft = null }

		try { neighbors.top = this.game.cells[this.row-1][this.column] }
		catch (err) { neighbors.top = null }

		try { neighbors.topRight = this.game.cells[this.row-1][this.column+1] }
		catch (err) { neighbors.topRight = null }

		try { neighbors.right = this.game.cells[this.row][this.column+1] }
		catch (err) { neighbors.right = null }

		try { neighbors.bottomLeft = this.game.cells[this.row+1][this.column-1] }
		catch (err) { neighbors.topLeft = null }

		try { neighbors.bottom = this.game.cells[this.row+1][this.column] }
		catch (err) { neighbors.top = null }

		try { neighbors.bottomRight = this.game.cells[this.row+1][this.column+1] }
		catch (err) { neighbors.topRight = null }

		try { neighbors.left = this.game.cells[this.row][this.column-1] }
		catch (err) { neighbors.right = null }

		return neighbors;
	}


	evaluateFate() {
		if (this.isAlive) {
			let liveNeighbors = 0

			for (const [key, neighbor] of Object.entries(this.getNeighbors())) {
  				if (neighbor) {
	   				if (neighbor.isAlive) {
	  					liveNeighbors++;
	  				}			
  				}

			}

			if (liveNeighbors == 2 || liveNeighbors == 3) {
				this.isAliveNext = true
			}
			else {
				this.isAliveNext = false
			}
		}

		else if (!this.isAlive) {
			let liveNeighbors = 0

			for (const [key, neighbor] of Object.entries(this.getNeighbors())) {
  				if (neighbor) {
	   				if (neighbor.isAlive) {
	  					liveNeighbors++;
	  				}			
  				}
			}

			if (liveNeighbors == 3) {
				this.isAliveNext = true
			}
			else {
				this.isAliveNext = false
			}
		}
	}


	applyFate() {
		this.isAlive = this.isAliveNext;
	}
}


class Game {
	constructor(rows, columns, cellSize=10) {
		this.rows = rows;
		this.columns = columns;

		this.cellSize = cellSize

		this.cells = []

		for (let x = 0; x < rows; x++) {
			let row = []

			for (let y = 0; y < columns; y++) {
				let newCell = new Cell(this, x, y, false);
				row.push(newCell);
			}

			this.cells.push(row);
		}
	}


	getCell(row, column) {
		let selectedCell = this.cells[row][column]
		return selectedCell
	}


	getPopulation() {
		let population = 0;

		for (let column of this.cells) {
			for (let cell of column) {
				if (cell.isAlive) {
					population++;
				}
			}
		}

		return population;
	}


	run() {
		for (let column of this.cells) {
			for (let cell of column) {
				if (cell.isAlive) {
					c.fillStyle = "white";
					c.strokeStyle = "black"

					c.beginPath()
					c.rect(this.cellSize*cell.column, this.cellSize*cell.row, this.cellSize, this.cellSize);
					c.stroke()
					c.fill()
					c.closePath()
				}

				cell.evaluateFate();
			}
		}
	}


	update() {
		for (let column of this.cells) {
			for (let cell of column) {
				cell.applyFate();
			}
		}
	}
}


// ================== STILL LIFES ======================= //

function createBlock(gameOfLife, startRow, startCol) {
	gameOfLife.cells[startRow][startCol].isAlive = true
	gameOfLife.cells[startRow+1][startCol].isAlive = true	
	gameOfLife.cells[startRow][startCol+1].isAlive = true	
	gameOfLife.cells[startRow+1][startCol+1].isAlive = true	
}


function createBeeHive(gameOfLife, startRow, startCol) {
	gameOfLife.cells[startRow][startCol+1].isAlive = true
	gameOfLife.cells[startRow][startCol+2].isAlive = true
	gameOfLife.cells[startRow+1][startCol+3].isAlive = true
	gameOfLife.cells[startRow+2][startCol+2].isAlive = true
	gameOfLife.cells[startRow+2][startCol+1].isAlive = true
	gameOfLife.cells[startRow+1][startCol].isAlive = true
}


function createLoaf(gameOfLife, startRow, startCol) {
	gameOfLife.cells[startRow][startCol+1].isAlive = true
	gameOfLife.cells[startRow][startCol+2].isAlive = true
	gameOfLife.cells[startRow+1][startCol+3].isAlive = true
	gameOfLife.cells[startRow+2][startCol+3].isAlive = true
	gameOfLife.cells[startRow+3][startCol+2].isAlive = true
	gameOfLife.cells[startRow+2][startCol+1].isAlive = true
	gameOfLife.cells[startRow+1][startCol].isAlive = true
}


function createBoat(gameOfLife, startRow, startCol) {
	gameOfLife.cells[startRow][startCol].isAlive = true
	gameOfLife.cells[startRow][startCol+1].isAlive = true
	gameOfLife.cells[startRow+1][startCol].isAlive = true
	gameOfLife.cells[startRow+1][startCol+2].isAlive = true
	gameOfLife.cells[startRow+2][startCol+1].isAlive = true
}


function createTub(gameOfLife, startRow, startCol) {
	gameOfLife.cells[startRow][startCol+1].isAlive = true
	gameOfLife.cells[startRow+1][startCol].isAlive = true
	gameOfLife.cells[startRow+1][startCol+2].isAlive = true
	gameOfLife.cells[startRow+2][startCol+1].isAlive = true
}


// ================== OSCILLATORS ======================= //

function createBlinker(gameOfLife, startRow, startCol) {
	gameOfLife.cells[startRow+1][startCol].isAlive = true
	gameOfLife.cells[startRow+1][startCol+1].isAlive = true
	gameOfLife.cells[startRow+1][startCol+2].isAlive = true
}


function createToad(gameOfLife, startRow, startCol) {
	gameOfLife.cells[startRow+1][startCol+1].isAlive = true
	gameOfLife.cells[startRow+1][startCol+2].isAlive = true
	gameOfLife.cells[startRow+1][startCol+3].isAlive = true
	gameOfLife.cells[startRow+2][startCol].isAlive = true
	gameOfLife.cells[startRow+2][startCol+1].isAlive = true
	gameOfLife.cells[startRow+2][startCol+2].isAlive = true
}


function createBeacon(gameOfLife, startRow, startCol) {
	gameOfLife.cells[startRow][startCol].isAlive = true
	gameOfLife.cells[startRow+1][startCol].isAlive = true
	gameOfLife.cells[startRow][startCol+1].isAlive = true
	gameOfLife.cells[startRow+1][startCol+1].isAlive = true
	gameOfLife.cells[startRow+2][startCol+2].isAlive = true
	gameOfLife.cells[startRow+2][startCol+3].isAlive = true
	gameOfLife.cells[startRow+3][startCol+2].isAlive = true
	gameOfLife.cells[startRow+3][startCol+3].isAlive = true
}


function createPulsar(gameOfLife, startRow, startCol) {
	gameOfLife.cells[startRow+2][startCol+4].isAlive = true
	gameOfLife.cells[startRow+2][startCol+5].isAlive = true
	gameOfLife.cells[startRow+2][startCol+6].isAlive = true
	gameOfLife.cells[startRow+2][startCol+10].isAlive = true
	gameOfLife.cells[startRow+2][startCol+11].isAlive = true
	gameOfLife.cells[startRow+2][startCol+12].isAlive = true

	gameOfLife.cells[startRow+4][startCol+2].isAlive = true
	gameOfLife.cells[startRow+5][startCol+2].isAlive = true
	gameOfLife.cells[startRow+6][startCol+2].isAlive = true
	gameOfLife.cells[startRow+4][startCol+7].isAlive = true
	gameOfLife.cells[startRow+5][startCol+7].isAlive = true
	gameOfLife.cells[startRow+6][startCol+7].isAlive = true
	gameOfLife.cells[startRow+4][startCol+9].isAlive = true
	gameOfLife.cells[startRow+5][startCol+9].isAlive = true
	gameOfLife.cells[startRow+6][startCol+9].isAlive = true
	gameOfLife.cells[startRow+4][startCol+14].isAlive = true
	gameOfLife.cells[startRow+5][startCol+14].isAlive = true
	gameOfLife.cells[startRow+6][startCol+14].isAlive = true

	gameOfLife.cells[startRow+7][startCol+4].isAlive = true
	gameOfLife.cells[startRow+7][startCol+5].isAlive = true
	gameOfLife.cells[startRow+7][startCol+6].isAlive = true
	gameOfLife.cells[startRow+7][startCol+10].isAlive = true
	gameOfLife.cells[startRow+7][startCol+11].isAlive = true
	gameOfLife.cells[startRow+7][startCol+12].isAlive = true

	gameOfLife.cells[startRow+9][startCol+4].isAlive = true
	gameOfLife.cells[startRow+9][startCol+5].isAlive = true
	gameOfLife.cells[startRow+9][startCol+6].isAlive = true
	gameOfLife.cells[startRow+9][startCol+10].isAlive = true
	gameOfLife.cells[startRow+9][startCol+11].isAlive = true
	gameOfLife.cells[startRow+9][startCol+12].isAlive = true

	gameOfLife.cells[startRow+10][startCol+2].isAlive = true
	gameOfLife.cells[startRow+11][startCol+2].isAlive = true
	gameOfLife.cells[startRow+12][startCol+2].isAlive = true
	gameOfLife.cells[startRow+10][startCol+7].isAlive = true
	gameOfLife.cells[startRow+11][startCol+7].isAlive = true
	gameOfLife.cells[startRow+12][startCol+7].isAlive = true
	gameOfLife.cells[startRow+10][startCol+9].isAlive = true
	gameOfLife.cells[startRow+11][startCol+9].isAlive = true
	gameOfLife.cells[startRow+12][startCol+9].isAlive = true
	gameOfLife.cells[startRow+10][startCol+14].isAlive = true
	gameOfLife.cells[startRow+11][startCol+14].isAlive = true
	gameOfLife.cells[startRow+12][startCol+14].isAlive = true

	gameOfLife.cells[startRow+14][startCol+4].isAlive = true
	gameOfLife.cells[startRow+14][startCol+5].isAlive = true
	gameOfLife.cells[startRow+14][startCol+6].isAlive = true
	gameOfLife.cells[startRow+14][startCol+10].isAlive = true
	gameOfLife.cells[startRow+14][startCol+11].isAlive = true
	gameOfLife.cells[startRow+14][startCol+12].isAlive = true
}


function createPentadecathlon(gameOfLife, startRow, startCol) {
	gameOfLife.cells[startRow+4][startCol+5].isAlive = true
	gameOfLife.cells[startRow+5][startCol+5].isAlive = true
	gameOfLife.cells[startRow+6][startCol+4].isAlive = true
	gameOfLife.cells[startRow+6][startCol+6].isAlive = true
	gameOfLife.cells[startRow+7][startCol+5].isAlive = true
	gameOfLife.cells[startRow+8][startCol+5].isAlive = true
	gameOfLife.cells[startRow+9][startCol+5].isAlive = true
	gameOfLife.cells[startRow+10][startCol+5].isAlive = true
	gameOfLife.cells[startRow+11][startCol+4].isAlive = true
	gameOfLife.cells[startRow+11][startCol+6].isAlive = true
	gameOfLife.cells[startRow+12][startCol+5].isAlive = true
	gameOfLife.cells[startRow+13][startCol+5].isAlive = true
}


// ================== SPACESHIPS ======================= //

function createGlider(gameOfLife, startRow, startCol) {
	gameOfLife.cells[startRow][startCol+2].isAlive = true
	gameOfLife.cells[startRow+1][startCol+2].isAlive = true
	gameOfLife.cells[startRow+2][startCol+2].isAlive = true
	gameOfLife.cells[startRow+2][startCol+1].isAlive = true
	gameOfLife.cells[startRow+1][startCol].isAlive = true
}


function createLWSS(gameOfLife, startRow, startCol) { // Light-weight spaceship
	gameOfLife.cells[startRow][startCol].isAlive = true
	gameOfLife.cells[startRow][startCol+3].isAlive = true
	gameOfLife.cells[startRow+1][startCol+4].isAlive = true
	gameOfLife.cells[startRow+2][startCol+4].isAlive = true
	gameOfLife.cells[startRow+3][startCol+4].isAlive = true
	gameOfLife.cells[startRow+3][startCol+3].isAlive = true
	gameOfLife.cells[startRow+3][startCol+2].isAlive = true
	gameOfLife.cells[startRow+3][startCol+1].isAlive = true
	gameOfLife.cells[startRow+2][startCol].isAlive = true
}

function createMWSS(gameOfLife, startRow, startCol) { // Middle-weight spaceship
	gameOfLife.cells[startRow][startCol+2].isAlive = true
	gameOfLife.cells[startRow+1][startCol].isAlive = true
	gameOfLife.cells[startRow+1][startCol+4].isAlive = true
	gameOfLife.cells[startRow+2][startCol+5].isAlive = true
	gameOfLife.cells[startRow+3][startCol+5].isAlive = true
	gameOfLife.cells[startRow+4][startCol+5].isAlive = true
	gameOfLife.cells[startRow+4][startCol+4].isAlive = true
	gameOfLife.cells[startRow+4][startCol+3].isAlive = true
	gameOfLife.cells[startRow+4][startCol+2].isAlive = true
	gameOfLife.cells[startRow+4][startCol+1].isAlive = true
	gameOfLife.cells[startRow+3][startCol].isAlive = true
}


function createHWSS(gameOfLife, startRow, startCol) { // Heavy-weight spaceship
	gameOfLife.cells[startRow][startCol+2].isAlive = true
	gameOfLife.cells[startRow][startCol+3].isAlive = true
	gameOfLife.cells[startRow+1][startCol+5].isAlive = true
	gameOfLife.cells[startRow+2][startCol+6].isAlive = true
	gameOfLife.cells[startRow+3][startCol+6].isAlive = true
	gameOfLife.cells[startRow+4][startCol+6].isAlive = true
	gameOfLife.cells[startRow+4][startCol+5].isAlive = true
	gameOfLife.cells[startRow+4][startCol+4].isAlive = true
	gameOfLife.cells[startRow+4][startCol+3].isAlive = true
	gameOfLife.cells[startRow+4][startCol+2].isAlive = true
	gameOfLife.cells[startRow+4][startCol+1].isAlive = true
	gameOfLife.cells[startRow+3][startCol].isAlive = true
}


// ================== GLIDER GUNS ======================= //

function createGosperGliderGun(gameOfLife, startRow, startCol) {
	createBlock(gameOfLife, startRow+5, startCol+1)
	createBlock(gameOfLife, startRow+3, startCol+35)

	gameOfLife.cells[startRow+5][startCol+11].isAlive = true
	gameOfLife.cells[startRow+6][startCol+11].isAlive = true
	gameOfLife.cells[startRow+7][startCol+11].isAlive = true
	gameOfLife.cells[startRow+8][startCol+12].isAlive = true
	gameOfLife.cells[startRow+4][startCol+12].isAlive = true
	gameOfLife.cells[startRow+9][startCol+13].isAlive = true
	gameOfLife.cells[startRow+3][startCol+13].isAlive = true
	gameOfLife.cells[startRow+9][startCol+14].isAlive = true
	gameOfLife.cells[startRow+3][startCol+14].isAlive = true
	gameOfLife.cells[startRow+6][startCol+15].isAlive = true
	gameOfLife.cells[startRow+5][startCol+17].isAlive = true
	gameOfLife.cells[startRow+6][startCol+17].isAlive = true
	gameOfLife.cells[startRow+7][startCol+17].isAlive = true
	gameOfLife.cells[startRow+4][startCol+16].isAlive = true
	gameOfLife.cells[startRow+8][startCol+16].isAlive = true
	gameOfLife.cells[startRow+6][startCol+18].isAlive = true

	gameOfLife.cells[startRow+3][startCol+21].isAlive = true
	gameOfLife.cells[startRow+4][startCol+21].isAlive = true
	gameOfLife.cells[startRow+5][startCol+21].isAlive = true
	gameOfLife.cells[startRow+3][startCol+22].isAlive = true
	gameOfLife.cells[startRow+4][startCol+22].isAlive = true
	gameOfLife.cells[startRow+5][startCol+22].isAlive = true
	gameOfLife.cells[startRow+2][startCol+23].isAlive = true
	gameOfLife.cells[startRow+6][startCol+23].isAlive = true
	gameOfLife.cells[startRow+1][startCol+25].isAlive = true
	gameOfLife.cells[startRow+2][startCol+25].isAlive = true
	gameOfLife.cells[startRow+6][startCol+25].isAlive = true
	gameOfLife.cells[startRow+7][startCol+25].isAlive = true
}


function createSimkinGliderGun(gameOfLife, startRow, startCol) {
	createBlock(gameOfLife, startRow+1, startCol+1)
	createBlock(gameOfLife, startRow+1, startCol+8)
	createBlock(gameOfLife, startRow+4, startCol+5)

	gameOfLife.cells[startRow+10][startCol+23].isAlive = true
	gameOfLife.cells[startRow+10][startCol+24].isAlive = true
	gameOfLife.cells[startRow+10][startCol+26].isAlive = true
	gameOfLife.cells[startRow+10][startCol+27].isAlive = true
	gameOfLife.cells[startRow+11][startCol+22].isAlive = true
	gameOfLife.cells[startRow+12][startCol+22].isAlive = true
	gameOfLife.cells[startRow+13][startCol+22].isAlive = true
	gameOfLife.cells[startRow+13][startCol+23].isAlive = true
	gameOfLife.cells[startRow+13][startCol+24].isAlive = true
	gameOfLife.cells[startRow+11][startCol+28].isAlive = true
	gameOfLife.cells[startRow+12][startCol+29].isAlive = true
	gameOfLife.cells[startRow+13][startCol+28].isAlive = true
	gameOfLife.cells[startRow+14][startCol+27].isAlive = true

	createBlock(gameOfLife, startRow+12, startCol+32)	
}


