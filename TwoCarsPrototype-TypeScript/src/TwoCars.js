var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TwoCars;
(function (TwoCars) {
    var Car = (function (_super) {
        __extends(Car, _super);
        function Car(game, x, y, side) {
            _super.call(this, game, x, y, 'car');
            this.side = side;
            this.canMove = true;
            this.positions = [game.width * (this.side * 4 + 1) / 8, game.width * (this.side * 4 + 3) / 8];
            this.x = this.positions[this.side];
            this.anchor.setTo(0.5);
            this.tint = TwoCars.PlayGame.carColors[side];
            game.physics.enable(this, Phaser.Physics.ARCADE);
            var body = this.body;
            body.allowRotation = false;
            body.moves = false;
        }
        return Car;
    })(Phaser.Sprite);
    TwoCars.Car = Car;
})(TwoCars || (TwoCars = {}));
var TwoCars;
(function (TwoCars) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 320, 480, Phaser.AUTO, 'content');
            this.state.add('PlayGame', TwoCars.PlayGame);
            this.state.start('PlayGame');
        }
        return Game;
    })(Phaser.Game);
    TwoCars.Game = Game;
})(TwoCars || (TwoCars = {}));
window.onload = function () {
    var game = new TwoCars.Game();
};
var TwoCars;
(function (TwoCars) {
    var Obstacle = (function (_super) {
        __extends(Obstacle, _super);
        function Obstacle(game, x, y, lane) {
            _super.call(this, game, x, y, 'obstacle');
            this.lane = lane;
            this.anchor.setTo(0.5);
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.tint = TwoCars.PlayGame.carColors[Math.floor(lane / 2)];
        }
        Obstacle.prototype.update = function () {
            this.body.velocity.y = TwoCars.PlayGame.obstacleSpeed;
            if (this.y > this.game.height) {
                this.destroy();
            }
        };
        return Obstacle;
    })(Phaser.Sprite);
    TwoCars.Obstacle = Obstacle;
})(TwoCars || (TwoCars = {}));
var TwoCars;
(function (TwoCars) {
    var PlayGame = (function (_super) {
        __extends(PlayGame, _super);
        function PlayGame() {
            _super.apply(this, arguments);
            this.cars = [];
            this.carTurnSpeed = 250;
            this.obstacleDelay = 1500;
        }
        PlayGame.prototype.preload = function () {
            this.game.load.path = 'assets/';
            this.game.load.image('car');
            this.game.load.image('obstacle');
            this.game.load.image('road');
            this.game.load.image('target');
        };
        PlayGame.prototype.create = function () {
            var _this = this;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.add.image(0, 0, 'road');
            this.carGroup = this.game.add.group();
            this.obstacleGroup = this.game.add.group();
            this.targetGroup = this.game.add.group();
            for (var i = 0; i < 2; i++) {
                this.cars[i] = new TwoCars.Car(this.game, 0, this.game.height - 40, i);
                this.carGroup.add(this.cars[i]);
            }
            this.game.input.onDown.add(this.moveCar, this);
            this.game.time.events.loop(this.obstacleDelay, function () {
                for (var i = 0; i < 2; i++) {
                    var position = _this.game.rnd.between(0, 1) + 2 * i;
                    if (_this.game.rnd.between(0, 1) == 1) {
                        var obstacle = new TwoCars.Obstacle(_this.game, _this.game.width * (position * 2 + 1) / 8, -20, position);
                        _this.game.add.existing(obstacle);
                        _this.obstacleGroup.add(obstacle);
                    }
                    else {
                        var target = new TwoCars.Target(_this.game, _this.game.width * (position * 2 + 1) / 8, -20, position);
                        _this.game.add.existing(target);
                        _this.targetGroup.add(target);
                    }
                }
            });
        };
        PlayGame.prototype.update = function () {
            var _this = this;
            this.game.physics.arcade.collide(this.carGroup, this.obstacleGroup, function () {
                _this.game.state.start('PlayGame');
            });
            this.game.physics.arcade.collide(this.carGroup, this.targetGroup, function (c, t) {
                t.destroy();
            });
        };
        PlayGame.prototype.moveCar = function (e) {
            var _this = this;
            var carToMove = Math.floor(e.position.x / (this.game.width / 2));
            if (this.cars[carToMove].canMove) {
                this.cars[carToMove].canMove = false;
                var steerTween = this.game.add.tween(this.cars[carToMove]).to({
                    angle: 20 - 40 * this.cars[carToMove].side
                }, this.carTurnSpeed / 2, Phaser.Easing.Linear.None, true);
                steerTween.onComplete.add(function () {
                    var steerTween = _this.game.add.tween(_this.cars[carToMove]).to({
                        angle: 0
                    }, _this.carTurnSpeed / 2, Phaser.Easing.Linear.None, true);
                });
                this.cars[carToMove].side = 1 - this.cars[carToMove].side;
                var moveTween = this.game.add.tween(this.cars[carToMove]).to({
                    x: this.cars[carToMove].positions[this.cars[carToMove].side]
                }, this.carTurnSpeed, Phaser.Easing.Linear.None, true);
                moveTween.onComplete.add(function () {
                    _this.cars[carToMove].canMove = true;
                });
            }
        };
        PlayGame.carColors = [0xff0000, 0x0000ff];
        PlayGame.obstacleSpeed = 120;
        return PlayGame;
    })(Phaser.State);
    TwoCars.PlayGame = PlayGame;
})(TwoCars || (TwoCars = {}));
var TwoCars;
(function (TwoCars) {
    var Target = (function (_super) {
        __extends(Target, _super);
        function Target(game, x, y, lane) {
            _super.call(this, game, x, y, 'target');
            this.lane = lane;
            this.anchor.setTo(0.5);
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.tint = TwoCars.PlayGame.carColors[Math.floor(lane / 2)];
        }
        Target.prototype.update = function () {
            this.body.velocity.y = TwoCars.PlayGame.obstacleSpeed;
            if (this.y > this.game.height - this.height / 2) {
                this.game.state.start('PlayGame');
            }
        };
        return Target;
    })(Phaser.Sprite);
    TwoCars.Target = Target;
})(TwoCars || (TwoCars = {}));
//# sourceMappingURL=TwoCars.js.map