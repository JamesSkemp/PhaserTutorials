export default class Play extends Phaser.State {
	/**
	 * Unique name of the state.
	 */
	public static Name: string = "Play";

	level: number;
	levelKills: number;
	levelKillsRequired: number;
	background: Phaser.Group;
	monsters: Phaser.Group;
	currentMonster: any;
	player: any;
	monsterInfoUI: Phaser.Group;
	monsterNameText: Phaser.Text;
	monsterHealthText: Phaser.Text;
	dmgTextPool: Phaser.Group;
	coins: Phaser.Group;
	playerGoldText: Phaser.Text;
	upgradePanel: Phaser.Image;
	levelUI: Phaser.Group;
	levelText: Phaser.Text;
	levelKillsText: Phaser.Text;
	dpsTimer: Phaser.TimerEvent;

	init() {
		console.log((new Date).toISOString() + ' : Entered ExampleState init()');
		// init can receive parameters.

	}

	preload() {
		console.log((new Date).toISOString() + ' : Entered ExampleState preload()');

		// Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
		// Upgrades panel.
		var bmd = this.game.add.bitmapData(250, 500);
		bmd.ctx.fillStyle = '#9a783d';
		bmd.ctx.strokeStyle = '#35371c';
		bmd.ctx.lineWidth = 12;
		bmd.ctx.fillRect(0, 0, 250, 500);
		bmd.ctx.strokeRect(0, 0, 250, 500);
		this.game.cache.addBitmapData('upgradePanel', bmd);

		var buttonImage = this.game.add.bitmapData(476, 48);
		buttonImage.ctx.fillStyle = '#e6dec7';
		buttonImage.ctx.strokeStyle = '#35371c';
		buttonImage.ctx.lineWidth = 4;
		buttonImage.ctx.fillRect(0, 0, 225, 48);
		buttonImage.ctx.strokeRect(0, 0, 225, 48);
		this.game.cache.addBitmapData('button', buttonImage);

		// Current world level.
		this.level = 1;
		// Number of monsters killed in this level.
		this.levelKills = 0;
		// Number of monsters that have to be killed before advancing a level.
		this.levelKillsRequired = 10;
	}

	loadUpdate() {
		// Called while assets are being loaded.
	}

	create() {
		console.log((new Date).toISOString() + ' : Entered ExampleState create()');

		// Create a group to hold our related background images.
		this.background = this.game.add.group();
		// Setup each of our background layers to take the full screen.
		['forest-back', 'forest-lights', 'forest-middle', 'forest-front']
			.forEach((image) => {
				var bg: Phaser.TileSprite = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, image, '', this.background);
				// If not set, the image will repeat horizontally and vertically (4x4).
				bg.tileScale.set(4, 4);
			}, this);

		var monsterData = [
			{ name: 'Aerocephal', image: 'aerocephal', maxHealth: 10 },
			{ name: 'Arcana Drake', image: 'arcana_drake', maxHealth: 20 },
			{ name: 'Aurum Drakueli', image: 'aurum-drakueli', maxHealth: 30 },
			{ name: 'Bat', image: 'bat', maxHealth: 5 },
			{ name: 'Daemarbora', image: 'daemarbora', maxHealth: 10 },
			{ name: 'Deceleon', image: 'deceleon', maxHealth: 10 },
			{ name: 'Demonic Essence', image: 'demonic_essence', maxHealth: 15 },
			{ name: 'Dune Crawler', image: 'dune_crawler', maxHealth: 8 },
			{ name: 'Green Slime', image: 'green_slime', maxHealth: 3 },
			{ name: 'Nagaruda', image: 'nagaruda', maxHealth: 13 },
			{ name: 'Rat', image: 'rat', maxHealth: 2 },
			{ name: 'Scorpion', image: 'scorpion', maxHealth: 2 },
			{ name: 'Scorpion Goliath', image: 'scorpion_goliath', maxHealth: 20 },
			{ name: 'Skeleton', image: 'skeleton', maxHealth: 6 },
			{ name: 'Snake', image: 'snake', maxHealth: 4 },
			{ name: 'Spider', image: 'spider', maxHealth: 4 },
			{ name: 'Stygian Lizard', image: 'stygian_lizard', maxHealth: 20 }
		];

		this.monsters = this.game.add.group();

		var monster;
		monsterData.forEach((data) => {
			// Create a sprite for them off scrren.
			monster = this.monsters.create(1500, this.game.world.centerY, data.image);
			// Center sprite anchor.
			monster.anchor.setTo(0.5);
			// Reference to the data.
			monster.details = data;
			// Phaser has health/combat functionality built into the engine.
			monster.health = monster.maxHealth = data.maxHealth;
			// Phaser includes killed/revived functionality.
			monster.events.onKilled.add(this.onKilledMonster, this);
			monster.events.onRevived.add(this.onRevivedMonster, this);
			// Enable clicking.
			monster.inputEnabled = true;
			monster.events.onInputDown.add(this.onClickMonster, this);
		}, this);

		this.currentMonster = this.monsters.getRandom();
		this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY);

		// Main player.
		this.player = {
			// Current damage per click.
			clickDmg: 1,
			// Current amount of gold.
			gold: 50,
			// Automatic damage per second.
			dps: 0
		};

		this.monsterInfoUI = this.game.add.group();
		this.monsterInfoUI.position.setTo(this.currentMonster.x - 220, this.currentMonster.y + 120);
		this.monsterNameText = this.monsterInfoUI.add(this.game.add.text(0, 0, this.currentMonster.details.name, {
			font: '48px Arial Black',
			fill: '#fff',
			strokeThickness: 4
		}));
		this.monsterHealthText = this.monsterInfoUI.add(this.game.add.text(0, 80, Math.round(this.currentMonster.health) + ' HP', {
			font: '32px Arial Black',
			fill: '#f00',
			strokeThickness: 4
		}));

		this.dmgTextPool = this.add.group();
		// Create 50 text objects that we'll use to display damage.
		var dmgText;
		for (var d = 0; d < 50; d++) {
			dmgText = this.add.text(0, 0, '1', {
				font: '64px Arial Black',
				fill: '#fff',
				strokeThickness: 4
			});
			// Don't draw them until we need to.
			dmgText.exists = false;
			// The text will start where we click and fly off in a random direction, over the course of 1000 ms.
			dmgText.tween = this.game.add.tween(dmgText)
				.to({
					alpha: 0,
					y: 100,
					x: this.game.rnd.integerInRange(100, 700)
				}, 1000, Phaser.Easing.Cubic.Out);
			dmgText.tween.onComplete.add(function (text, tween) {
				text.kill();
			});
			this.dmgTextPool.add(dmgText);
		}

		// Create a pool of gold coins, since we want the player to collect them.
		this.coins = this.add.group();
		this.coins.createMultiple(50, 'gold_coin', '', false);
		this.coins.setAll('inputEnabled', true);
		this.coins.setAll('goldValue', 1);
		// Add an event to all coins so they can be collected.
		this.coins.callAll('events.onInputDown.add', 'events.onInputDown', this.onClickCoin, this);

		this.playerGoldText = this.add.text(30, 30, 'Gold: ' + this.player.gold, {
			font: '24px Arial Black',
			fill: '#fff',
			strokeThickness: 4
		});

		this.upgradePanel = this.game.add.image(10, 70, this.game.cache.getBitmapData('upgradePanel'));
		var upgradeButtons: any = this.upgradePanel.addChild(this.game.add.group());
		upgradeButtons.position.setTo(8, 8);

		var upgradeButtonsData = [
			{
				icon: 'dagger', name: 'Attack', level: 1, cost: 5, purchaseHandler: function (button, player) {
					player.clickDmg += 1;
				}
			},
			{
				icon: 'swordIcon1', name: 'Auto-Attack', level: 0, cost: 25, purchaseHandler: function (button, player) {
					player.dps += 5;
				}
			}
		];

		// Create a button to upgrade the player's click damage.
		var button: any;
		upgradeButtonsData.forEach((buttonData, index) => {
			button = this.game.add.button(0, 50 * index);
			button.loadTexture(this.game.cache.getBitmapData('button'));
			button.icon = button.addChild(this.game.add.image(6, 6, buttonData.icon));
			button.text = button.addChild(this.game.add.text(42, 6, buttonData.name + ': ' + buttonData.level, { font: '16px Arial Black' }));
			button.details = buttonData;
			button.costText = button.addChild(this.game.add.text(42, 24, 'Cost: ' + buttonData.cost, { font: '16px Arial Black' }));
			button.events.onInputDown.add(this.onUpgradeButtonClick, this);
			// Add the button to the collection of upgrade buttons.
			upgradeButtons.addChild(button);
		}, this);

		// Display the current world level.
		this.levelUI = this.game.add.group();
		this.levelUI.position.setTo(this.game.world.centerX, 30);
		this.levelText = this.levelUI.add(this.game.add.text(0, 0, 'Level: ' + this.level, {
			font: '24px Arial Black',
			fill: '#fff',
			strokeThickness: 4
		}));
		this.levelKillsText = this.levelUI.add(this.game.add.text(0, 30, 'Kills: ' + this.levelKills + '/' + this.levelKillsRequired, {
			font: '24px Arial Black',
			fill: '#fff',
			strokeThickness: 4
		}));

		// Check to see if damage should be applied automatically. Runs every 100 ms.
		this.dpsTimer = this.game.time.events.loop(Phaser.Timer.SECOND / 10, this.onDPS, this);

		/*
		// Location of the image, and in this case the frame to use (zero-based as usual).
		var skeletonSprite = game.add.sprite(450, 290, 'skeleton', 0);
		// Set the rotation point to the center of the image, instead of the top left (0, 0).
		skeletonSprite.anchor.setTo(0.5, 0.5);
		*/
	}

	update() {

	}

	paused() {
		console.log((new Date).toISOString() + ' : Entered ExampleState paused()');

	}

	pauseUpdate() {

	}

	resumed() {
		console.log((new Date).toISOString() + ' : Entered ExampleState resumed()');

	}

	shutdown() {
		console.log((new Date).toISOString() + ' : Entered ExampleState shutdown()');

	}

	render() {
		/*
		game.debug.text(
			this.currentMonster.details.name,
			this.game.world.centerX - this.currentMonster.width / 2,
			this.game.world.centerY + this.currentMonster.height / 2);
		*/
		//game.debug.text('Adventure Awaits!', 250, 250);
	}

	onClickMonster(monster, pointer) {
		// Apply click damage to the monster.
		this.currentMonster.damage(this.player.clickDmg);

		// Display that damage was dealt.
		var dmgText = this.dmgTextPool.getFirstExists(false);
		if (dmgText) {
			dmgText.text = this.player.clickDmg;
			dmgText.reset(pointer.positionDown.x, pointer.positionDown.y);
			dmgText.alpha = 1;
			dmgText.tween.start();
		}

		this.monsterHealthText.text = this.currentMonster.alive ? Math.round(this.currentMonster.health) + ' HP' : 'DEAD';
		/*
		// Reset the current monster before we move him.
		this.currentMonster.position.set(1500, this.game.world.centerY);
		// Get another random monster.
		this.currentMonster = this.monsters.getRandom();
		this.currentMonster.position.set(this.game.world.centerX + 100, this.game.world.centerY);
		*/
	}

	onKilledMonster(monster) {
		// Move the monster off screen.
		monster.position.set(1500, this.game.world.centerY);

		var coin;
		// Spawn a coin.
		coin = this.coins.getFirstExists(false);
		coin.reset(this.game.world.centerX + this.game.rnd.integerInRange(-100, 100), this.game.world.centerY);
		coin.goldValue = Math.round(this.level * 1.33);
		// Automatically collect the coin after 3 seconds.
		this.game.time.events.add(Phaser.Timer.SECOND * 3, this.onClickCoin, this, coin);

		this.levelKills++;

		if (this.levelKills >= this.levelKillsRequired) {
			this.level++;
			this.levelKills = 0;
			this.levelText.text = 'Level: ' + this.level;
		}

		this.levelKillsText.text = 'Kills: ' + this.levelKills + '/' + this.levelKillsRequired;

		// Get a new monster.
		this.currentMonster = this.monsters.getRandom();
		this.currentMonster.maxHealth = Math.ceil(this.currentMonster.details.maxHealth + ((this.level - 1) * 10.6))
		// Start them off fully healed.
		this.currentMonster.revive(this.currentMonster.maxHealth);
	}

	onRevivedMonster(monster) {
		// Move it into the world.
		monster.position.set(this.game.world.centerX + 100, this.game.world.centerY);
		// Update the text display.
		this.monsterNameText.text = monster.details.name;
		this.monsterHealthText.text = monster.health + ' HP';
	}

	onClickCoin(coin) {
		// Make sure it's still alive. This may be an issue if we try to automatically collect a coin that has been clicked on.
		if (!coin.alive) {
			return;
		}
		// Give the player the gold.
		this.player.gold += coin.goldValue;
		this.playerGoldText.text = 'Gold: ' + this.player.gold;
		coin.kill();
	}

	onUpgradeButtonClick(button, pointer) {
		// This functionality is here so it's updated after purchases.
		function getAdjustedCost() {
			return Math.ceil(button.details.cost + (button.details.level * 1.46));
		}

		if (this.player.gold - getAdjustedCost() >= 0) {
			this.player.gold -= getAdjustedCost();
			this.playerGoldText.text = 'Gold: ' + this.player.gold;
			button.details.level++;
			button.text.text = button.details.name + ': ' + button.details.level;
			button.costText.text = 'Cost: ' + getAdjustedCost();
			button.details.purchaseHandler.call(this, button, this.player);
		}
	}
	
	onDPS() {
		if (this.player.dps > 0) {
			if (this.currentMonster && this.currentMonster.alive) {
				var dmg = this.player.dps / 10;
				this.currentMonster.damage(dmg);
				// Update the health text, but round it.
				this.monsterHealthText.text = this.currentMonster.alive ? Math.round(this.currentMonster.health) + ' HP' : 'DEAD';
			}
		}
	}
}