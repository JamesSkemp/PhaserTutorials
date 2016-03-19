var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GoatRider;
(function (GoatRider) {
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            console.log((new Date).toISOString() + ' : Entered App constructor()');
            // Update the width (800) and height (600) accordingly.
            _super.call(this, 800, 160, Phaser.AUTO, 'content');
            // Add the game states.
            this.state.add('Game', GoatRider.Game, true);
        }
        return App;
    })(Phaser.Game);
    GoatRider.App = App;
})(GoatRider || (GoatRider = {}));
window.onload = function () {
    var game = new GoatRider.App();
};
var GoatRider;
(function (GoatRider) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.apply(this, arguments);
            this.deltaSpeed = 10;
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
            this.game.stage.backgroundColor = 0x74af21;
        };
        Game.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered Game preload()');
            // Load the actual assets. By default the path will be set to the assets directory.
            this.load.path = 'assets/';
            this.load.image('player');
            this.load.image('goat');
        };
        Game.prototype.create = function () {
            var _this = this;
            console.log((new Date).toISOString() + ' : Entered Game create()');
            // Start building your game here.
            this.goat = this.add.sprite(this.world.centerX, this.world.height, 'goat');
            this.goat.anchor.setTo(0.5, 1);
            this.player = this.goat.addChild(this.game.make.sprite(0, -this.goat.height + 20, 'player'));
            this.player.anchor.setTo(0.5, 1);
            this.game.physics.enable(this.goat, Phaser.Physics.ARCADE);
            this.rounds = -1;
            this.game.input.onDown.add(function () {
                _this.isPressed = true;
                if (_this.rounds === -1) {
                    if (_this.game.rnd.between(0, 1) === 0) {
                        _this.goatLeft();
                    }
                    else {
                        _this.goatRight();
                    }
                }
            });
            this.game.input.onUp.add(function () {
                _this.isPressed = false;
            });
        };
        Game.prototype.update = function () {
            if (this.player.x > -this.goat.width / 2 && this.player.x < this.goat.width / 2) {
                if ((this.goat.body.velocity.x > 0 && !this.isPressed)
                    || (this.goat.body.velocity.x < 0 && this.isPressed)) {
                    this.player.body.velocity.x = -this.goat.body.velocity.x;
                }
                else {
                    this.player.body.velocity.x = 0;
                }
                if (this.goat.body.velocity.x > 0 && this.goat.x >= this.targetX) {
                    this.goatLeft();
                }
                if (this.goat.body.velocity.x < 0 && this.goat.x <= this.targetX) {
                    this.goatRight();
                }
            }
            else {
                this.goat.body.velocity.x = 0;
                this.player.body.velocity.x = 0;
            }
        };
        Game.prototype.goatLeft = function () {
            this.rounds++;
            this.goat.body.velocity.x = this.game.rnd.between(-200 - this.deltaSpeed * this.rounds, -100 - this.deltaSpeed * this.rounds);
            this.targetX = this.game.rnd.between(this.goat.x - this.goat.width / 2, this.goat.width / 2);
            this.goat.tint = 0xffffff;
        };
        Game.prototype.goatRight = function () {
            this.rounds++;
            this.goat.body.velocity.x = this.game.rnd.between(100 + this.deltaSpeed * this.rounds, 200 + this.deltaSpeed * this.rounds);
            this.targetX = this.game.rnd.between(this.goat.x + this.goat.width, this.game.width - this.goat.width / 2);
            this.goat.tint = 0xff0000;
        };
        return Game;
    })(Phaser.State);
    GoatRider.Game = Game;
})(GoatRider || (GoatRider = {}));
//# sourceMappingURL=app.js.map