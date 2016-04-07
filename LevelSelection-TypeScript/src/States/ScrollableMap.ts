module LevelSelectProject {
	export class ScrollableMap extends Phaser.State {
		// Group of map and towns.
		mapGroup: Phaser.Group;
		// Game map.
		map: Phaser.Image;
		// Save start touch position.
		startX;
		startY;
		// Handle multitouch.
		moveIndex;
		// Map scrolling speed.
		mapSpeed = 1;
		// Town selected.
		candidateTown;

		init() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
			this.game.load.image('map');
			this.game.load.image('town');
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap create()');

			this.mapGroup = this.game.add.group();
			this.map = this.game.add.image(0, 0, 'map');
			this.mapGroup.add(this.map);

			// Randomly place ten towns on the map.
			for (var i = 0; i < 10; i++) {
				var town = this.game.add.image(
					this.game.rnd.between(50, this.map.width - 50)
					, this.game.rnd.between(50, this.map.height - 50)
					, 'town');
				town.anchor.setTo(0.5);

				town.inputEnabled = true;

				this.mapGroup.add(town);
			}
		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered ScrollableMap shutdown()');

		}
	}
}