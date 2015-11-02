var snake, apple, squareSize, score, speed;
var updateDelay, direction, new_direction;
var addNew, cursors, scoreTextValue, speedTextValue;
var textStyle_Key, textSytle_Value;

var Game = {

	preload: function () {
		// Unlike the tutorial, we'll set a path so we can simplify our image loading.
		this.load.path = "assets/";
		this.load.image('snake');
		this.load.image('apple');
	},

	create: function () {
		// Parts of the snake.
		snake = [];
		// Apple object.
		apple = {};
		// Length of a square's side; images are 15x15 pixels.
		squareSize = 15;
		// Game score.
		score = 0;
		// Game speed.
		speed = 0;
		// Controls update rates.
		updateDelay = 0;
		// Direction of the snake.
		direction = 'right';
		// Buffer to store the snakes new direction.
		new_direction = null;
		// Variable used when an apple is eaten.
		addNew = false;

		// Automatically capture the cursor keys.
		cursors = this.input.keyboard.createCursorKeys();

		this.stage.backgroundColor = '#061f27';

		// Starting snake has 10 segments, and starts at 150,150, and expands to the right.
		for (var i = 0; i < 10; i++) {
			snake[i] = this.add.sprite(150 + i * squareSize, 150, 'snake');
		}

		this.generateApple();

		textStyle_Key = { font: '14px bold sans-serif', fill: '#46c0f9', align: 'center' };
		textSytle_Value = { font: '18px bold sans-serif', fill: '#fff', align: 'center' };

		// Score display.
		this.add.text(30, 20, 'SCORE', textStyle_Key);
		scoreTextValue = game.add.text(90, 18, score.toString(), textSytle_Value);
		// Speed display.
		this.add.text(500, 20, 'SPEED', textStyle_Key);
		speedTextValue = game.add.text(558, 18, speed.toString(), textSytle_Value);
	},

	update: function () {
		// Track what direction they want to go, but make sure they're not trying to doubleback.
		if (cursors.right.isDown && direction != 'left') {
			new_direction = 'right';
		} else if (cursors.left.isDown && direction != 'right') {
			new_direction = 'left';
		} else if (cursors.up.isDown && direction != 'down') {
			new_direction = 'up';
		} else if (cursors.down.isDown && direction != 'up') {
			new_direction = 'down';
		}

		// Calculate the speed based upon the score. Maximum speed is 10.
		speed = Math.min(10, Math.floor(score / 5));
		speedTextValue.text = '' + speed;

		// By default the game runs at 60fps. This game uses a slower speed, which we'll track via this.
		updateDelay++;

		if (updateDelay % (10 - speed) == 0) {
			// Update the snake's placement.

			var firstCell = snake[snake.length - 1];
			var lastCell = snake.shift();
			var oldLastCellX = lastCell.x;
			var oldLastCellY = lastCell.y;

			// If one has been set, update the snake's direction.
			if (new_direction) {
				direction = new_direction;
				new_direction = null;
			}

			// Move the last cell before the old first cell.
			if (direction == 'right') {
				lastCell.x = firstCell.x + squareSize;
				lastCell.y = firstCell.y;
			} else if (direction == 'left') {
				lastCell.x = firstCell.x - squareSize;
				lastCell.y = firstCell.y;
			} else if (direction == 'up') {
				lastCell.x = firstCell.x;
				lastCell.y = firstCell.y - squareSize;
			} else if (direction == 'down') {
				lastCell.x = firstCell.x;
				lastCell.y = firstCell.y + squareSize;
			}

			snake.push(lastCell);
			firstCell = lastCell;

			// If we need to add a new segment to the snake, add it to the end.
			if (addNew) {
				snake.unshift(this.add.sprite(oldLastCellX, oldLastCellY, 'snake'));
				addNew = false;
			}

			// Check for collision with various objects in the world.
			this.appleCollision();
			this.selfCollision(firstCell);
			this.wallCollision(firstCell);
		}
	},

	generateApple: function () {
		// Choose a random position on the board.
		var randomX = Math.floor(Math.random() * 40) * squareSize;
		var randomY = Math.floor(Math.random() * 30) * squareSize;

		// Add a new apple in that spot.
		apple = this.add.sprite(randomX, randomY, 'apple');
	},

	appleCollision: function () {
		// Check the entire length of the snake, since the apple can spawn anywhere.
		for (var i = 0; i < snake.length; i++) {
			if (snake[i].x == apple.x && snake[i].y == apple.y) {
				// Add a new segment to the snake on the next update.
				addNew = true;

				// Destroy the old apple and place a new one.
				apple.destroy();
				this.generateApple();

				// Increase the score.
				score++;
				scoreTextValue.text = score.toString();
			}
		}
	},

	selfCollision: function (head) {

	},

	wallCollision: function (head) {

	}
};