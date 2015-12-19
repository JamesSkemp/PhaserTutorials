module StarterSimpleProject {
	export class Game extends Phaser.State {
		preload() {
			console.log((new Date).toISOString() + ' : Entered Game preload()');

		}

		create() {
			console.log((new Date).toISOString() + ' : Entered Game create()');
		}

		update() {
		}
	}
}
