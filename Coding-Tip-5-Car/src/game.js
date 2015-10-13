/// <reference path="../lib/phaser-2.4.3.js" />
var game = new Phaser.Game(640, 480, Phaser.AUTO);

game.state.add('play', {
	init: function () {
		// This could go into the create method too. Not sure what the benefit of one or the other is.
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},

	preload: function () {
		game.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'assets/tiles.png');
		game.load.image('car', 'assets/car.png');
	},

	create: function () {
		// Associate and add the tiles, based upon the map, to the screen.
		this.map = this.add.tilemap('map');
		this.map.addTilesetImage('tiles', 'tiles');

		// Actually triggers the tilemap to render. Only 3 or 5 lines? Yowsa.
		this.layer = this.map.createLayer('Tile Layer 1');

		// 20 = id of the tile to collide with. Multiple ids can be passed in.
		this.map.setCollision(20, true, this.layer);

		// Add the car sprite at 48,48, and set the center to the anchor point.
		this.car = this.add.sprite(48, 48, 'car');
		this.car.anchor.set(0.5);

		this.physics.arcade.enable(this.car);

		// Enable base keyboard support.
		this.cursors = this.input.keyboard.createCursorKeys();
	},

	update: function () {
	},

	render: function () {
	}
});

game.state.start('play');