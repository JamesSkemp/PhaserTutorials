var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RiseAboveGame = (function (_super) {
    __extends(RiseAboveGame, _super);
    function RiseAboveGame() {
        _super.call(this, 320, 480, Phaser.AUTO, 'content');
        this.state.add('Game', Game);
        this.state.start('Game');
    }
    return RiseAboveGame;
})(Phaser.Game);
var Game = (function (_super) {
    __extends(Game, _super);
    function Game() {
        _super.call(this);
        this.shipHorizontalSpeed = 400;
        this.shipMoveDelay = 500;
        this.barrierDelay = 2000;
        this.shipVerticalSpeed = 20000;
        this.shipInvisibilityTime = 1000;
    }
    Game.prototype.preload = function () {
        this.game.load.path = 'assets/';
        this.game.load.image('ship');
        this.game.load.image('barrier');
    };
    Game.prototype.create = function () {
        var _this = this;
        this.shipCanMove = true;
        this.shipPosition = 0;
        this.shipPositions = [40, this.game.width - 40];
        this.barrierGroup = this.game.add.group();
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.ship = this.game.add.sprite(this.shipPositions[this.shipPosition], this.game.height - 40, 'ship');
        this.ship.anchor.setTo(0.5);
        this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.body.allowRotation = false;
        this.ship.body.moves = false;
        this.game.input.onDown.add(this.moveShip, this);
        this.game.time.events.loop(this.barrierDelay, function () {
            var barrier = new Barrier(_this.game, _this.game.width * _this.game.rnd.between(0, 1), -20);
            _this.game.add.existing(barrier);
            _this.barrierGroup.add(barrier);
        });
        this.verticalTween = this.game.add.tween(this.ship).to({
            y: 0
        }, this.shipVerticalSpeed, Phaser.Easing.Linear.None, true);
    };
    Game.prototype.update = function () {
        var _this = this;
        if (this.ship.alpha == 1) {
            this.game.physics.arcade.collide(this.ship, this.barrierGroup, function () {
                _this.game.state.start('Game');
            });
        }
    };
    Game.prototype.moveShip = function () {
        var _this = this;
        if (this.shipCanMove) {
            this.lastClick = this.game.time.now;
            this.shipPosition = 1 - this.shipPosition;
            this.shipCanMove = false;
            var moveTween = this.game.add.tween(this.ship).to({
                x: this.shipPositions[this.shipPosition]
            }, this.shipHorizontalSpeed, Phaser.Easing.Linear.None, true);
            moveTween.onComplete.add(function () {
                _this.game.time.events.add(_this.shipMoveDelay, function () {
                    _this.shipCanMove = true;
                });
            });
        }
        else {
            if (this.game.time.now - this.lastClick < 200 && this.ship.alpha == 1) {
                this.ship.alpha = 0.5;
                this.verticalTween.stop();
                this.verticalTween = this.game.add.tween(this.ship).to({
                    y: this.game.height - 40
                }, 100, Phaser.Easing.Cubic.Out, true);
                this.verticalTween.onComplete.add(function () {
                    _this.verticalTween = _this.game.add.tween(_this.ship).to({
                        y: 0
                    }, _this.shipVerticalSpeed, Phaser.Easing.Linear.None, true);
                    var alphaTween = _this.game.add.tween(_this.ship).to({
                        alpha: 1
                    }, _this.shipInvisibilityTime, Phaser.Easing.Linear.None, true);
                });
            }
        }
    };
    return Game;
})(Phaser.State);
var Barrier = (function (_super) {
    __extends(Barrier, _super);
    function Barrier(game, x, y) {
        _super.call(this, game, x, y, "barrier");
        this.barrierSpeed = 120;
        game.physics.enable(this, Phaser.Physics.ARCADE);
        this.anchor.set(0.5);
    }
    Barrier.prototype.update = function () {
        this.body.velocity.y = this.barrierSpeed;
        if (this.y > this.game.height) {
            this.destroy();
        }
    };
    return Barrier;
})(Phaser.Sprite);
window.onload = function () {
    var game = new RiseAboveGame();
};
//# sourceMappingURL=game.js.map