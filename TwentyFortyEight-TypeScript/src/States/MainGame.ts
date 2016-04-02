module TwentyFortyEightGame {
	export class MainGame extends Phaser.State {
		// Store the cell values.
		cells = new Array(
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0);

		// this is the group which will contain all tile sprites
		tileSprites: Phaser.Group;

		// Keyboard input.
		upKey: Phaser.Key;
		downKey: Phaser.Key;
		leftKey: Phaser.Key;
		rightKey: Phaser.Key;

		colors = {
			2: 0xFFFFFF,
			4: 0xFFEEEE,
			8: 0xFFDDDD,
			16: 0xFFCCCC,
			32: 0xFFBBBB,
			64: 0xFFAAAA,
			128: 0xFF9999,
			256: 0xFF8888,
			512: 0xFF7777,
			1024: 0xFF6666,
			2048: 0xFF5555,
			4096: 0xFF4444,
			8192: 0xFF3333,
			16384: 0xFF2222,
			32768: 0xFF1111,
			65536: 0xFF0000
		}

		canMove = false;

		init() {
			console.log((new Date).toISOString() + ' : Entered MainGame init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered MainGame preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered MainGame create()');

			// Setup WASD bindings.
			this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
			this.upKey.onDown.add(this.moveUp, this);
			this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
			this.downKey.onDown.add(this.moveDown, this);
			this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
			this.leftKey.onDown.add(this.moveLeft, this);
			this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
			this.rightKey.onDown.add(this.moveRight, this);

			this.tileSprites = this.game.add.group();

			// Add two new cells to the game initially.
			this.addTwo();
			this.addTwo();
		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered MainGame paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered MainGame resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered MainGame shutdown()');

		}

		moveUp() {
			console.log('up');
		}

		moveDown() {
			console.log('down');
		}

		moveLeft() {
			console.log('left');
		}

		moveRight() {
			console.log('right');
		}

		addTwo() {
			// Find an empty tile.
			var randomValue;
			do {
				randomValue = Math.floor(Math.random() * 16);
			} while (this.cells[randomValue] != 0);

			// Populate the cell with a value.
			this.cells[randomValue] = 2;

			// Create a new sprite to add to the game.
			var tile = new Tile(this.game, this.toCol(randomValue) * Game.TILE_SIZE, this.toRow(randomValue) * Game.TILE_SIZE);
			tile.pos = randomValue;
			// Tile should initially be transparent.
			tile.alpha = 0;

			// Text to display within the tile.
			var text = this.game.add.text(Game.TILE_SIZE / 2, Game.TILE_SIZE / 2, "2", { font: '16px Arial bold', align: 'center' });
			text.anchor.setTo(0.5);
			tile.addChild(text);

			this.tileSprites.add(tile);

			// Fade in the new tile.
			var fadeIn = this.game.add.tween(tile);
			fadeIn.to({ alpha: 1 }, 250);

			fadeIn.onComplete.add(function () {
				this.canMove = true;
			}, this);

			fadeIn.start();
		}

		toCol(cell: number): number {
			return cell % 4;
		}

		toRow(cell: number): number {
			return Math.floor(cell / 4);
		}

		updateNumbers() {

		}
	}
}