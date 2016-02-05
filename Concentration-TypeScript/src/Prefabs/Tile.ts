module Concentration {
	export class Tile extends Phaser.Group {
		animal = "";
		hidden = true;
		onTap: Phaser.Signal;
		front: Phaser.Sprite;
		back: Phaser.Sprite;

		constructor(game, x, y, image, frame) {
			super(game);

			this.onTap = new Phaser.Signal();
			this.x = x;
			this.y = y;

			this.front = this.create(0, 0, image, frame);
			this.front.anchor.setTo(0.5);
			this.front.scale.setTo(0, 1);

			this.back = this.create(0, 0, image, 'blind.png');
			this.back.anchor.setTo(0.5);
			this.back.inputEnabled = true;
			this.back.events.onInputDown.add(this.dispatchStateChange, this);
		}

		hide() {
			this.hidden = true;

			var t1 = this.game.add.tween(this.back.scale).to({ x: 1 }, 100, Phaser.Easing.Linear.None);
			var t2 = this.game.add.tween(this.front.scale).to({ x: 0 }, 100, Phaser.Easing.Linear.None);

			t2.chain(t1);
			t2.start();
		}

		reveal() {
			this.hidden = false;

			var t1 = this.game.add.tween(this.back.scale).to({ x: 0 }, 100, Phaser.Easing.Linear.None);
			var t2 = this.game.add.tween(this.front.scale).to({ x: 1 }, 100, Phaser.Easing.Linear.None);

			t1.chain(t2);
			t1.start();
		}

		dispatchStateChange() {
			this.onTap.dispatch(this);
		}
	}
}