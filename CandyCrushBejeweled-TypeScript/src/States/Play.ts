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

		tileDown(tile: Phaser.Sprite, pointer: Phaser.Pointer) {
			if (this.canMove) {
				this.activeTile1 = tile;

				this.startPosX = (tile.x - this.tileWidth / 2) / this.tileWidth;
				this.startPosY = (tile.y - this.tileHeight / 2) / this.tileHeight;
			}
		}

		swapTiles() {
			if (this.activeTile1 && this.activeTile2) {
				var tile1Pos = {
					x: (this.activeTile1.x - this.tileWidth / 2) / this.tileWidth,
					y: (this.activeTile1.y - this.tileHeight / 2) / this.tileHeight
				};
				var tile2Pos = {
					x: (this.activeTile2.x - this.tileWidth / 2) / this.tileWidth,
					y: (this.activeTile2.y - this.tileHeight / 2) / this.tileHeight
				};

				// Swap them in our grid.
				this.tileGrid[tile1Pos.x][tile1Pos.y] = this.activeTile2;
				this.tileGrid[tile2Pos.x][tile2Pos.y] = this.activeTile1;

				// Move the sprites.
				this.game.add.tween(this.activeTile1).to({x: tile2Pos.x * this.tileWidth + (this.tileWidth / 2), y: tile2Pos.y * this.tileHeight + (this.tileHeight / 2) }, 200, Phaser.Easing.Linear.None, true);
				this.game.add.tween(this.activeTile2).to({ x: tile1Pos.x * this.tileWidth + (this.tileWidth / 2), y: tile1Pos.y * this.tileHeight + (this.tileHeight / 2) }, 200, Phaser.Easing.Linear.None, true);

				this.activeTile1 = this.tileGrid[tile1Pos.x][tile1Pos.y];
				this.activeTile2 = this.tileGrid[tile2Pos.x][tile2Pos.y];
			}
		}

		checkMatch() {
			var matches = this.getMatches(this.tileGrid);

			if (matches.length > 0) {
				this.removeTileGroup(matches);

				this.resetTile();

				this.fillTile();

				this.game.time.events.add(500, () => {
					this.tileUp();
				});

				this.game.time.events.add(600, () => {
					this.checkMatch();
				});
			} else {
				// There are no matches, so put the tiles back where they were.
				this.swapTiles();
				this.game.time.events.add(500, () => {
					this.tileUp();
					this.canMove = true;
				});
			}
		}

		getMatches(tileGrid): any[] {
			var matches = [];
			var groups = [];

			//Check for horizontal matches
			for (var i = 0; i < tileGrid.length; i++) {
				var tempArr = tileGrid[i];
				groups = [];
				for (var j = 0; j < tempArr.length; j++) {
					if (j < tempArr.length - 2)
						if (tileGrid[i][j] && tileGrid[i][j + 1] && tileGrid[i][j + 2]) {
							if (tileGrid[i][j].key == tileGrid[i][j + 1].key && tileGrid[i][j + 1].key == tileGrid[i][j + 2].key) {
								if (groups.length > 0) {
									if (groups.indexOf(tileGrid[i][j]) == -1) {
										matches.push(groups);
										groups = [];
									}
								}

								if (groups.indexOf(tileGrid[i][j]) == -1) {
									groups.push(tileGrid[i][j]);
								}
								if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
									groups.push(tileGrid[i][j + 1]);
								}
								if (groups.indexOf(tileGrid[i][j + 2]) == -1) {
									groups.push(tileGrid[i][j + 2]);
								}
							}
						}
				}
				if (groups.length > 0) matches.push(groups);
			}
 
			//Check for vertical matches
			for (j = 0; j < tileGrid.length; j++) {
				var tempArr = tileGrid[j];
				groups = [];
				for (i = 0; i < tempArr.length; i++) {
					if (i < tempArr.length - 2)
						if (tileGrid[i][j] && tileGrid[i + 1][j] && tileGrid[i + 2][j]) {
							if (tileGrid[i][j].key == tileGrid[i + 1][j].key && tileGrid[i + 1][j].key == tileGrid[i + 2][j].key) {
								if (groups.length > 0) {
									if (groups.indexOf(tileGrid[i][j]) == -1) {
										matches.push(groups);
										groups = [];
									}
								}

								if (groups.indexOf(tileGrid[i][j]) == -1) {
									groups.push(tileGrid[i][j]);
								}
								if (groups.indexOf(tileGrid[i + 1][j]) == -1) {
									groups.push(tileGrid[i + 1][j]);
								}
								if (groups.indexOf(tileGrid[i + 2][j]) == -1) {
									groups.push(tileGrid[i + 2][j]);
								}
							}
						}
				}
				if (groups.length > 0) matches.push(groups);
			}

			return matches;
		}

		removeTileGroup(matches) {
			//Loop through all the matches and remove the associated tiles
			for (var i = 0; i < matches.length; i++) {
				var tempArr = matches[i];

				for (var j = 0; j < tempArr.length; j++) {

					var tile = tempArr[j];
					//Find where this tile lives in the theoretical grid
					var tilePos = this.getTilePos(this.tileGrid, tile);
 
					//Remove the tile from the screen
					this.tiles.remove(tile);
 
					//Remove the tile from the theoretical grid
					if (tilePos.x != -1 && tilePos.y != -1) {
						this.tileGrid[tilePos.x][tilePos.y] = null;
					}

				}
			}
		}

		getTilePos(tileGrid, tile): any {
			var pos = { x: -1, y: -1 };
 
			//Find the position of a specific tile in the grid
			for (var i = 0; i < tileGrid.length; i++) {
				for (var j = 0; j < tileGrid[i].length; j++) {
					//There is a match at this position so return the grid coords
					if (tile == tileGrid[i][j]) {
						pos.x = i;
						pos.y = j;
						break;
					}
				}
			}

			return pos;
		}

		resetTile() {
			//Loop through each column starting from the left
			for (var i = 0; i < this.tileGrid.length; i++) {
 
				//Loop through each tile in column from bottom to top
				for (var j = this.tileGrid[i].length - 1; j > 0; j--) {
 
					//If this space is blank, but the one above it is not, move the one above down
					if (this.tileGrid[i][j] == null && this.tileGrid[i][j - 1] != null) {
						//Move the tile above down one
						var tempTile = this.tileGrid[i][j - 1];
						this.tileGrid[i][j] = tempTile;
						this.tileGrid[i][j - 1] = null;

						this.game.add.tween(tempTile).to({ y: (this.tileHeight * j) + (this.tileHeight / 2) }, 200, Phaser.Easing.Linear.None, true);
 
						//The positions have changed so start this process again from the bottom
						//NOTE: This is not set to this.tileGrid[i].length - 1 because it will immediately be decremented as
						//we are at the end of the loop.
						j = this.tileGrid[i].length;
					}
				}
			}
		}

		fillTile() {

		}

		tileUp() {
			this.activeTile1 = null;
			this.activeTile2 = null;
		}
	}
}