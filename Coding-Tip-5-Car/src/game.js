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

		// Actually triggers the tilemap to render. Only 5 lines? Yowsa.
		this.layer = this.map.createLayer('Tile Layer 1');

		// 20 = id of the tile to collide with. Multiple ids can be passed in.
		this.map.setCollision(20, true, this.layer);

		// Add the car sprite at 48,48, and set the center to the anchor point.
		this.car = this.add.sprite(48, 48, 'car');
		this.car.anchor.set(0.5);

		this.physics.arcade.enable(this.car);

		this.speed = 150;
		this.turnSpeed = 150;

		this.marker = new Phaser.Point();
		this.turnPoint = new Phaser.Point();

		this.roadTile = 1;
		this.gridsize = 32;

		this.directions = [null, null, null, null, null];
		this.opposites = [Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP];

		this.current = Phaser.UP;
		this.turning = Phaser.NONE;

		// Enable base keyboard support.
		this.cursors = this.input.keyboard.createCursorKeys();

		this.move(Phaser.DOWN);
	},

	update: function () {
		this.physics.arcade.collide(this.car, this.layer);

		this.marker.x = this.math.snapToFloor(Math.floor(this.car.x), this.gridsize) / this.gridsize;
		this.marker.y = this.math.snapToFloor(Math.floor(this.car.y), this.gridsize) / this.gridsize;

		//  Update our grid sensors
		this.directions[1] = this.map.getTileLeft(this.layer.index, this.marker.x, this.marker.y);
		this.directions[2] = this.map.getTileRight(this.layer.index, this.marker.x, this.marker.y);
		this.directions[3] = this.map.getTileAbove(this.layer.index, this.marker.x, this.marker.y);
		this.directions[4] = this.map.getTileBelow(this.layer.index, this.marker.x, this.marker.y);

		this.checkKeys();

		if (this.turning !== Phaser.NONE) {
			this.turn();
		}
	},

	render: function () {
	},

	checkKeys: function () {
		if (this.cursors.left.isDown && this.current !== Phaser.LEFT) {
			this.checkDirection(Phaser.LEFT);
		}
		else if (this.cursors.right.isDown && this.current !== Phaser.RIGHT) {
			this.checkDirection(Phaser.RIGHT);
		}
		else if (this.cursors.up.isDown && this.current !== Phaser.UP) {
			this.checkDirection(Phaser.UP);
		}
		else if (this.cursors.down.isDown && this.current !== Phaser.DOWN) {
			this.checkDirection(Phaser.DOWN);
		}
		else {
			//  This forces them to hold the key down to turn the corner
			this.turning = Phaser.NONE;
		}
	},

	move: function (direction) {
		var speed = this.speed;

		if (direction === Phaser.LEFT || direction == Phaser.UP) {
			speed = -speed;
		}

		if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
			this.car.body.velocity.x = speed;
		} else {
			this.car.body.velocity.y = speed;
		}

		this.add.tween(this.car).to({ angle: this.getAngle(direction) }, this.turnSpeed, "Linear", true);

		this.current = direction;
	},
	
	getAngle: function (to) {
		if (this.current === this.opposites[to]) {
			return "180";
		}

		if ((this.current === Phaser.UP && to === Phaser.LEFT)
			|| (this.current === Phaser.DOWN && to === Phaser.RIGHT)
			|| (this.current === Phaser.LEFT && to === Phaser.DOWN)
			|| (this.current === Phaser.RIGHT && to === Phaser.UP)) {
			return "-90";
		}

		return "90";
	},
	
	checkDirection: function (turnTo) {
		if (this.turning === turnTo || this.directions[turnTo] === null || this.directions[turnTo].index !== this.roadTile) {
			//  Invalid direction if they're already set to turn that way
			//  Or there is no tile there, or the tile isn't index a floor tile
			return;
		}

		//  Check if they want to turn around and can
		if (this.current === this.opposites[turnTo]) {
			this.move(turnTo);
		}
		else {
			this.turning = turnTo;

			this.turnPoint.x = (this.marker.x * this.gridsize) + (this.gridsize / 2);
			this.turnPoint.y = (this.marker.y * this.gridsize) + (this.gridsize / 2);
		}
	},

	turn: function () {
		var cx = Math.floor(this.car.x);
		var cy = Math.floor(this.car.y);

		//  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
		if (!this.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) || !this.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold)) {
			return false;
		}

		this.car.x = this.turnPoint.x;
		this.car.y = this.turnPoint.y;

		this.car.body.reset(this.turnPoint.x, this.turnPoint.y);

		this.move(this.turning);

		this.turning = Phaser.NONE;

		return true;
	}
});

game.state.start('play');