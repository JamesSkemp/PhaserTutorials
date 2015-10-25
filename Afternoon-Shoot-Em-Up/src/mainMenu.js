BasicGame.MainMenu = function (game) {

};

BasicGame.MainMenu.prototype = {
	create: function () {

	},

	update: function () {

	},

	startGame: function (pointer) {
		this.state.start('Game');
	}
};