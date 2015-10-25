BasicGame.Game = function (game) {

};

BasicGame.Game.prototype = {
	create: function () {

	},

	update: function () {

	},

	quitGame: function (pointer) {
		this.state.start('MainMenu');
	}
};