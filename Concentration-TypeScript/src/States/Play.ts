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

			this.bg = this.game.add.sprite(0, 0, 'bg');

			this.previousTile = null;
			this.tiles = this.add.group();

			var animals = ["elephant", "giraffe", "hippo", "monkey", "panda", "parrot", "pig", "rabbit", "snake", "penguin"];
			// Double the animals in the array.
			animals = animals.concat(animals);

			var tileSize = 128;
			var cols = 5;
			for (var i = 0; i < 20; i++) {
				var xx = (i % cols) * tileSize;
				var yy = Math.floor(i / cols) * tileSize;
				var randomName = Phaser.ArrayUtils.removeRandomItem(animals);
				var tile = new Tile(this.game, xx, yy, "animals", randomName + ".png");
				tile.animal = randomName;
				tile.onTap.add(this.onTileTap, this);
				this.tiles.add(tile);
			}
			this.tiles.x = this.game.width / 2 - this.tiles.width / 2 + (tileSize / 2);
			this.tiles.y = this.game.height / 2 - this.tiles.height / 2 + (tileSize / 2);
		}

		onTileTap(tile: Tile) {
			if (this.busy) {
				return;
			}
			this.busy = true;
			tile.reveal();

			if (this.previousTile === null) {
				this.previousTile = tile;
				this.busy = false;
				return;
			}

			var t = this.game.time.create(true);
			t.add(1000, function () {
				if (this.previousTile.animal !== tile.animal) {
					console.log("No match: ", this.previousTile.animal, tile.animal);
					this.previousTile.hide();
					tile.hide();
					this.previousTile = null;
				} else if (this.previousTile.animal === tile.animal) {
					console.log("Match: ", this.previousTile.animal, tile.animal);
					this.tiles.removeChild(this.previousTile);
					this.tiles.removeChild(tile);
					this.previousTile = null;
					if (this.tiles.children.length === 0) {
						this.quitGame();
					}
				}
				this.busy = false;
			}, this);
			t.start();
		}

		quitGame(pointer) {
			this.game.state.start('MainMenu');
		}
	}
}