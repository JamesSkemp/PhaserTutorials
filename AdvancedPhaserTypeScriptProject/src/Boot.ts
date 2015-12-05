module Castlevania {
	export class Boot extends Phaser.State {
		preload() {
			this.load.image('preloadBar', 'assets/loader.png');
		}

		create() {
			// They recommend setting this unless you need multitouch.
			this.input.maxPointers = 1;

			// Toggle whether or not the game will pause if the browser tab loses focus.
			this.stage.disableVisibilityChange = true;

			if (this.game.device.desktop) {
				// Desktop-specific settings.
				this.game.scale.pageAlignHorizontally = true;
			}

			this.game.state.start('Preloader', true, false);
		}
	}
}