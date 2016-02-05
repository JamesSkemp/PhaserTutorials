module Concentration {
	export class Play extends Phaser.State {
		bg: Phaser.Sprite;
		previousTile = null;
		tiles: Phaser.Group;
		busy = false;

		init() {
			console.log((new Date).toISOString() + ' : Entered Play init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered Play preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Play create()');

		}

		update() {
		}
	}
}