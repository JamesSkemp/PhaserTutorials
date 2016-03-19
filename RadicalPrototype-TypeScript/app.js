var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RadicalPrototype;
(function (RadicalPrototype) {
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            console.log((new Date).toISOString() + ' : Entered App constructor()');
            // Update the width (800) and height (600) accordingly.
            _super.call(this, 320, 480, Phaser.AUTO, 'content');
            // Add the game states.
            this.state.add('Game', RadicalPrototype.Game, true);
        }
        return App;
    })(Phaser.Game);
    RadicalPrototype.App = App;
})(RadicalPrototype || (RadicalPrototype = {}));
window.onload = function () {
    var game = new RadicalPrototype.App();
};
var RadicalPrototype;
(function (RadicalPrototype) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.apply(this, arguments);
            this.shipHorizontalSpeed = 400;
            this.barrierDelay = 1200;
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
            this.load.image('ship');
            this.load.image('barrier');
        };
        Game.prototype.create = function () {
            var _this = this;
            console.log((new Date).toISOString() + ' : Entered Game create()');
            // Create a group to contain the barriers.
            this.barrierGroup = this.add.group();
            // Add the player's ship.
            this.ship = this.add.sprite(this.game.width / 2, this.game.height - 40, 'ship');
            this.ship.anchor.setTo(0.5);
            this.game.physics.enable(this.ship);
            this.ship.body.allowRotation = false;
            // Handle touch inputs.
            this.game.input.onDown.add(this.moveShip, this);
            this.game.input.onUp.add(this.stopShip, this);
            // Create our barriers.
            this.game.time.events.loop(this.barrierDelay, function () {
                var position = _this.game.rnd.between(0, 4);
                // Create the left-most barrier first.
                var barrier = new Barrier(_this.game, position, 1);
                _this.game.add.existing(barrier);
                _this.barrierGroup.add(barrier);
                // Create the right barrier next.
                barrier = new Barrier(_this.game, position + 1, 0);
                _this.game.add.existing(barrier);
                _this.barrierGroup.add(barrier);
            });
        };
        Game.prototype.update = function () {
            var _this = this;
            if (this.ship.position.x < 0) {
                this.ship.position.x = this.game.width;
            }
            else if (this.ship.position.x > this.game.width) {
                this.ship.position.x = 0;
            }
            this.game.physics.arcade.collide(this.ship, this.barrierGroup, function () {
                _this.game.state.restart();
            });
        };
        Game.prototype.moveShip = function (input) {
            if (input.position.x < this.game.width / 2) {
                // Move to the left.
                this.ship.body.velocity.x = -this.shipHorizontalSpeed;
            }
            else {
                // Move to the right.
                this.ship.body.velocity.x = this.shipHorizontalSpeed;
            }
        };
        Game.prototype.stopShip = function () {
            this.ship.body.velocity.x = 0;
        };
        Game.barrierSpeed = 150;
        return Game;
    })(Phaser.State);
    RadicalPrototype.Game = Game;
    var Barrier = (function (_super) {
        __extends(Barrier, _super);
        /**
            The world is split into 5 lanes. Two barriers are added per 'line' of them.
        */
        function Barrier(game, position, anchor) {
            _super.call(this, game, position * game.width / 5, -20, 'barrier');
            this.game = game;
            this.anchor.setTo(anchor, 0.5);
            game.physics.enable(this);
        }
        Barrier.prototype.update = function () {
            this.body.velocity.y = Game.barrierSpeed;
            if (this.y > this.game.height) {
                this.destroy();
            }
        };
        return Barrier;
    })(Phaser.Sprite);
    RadicalPrototype.Barrier = Barrier;
})(RadicalPrototype || (RadicalPrototype = {}));
//# sourceMappingURL=app.js.map