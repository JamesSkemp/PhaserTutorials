module LevelSelectProject {
	export class ScrollableMap extends Phaser.State {
		// Group of map and towns.
		mapGroup: Phaser.Group;
		// Game map.
		map: Phaser.Image;
		// Save start touch position.
		startX: number;
		startY: number;
		mapX: number;
		mapY: number;
		// Map scrolling speed.
		mapSpeed = 1;
		// Town selected.
		candidateTown: Phaser.Sprite;

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
				town.events.onInputDown.add(this.selectTown, this);
				town.events.onInputUp.add(this.confirmTown, this);

				this.mapGroup.add(town);
			}

			this.mapGroup.x = (this.game.width - this.map.width) / 2;
			this.mapGroup.y = (this.game.height - this.map.height) / 2;

			this.game.input.onDown.add(this.fingerOnMap, this);
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

		fingerOnMap() {
			this.startX = this.game.input.worldX;
			this.startY = this.game.input.worldY;
			this.mapX = this.mapGroup.x;
			this.mapY = this.mapGroup.y;

			this.game.input.onDown.remove(this.fingerOnMap);
			this.game.input.onUp.add(this.stopMap, this);
			this.game.input.addMoveCallback(this.dragMap, this);
		}

		selectTown(sprite, pointer) {
			this.candidateTown = sprite;
		}

		confirmTown(sprite, pointer) {
			if (this.candidateTown == sprite) {
				alert('Town selected');
			}
		}

		dragMap() {
			var currentX = this.game.input.worldX;
			var currentY = this.game.input.worldY;

			var deltaX = this.startX - currentX;
			var deltaY = this.startY - currentY;

			// If they move off the town far enough then they didn't want to select it.
			if (deltaX * deltaX + deltaY * deltaY > 25) {
				this.candidateTown = null;
			}

			this.mapGroup.x = this.mapX - deltaX * this.mapSpeed;
			this.mapGroup.y = this.mapY - deltaY * this.mapSpeed;

			// Make sure that the map stays in the display.
			if (this.mapGroup.x < -this.map.width + this.game.width) {
				this.mapGroup.x = -this.map.width + this.game.width;
			}
			if (this.mapGroup.x > 0) {
				this.mapGroup.x = 0;
			}

			if (this.mapGroup.y < -this.map.height + this.game.height) {
				this.mapGroup.y = -this.map.height + this.game.height;
			}
			if (this.mapGroup.y > 0) {
				this.mapGroup.y = 0;
			}
		}

		stopMap() {
			this.game.input.onDown.add(this.fingerOnMap);
			this.game.input.onUp.remove(this.stopMap);
			this.game.input.deleteMoveCallback(this.dragMap, this);
		}
	}
}