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
		
		currentPage;
		pageText: Phaser.Text;
		scrollingMap: Phaser.TileSprite;

		init() {
			console.log((new Date).toISOString() + ' : Entered DragSelection init()');
			// init can receive parameters.
		}

		preload() {
			console.log((new Date).toISOString() + ' : Entered DragSelection preload()');

			// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
			this.game.load.image('levelthumb');
			this.game.load.image('transp');
		}

		create() {
			console.log((new Date).toISOString() + ' : Entered DragSelection create()');

			this.currentPage = 0;

			this.game.stage.backgroundColor = '#004';

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
						var thumb = this.game.add.image(
							p * this.game.width + leftMargin + i * (this.thumbWidth + this.thumbSpacing)
							, topMargin + j * (this.thumbHeight + this.thumbSpacing)
							, 'levelthumb'
						);
						thumb.tint = this.colors[p];
						this.scrollingMap.addChild(thumb);
					}
				}
			}
		}
	}
}