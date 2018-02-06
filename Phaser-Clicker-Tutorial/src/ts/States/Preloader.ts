export default class Preloader extends Phaser.State {
	/**
	 * Unique name of the state.
	 */
	public static Name: string = "Preloader";

	preload() {
		console.log((new Date).toISOString() + ' : Entered Preloader preload()');

		// If your game uses a graphic while assets are loaded, you would create the sprite and then display it via the below.
		//this.load.setPreloadSprite(this.preloadSprite);

		// Load the actual assets. By default the path will be set to the assets directory.
		this.load.path = 'assets/';
		// Assets loaded here can include image and audio files, as well as sprite sheets and more.
        // Load in the images for our background.
        this.game.load.image('forest-back', 'parallax_forest_pack/layers/parallax-forest-back-trees.png');
        this.game.load.image('forest-lights', 'parallax_forest_pack/layers/parallax-forest-lights.png');
        this.game.load.image('forest-middle', 'parallax_forest_pack/layers/parallax-forest-middle-trees.png');
        this.game.load.image('forest-front', 'parallax_forest_pack/layers/parallax-forest-front-trees.png');

        // Sizes are the width and height of an individual image, and how many frames there are.
        this.game.load.spritesheet('aerocephal', 'allacrost_enemy_sprites/aerocephal.png', 768 / 4, 192, 4);
        this.game.load.spritesheet('arcana_drake', 'allacrost_enemy_sprites/arcana_drake.png', 768 / 4, 256, 4);
        this.game.load.spritesheet('aurum-drakueli', 'allacrost_enemy_sprites/aurum-drakueli.png', 1280 / 4, 256, 4);
        this.game.load.spritesheet('bat', 'allacrost_enemy_sprites/bat.png', 512 / 4, 128, 4);
        this.game.load.spritesheet('daemarbora', 'allacrost_enemy_sprites/daemarbora.png', 512 / 4, 128, 4);
        this.game.load.spritesheet('deceleon', 'allacrost_enemy_sprites/deceleon.png', 1024 / 4, 256, 4);
        this.game.load.spritesheet('demonic_essence', 'allacrost_enemy_sprites/demonic_essence.png', 512 / 4, 192, 4);
        this.game.load.spritesheet('dune_crawler', 'allacrost_enemy_sprites/dune_crawler.png', 256 / 4, 64, 4);
        this.game.load.spritesheet('green_slime', 'allacrost_enemy_sprites/green_slime.png', 256 / 4, 64, 4);
        this.game.load.spritesheet('nagaruda', 'allacrost_enemy_sprites/nagaruda.png', 768 / 4, 256, 4);
        this.game.load.spritesheet('rat', 'allacrost_enemy_sprites/rat.png', 256 / 4, 64, 4);
        this.game.load.spritesheet('scorpion', 'allacrost_enemy_sprites/scorpion.png', 256 / 4, 64, 4);
        this.game.load.spritesheet('scorpion_goliath', 'allacrost_enemy_sprites/scorpion_goliath.png', 2048 / 4, 448, 4);
        this.game.load.spritesheet('skeleton', 'allacrost_enemy_sprites/skeleton.png', 256 / 4, 128, 4);
        this.game.load.spritesheet('snake', 'allacrost_enemy_sprites/snake.png', 512 / 4, 64, 4);
        this.game.load.spritesheet('spider', 'allacrost_enemy_sprites/spider.png', 256 / 4, 64, 4);
        this.game.load.spritesheet('stygian_lizard', 'allacrost_enemy_sprites/stygian_lizard.png', 768 / 4, 192, 4);

        this.game.load.image('gold_coin', '496_RPG_icons/I_GoldCoin.png');

		this.game.load.image('dagger', '496_RPG_icons/W_Dagger002.png');
		this.game.load.image('swordIcon1', '496_RPG_icons/S_Sword15.png');
	}

	create() {
		console.log((new Date).toISOString() + ' : Entered Preloader create()');

		// Once the assets have been preloaded you can move to the next state.
		//this.game.state.start(PlayState.Name, true, false);
		this.game.state.start('play', true, false);
	}
}
