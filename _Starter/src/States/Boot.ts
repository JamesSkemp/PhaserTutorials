module StarterProject {
	export class Boot extends Phaser.State {
		init() {
			console.log((new Date).toISOString() + ' : Entered Boot init()');
			// If you want to scale the game, you can set that here.
			// Uncomment to show all content in the view.
			//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

			// If we put our game in a div, we need to add the following as well, if you SHOW_ALL.
			//this.game.scale.windowConstraints.bottom = 'visual';

			// Uncomment to place our game in the center of the screen both horizontally and vertically.
			//this.scale.pageAlignHorizontally = true;
			//this.scale.pageAlignVertically = true;
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Boot preload()');
			// If your preload state will display a progress bar, you should load the image here.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Boot create()');

			// Disable multitouch. It's recommended by the creators to set this unless your game needs multitouch.
			this.input.maxPointers = 1;
			
			// If you want the game to continue running when the browser tab loses focus, uncomment the following.
			//this.stage.disableVisibilityChange = true;

			// At this point you could set device-specific settings.
			if (this.game.device.desktop) {
				// Desktop-specific settings would be placed here.
			}
			
			// If your game uses a physics system, you can start that here.
			//this.game.physics.startSystem(Phaser.Physics.ARCADE);

			// Load the next state, which will be preloading the assets for the game.
			this.game.state.start('Preloader', true, false);
		}
	}
}