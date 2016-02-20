var TTTBuilding = (function () {
	function TTTBuilding(phaserGame, x, y) {
		Phaser.Sprite.call(this, phaserGame, x, y, 'building');

		this.game = phaserGame;
	}

	TTTBuilding.prototype = Object.create(Phaser.Sprite.prototype);
	TTTBuilding.prototype.constructor = TTTBuilding;

	return TTTBuilding;
})();