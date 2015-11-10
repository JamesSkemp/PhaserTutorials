/// <reference path="../../lib/phaser-2.4.4.js" />
var TTTGame = (function () {

	// Angle for isometric display.
	var ANGLE = 26.55;

	function TTTGame(phaserGame) {
		this.game = phaserGame;
		// Place to hold our tiles.
		this.arrTiles = [];
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
		this.generateRoad();
	};

	TTTGame.prototype.update = function () {
		this.moveTiles();
	};

	TTTGame.prototype.generateRoad = function () {
		var sprite = this.game.add.sprite(0, 0, 'tile_road_1');
		sprite.anchor.setTo(0.5);
		sprite.x = this.game.world.centerX;
		sprite.y = this.game.world.centerY;
		this.arrTiles.push(sprite);
	};

	TTTGame.prototype.moveTiles = function () {
		var i = this.arrTiles.length - 1;
		// Loop through all tiles and move them down and left in an isometric way.
		while (i >= 0) {
			var sprite = this.arrTiles[i];
			sprite.x -= Math.cos(ANGLE * Math.PI / 180);
			sprite.y += Math.sin(ANGLE * Math.PI / 180);
			i--;
		}
	};

	return TTTGame;
})();