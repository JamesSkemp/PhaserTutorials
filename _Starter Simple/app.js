var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StarterSimpleProject;
(function (StarterSimpleProject) {
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            console.log((new Date).toISOString() + ' : Entered App constructor()');
            // Update the width (800) and height (600) accordingly.
            _super.call(this, 800, 600, Phaser.AUTO, 'content');
            // Add the game states.
            this.state.add('Game', StarterSimpleProject.Game, true);
        }
        return App;
    }(Phaser.Game));
    StarterSimpleProject.App = App;
})(StarterSimpleProject || (StarterSimpleProject = {}));
window.onload = function () {
    var game = new StarterSimpleProject.App();
};
var StarterSimpleProject;
(function (StarterSimpleProject) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.apply(this, arguments);
        }
        Game.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered Game init()');
            // If you want to scale the game, you can set that here.
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // If we put our game in a div, we need to add the following as well, if you SHOW_ALL.
            this.game.scale.windowConstraints.bottom = 'visual';
            // Uncomment to place our game in the center of the screen both horizontally and vertically.
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            // Disable multitouch. It's recommended by the creators to set this unless your game needs multitouch.
            this.input.maxPointers = 1;
            // If your game uses a physics system, you can start that here.
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
        };
        Game.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered Game preload()');
            // Load the actual assets. By default the path will be set to the assets directory.
            this.load.path = 'assets/';
            this.load.image('Phaser-Logo-Small');
        };
        Game.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Game create()');
            // Start building your game here.
            this.phaserLogo = this.add.sprite(this.world.centerX, this.world.centerY, 'Phaser-Logo-Small');
            this.phaserLogo.anchor.setTo(0.5);
            this.phaserLogoText = this.add.text(this.game.width / 8, this.game.height / 8, 'Powered by', { fontSize: '24px', fill: '#fff' });
        };
        Game.prototype.update = function () {
        };
        return Game;
    }(Phaser.State));
    StarterSimpleProject.Game = Game;
})(StarterSimpleProject || (StarterSimpleProject = {}));
//# sourceMappingURL=app.js.map