module StarterProject {
	export class Play extends Phaser.State {
		// Number of rows and columns in the grid.
		fieldSize = 6;
		// Number of different tile possibilities.
		tileTypes = 6;

		// Zoom ratio to highlight a selected tile.
		pickedZoom = 1.1;

		// Store whether the user is actively dragging.
		dragging = false;
		// Row to move.
		movingRow;
		// Column to move.
		movingColumn;
		// X the user started dragging at.
		startX: number;
		// Y the user started dragging at.
		startY: number;
		// Horizontal distance moved during dragging.
		distX: number;
		// Vertical distance moved during dragging.
		distY: number;

		// Game's tiles.
		tileArray = [];
		// Contains all tiles in the game.
		tileGroup: Phaser.Group;
		// Contains the moving tile.
		movingTileGroup: Phaser.Group;

		init() {
			console.log((new Date).toISOString() + ' : Entered Play init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Play preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Play create()');

			this.tileGroup = this.game.add.group();
			this.movingTileGroup = this.game.add.group();

			this.generateGameField();

			this.game.input.onDown.add(this.pickTile, this);
			this.game.input.onUp.add(this.releaseTile, this);
		}

		update() {/*
			if (this.dragging) {
				this.distX = this.game.input.worldX - this.startX;
				this.distY = this.game.input.worldY - this.startY;

				switch (this.dragDirection) {
					case "":
						// A drag direction hasn't been determined yet.
						var distance = this.distX * this.distX + this.distY * this.distY;

						if (distance > 25) {
							// No clue. :)
							var dragAngle = Math.abs(Math.atan2(this.distY, this.distX));
							if (dragAngle > Math.PI / 4 && dragAngle < 3 * Math.PI / 4) {
								this.dragDirection = "vertical";
							} else {
								this.dragDirection = "horizontal";
							}
						}

						break;

					case "horizontal":
						this.tempTile.visible = false;
						this.tempTile.y = this.movingRow * Game.TILE_SIZE;

						var deltaX = Math.floor(this.distX / Game.TILE_SIZE) % this.fieldSize;

						if (deltaX >= 0) {
							this.tempTile.frame = this.tileArray[this.movingRow][this.fieldSize - 1 - deltaX].frame;
						} else {
							deltaX = deltaX * -1 - 1;
							this.tempTile.frame = this.tileArray[this.movingRow][deltaX].frame;
						}

						for (var i = 0; i < this.fieldSize; i++) {
							this.tileArray[this.movingRow][i].x = (i * Game.TILE_SIZE + this.distX) % (Game.TILE_SIZE * this.fieldSize);
							if (this.tileArray[this.movingRow][i].x < 0) {
								this.tileArray[this.movingRow][i].x += Game.TILE_SIZE * this.fieldSize;
							}

							if (this.distX % Game.TILE_SIZE > 0) {
								this.tempTile.visible = true;
								this.tempTile.x = this.distX % Game.TILE_SIZE - Game.TILE_SIZE;
							}

							if (this.distX % Game.TILE_SIZE < 0) {
								this.tempTile.visible = true;
								this.tempTile.x = this.distX % Game.TILE_SIZE;
							}
						}

						break;

					case "vertical":
						this.tempTile.visible = false;
						this.tempTile.x = this.movingColumn * Game.TILE_SIZE;

						var deltaY = Math.floor(this.distY / Game.TILE_SIZE) % this.fieldSize;

						if (deltaY >= 0) {
							this.tempTile.frame = this.tileArray[this.fieldSize - 1 - deltaY][this.movingColumn].frame;
						} else {
							deltaY = deltaY * -1 - 1;
							this.tempTile.frame = this.tileArray[deltaY][this.movingColumn].frame;
						}

						for (var i = 0; i < this.fieldSize; i++) {
							this.tileArray[i][this.movingColumn].y = (i * Game.TILE_SIZE + this.distY) % (Game.TILE_SIZE * this.fieldSize);
							if (this.tileArray[i][this.movingColumn].y < 0) {
								this.tileArray[i][this.movingColumn].y += Game.TILE_SIZE * this.fieldSize;
							}

							if (this.distY % Game.TILE_SIZE > 0) {
								this.tempTile.visible = true;
								this.tempTile.y = this.distY % Game.TILE_SIZE - Game.TILE_SIZE;
							}

							if (this.distY % Game.TILE_SIZE < 0) {
								this.tempTile.visible = true;
								this.tempTile.y = this.distY % Game.TILE_SIZE;
							}
						}

						break;
				}
			}*/
		}

