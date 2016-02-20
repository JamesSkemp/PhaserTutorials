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
		// Track whether the player is dead.
		this.isDead = false;
		this.gameOverGraphic = undefined;

		this.scoreCount = 0;
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
		this.game.load.image('gameOver');

		this.game.load.path = 'assets/spritesheets/';
		this.game.load.atlasJSONArray('numbers', 'numbers.png', 'numbers.json');
	};

	TTTGame.prototype.create = function () {
		this.generateRoad();

		var x = this.game.world.centerX;
		var y = this.game.world.centerY;
		this.taxi = new Phaser.Sprite(this.game, x, y, 'taxi');
		this.taxi.anchor.setTo(0.5, 1.0);
		this.game.add.existing(this.taxi);

		x = this.game.world.centerX;
		y = this.game.world.centerY - 100;
		this.gameOverGraphic = new Phaser.Sprite(this.game, x, y, 'gameOver');
		this.gameOverGraphic.anchor.setTo(0.5);
		this.gameOverGraphic.visible = false;
		this.game.add.existing(this.gameOverGraphic);

		this.counter = new TTTCounter(this.game, 0, 0);
		this.game.add.existing(this.counter);
		this.counter.x = GAME_WIDTH / 2;
		this.counter.y = 40;

		this.reset();
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

		this.moveTilesWithSpeed(SPEED);

		if (!this.isDead) {
			if (this.isJumping) {
				this.taxiJump();
			}

			this.calculateTaxiPosition();

			var pointOnRoad = this.calculatePositionOnRoadWithXPosition(this.taxiX);
			this.taxi.x = pointOnRoad.x;
			this.taxi.y = pointOnRoad.y + this.currentJumpHeight;

			this.checkObstacles();
		}
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

	TTTGame.prototype.checkObstacles = function () {
		var i = this.arrObstacles.length - 1;

		while (i >= 0) {
			var sprite = this.arrObstacles[i];

			if (sprite.x < this.taxi.x - 10) {
				this.arrObstacles.splice(i, 1);

				this.scoreCount++;

				this.counter.setScore(this.scoreCount, true);
			}

			// Determine the distance between the taxi and obstacle.
			var dx = sprite.x - this.taxi.x;
			dx = Math.pow(dx, 2);

			var dy = (sprite.y - sprite.height / 2) - this.taxi.y;
			dy = Math.pow(dy, 2);

			var distance = Math.sqrt(dx + dy);

			if (distance < 25 && !this.isDead) {
				this.gameOver();
			}

			i--;
		}
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

	TTTGame.prototype.calculateTaxiPosition = function () {
		// Move the tax closer to the right depending upon the score.
		var multiplier = 0.025;
		var num = TAXI_START_X + (this.scoreCount * GAME_WIDTH * multiplier);

		// Keep the taxi from going too far.
		if (num > GAME_WIDTH * 0.60) {
			num = GAME_WIDTH * 0.60;
		}

		this.taxiX = num;
	};

	TTTGame.prototype.touchDown = function () {
		if (this.isDead) {
			this.reset();
			return;
		}

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

	TTTGame.prototype.gameOver = function () {
		this.isDead = true;
		this.hasStarted = false;
		this.arrObstacles = [];
		this.gameOverGraphic.visible = true;

		var dieSpeed = SPEED / 10;

		var tween1 = this.game.add.tween(this.taxi);
		tween1.to({
			x: this.taxi.x + 20,
			y: this.taxi.y - 40
		}, 300 * dieSpeed, Phaser.Easing.Quadratic.Out);

		var tween2 = this.game.add.tween(this.taxi);
		tween2.to({
			y: GAME_HEIGHT + 40
		}, 1000 * dieSpeed, Phaser.Easing.Quadratic.In);

		tween1.chain(tween2);
		tween1.start();

		var tweenRotate = this.game.add.tween(this.taxi);
		tweenRotate.to({
			angle: 200
		}, 1300 * dieSpeed, Phaser.Easing.Linear.None);
		tweenRotate.start();
	};

	TTTGame.prototype.reset = function () {
		this.hasStarted = false;
		this.isDead = false;

		this.jumpSpeed = JUMP_HEIGHT;
		this.isJumping = false;
		this.currentJumpHeight = 0;

		this.nextObstacleIndex = 0;
		this.arrObstacles = [];

		this.mouseTouchDown = false;

		this.game.tweens.removeFrom(this.taxi);
		this.taxiX = TAXI_START_X;
		this.taxi.rotation = 0;

		this.gameOverGraphic.visible = false;

		this.scoreCount = 0;
		this.counter.setScore(0, false);
	};

	return TTTGame;
})();