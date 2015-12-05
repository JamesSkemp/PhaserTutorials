module Castlevania {
	export class Preloader extends Phaser.State {
		preloadBar: Phaser.Sprite;

		preload() {
			// Setup a preload sprite.
			this.preloadBar = this.add.sprite(200, 250, 'preloadBar');
			this.load.setPreloadSprite(this.preloadBar);

			// Load the actual assets.
			this.load.path = 'assets/';
			this.load.image('titlepage', 'titlepage.jpg');
			this.load.image('logo');
			this.load.audio('music', 'title.mp3', true);
			this.load.spritesheet('simon', 'simon.png', 58, 96, 5);
			this.load.image('level1');
		}

		create() {
			var tween = this.add.tween(this.preloadBar).to({
				alpha: 0
			}, 1000, Phaser.Easing.Linear.None, true);
			tween.onComplete.add(this.startMainMenu, this);
		}

		startMainMenu() {
			this.game.state.start('MainMenu', true, false);
		}
	}
}