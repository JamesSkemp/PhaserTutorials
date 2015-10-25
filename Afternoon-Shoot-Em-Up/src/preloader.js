BasicGame.Preloader = function (game) {

};

BasicGame.Preloader.prototype = {
	preload: function () {

	},

	create: function () {

	},

	update: function () {
		this.state.start('MainMenu');
	}
};