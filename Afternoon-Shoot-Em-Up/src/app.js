window.onload = function () {
	var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

	game.state.add('Boot', BasicGame.Boot);
	game.state.add('Preloader', BasicGame.Preloader);
	game.state.add('MainMenu', BasicGame.MainMenu);
	game.state.add('Game', BasicGame.Game);

	//game.state.start('Boot');
	game.state.start('MainMenu');
};