		generateGameField() {
			for (var i = 0; i < this.fieldSize; i++) {
				this.tileArray[i] = [];
				for (var j = 0; j < this.fieldSize; j++) {
					var randomTile = this.game.rnd.integerInRange(0, this.tileTypes);

					var theTile = this.game.add.sprite(j * Game.TILE_SIZE + Game.TILE_SIZE / 2, i * Game.TILE_SIZE + Game.TILE_SIZE / 2, "tiles");
					theTile.frame = randomTile;
					theTile.anchor.setTo(0.5);

					this.tileArray[i][j] = theTile;

					this.tileGroup.add(theTile);
				}
			}
		}

		pickTile() {
			// They've started dragging.
			this.startX = this.game.input.worldX;
			this.startY = this.game.input.worldY;

			// Determine what row and column they started on.
			this.movingRow = Math.floor(this.startY / Game.TILE_SIZE);
			this.movingColumn = Math.floor(this.startX / Game.TILE_SIZE);

			this.movingTileGroup.add(this.tileArray[this.movingRow][this.movingColumn]);

			(<Phaser.Sprite>this.tileArray[this.movingRow][this.movingColumn]).scale.setTo(1.1);

			this.dragging = true;
		}

		releaseTile() {
			if (this.dragging) {/*
				switch (this.dragDirection) {
					case "horizontal":
						var shiftAmount = Math.floor(this.distX / (Game.TILE_SIZE / 2));
						shiftAmount = Math.ceil(shiftAmount / 2) % this.fieldSize;

						var tempArray = [];

						if (shiftAmount > 0) {
							for (var i = 0; i < this.fieldSize; i++) {
								tempArray[(shiftAmount + i) % this.fieldSize] = this.tileArray[this.movingRow][i].frame;
							}
						} else {
							shiftAmount *= -1;
							for (var i = 0; i < this.fieldSize; i++) {
								tempArray[i] = this.tileArray[this.movingRow][(shiftAmount + i) % this.fieldSize].frame;
							}
						}

						for (var i = 0; i < this.fieldSize; i++) {
							this.tileArray[this.movingRow][i].frame = tempArray[i];
							this.tileArray[this.movingRow][i].x = i * Game.TILE_SIZE;
						}

						break;

					case "vertical":
						var shiftAmount = Math.floor(this.distY / (Game.TILE_SIZE / 2));
						shiftAmount = Math.ceil(shiftAmount / 2) % this.fieldSize;

						var tempArray = [];

						if (shiftAmount > 0) {
							for (var i = 0; i < this.fieldSize; i++) {
								tempArray[(shiftAmount + i) % this.fieldSize] = this.tileArray[i][this.movingColumn].frame;
							}
						} else {
							shiftAmount *= -1;
							for (var i = 0; i < this.fieldSize; i++) {
								tempArray[i] = this.tileArray[(shiftAmount + i) % this.fieldSize][this.movingColumn].frame;
							}
						}

						for (var i = 0; i < this.fieldSize; i++) {
							this.tileArray[i][this.movingColumn].frame = tempArray[i];
							this.tileArray[i][this.movingColumn].y = i * Game.TILE_SIZE;
						}

						break;
				}*/

				(<Phaser.Sprite>this.tileArray[this.movingRow][this.movingColumn]).scale.setTo(1);

				// Let the user drag again.
				this.dragging = false;
			}
		}
	}
}