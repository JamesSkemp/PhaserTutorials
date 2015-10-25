var BasicGame = {
};

BasicGame.Boot = function (game) {
};

BasicGame.Boot.prototype = {
	init: function () {
	},

	preload: function () {

	},

	create: function () {
		this.state.start('Preloader');
	}
};