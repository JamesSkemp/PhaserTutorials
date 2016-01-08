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
			// Since we want the moving tile to display above all others, we add it to a group that's added to the game last.
			this.movingTileGroup = this.game.add.group();

			this.generateGameField();

			this.game.input.onDown.add(this.pickTile, this);
			this.game.input.onUp.add(this.releaseTile, this);
		}

		update() {
			if (this.dragging) {
				this.distX = this.game.input.worldX - this.startX;
				this.distY = this.game.input.worldY - this.startY;

				this.tileArray[this.movingRow][this.movingColumn].x = this.movingColumn * Game.TILE_SIZE + Game.TILE_SIZE / 2 + this.distX;
				this.tileArray[this.movingRow][this.movingColumn].y = this.movingRow * Game.TILE_SIZE + Game.TILE_SIZE / 2 + this.distY;
			}
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
			if (this.dragging) {
				// It doesn't need to be above the other tiles now, so put it back in with the others.
				this.tileGroup.add(this.tileArray[this.movingRow][this.movingColumn]);

				var landingRow = Math.floor(this.tileArray[this.movingRow][this.movingColumn].y / Game.TILE_SIZE);
				var landingColumn = Math.floor(this.tileArray[this.movingRow][this.movingColumn].x / Game.TILE_SIZE);

				(<Phaser.Sprite>this.tileArray[this.movingRow][this.movingColumn]).scale.setTo(1);

				(<Phaser.Sprite>this.tileArray[this.movingRow][this.movingColumn]).x = landingColumn * Game.TILE_SIZE + Game.TILE_SIZE / 2;
				(<Phaser.Sprite>this.tileArray[this.movingRow][this.movingColumn]).y = landingRow * Game.TILE_SIZE + Game.TILE_SIZE / 2;

				if (this.movingRow !== landingRow || this.movingColumn !== landingColumn) {
					// We actually moved, so display an animation.

					this.movingTileGroup.add(this.tileArray[landingRow][landingColumn]);

					var tileTween = this.game.add.tween(this.tileArray[landingRow][landingColumn]);
					tileTween.to({
						x: this.movingColumn * Game.TILE_SIZE + Game.TILE_SIZE / 2,
						y: this.movingRow * Game.TILE_SIZE + Game.TILE_SIZE / 2
					}, 800, Phaser.Easing.Cubic.Out, true);
					tileTween.onComplete.add(() => {
						this.tileGroup.add(this.tileArray[landingRow][landingColumn]);

						var temp = this.tileArray[landingRow][landingColumn];
						this.tileArray[landingRow][landingColumn] = this.tileArray[this.movingRow][this.movingColumn];
						this.tileArray[this.movingRow][this.movingColumn] = temp;
					}, this);
				}

				// Let the user drag again.
				this.dragging = false;
			}
		}
	}
}