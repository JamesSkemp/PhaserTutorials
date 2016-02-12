/// <reference path="../../lib/phaser-2.4.4.js" />
var TTTGame = (function () {

	// Angle for isometric display.
	var ANGLE = 26.55;
	var TILE_WIDTH = 68;
	var SPEED = 5;
	var TAXI_START_X = 30;
	var JUMP_HEIGHT = 7;

	function TTTGame(phaserGame) {
		this.game = phaserGame;

		this.mouseTouchDown = false;

		// Place to hold our tiles.
		this.arrTiles = [];

		this.jumpSpeed = JUMP_HEIGHT;
		this.isJumping = false;
		this.currentJumpHeight = 0;

		this.taxi = undefined;
		this.taxiX = TAXI_START_X;

		// Helps determine when to draw a new road tile.
		this.numberOfIterations = 0;

		this.roadStartPosition = {
			x: GAME_WIDTH + 100,
			y: GAME_HEIGHT / 2 - 100
		};

		// Number of road tiles.
		this.roadCount = 0;
		// Where the next obstacle should render.
		this.nextObstacleIndex = 0;
		// Collection of obstacles.
		this.arrObstacles = [];

		// Set whether the game has started.
		this.hasStarted = false;
	}

	TTTGame.prototype.init = function () {
		this.game.stage.backgroundColor = '#9bd3e1';
		//this.game.add.plugin(Phaser.Plugin.Debug);
	};

	TTTGame.prototype.preload = function () {
		this.game.load.path = 'assets/tiles/';
		this.game.load.image('tile_road_1');
		this.game.load.image('taxi');
		this.game.load.image('obstacle_1');
	};

	TTTGame.prototype.create = function () {
		this.generateRoad();

		var x = this.game.world.centerX;
		var y = this.game.world.centerY;
		this.taxi = new Phaser.Sprite(this.game, x, y, 'taxi');
		this.taxi.anchor.setTo(0.5, 1.0);
		this.game.add.existing(this.taxi);
	};

	TTTGame.prototype.update = function () {

		if (this.game.input.activePointer.isDown) {
			if (!this.mouseTouchDown) {
				this.touchDown();
			} else {
				if (this.mouseTouchDown) {
					this.touchUp();
				}
			}
		}

		this.numberOfIterations++;
		if (this.numberOfIterations > TILE_WIDTH / SPEED) {
			// Generate a new piece of road once a tile has moved its length.
			this.numberOfIterations = 0;
			this.generateRoad();
		}

		if (this.isJumping) {
			this.taxiJump();
		}

		var pointOnRoad = this.calculatePositionOnRoadWithXPosition(this.taxiX);
		this.taxi.x = pointOnRoad.x;
		this.taxi.y = pointOnRoad.y + this.currentJumpHeight;

		this.moveTilesWithSpeed(SPEED);
	};

	TTTGame.prototype.generateRoad = function () {
		this.roadCount++;

		var tile = 'tile_road_1';
		var isObstacle = false;

		if (this.roadCount > this.nextObstacleIndex && this.hasStarted) {
			this.calculateNextObstacleIndex();
			tile = 'obstacle_1';
			isObstacle = true;
		}

		// Standard way to add a sprite. However, doing this results in overlap for new tiles.
		//var sprite = this.game.add.sprite(0, 0, 'tile_road_1');
		// Long-handed way to create a sprite. Doesn't add it to the world immediately, however.
		var sprite = new Phaser.Sprite(this.game, this.roadStartPosition.x, this.roadStartPosition.y, tile);
		// Add our new sprite to the world, under all other tiles.
		this.game.world.addChildAt(sprite, 0);
		sprite.anchor.setTo(0.5, 1.0);
		sprite.x = this.roadStartPosition.x;
		sprite.y = this.roadStartPosition.y;

		if (isObstacle) {
			this.arrObstacles.push(sprite);
		}

		this.arrTiles.push(sprite);
	};

	TTTGame.prototype.moveTilesWithSpeed = function (speed) {
		var i = this.arrTiles.length - 1;
		// Loop through all tiles and move them down and left in an isometric way.
		while (i >= 0) {
			var sprite = this.arrTiles[i];
			sprite.x -= speed * Math.cos(ANGLE * Math.PI / 180);
			sprite.y += speed * Math.sin(ANGLE * Math.PI / 180);

			// If the sprite is off the screen remove it from our array and then destroy it.
			if (sprite.x < -120) {
				this.arrTiles.splice(i, 1);
				sprite.destroy();
			}

			i--;
		}
	};

	TTTGame.prototype.calculateNextObstacleIndex = function () {
		// Put an obstacle somewhere 3 to 10 tiles in the future.
		var minimumOffset = 3;
		var maximumOffset = 10;
		var num = Math.random() * (maximumOffset - minimumOffset);
		this.nextObstacleIndex = this.roadCount + Math.round(num) + minimumOffset;
	};

	TTTGame.prototype.calculatePositionOnRoadWithXPosition = function (xPos) {
		// Horizontal line of the bottom of the screen.
		var adjacent = this.roadStartPosition.x - xPos;
		var alpha = ANGLE * Math.PI / 180;
		// Line at an angle the taxi travels at.
		var hypotenuse = adjacent / Math.cos(alpha);
		// Vertical line from where the car is on the line to the adjacent line.
		var opposite = Math.sin(alpha) * hypotenuse;

		return {
			x: xPos,
			// Subtract size of taxi.
			y: this.roadStartPosition.y + opposite - 57
		}
	};

	TTTGame.prototype.touchDown = function () {
		// Start the game the first time the player touches down.
		if (!this.hasStarted) {
			this.hasStarted = true;
		}

		this.mouseTouchDown = true;

		if (!this.isJumping) {
			this.isJumping = true;
		}
	};

	TTTGame.prototype.touchUp = function () {
		this.mouseTouchDown = false;
	};

	TTTGame.prototype.taxiJump = function () {
		this.currentJumpHeight -= this.jumpSpeed;
		this.jumpSpeed -= 0.5;

		if (this.jumpSpeed < -JUMP_HEIGHT) {
			this.isJumping = false;
			this.jumpSpeed = JUMP_HEIGHT;
		}
	};

	return TTTGame;
})();