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


		}

		update() {

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
	}
}