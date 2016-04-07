module LevelSelectProject {
	export class MainMenu extends Phaser.State {
		create() {
			console.log((new Date).toISOString() + ' : Entered MainMenu create()');

			// Handle user input as needed.

			var link1 = this.game.add.text(0, 0, 'Option 1', { fill: '#fff' });
			link1.inputEnabled = true;
			link1.events.onInputDown.add(function () { this.game.state.start('Option1'); }, this);

			var link2 = this.game.add.text(0, 50, 'Scrollable Map', { fill: '#fff' });
			link2.inputEnabled = true;
			link2.events.onInputDown.add(function () { this.game.state.start('ScrollableMap'); }, this);
		}
	}
}