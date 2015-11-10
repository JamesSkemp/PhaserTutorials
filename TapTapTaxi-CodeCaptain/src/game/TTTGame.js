/// <reference path="../../lib/phaser-2.4.4.js" />
var TTTGame = (function () {

	function TTTGame(phaserGame) {
		this.game = phaserGame;
	}

	TTTGame.prototype.init = function () {
		this.game.stage.backgroundColor = '#9bd3e1';
		//this.game.add.plugin(Phaser.Plugin.Debug);
	};

	TTTGame.prototype.preload = function () {
		this.game.load.path = 'assets/tiles/';
		this.game.load.image('tile_road_1');
	};

	TTTGame.prototype.create = function () {
		var sprite = this.game.add.sprite(0, 0, 'tile_road_1');
		sprite.anchor.setTo(0.5);
		sprite.x = this.game.world.centerX;
		sprite.y = this.game.world.centerY;
	};

	TTTGame.prototype.update = function () {

	};

	return TTTGame;
})();