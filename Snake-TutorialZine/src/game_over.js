var Game_Over = {

	preload: function () {
		this.load.path = "assets/";
		this.load.image('gameover');
	},

	create: function () {
		// Add a button that will start the game.
		this.add.button(0, 0, 'gameover', this.startGame, this);

		// Display the last game's score.
		this.add.text(235, 350, 'LAST SCORE', { font: '16px bold sans-serif', fill: '#46c0f9', align: 'center' });
		this.add.text(350, 348, score.toString(), { font: '20px bold sans-serif', fill: '#fff', align: 'center' });
	},

	startGame: function () {
		this.state.start('Game');
	}
};