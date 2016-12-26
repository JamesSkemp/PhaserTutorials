module TwoDPlatformerProject {
	export class Game extends Phaser.State {
		player: Phaser.Sprite;
		walls: Phaser.Group;
		coins: Phaser.Group;
		enemies: Phaser.Group;

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
			this.player.body.gravity.y = 600;

			this.walls = this.game.add.group();
			this.coins = this.game.add.group();
			this.enemies = this.game.add.group();

			// x = wall, ! = lava, o = coin
			var level = [
				'xxxxxxxxxxxxxxxxxxxxxx',
				'!         !          x',
				'!                 o  x',
				'!         o          x',
				'!                    x',
				'!     o   !    x     x',
				'xxxxxxxxxxxxxxxx!!!!!x',
			];

			// Create the level by going through the array
			for (var i = 0; i < level.length; i++) {
				for (var j = 0; j < level[i].length; j++) {

					// Create a wall and add it to the 'walls' group
					if (level[i][j] == 'x') {
						var wall = this.game.add.sprite(30+20*j, 30+20*i, 'wall');
						this.walls.add(wall);
						wall.body.immovable = true;
					}

					// Create a coin and add it to the 'coins' group
					else if (level[i][j] == 'o') {
						var coin = this.game.add.sprite(30+20*j, 30+20*i, 'coin');
						this.coins.add(coin);
					}

					// Create a enemy and add it to the 'enemies' group
					else if (level[i][j] == '!') {
						var enemy = this.game.add.sprite(30+20*j, 30+20*i, 'enemy');
						this.enemies.add(enemy);
					}
				}
			}
			//this.phaserLogo = this.add.sprite(this.world.centerX, this.world.centerY, 'Phaser-Logo-Small');
			//this.phaserLogo.anchor.setTo(0.5);

			//this.phaserLogoText = this.add.text(this.game.width / 8, this.game.height / 8, 'Powered by', { fontSize: '24px', fill: '#fff' });
		}

		update() {
			// Make the player and the walls collide
			this.game.physics.arcade.collide(this.player, this.walls);

			// Call the 'takeCoin' function when the player takes a coin
			this.game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

			// Call the 'restart' function when the player touches the enemy
			this.game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);

			if (this.cursor.left.isDown) {
				this.player.body.velocity.x = -200;
			} else if (this.cursor.right.isDown) {
				this.player.body.velocity.x = 200;
			} else {
				this.player.body.velocity.x = 0;
			}

			if (this.cursor.up.isDown && this.player.body.touching.down) {
				this.player.body.velocity.y = -250;
			}
		}

		takeCoin(player: any, coin: any) {
			coin.kill();
		}

		restart() {
			this.game.state.start('Game');
		}
	}
}
