module CandyCrushBejeweledClone {
	export class Play extends Phaser.State {
		tileTypes: string[];
		score = 0;
		activeTile1 = null;
		activeTile2 = null;

		canMove = false;

		tileWidth: number = 200;
		tileHeight: number = 200;

		tiles: Phaser.Group;

		tileGrid;

		random: Phaser.RandomDataGenerator;

		init() {
			console.log((new Date).toISOString() + ' : Entered Play init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Play preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Play create()');

			this.stage.backgroundColor = '#34495f';
			this.tileTypes = [
				'blue', 'green', 'red', 'yellow'
			];

			// This isn't working, so hard-coding in the tile width/height.
			//var sampleTile = this.game.cache.getImage('blue');
			//console.log(sampleTile);
			//this.tileWidth = sampleTile.frame.width;
			//this.tileHeight = sampleTile.frame.height;

			// Will hold all tiles.
			this.tiles = this.game.add.group();

			this.tileGrid = [
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null]
			];

			var seed = Date.now();
			this.random = new Phaser.RandomDataGenerator([seed]);
		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered Play paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered Play resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered Play shutdown()');

		}
	}
}