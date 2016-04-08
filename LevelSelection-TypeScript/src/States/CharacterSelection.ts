module LevelSelectProject {
	export class CharacterSelection extends Phaser.State {
		speedMult = 0.7;
		friction = 0.99;
		colors = [
			0xac81bd, 0xff5050, 0xdab5ff, 0xb5ffda, 0xfffdd0, 0xcc0000, 0x54748b, 0x4b0082, 0x80ab2f, 0xff784e, 0xe500db, 0x223c4a, 0x223c4a, 0xf1290e, 0x648080, 0xbbc1c4, 0x6f98a2, 0x71717e
		];

		scrollingMap: Phaser.TileSprite;
		savedPosition: Phaser.Point;
		isBeingDragged: boolean;
		movingSpeed: number;
		movingAngle: number;

		init() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection init()');
			// init can receive parameters.

		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		}

		loadUpdate() {
			// Called while assets are being loaded.
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection create()');

			this.game.stage.backgroundColor = "#004";

			this.game.add.text(this.game.width / 2, 50, "Select your fish", { font: '18px Arial', fill: '#fff' }).anchor.setTo(0.5);

			this.scrollingMap = this.game.add.tileSprite(0, 0, this.game.width / 2 + this.colors.length * 90 + 60, this.game.height, 'transp');
			this.scrollingMap.inputEnabled = true;
			this.scrollingMap.input.enableDrag(false);
			this.scrollingMap.input.allowVerticalDrag = false;
			this.scrollingMap.input.boundsRect = new Phaser.Rectangle(
				this.game.width - this.scrollingMap.width,
				this.game.height - this.scrollingMap.height,
				this.scrollingMap.width * 2 - this.game.width,
				this.scrollingMap.height * 2 - this.game.height
			);

			this.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
			this.isBeingDragged = false;
			this.movingSpeed = 0;

			for (var i = 0; i < this.colors.length; i++) {
				var fish = this.game.add.image(this.game.width / 2 + i * 90, this.game.height / 2, 'fish');
				fish.anchor.setTo(0.5);
				fish.tint = this.colors[i];
				this.scrollingMap.addChild(fish);
			}

			this.scrollingMap.events.onDragStart.add(function () {
				this.isBeingDragged = true;
				this.movingSpeed = 0;
			}, this);
			this.scrollingMap.events.onDragStop.add(function () {
				this.isBeingDragged = false;
			}, this);
		}

		update() {
			var zoomed = false;

			for (var i = 0; i < this.scrollingMap.children.length; i++) {
				if (Math.abs(this.scrollingMap.children[i].worldPosition.x - this.game.width / 2) < 46 && !zoomed) {
					this.scrollingMap.getChildAt(i).scale.set(1.5, 1.5);
					zoomed = true;
				} else {
					this.scrollingMap.getChildAt(i).scale.set(1, 1);
				}
			}

			if (this.isBeingDragged) {
				this.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
			} else {
				if (this.movingSpeed > 1) {
					this.scrollingMap.x += this.movingSpeed * Math.cos(this.movingAngle);

					if (this.scrollingMap.x < this.game.width - this.scrollingMap.width) {
						this.scrollingMap.x = this.game.width - this.scrollingMap.width;
						this.movingSpeed *= 0.5;
						this.movingAngle += Math.PI;
					}
					if (this.scrollingMap.x > 0) {
						this.scrollingMap.x = 0;
						this.movingSpeed *= 0.5;
						this.movingAngle += Math.PI;
					}

					this.movingSpeed *= this.friction;
					this.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
				} else {
					var distance = this.savedPosition.distance(this.scrollingMap.position);
					var angle = this.savedPosition.angle(this.scrollingMap.position);
					if (distance > 4) {
						this.movingSpeed = distance;
						this.movingAngle = angle;
					}
				}
			}
		}

		paused() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection paused()');

		}

		pauseUpdate() {

		}

		resumed() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection resumed()');

		}

		shutdown() {
			console.log((new Date).toISOString() + ' : Entered CharacterSelection shutdown()');

		}
	}
}