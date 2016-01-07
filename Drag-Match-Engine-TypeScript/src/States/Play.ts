module StarterProject {
	export class Play extends Phaser.State {
		// Number of rows and columns in the grid.
		fieldSize = 6;
		// Number of different tile possibilities.
		tileTypes = 6;

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
		// Direction the user is dragging in.
		dragDirection = "";

		// Game's tiles.
		tileArray = [];

		// Temporary tile.
		tempTile: Phaser.Sprite;

		init() {
			console.log((new Date).toISOString() + ' : Entered Play init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Play preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Play create()');

			this.generateGameField();

			this.tempTile = this.game.add.sprite(0, 0, 'tiles');
			this.tempTile.visible = false;

			this.game.input.onDown.add(this.pickTile, this);
			this.game.input.onUp.add(this.releaseTile, this);
		}

		update() {
			if (this.dragging) {
				this.distX = this.game.input.worldX - this.startX;
				this.distY = this.game.input.worldY - this.startY;

				switch (this.dragDirection) {
					case "":
						// A drag direction hasn't been determined yet.

						break;

					case "horizontal":

						break;

					case "vertical":

						break;
				}
			}
		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered Play paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered Play resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered Play shutdown()');

		}

		generateGameField() {
			for (var i = 0; i < this.fieldSize; i++) {
				this.tileArray[i] = [];
				for (var j = 0; j < this.fieldSize; j++) {
					var randomTile = this.game.rnd.integerInRange(0, this.tileTypes);

					var theTile = this.game.add.sprite(j * Game.TILE_SIZE, i * Game.TILE_SIZE, "tiles");
					theTile.frame = randomTile;

					this.tileArray[i][j] = theTile;
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

			this.dragging = true;

			console.log(this.startX);
			console.log(this.startY);
			console.log(this.movingRow);
			console.log(this.movingColumn);
		}

		releaseTile() {
			console.log('release');
			if (this.dragging) {
				console.log('were dragging');
				// TODO

				this.dragging = false;
			}
		}
	}
}