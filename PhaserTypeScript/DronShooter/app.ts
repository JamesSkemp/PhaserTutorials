﻿class Game extends Phaser.Game {

	constructor() {
		super(640, 400, Phaser.AUTO, "content", State);
	}
}

class State extends Phaser.State {
	preload() {
		this.game.load.path = "assets/";
		this.game.load.image("BG", "bg.jpg");
		this.game.load.atlas("atlas");
	}

	create() {
		// Use the P2 physics engine.
		this.game.physics.startSystem(Phaser.Physics.P2JS);

		this.add.image(0, 0, "BG");

		var dron: Dron = new Dron(this.game, 320, 100, "atlas", "dron1");
		dron.setUp();
		
		this.world.add(dron);
	}
}

class Dron extends Phaser.Sprite {

	public setUp() {
		this.anchor.setTo(0.5);
	}
}

/**
 * Tween function to give a target a bit of wiggle, but ending back at the same spot.
 * @param aProgress
 * @param aPeriod1
 * @param aPeriod2
 * @returns
 */
function wiggle(aProgress: number, aPeriod1: number, aPeriod2: number): number {
	var current1: number = aProgress * Math.PI * 2 * aPeriod1;
	var current2: number = aProgress * Math.PI * 2 * aPeriod2;

	return Math.sin(current1) * Math.cos(current2);
}

window.onload = () => {
	new Game();
};