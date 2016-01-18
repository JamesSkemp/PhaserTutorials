/// <reference path="../lib/phaser-2.4.3.js" />

// We're using text for our graphics, so this is our font size.
var FONT = 32;
// Number of columns and rows that make up the level.
var COLUMNS = 15;
var ROWS = 10;
// Number of actors per level, including the player.
var ACTORS = 10;

// Create a game, and use the WebGL (default) or Canvas renderer, depending upon the browser.
var game = new Phaser.Game(COLUMNS * FONT * 0.6, ROWS * FONT, Phaser.AUTO);

game.state.add('play', {
	preload: function () {
	},

	create: function () {
		var state = this;

		game.input.keyboard.addCallbacks(this, null, this.onKeyUp, null);

		// Initialize the map of the walls and floor.
		this.game.levelMap;
		this.initializeMap();

		this.game.player;
		// Collection of all actors, the first of which is the player.
		this.game.actorList;
		this.game.livingEnemies;
		// Each actor's position in the world.
		this.game.actorMap;

		// The display of the map with ASCII characters.
		this.game.asciiDisplay = [];

		for (var y = 0; y < ROWS; y++) {
			var newRow = [];
			this.game.asciiDisplay.push(newRow);
			for (var x = 0; x < COLUMNS; x++) {
				newRow.push(this.initCell(this.game.levelMap[y][x], x, y));
			}
		}

		this.initializeActors();
		this.drawActors();
		this.drawMap();

		//this.renderMap();
	},

	render: function () {
	},

	renderMap: function () {
		for (var y = 0; y < ROWS; y++) {
			for (var x = 0; x < COLUMNS; x++) {
				console.log(this.game.levelMap[y][x]);
				console.log(this.game.asciiDisplay[y][x]);
				if (this.game.levelMap[y][x] == '#') {
					// This is a wall, render it as such.
					this.initCell(this.game.levelMap[y][x], x, y);
				} else if (this.game.asciiDisplay != '') {
					this.initCell(this.game.asciiDisplay[y][x].content, x, y);
				}


			}
		}
	},

	initializeMap: function () {
		this.game.levelMap = [];
		for (var y = 0; y < ROWS; y++) {
			var newRow = [];
			for (var x = 0; x < COLUMNS; x++) {
				if (Math.random() > 0.8) {
					newRow.push('#');
				} else {
					newRow.push('.');
				}
			}
			this.game.levelMap.push(newRow);
		}
	},

	initCell: function (character, x, y) {
		console.log('init cell with ' + character + ' at ' + x + '/' + y);
		var style = { font: FONT + 'px monospace', fill: '#fff' };
		if (character == '.') {
			character = ' ';
		}
		return game.add.text(FONT * 0.6 * x, FONT * y, character, style);
	},

	drawMap: function () {
		console.log('drawing map');
		for (var y = 0; y < ROWS; y++) {
			for (var x = 0; x < COLUMNS; x++) {
				this.game.asciiDisplay[y][x].content = this.game.levelMap[y][x];
			}
		}
	},

	initializeActors: function () {
		this.game.actorList = [];
		this.game.actorMap = [];

		for (var e = 0; e < ACTORS; e++) {
			// Create a new actor, with either 3 HP for the player, or 1 for an enemy.
			var actor = { x: 0, y: 0, hp: e == 0 ? 3 : 1 };
			// Find a spot for the actor that isn't a wall, and isn't already occupied.
			do {
				actor.y = this.randomInt(ROWS);
				actor.x = this.randomInt(COLUMNS);
			} while (this.game.levelMap[actor.y][actor.x] == '#' || this.game.actorMap[actor.y + '_' + actor.x] != null);

			// Add the actor to the actor map and list.
			this.game.actorMap[actor.y + '_' + actor.x] = actor;
			this.game.actorList.push(actor);
		}

		this.game.player = this.game.actorList[0];
		this.game.livingEnemies = ACTORS - 1;

		console.log('actors: ' + this.game.actorList.length);
		console.log('living enemies: ' + this.game.livingEnemies);
	},

	drawActors: function () {
		for (var a in this.game.actorList) {
			if (this.game.actorList[a] != null && this.game.actorList[a].hp > 0) {
				this.game.asciiDisplay[this.game.actorList[a].y][this.game.actorList[a].x].content = (a == 0 ? '' + this.game.player.hp : 'e');
				// TODO this should be taken care of by the logic to draw the map.
				this.initCell((a == 0 ? '' + this.game.player.hp : 'e'), this.game.actorList[a].x, this.game.actorList[a].y);
			}
		}
	},

	canGo: function (actor, dir) {
		return actor.x + dir.x >= 0
			&& actor.x + dir.x <= COLUMNS - 1
			&& actor.y + dir.y >= 0
			&& actor.y + dir.y <= ROWS - 1
			&& this.game.levelMap[actor.y + dir.y][actor.x + dir.x] == '.';
	},

	moveTo: function (actor, dir) {
		// TODO this was a copy/paste with 'this' and 'this.game' tweaks only. Own it.
		// check if actor can move in the given direction
		if (!this.canGo(actor, dir)) {
			return false;
		}

		// moves actor to the new location
		var newKey = (actor.y + dir.y) + '_' + (actor.x + dir.x);
		// if the destination tile has an actor in it 
		if (this.game.actorMap[newKey] != null) {
			//decrement hitpoints of the actor at the destination tile
			var victim = this.game.actorMap[newKey];
			victim.hp--;

			// if it's dead remove its reference 
			if (victim.hp == 0) {
				this.game.actorMap[newKey] = null;
				this.game.actorList[this.game.actorList.indexOf(victim)] = null;
				if (victim != this.game.player) {
					this.game.livingEnemies--;
					if (this.game.livingEnemies == 0) {
						// victory message
						var victory = game.add.text(game.world.centerX, game.world.centerY, 'Victory!\nCtrl+r to restart', { fill: '#2e2', align: "center" });
						victory.anchor.setTo(0.5, 0.5);
					}
				}
			}
		} else {
			// remove reference to the actor's old position
			this.game.actorMap[actor.y + '_' + actor.x] = null;

			// update position
			actor.y += dir.y;
			actor.x += dir.x;

			// add reference to the actor's new position
			this.game.actorMap[actor.y + '_' + actor.x] = actor;
		}
		return true;
	},

	randomInt: function (max) {
		return Math.floor(Math.random() * max);
	},
	
	aiAct: function (actor) {
		// TODO this was a copy/paste with 'this' and 'this.game' tweaks only. Own it.
		var directions = [ { x: -1, y:0 }, { x:1, y:0 }, { x:0, y: -1 }, { x:0, y:1 } ];	
		var dx = this.game.player.x - actor.x;
		var dy = this.game.player.y - actor.y;
	
		// if player is far away, walk randomly
		if (Math.abs(dx) + Math.abs(dy) > 6)
			// try to walk in random directions until you succeed once
			while (!this.moveTo(actor, directions[this.randomInt(directions.length)])) { };
	
		// otherwise walk towards player
		if (Math.abs(dx) > Math.abs(dy)) {
			if (dx < 0) {
				// left
				this.moveTo(actor, directions[0]);
			} else {
				// right
				this.moveTo(actor, directions[1]);
			}
		} else {
			if (dy < 0) {
				// up
				this.moveTo(actor, directions[2]);
			} else {
				// down
				this.moveTo(actor, directions[3]);
			}
		}
		if (this.game.player.hp < 1) {
			// game over message
			var gameOver = game.add.text(game.world.centerX, game.world.centerY, 'Game Over\nCtrl+r to restart', { fill : '#e22', align: "center" } );
			gameOver.anchor.setTo(0.5,0.5);
		}
	},

	onKeyUp: function (event) {
		this.drawMap();

		var acted = false;
		switch (event.keyCode) {
			case Phaser.Keyboard.UP:
				acted = this.moveTo(this.game.player, { x: 0, y: -1 });
				break;
			case Phaser.Keyboard.DOWN:
				acted = this.moveTo(this.game.player, { x: 0, y: 1 });
				break;
			case Phaser.Keyboard.LEFT:
				acted = this.moveTo(this.game.player, { x: -1, y: 0 });
				break;
			case Phaser.Keyboard.RIGHT:
				acted = this.moveTo(this.game.player, { x: 1, y: 0 });
				break;
			default:
				break;
		}

		if (acted) {
			for (var enemy in this.game.actorList) {
				// Skip the player.
				if (enemy == 0) {
					continue;
				}
				var e = this.game.actorList[enemy];
				if (e != null) {
					this.aiAct(e);
				}
			}
		}

		this.drawActors();
	}
});

game.state.start('play');