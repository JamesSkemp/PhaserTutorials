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

	return TTTCounter;
});