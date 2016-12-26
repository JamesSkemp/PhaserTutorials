module TwoDPlatformerProject {
	export class Game extends Phaser.State {
		player: Phaser.Sprite;
		wall: Phaser.Sprite;
		coin: Phaser.Sprite;
		enemy: Phaser.Sprite;

		cursor: Phaser.CursorKeys;

		init() {
			console.log((new Date).toISOString() + ' : Entered Game init()');
			// If you want to scale the game, you can set that here.
			//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			// If we put our game in a div, we need to add the following as well, if you SHOW_ALL.
			//this.game.scale.windowConstraints.bottom = 'visual';

			// Uncomment to place our game in the center of the screen both horizontally and vertically.
			//this.scale.pageAlignHorizontally = true;
			//this.scale.pageAlignVertically = true;

			// Disable multitouch. It's recommended by the creators to set this unless your game needs multitouch.
			this.input.maxPointers = 1;

			// If your game uses a physics system, you can start that here.
			this.game.physics.startSystem(Phaser.Physics.ARCADE);
			// Add physics to all objects in the world.
			this.game.world.enableBody = true;
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Game preload()');

			// Load the actual assets. By default the path will be set to the assets directory.
			this.load.path = 'assets/';
			//this.load.image('Phaser-Logo-Small');
			this.load.image('player', 'box.png');
			this.load.image('wall', 'box.png');
			this.load.image('coin', 'box.png');
			this.load.image('enemy', 'box.png');
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Game create()');
			// Start building your game here.

			this.game.stage.backgroundColor = '#3598db';

			this.cursor = this.game.input.keyboard.createCursorKeys();

			this.player = this.game.add.sprite(70, this.world.centerY, 'player');
			this.player.anchor.setTo(0.5);
			this.player.body.gravity.y = 600;

			//this.phaserLogo = this.add.sprite(this.world.centerX, this.world.centerY, 'Phaser-Logo-Small');
			//this.phaserLogo.anchor.setTo(0.5);

			//this.phaserLogoText = this.add.text(this.game.width / 8, this.game.height / 8, 'Powered by', { fontSize: '24px', fill: '#fff' });
		}

		update() {
		}
	}
}
