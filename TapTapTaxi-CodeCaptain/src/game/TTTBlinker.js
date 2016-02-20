var TTTBlinker = (function () {
	function TTTBlinker(phaserGame, spriteToBlink) {
		this.tween = undefined;
		this.sprite = spriteToBlink;
		this.game = phaserGame;
	}

	TTTBlinker.prototype.startBlinking = function () {
		this.tween = this.game.add.tween(this.sprite);
		this.tween.to({
			alpha: [0, 1]
		}, 2000, Phaser.Easing.Quadratic.Out, false, 500);
		this.tween.start();
		// Loop until stopped.
		this.tween.loop(-1);
	};
	TTTBlinker.prototype.stopBlinking = function (first_argument) {
		this.tween.stop();
	};

	return TTTBlinker;
})();