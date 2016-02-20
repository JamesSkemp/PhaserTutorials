var TTTBuilding = (function () {
	function TTTBuilding(phaserGame, x, y) {
		Phaser.Sprite.call(this, phaserGame, x, y, this.getRandomBase());

		this.game = phaserGame;

		this.colors = ['brown', 'beige', 'red', 'grey'];
		this.windowTypes = ['big', 'small'];
		this.buildFloors(Math.round(Math.random() * 4) + 1);
	}

	TTTBuilding.prototype = Object.create(Phaser.Sprite.prototype);
	TTTBuilding.prototype.constructor = TTTBuilding;

	TTTBuilding.prototype.getRandomBase = function () {
		var numberOfVariations = 4;
		var num = Math.ceil(Math.random() * numberOfVariations - 1) + 1;
		return 'building_base_' + num;
	};

	TTTBuilding.prototype.getRandomFloorForColor = function (color, windowType) {
		var numberOfVariations = 2;
		var num = Math.ceil(Math.random() * numberOfVariations - 1) + 1;
		return 'building_middle_' + windowType + '_' + color + '_' + num;
	};

	TTTBuilding.prototype.buildFloors = function (numberOfFloors) {
		// Keep a reference to the previous floor
		var prevFloor = this;

		var color = this.colors[Math.ceil(Math.random() * this.colors.length) - 1];
		var windowType = this.windowTypes[Math.ceil(Math.random() * this.windowTypes.length) - 1];

		for (var i = 0; i < numberOfFloors; i++) {
			var floor = this.game.make.sprite(0, 0, this.getRandomFloorForColor(color, windowType));
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