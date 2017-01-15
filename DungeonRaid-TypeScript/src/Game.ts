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

		pickTile(e) {
			this.visitedTiles = [];
			this.visitedTiles.length = 0;

			if (this.tileGroup.getBounds().contains(e.position.x, e.position.y)) {
				var col = Math.floor((e.position.x - this.tileGroup.x) / this.tileSize);
				var row = Math.floor((e.position.y - this.tileGroup.y) / this.tileSize);
				(this.tilesArray[row][col] as Tile).alpha = 0.5;
				(this.tilesArray[row][col] as Tile).picked = true;
				this.pickedColor = (this.tilesArray[row][col] as Tile).value;
				
				this.game.input.onDown.remove(this.pickTile, this);

				this.visitedTiles.push((this.tilesArray[row][col] as Tile).coordinate);
				console.log("Picked tile at R" + row + " , C" + col);
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
