module HiLoProject {
	export class TheGame extends Phaser.State {
		spriteNumber: Phaser.Sprite = null;
		number: number | string = 0;
		workingButtons = true;
		higher = true;
		score = 0;

		init() {
			console.log((new Date).toISOString() + ' : Entered TheGame init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered TheGame preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered TheGame create()');

			this.number = Math.floor(Math.random() * 10);
			this.spriteNumber = this.game.add.sprite(160, 240, 'numbers');
			this.spriteNumber.anchor.setTo(0.5);
			this.spriteNumber.frame = this.number;

			var higherButton = this.game.add.button(160, 100, 'higher', this.clickedHigher, this);
			higherButton.anchor.setTo(0.5);

			var lowerButton = this.game.add.button(160, 380, 'lower', this.clickedLower, this);
			lowerButton.anchor.setTo(0.5);
		}

		update() {

		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered TheGame paused()');
		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered TheGame resumed()');
		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered TheGame shutdown()');
		}

		clickedHigher() {
			this.higher = true;
			this.tweenNumber(true);
		}

		clickedLower() {
			this.higher = false;
			this.tweenNumber(false);
		}

		tweenNumber(higher: boolean) {
			if (this.workingButtons) {
				this.workingButtons = false;

				var exitTween = this.game.add.tween(this.spriteNumber)
					.to({ x: 420 }, 500);
				exitTween.onComplete.add(this.exitNumber, this);
				exitTween.start();
			}
		}

		exitNumber() {
			this.spriteNumber.x = -180;
			this.spriteNumber.frame = Math.floor(Math.random() * 10);
			
			var enterTween = this.game.add.tween(this.spriteNumber)
				.to({ x: 160 }, 500);
			enterTween.onComplete.add(this.enterNumber, this);
			enterTween.start();
		}

		enterNumber() {
			this.workingButtons = true;

			if ((this.higher && this.spriteNumber.frame < this.number)
				|| (!this.higher && this.spriteNumber.frame > this.number)){
				this.game.state.start('GameOver', true, false, this.score);
			} else {
				this.score++;
				this.number = this.spriteNumber.frame;
			}
		}
	}
}