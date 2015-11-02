var game;

game = new Phaser.Game(600, 450, Phaser.AUTO);

game.state.add('Menu', Menu);

game.state.start('Menu');