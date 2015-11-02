var Menu = {

	preload: function () {
		this.load.image('menu', 'assets/menu.png');
	},

	create: function () {
		// Add a button, instead of a sprite, that when clicked will load the game.
		//this.add.sprite(0, 0, 'menu');
		this.add.button(0, 0, 'menu', this.startGame, this);
	},

	startGame: function () {
		this.state.start('Game');
	}
};