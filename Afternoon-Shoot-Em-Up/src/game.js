BasicGame.Game = function (game) {
};

BasicGame.Game.prototype = {
	preload: function () {
		this.load.path = 'assets/';
		this.load.image('sea');
	},

	create: function () {
		this.sea = this.add.tileSprite(0, 0, 800, 600, 'sea');
	},

	update: function () {
	},

	quitGame: function (pointer) {
		this.state.start('MainMenu');
	}
};