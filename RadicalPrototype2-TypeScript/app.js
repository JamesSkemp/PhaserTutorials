var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RadicalPrototype2;
(function (RadicalPrototype2) {
    var App = (function (_super) {
        __extends(App, _super);
        function App() {
            console.log((new Date).toISOString() + ' : Entered App constructor()');
            // Update the width (800) and height (600) accordingly.
            _super.call(this, 320, 480, Phaser.AUTO, 'content');
            // Add the game states.
            this.state.add('Game', RadicalPrototype2.Game, true);
        }
        return App;
    })(Phaser.Game);
    RadicalPrototype2.App = App;
})(RadicalPrototype2 || (RadicalPrototype2 = {}));
window.onload = function () {
    var game = new RadicalPrototype2.App();
};
var RadicalPrototype2;
(function (RadicalPrototype2) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.apply(this, arguments);
            this.shipHorizontalSpeed = 400;
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
            this.load.image('wall', 'verticalbarrier.png');
        };
        Game.prototype.create = function () {
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
            this.placeBarriers();
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
        Game.prototype.placeBarriers = function () {
            var placeWalls = true;
            if (this.game.rnd.between(0, 9) === 0) {
                // 10% chance we won't add walls.
                placeWalls = false;
            }
            var position = this.game.rnd.between(0, 4);
            // Create the left-most barrier first.
            var barrier = new Barrier(this, position, 1, placeWalls);
            this.game.add.existing(barrier);
            this.barrierGroup.add(barrier);
            // Create the right barrier next.
            barrier = new Barrier(this, position + 1, 0, placeWalls);
            this.game.add.existing(barrier);
            this.barrierGroup.add(barrier);
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
        Game.barrierDelay = 150;
        return Game;
    })(Phaser.State);
    RadicalPrototype2.Game = Game;
    var Barrier = (function (_super) {
        __extends(Barrier, _super);
        /**
            The world is split into 5 lanes. Two barriers are added per 'line' of them.
        */
        function Barrier(state, position, anchor, placeWalls) {
            _super.call(this, state.game, position * ((state.game.width - 40) / 5) + 20, -Game.barrierDelay - 40, 'barrier');
            this.state = state;
            this.game = state.game;
            // Used to determine when to create new barriers.
            this.createNew = anchor === 1;
            if (placeWalls) {
                var wall = new Wall(this.game, anchor);
                this.game.add.existing(wall);
                state.barrierGroup.add(wall);
            }
            this.anchor.setTo(anchor, 0.5);
            this.game.physics.enable(this);
            this.body.velocity.y = Game.barrierSpeed;
        }
        Barrier.prototype.update = function () {
            if (this.y > this.game.height) {
                this.destroy();
            }
            if (this.createNew && this.y >= -40) {
                // It's time to create a new set of barriers.
                this.createNew = false;
                this.state.placeBarriers();
            }
        };
        return Barrier;
    })(Phaser.Sprite);
    RadicalPrototype2.Barrier = Barrier;
    var Wall = (function (_super) {
        __extends(Wall, _super);
        function Wall(game, side) {
            _super.call(this, game, game.width * side, -Game.barrierDelay - 50, "wall");
            this.game = game;
            this.anchor.setTo(side, 0);
            // 20 is the height of a horizontal barrier.
            this.height = Game.barrierDelay + 20;
            game.physics.enable(this);
            this.body.velocity.y = Game.barrierSpeed;
        }
        Wall.prototype.update = function () {
            if (this.y > this.game.height) {
                this.destroy();
            }
        };
        return Wall;
    })(Phaser.Sprite);
    RadicalPrototype2.Wall = Wall;
})(RadicalPrototype2 || (RadicalPrototype2 = {}));
//# sourceMappingURL=app.js.map