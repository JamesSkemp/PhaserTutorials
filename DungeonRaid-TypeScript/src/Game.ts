module DungeonRaidProject {
	export class Game extends Phaser.State {
		tileSize: number = 140;
		fieldSize = {
			rows: 6,
			cols: 5
		};
		fallSpeed: number = 250;
		diagonal: boolean = false;
		colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00];
		tilesArray = [];
		arrowsArray = [];
		tileGroup: Phaser.Group;
		arrowsGroup: Phaser.Group;
		removedTiles = [];
		visitedTiles = [];
		pickedColor: number;

		init() {
			console.log((new Date).toISOString() + ' : Entered Game init()');
			// If you want to scale the game, you can set that here.
			this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			// If we put our game in a div, we need to add the following as well, if you SHOW_ALL.
			this.game.scale.windowConstraints.bottom = 'visual';

			// Uncomment to place our game in the center of the screen both horizontally and vertically.
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;

			// Disable multitouch. It's recommended by the creators to set this unless your game needs multitouch.
			this.input.maxPointers = 1;

			// If your game uses a physics system, you can start that here.
			//this.game.physics.startSystem(Phaser.Physics.ARCADE);
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Game preload()');

			this.game.stage.backgroundColor = '#444';

			// Load the actual assets. By default the path will be set to the assets directory.
			this.load.path = 'assets/';
			this.load.image('tiles');
			this.load.spritesheet('arrows', 'arrows.png', 420, 420);
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Game create()');
			// Start building your game here.
			this.createLevel();
			this.game.input.onDown.add(this.pickTile, this);
		}

		update() {
		}

		createLevel() {
			this.tilesArray = [];
			this.arrowsArray = [];
			this.tileGroup = this.game.add.group();
			this.arrowsGroup = this.game.add.group();
			this.tileGroup.x = (this.game.width - this.tileSize * this.fieldSize.cols) / 2;
			this.tileGroup.y = (this.game.height - this.tileSize * this.fieldSize.rows) / 2;
			this.arrowsGroup.x = this.tileGroup.x;
			this.arrowsGroup.y = this.tileGroup.y;

			var tileMask = this.game.add.graphics(this.tileGroup.x, this.tileGroup.y);
			tileMask.beginFill(0xffffff);
			tileMask.drawRect(0, 0, this.tileSize * this.fieldSize.cols, this.tileSize * this.fieldSize.rows);
			this.tileGroup.mask = tileMask;

			// Create actual tiles.
			for (var i = 0; i < this.fieldSize.rows; i++) {
				this.tilesArray[i] = [];
				for (var j = 0; j < this.fieldSize.cols; j++) {
					// Add actual tile.
					this.addTile(i, j);
				}
			}
			this.removedTiles = [];
		}

		addTile(row: number, col: number) {
			var tileXPos = col * this.tileSize + this.tileSize / 2;
			var tileYPos = row * this.tileSize + this.tileSize / 2;
			var theTile = new Tile(this.game, tileXPos, tileYPos);
			theTile.anchor.set(0.5);
			theTile.picked = false;
			theTile.coordinate = new Phaser.Point(col, row);
			theTile.value = Phaser.ArrayUtils.getRandomItem(this.colors);
			theTile.tint = theTile.value;

			this.tilesArray[row][col] = theTile;

			var text = this.game.add.text(-this.tileSize / 4, 0, "R" + theTile.coordinate.y.toString() + " , C" + theTile.coordinate.x.toString(), { fill: "#000", font: "bold 24px Arial" });
			theTile.addChild(text);
			this.tileGroup.add(theTile);
		}

		pickTile(e: Phaser.Pointer) {
			//console.log(arguments);

			this.visitedTiles = [];
			this.visitedTiles.length = 0;

			if (this.tileGroup.getBounds().contains(e.position.x, e.position.y)) {
				var col = Math.floor((e.position.x - this.tileGroup.x) / this.tileSize);
				var row = Math.floor((e.position.y - this.tileGroup.y) / this.tileSize);
				(this.tilesArray[row][col] as Tile).alpha = 0.5;
				(this.tilesArray[row][col] as Tile).picked = true;
				this.pickedColor = (this.tilesArray[row][col] as Tile).value;
				
				this.game.input.onDown.remove(this.pickTile, this);
				this.game.input.onUp.add(this.releaseTile, this);
				this.game.input.addMoveCallback(this.moveTile, this);

				this.visitedTiles.push((this.tilesArray[row][col] as Tile).coordinate);
				console.log("Picked tile at R" + row + " , C" + col);
			}
		}

		moveTile(e: Phaser.Pointer) {
			//console.log(arguments);

			if (this.tileGroup.getBounds().contains(e.position.x, e.position.y)) {
				var col = Math.floor((e.position.x - this.tileGroup.x) / this.tileSize);
				var row = Math.floor((e.position.y - this.tileGroup.y) / this.tileSize);
				var distance = new Phaser.Point(e.position.x - this.tileGroup.x, e.position.y - this.tileGroup.y).distance(this.tilesArray[row][col]);

				if (distance < this.tileSize * 0.4 && this.tilesArray[row][col].value == this.pickedColor) {
					if (!this.tilesArray[row][col].picked && this.checkAdjacent(new Phaser.Point(col, row), this.visitedTiles[this.visitedTiles.length - 1])) {
						(this.tilesArray[row][col] as Tile).picked = true;
						(this.tilesArray[row][col] as Tile).alpha = 0.5;
						this.visitedTiles.push((this.tilesArray[row][col] as Tile).coordinate);
						this.addArrow();
					} else {
						// Backtracking.
						if (this.visitedTiles.length > 1 && row == this.visitedTiles[this.visitedTiles.length - 2].y && col == this.visitedTiles[this.visitedTiles.length - 2].x) {
							this.tilesArray[this.visitedTiles[this.visitedTiles.length - 1].y][this.visitedTiles[this.visitedTiles.length - 1].x].picked = false;
							this.tilesArray[this.visitedTiles[this.visitedTiles.length - 1].y][this.visitedTiles[this.visitedTiles.length - 1].x].alpha = 1;
							this.visitedTiles.pop();
							this.arrowsArray[this.arrowsArray.length - 1].destroy();
							this.arrowsArray.pop();
						 }
					}
				}
			}
		}

		checkAdjacent(p1: Phaser.Point, p2: Phaser.Point) {
			if (this.diagonal) {
				return (Math.abs(p1.x - p2.x) <= 1) && (Math.abs(p1.y - p2.y) <= 1);
			} else {
				return (Math.abs(p1.x - p2.x) == 1 && p1.y - p2.y == 0)
					|| (Math.abs(p1.y - p2.y) == 1 && p1.x - p2.x == 0);
			}
		}

		releaseTile() {
			this.game.input.onUp.remove(this.releaseTile, this);
			this.game.input.deleteMoveCallback(this.moveTile, this);

			this.clearPath();

			this.tilesFallDown();

			this.placeNewTiles();

			console.log("=========");
		}
		
		addArrow() {
			var fromTile = this.visitedTiles[this.visitedTiles.length - 2];
			var arrow = this.game.add.sprite(this.tilesArray[fromTile.y][fromTile.x].x, this.tilesArray[fromTile.y][fromTile.x].y, "arrows");
			this.arrowsGroup.add(arrow);
			arrow.anchor.set(0.5);

			var tileDiff = new Phaser.Point(this.visitedTiles[this.visitedTiles.length - 1].x, this.visitedTiles[this.visitedTiles.length - 1].y);
			tileDiff.subtract(this.visitedTiles[this.visitedTiles.length - 2].x, this.visitedTiles[this.visitedTiles.length - 2].y);
			if (tileDiff.x == 0) {
				arrow.angle = -90 * tileDiff.y;
			} else {
				arrow.angle = 90 * (tileDiff.x + 1);
				if (tileDiff.y != 0) {
					arrow.frame = 1;
					if (tileDiff.y + tileDiff.x == 0) {
						arrow.angle -= 90;
					}
				}
			}
			this.arrowsArray.push(arrow);
		}

		clearPath() {
			this.arrowsGroup.removeAll(true);
			for (var i = 0; i < this.visitedTiles.length; i++) {
				this.tilesArray[this.visitedTiles[i].y][this.visitedTiles[i].x].visible = false;
				this.removedTiles.push(this.tilesArray[this.visitedTiles[i].y][this.visitedTiles[i].x]);
				this.tilesArray[this.visitedTiles[i].y][this.visitedTiles[i].x] = null;
			}
		}

		tilesFallDown() {
			for (var i = this.fieldSize.cols - 1; i >= 0; i--) {
				for (var j = 0; j < this.fieldSize.rows; j++) {
					if (this.tilesArray[i][j] != null) {
						var holes = this.holesBelow(i, j);
						if (holes > 0) {
							var coordinate = new Phaser.Point(this.tilesArray[i][j].coordinate.x, this.tilesArray[i][j].coordinate.y);
							var destination = new Phaser.Point(j, i + holes);

							var tween = this.game.add.tween(this.tilesArray[i][j]).to({
								y: this.tilesArray[i][j].y + holes * this.tileSize 
							}, this.fallSpeed, Phaser.Easing.Linear.None, true);
							tween.onComplete.add(this.nextPick, this);

							this.tilesArray[destination.y][destination.x] = this.tilesArray[i][j];
							this.tilesArray[coordinate.y][coordinate.x] = null;
							this.tilesArray[destination.y][destination.x].coordinate = new Phaser.Point(destination.x, destination.y)
							this.tilesArray[destination.y][destination.x].children[0].text = "R" + destination.y + ", C" + destination.x; 
						}
					}
				}
			}
		}

		holesBelow(row, col) {
			var result = 0;
			for (var i = row + 1; i < this.fieldSize.rows; i++) {
				if (this.tilesArray[i][col] == null) {
					result++;
				}
			}
			return result;
		}

		holesInCol(col: number) {
			var result = 0;
			for (var i = 0; i < this.fieldSize.rows; i++) {
				if (this.tilesArray[i][col] == null) {
					result++;
				}
			}
			return result;
		}

		nextPick() {
			if (!this.game.input.onDown.has(this.pickTile, this)) {
				this.game.input.onDown.add(this.pickTile, this);
			}
		}

		placeNewTiles() {
			for (var i = 0; i < this.fieldSize.cols; i++) {
				var holes = this.holesInCol(i);
				if (holes > 0) {
					for (var j = 1; j <= holes; j++) {
						var tileXPos = i * this.tileSize + this.tileSize / 2;
						var tileYPos = -j * this.tileSize + this.tileSize / 2;

						var theTile: Tile = this.removedTiles.pop();
						theTile.position = new Phaser.Point(tileXPos, tileYPos);
						theTile.visible = true;
						theTile.alpha = 1;
						theTile.picked = false;
						theTile.value = Phaser.ArrayUtils.getRandomItem(this.colors);
						theTile.tint = theTile.value;

						var tween = this.game.add.tween(theTile).to({
							y: theTile.y + holes * this.tileSize
						}, this.fallSpeed, Phaser.Easing.Linear.None, true);
						tween.onComplete.add(this.nextPick, this);

						theTile.coordinate = new Phaser.Point(i, holes - j);
						this.tilesArray[holes - j][i] = theTile;
						(theTile.children[0] as Phaser.Text).text = "R" + theTile.coordinate.y + ", C" + theTile.coordinate.x;
					}
				}
			}
		}
	}

	export class Tile extends Phaser.Sprite {
		picked: boolean;
		coordinate: Phaser.Point;
		value: number;

		constructor(game, x, y) {
			super(game, x, y, 'tiles');
		}
	}
}
