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

	};

	TTTGame.prototype.create = function () {

	};

	TTTGame.prototype.update = function () {

	};

	return TTTGame;
})();