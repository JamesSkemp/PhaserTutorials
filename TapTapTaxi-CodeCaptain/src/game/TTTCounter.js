var TTTCounter = (function () {
	function TTTCounter(phaserGame, x, y) {
		// Super class
		Phaser.Sprite.call(this, phaserGame, x, y);

		this.tween = undefined;
		this.score = '';
		this.game = phaserGame;
	}

	TTTCounter.prototype = Object.create(Phaser.Sprite.prototype);
	TTTCounter.prototype.constructor = TTTCounter;

	TTTCounter.prototype.setScore = function (score, animated) {
		this.score = '' + score;
		this.render();

		if (animated) {
			this.shake();
		}
	};

	TTTCounter.prototype.render = function () {
		// Always clear the sprite to start.
		if (this.children.length !== 0) {
			this.removeChildren();
		}

		var xpos = 0;

		// Width of all sprites used, and padding.
		var totalWidth = 0;

		// Loop over all the numbers.
		for (var i = 0; i < this.score.length; i++) {
			var sprite = new Phaser.Sprite(
				this.game,
				xpos,
				0,
				'numbers',
				this.score.charAt(i)
			);
			this.addChild(sprite);
			xpos += sprite.width + 2;
			totalWidth += sprite.width + 2;
		}

		// Trim ending padding.
		totalWidth -= 2;

		// Center align the number.
		for (var j = 0; j < this.children.length; j++) {
			var child = this.children[j];
			child.x -= totalWidth / 2;
		}
	};

	TTTCounter.prototype.shake = function () {
		// Causes the counter to wiggle a bit.
		this.tween = this.game.add.tween(this);
		this.tween.to({
			y: [this.y + 5, this.y]
		}, 200, Phaser.Easing.Quadratic.Out);

		this.tween.start();
	};

	return TTTCounter;
})();