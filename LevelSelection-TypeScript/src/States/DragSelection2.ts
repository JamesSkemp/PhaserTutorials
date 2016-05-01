module LevelSelectProject {
	export class DragSelection2 extends Phaser.State {
		colors = [
			0xffffff, 0xff0000, 0x00ff00, 0x0000ff, 0xffff00
		];
		columns = 3;
		rows = 5;
		thumbWidth = 60;
		thumbHeight = 60;
		thumbSpacing = 20;
		
		currentPage;
		pageSelectors;
		pageText: Phaser.Text;
		scrollingMap: Phaser.TileSprite;

		startPosition: number;
		currentPosition: number;

		init() {
			console.log((new Date).toISOString() + ' : Entered DragSelection2 init()');
			// init can receive parameters.
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered DragSelection2 preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
			this.game.load.image('levelthumb');
			this.game.load.image('levelpages');
			this.game.load.image('transp');
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered DragSelection2 create()');

			this.currentPage = 0;

			this.pageSelectors = [];

			this.game.stage.backgroundColor = '#222';

			this.pageText = this.game.add.text(this.game.width / 2, 16, 'Swipe to select level page (1 / ' + this.colors.length + ')',
				{ font: '18px Arial', fill: '#fff' });
			this.pageText.anchor.setTo(0.5);

			this.scrollingMap = this.game.add.tileSprite(0, 0, this.colors.length * this.game.width, this.game.height, 'transp');
			this.scrollingMap.inputEnabled = true;
			this.scrollingMap.input.enableDrag(false);
			this.scrollingMap.input.allowVerticalDrag = false;
			this.scrollingMap.input.boundsRect = new Phaser.Rectangle(
				this.game.width - this.scrollingMap.width, this.game.height - this.scrollingMap.height,
				this.scrollingMap.width * 2 - this.game.width, this.scrollingMap.height * 2 - this.game.height
			);

			var rowWidth = this.thumbWidth * this.columns + this.thumbSpacing * (this.columns - 1);
			var leftMargin = (this.game.width - rowWidth) / 2;
			var colHeight = this.thumbHeight * this.columns + this.thumbSpacing * (this.columns - 1);
			var topMargin = (this.game.width - colHeight) / 2;

			for (var p = 0; p < this.colors.length; p++) {
				for (var i = 0; i < this.columns; i++) {
					for (var j = 0; j < this.rows; j++) {
						var thumb = new LevelThumb(
							this.game
							, p * this.game.width + leftMargin + i * (this.thumbWidth + this.thumbSpacing)
							, topMargin + j * (this.thumbHeight + this.thumbSpacing)
						);
						thumb.tint = this.colors[p];
						thumb.levelNumber = p * (this.rows * this.columns) + j * this.columns + i;
						var levelText = this.game.add.text(0, 0, thumb.levelNumber.toString(), { font: '36px Arial', fill: '#000' });
						thumb.addChild(levelText);
						this.scrollingMap.addChild(thumb);
					}
				}

				// Add page selectors to the bottom of the display.
				this.pageSelectors[p] = this.game.add.button(
					this.game.width / 2 + (p - Math.floor(this.colors.length / 2) + 0.5 * (1 - this.colors.length % 2)) * 40
					, this.game.height - 30
					, "levelpages"
					, function (e) {
					var difference = e.pageIndex - this.currentPage;
					this.changePage(difference);
				}, this);
				this.pageSelectors[p].anchor.set(0.5);
				this.pageSelectors[p].pageIndex = p;
				this.pageSelectors[p].tint = this.colors[p];
				if (p == this.currentPage) {
					this.pageSelectors[p].height = 30;
				}
				else {
					this.pageSelectors[p].height = 15;
				}
			}

			this.scrollingMap.events.onDragStart.add(function () {
				this.startPosition = this.scrollingMap.x;
				this.currentPosition = this.scrollingMap.x;
			}, this);

			this.scrollingMap.events.onDragStop.add(function (event, pointer) {
				if (this.startPosition == this.scrollingMap.x) {
					for (i = 0; i < this.scrollingMap.children.length; i++) {
						var bounds = this.scrollingMap.children[i].getBounds();
						if (bounds.contains(pointer.x, pointer.y)) {
							alert("Play level " + this.scrollingMap.children[i].levelNumber);
							break;
						}
					}
				} else {
					if (this.startPosition - this.scrollingMap.x > this.game.width / 8) {
						this.changePage(1);
					} else {
						if (this.startPosition - this.scrollingMap.x < -this.game.width / 8) {
							this.changePage(-1);
						} else {
							this.changePage(0);
						}
					}
				}
			}, this);
		}

		changePage(page: number) {
			this.currentPage += page;
			for (var p = 0; p < this.colors.length; p++) {
				if (p == this.currentPage) {
					this.pageSelectors[p].height = 30;
				}
				else {
					this.pageSelectors[p].height = 15;
				}
			}
			this.pageText.text = 'Swipe to select level page (' + (this.currentPage + 1).toString() + ' / ' + this.colors.length + ')';

			var tween = this.game.add.tween(this.scrollingMap).to({
				x: this.currentPage * -this.game.width
			}, 300, Phaser.Easing.Cubic.Out, true);
		}
	}
}