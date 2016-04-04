module LevelSelectProject {
	export class Option1 extends Phaser.State {

		// Number of thumbnail rows.
		thumbRows = 5;
		// Number of thumbnail cololumns.
		thumbCols = 4;
		// Width of a thumbnail, in pixels.
		thumbWidth = 64;
		// Height of a thumbnail, in pixels.
		thumbHeight = 64;
		// Space between thumbnails, in pixels.
		thumbSpacing = 8;
		// Array with finished levels and stars collected.
		// 0 = playable yet unfinished level
		// 1, 2, 3 = level finished with 1, 2, 3 stars
		// 4 = locked
		starsArray = [1, 2, 1, 2, 3, 3, 3, 2, 2, 1, 3, 1, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
		// Number of pages to show all levels.
		pages = this.starsArray.length / (this.thumbRows * this.thumbCols);
		// Group to place all level thumbnails.
		levelThumbsGroup;
		// Current page.
		currentPage = 0;
		// Arrows to navigate through level pages.
		leftArrow;
		rightArrow;

		init() {
			console.log((new Date).toISOString() + ' : Entered Option1 init()');
			// init can receive parameters.

			// Uncomment to place our game in the center of the screen both horizontally and vertically.
			this.scale.pageAlignHorizontally = true;
			this.scale.pageAlignVertically = true;
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Option1 preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Option1 create()');

		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered Option1 paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered Option1 resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered Option1 shutdown()');

		}
	}
}