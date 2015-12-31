module CandyCrushBejeweledClone {
	export class Play extends Phaser.State {
		tileTypes: string[];
		score = 0;
		activeTile1 = null;
		activeTile2 = null;
		startPosX: number;
		startPosY: number;

		canMove = false;

		tileWidth: number = 125;
		tileHeight: number = 100;

		tiles: Phaser.Group;

		tileGrid;

		random: Phaser.RandomDataGenerator;

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

			this.stage.backgroundColor = '#34495f';
			this.tileTypes = [
				'blue', 'green', 'red', 'yellow'
			];

			// This isn't working, so hard-coding in the tile width/height.
			//var sampleTile = this.game.cache.getImage('blue');
			//console.log(sampleTile);
			//this.tileWidth = sampleTile.frame.width;
			//this.tileHeight = sampleTile.frame.height;

			// Will hold all tiles.
			this.tiles = this.game.add.group();

			this.tileGrid = [
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null]
			];

			var seed = Date.now();
			this.random = new Phaser.RandomDataGenerator([seed]);

			this.initTiles();
		}

		update() {
			// See if the user is dragging a tile.
			if (this.activeTile1 && !this.activeTile2) {
				// Current input position.
				var hoverX = this.game.input.x;
				var hoverY = this.game.input.y;

				// Grid location.
				var hoverPosX = Math.floor(hoverX / this.tileWidth);
				var hoverPosY = Math.floor(hoverY / this.tileHeight);

				// Calculate starting and current grid change, if any.
				var difX = (hoverPosX - this.startPosX);
				var difY = (hoverPosY - this.startPosY);

				// Verify they're within the bounds of the game.
				if (!(hoverPosY > this.tileGrid[0].length - 1 || hoverPosY < 0)
					&& !(hoverPosX > this.tileGrid.length - 1 || hoverPosX < 0)) {

					// See if a tile has been moved an entire width or height in a direction.
					if ((Math.abs(difY) == 1 && difX == 0) || (Math.abs(difX) == 1 && difY == 0)) {
						this.canMove = false;

						this.activeTile2 = this.tileGrid[hoverPosX][hoverPosY];

						this.swapTiles();

						this.game.time.events.add(500, () => {
							this.checkMatch();
						});
					}
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

		initTiles() {
			console.log((new Date).toISOString() + ' : Entered Play initTiles()');
			for (var column = 0; column < this.tileGrid.length; column++) {
				for (var row = 0; row < this.tileGrid.length; row++) {
					var tile = this.addTile(column, row);

					this.tileGrid[column][row] = tile;
				}
			}

			this.game.time.events.add(600, () => {
				this.checkMatch();
			});

			console.log(this.tiles);
			console.log(this.tileGrid);
		}

		addTile(x, y) {
			console.log((new Date).toISOString() + ' : Entered Play addTile()');
			var tileToAdd = this.tileTypes[this.random.integerInRange(0, this.tileTypes.length - 1)];

			var tile: Phaser.Sprite = this.tiles.create((x * this.tileWidth) + this.tileWidth / 2, 0, tileToAdd);

			this.game.add.tween(tile).to(
				{ y: y * this.tileHeight + this.tileHeight / 2 }
				, 500, Phaser.Easing.Linear.None, true
			);

			tile.anchor.setTo(0.5);
			tile.inputEnabled = true;

			tile.events.onInputDown.add(this.tileDown, this);

			return tile;
		}

		checkMatch() {

		}

		tileDown(tile: Phaser.Sprite, pointer: Phaser.Pointer) {
			if (this.canMove) {
				this.activeTile1 = tile;

				this.startPosX = (tile.x - this.tileWidth / 2) / this.tileWidth;
				this.startPosY = (tile.y - this.tileHeight / 2) / this.tileHeight;
			}
		}

		swapTiles() {

		}
	}
}