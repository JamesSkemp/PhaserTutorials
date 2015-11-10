/// <reference path="../../lib/phaser-2.4.4.js" />
var TTTGame = (function () {

	// Angle for isometric display.
	var ANGLE = 26.55;
	var TILE_WIDTH = 68;

	function TTTGame(phaserGame) {
		this.game = phaserGame;
		// Place to hold our tiles.
		this.arrTiles = [];
		// Helps determine when to draw a new road tile.
		this.numberOfIterations = 0;

		this.roadStartPosition = {
			x: GAME_WIDTH + 100,
			y: GAME_HEIGHT / 2 - 100
		};
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
		this.numberOfIterations++;
		if (this.numberOfIterations > TILE_WIDTH) {
			this.numberOfIterations = 0;
			this.generateRoad();
		}
		this.moveTiles();
	};

	TTTGame.prototype.generateRoad = function () {
		// Standard way to add a sprite. However, doing this results in overlap for new tiles.
		//var sprite = this.game.add.sprite(0, 0, 'tile_road_1');
		// Long-handed way to create a sprite. Doesn't add it to the world immediately, however.
		var sprite = new Phaser.Sprite(this.game, 0, 0, 'tile_road_1');
		// Add our new sprite to the world, under all other tiles.
		this.game.world.addChildAt(sprite, 0);
		sprite.anchor.setTo(0.5);
		sprite.x = this.roadStartPosition.x;
		sprite.y = this.roadStartPosition.y;
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