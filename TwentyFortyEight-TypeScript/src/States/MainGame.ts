module TwentyFortyEightGame {
	export class MainGame extends Phaser.State {
		// Store the cell values.
		cells = new Array(
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0,
			0, 0, 0, 0);

		// this is the group which will contain all tile sprites
		tileSprites;

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
	}
}