module LevelSelectProject {
	export class Preloader extends Phaser.State {
		preload() {
			console.log((new Date).toISOString() + ' : Entered Preloader preload()');

			// If your game uses a graphic while assets are loaded, you would create the sprite and then display it via the below.
			//this.load.setPreloadSprite(this.preloadSprite);

			// Load the actual assets. By default the path will be set to the assets directory.
			this.load.path = 'assets/';
			// Assets loaded here can include image and audio files, as well as sprite sheets and more.
			this.load.spritesheet('level_arrows', 'level_arrows.png', 48, 48);
			this.load.spritesheet('levels', 'levels.png', 64, 64);
			this.load.spritesheet('game', 'game.png', 200, 80);
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Preloader create()');

			// Once the assets have been preloaded you can move to the next state.
			this.game.state.start('MainMenu', true, false);
		}
	}
}