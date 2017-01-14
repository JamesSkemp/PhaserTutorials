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
					// TODO Add actual tile.
				}
			}
			this.removedTiles = [];
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