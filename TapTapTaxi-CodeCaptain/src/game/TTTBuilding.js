var TTTBuilding = (function () {
	function TTTBuilding(phaserGame, x, y) {
		Phaser.Sprite.call(this, phaserGame, x, y, 'building');

		this.game = phaserGame;

		this.buildFloors(Math.round(Math.random() * 4) + 1);
	}

	TTTBuilding.prototype = Object.create(Phaser.Sprite.prototype);
	TTTBuilding.prototype.constructor = TTTBuilding;

	TTTBuilding.prototype.buildFloors = function (numberOfFloors) {
		// Keep a reference to the previous floor
		var prevFloor = this;

		for (var i = 0; i < numberOfFloors; i++) {
			var floor = this.game.make.sprite(0, 0, 'building_2');
			floor.anchor.setTo(0.5, 1);

			// There's a height difference on the base tiles and the floor tiles, hence this check
			if (prevFloor == this) {
				floor.y = prevFloor.y - prevFloor.height / 2 - 12;
			} else {
				floor.y = prevFloor.y - prevFloor.height / 2 + 10;
			}
			this.addChild(floor);
			prevFloor = floor;
		}
	};

	return TTTBuilding;
})();