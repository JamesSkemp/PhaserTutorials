module DungeonRaidProject {
	export class Game extends Phaser.State {
		phaserLogo: Phaser.Sprite;
		phaserLogoText: Phaser.Text;

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
		}

		update() {
		}
	}
}
