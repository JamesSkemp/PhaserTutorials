var Menu = {

	preload: function () {
		this.load.image('menu', 'assets/menu.png');
	},

	create: function () {
		this.add.sprite(0, 0, 'menu');
	}
};