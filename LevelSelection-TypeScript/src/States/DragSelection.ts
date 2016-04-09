module LevelSelectProject {
	export class DragSelection extends Phaser.State {
		colors = [
			0xac81bd, 0xff5050, 0xdab5ff, 0xb5ffda, 0xfffdd0, 0xcc0000, 0x54748b, 0x4b0082, 0x80ab2f, 0xff784e, 0xe500db, 0x223c4a, 0x223c4a, 0xf1290e, 0x648080, 0xbbc1c4, 0x6f98a2, 0x71717e
		];
		columns = 3;
		rows = 5;
		thumbWidth = 60;
		thumbHeight = 60;
		thumbSpacing = 20;

		init() {
			console.log((new Date).toISOString() + ' : Entered DragSelection init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered DragSelection preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered DragSelection create()');

		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered DragSelection paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered DragSelection resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered DragSelection shutdown()');

		}
	}
}