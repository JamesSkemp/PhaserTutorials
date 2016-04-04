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
		levelThumbsGroup: Phaser.Group;
		// Current page.
		currentPage = 0;
		// Arrows to navigate through level pages.
		leftArrow: Phaser.Button;
		rightArrow: Phaser.Button;

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

			// Setup both arrows.
			this.leftArrow = this.game.add.button(50, 420, 'level_arrows', this.arrowClicked);
			this.leftArrow.anchor.setTo(0.5);
			this.leftArrow.frame = 0;
			this.leftArrow.alpha = 0.3;

			this.rightArrow = this.game.add.button(270, 420, 'level_arrows', this.arrowClicked);
			this.rightArrow.anchor.setTo(0.5);
			this.rightArrow.frame = 1;
			if (this.pages == 1) {
				this.rightArrow.alpha = 0.3;
			}

			this.levelThumbsGroup = this.game.add.group();
			var levelLength = this.thumbWidth * this.thumbCols + this.thumbSpacing * (this.thumbCols - 1);
			var levelHeight = this.thumbWidth * this.thumbRows + this.thumbSpacing * (this.thumbRows - 1);

			// Setup each page.
			for (var p = 0; p < this.pages; p++) {
				var offsetX = (this.game.width - levelLength) / 2 + this.game.width * p;
				var offsetY = 20;

				// Setup each row on the page.
				for (var i = 0; i < this.thumbRows; i++) {
					// Setup each column in the row.
					for (var j = 0; j < this.thumbCols; j++) {
						var levelNumber = i * this.thumbCols + j + p * (this.thumbRows * this.thumbCols);

						var levelThumb = this.game.add.button(
							offsetX + j * (this.thumbWidth + this.thumbSpacing),
							offsetY + i * (this.thumbHeight + this.thumbSpacing),
							'levels', this.thumbClicked, this);

						levelThumb.frame = this.starsArray[levelNumber];

						this.levelThumbsGroup.add(levelThumb);

						// Display the level number if unlocked.
						if (this.starsArray[levelNumber] < 4) {
							var style = {
								font: '18px Arial',
								fill: '#fff'
							};

							var levelText = this.game.add.text(levelThumb.x + 5, levelThumb.y + 5, (levelNumber + 1).toString(), style);
							levelText.setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 1);
							this.levelThumbsGroup.add(levelText);
						}
					}
				}
			}
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

		arrowClicked(button) {
			console.log('arrow clicked');
			console.log(button);
		}

		thumbClicked(button) {
			console.log('thumb clicked');
			console.log(button);
		}
	}
}