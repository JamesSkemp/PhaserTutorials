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

	},

	generateApple: function () {
		// Choose a random position on the board.
		var randomX = Math.floor(Math.random() * 40) * squareSize;
		var randomY = Math.floor(Math.random() * 30) * squareSize;

		// Add a new apple in that spot.
		apple = this.add.sprite(randomX, randomY, 'apple');
	}
};