var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TwentyFortyEightGame;
(function (TwentyFortyEightGame) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            console.log((new Date).toISOString() + ' : Entered Game constructor()');
            // Update the width (800) and height (600) accordingly.
            _super.call(this, Game.TILE_SIZE * 4, Game.TILE_SIZE * 4, Phaser.AUTO, 'content');
            // Add the game states.
            this.state.add('Boot', TwentyFortyEightGame.Boot);
            this.state.add('Preloader', TwentyFortyEightGame.Preloader);
            this.state.add('MainMenu', TwentyFortyEightGame.MainMenu);
            this.state.add('MainGame', TwentyFortyEightGame.MainGame);
            // Start the initial game state.
            this.state.start('Boot');
        }
        // Define static/constant variables here, as needed. Reference later by Game.SOME_VARIABLE.
        Game.TILE_SIZE = 100;
        return Game;
    })(Phaser.Game);
    TwentyFortyEightGame.Game = Game;
})(TwentyFortyEightGame || (TwentyFortyEightGame = {}));
window.onload = function () {
    var game = new TwentyFortyEightGame.Game();
};
var TwentyFortyEightGame;
(function (TwentyFortyEightGame) {
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(game, x, y) {
            _super.call(this, game, x, y, 'tile');
        }
        return Tile;
    })(Phaser.Sprite);
    TwentyFortyEightGame.Tile = Tile;
})(TwentyFortyEightGame || (TwentyFortyEightGame = {}));
var TwentyFortyEightGame;
(function (TwentyFortyEightGame) {
    var ExampleState = (function (_super) {
        __extends(ExampleState, _super);
        function ExampleState() {
            _super.apply(this, arguments);
        }
        ExampleState.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered ExampleState init()');
            // init can receive parameters.
        };
        ExampleState.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered ExampleState preload()');
            // Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
        };
        ExampleState.prototype.loadUpdate = function () {
            // Called while assets are being loaded.
        };
        ExampleState.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered ExampleState create()');
        };
        ExampleState.prototype.update = function () {
        };
        ExampleState.prototype.paused = function () {
            console.log((new Date).toISOString() + ' : Entered ExampleState paused()');
        };
        ExampleState.prototype.pauseUpdate = function () {
        };
        ExampleState.prototype.resumed = function () {
            console.log((new Date).toISOString() + ' : Entered ExampleState resumed()');
        };
        ExampleState.prototype.shutdown = function () {
            console.log((new Date).toISOString() + ' : Entered ExampleState shutdown()');
        };
        return ExampleState;
    })(Phaser.State);
    TwentyFortyEightGame.ExampleState = ExampleState;
})(TwentyFortyEightGame || (TwentyFortyEightGame = {}));
var TwentyFortyEightGame;
(function (TwentyFortyEightGame) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered Boot init()');
            // If you want to scale the game, you can set that here.
            // Uncomment to show all content in the view.
            //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // If we put our game in a div, we need to add the following as well, if you SHOW_ALL.
            //this.game.scale.windowConstraints.bottom = 'visual';
            // Uncomment to place our game in the center of the screen both horizontally and vertically.
            //this.scale.pageAlignHorizontally = true;
            //this.scale.pageAlignVertically = true;
        };
        Boot.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered Boot preload()');
            // If your preload state will display a progress bar, you should load the image here.
        };
        Boot.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Boot create()');
            // Disable multitouch. It's recommended by the creators to set this unless your game needs multitouch.
            this.input.maxPointers = 1;
            // If you want the game to continue running when the browser tab loses focus, uncomment the following.
            //this.stage.disableVisibilityChange = true;
            // At this point you could set device-specific settings.
            if (this.game.device.desktop) {
            }
            // If your game uses a physics system, you can start that here.
            //this.game.physics.startSystem(Phaser.Physics.ARCADE);
            // Load the next state, which will be preloading the assets for the game.
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    TwentyFortyEightGame.Boot = Boot;
})(TwentyFortyEightGame || (TwentyFortyEightGame = {}));
var TwentyFortyEightGame;
(function (TwentyFortyEightGame) {
    var MainGame = (function (_super) {
        __extends(MainGame, _super);
        function MainGame() {
            _super.apply(this, arguments);
            // Store the cell values.
            this.cells = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            this.colors = {
                2: 0xFFFFFF,
                4: 0xFFEEEE,
                8: 0xFFDDDD,
                16: 0xFFCCCC,
                32: 0xFFBBBB,
                64: 0xFFAAAA,
                128: 0xFF9999,
                256: 0xFF8888,
                512: 0xFF7777,
                1024: 0xFF6666,
                2048: 0xFF5555,
                4096: 0xFF4444,
                8192: 0xFF3333,
                16384: 0xFF2222,
                32768: 0xFF1111,
                65536: 0xFF0000
            };
            this.canMove = false;
        }
        MainGame.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered MainGame init()');
            // init can receive parameters.
        };
        MainGame.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered MainGame preload()');
            // Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
        };
        MainGame.prototype.loadUpdate = function () {
            // Called while assets are being loaded.
        };
        MainGame.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered MainGame create()');
            // Setup WASD bindings.
            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this.upKey.onDown.add(this.moveUp, this);
            this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this.downKey.onDown.add(this.moveDown, this);
            this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.leftKey.onDown.add(this.moveLeft, this);
            this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            this.rightKey.onDown.add(this.moveRight, this);
            this.tileSprites = this.game.add.group();
            // Add two new cells to the game initially.
            this.addTwo();
            this.addTwo();
        };
        MainGame.prototype.update = function () {
        };
        MainGame.prototype.paused = function () {
            console.log((new Date).toISOString() + ' : Entered MainGame paused()');
        };
        MainGame.prototype.pauseUpdate = function () {
        };
        MainGame.prototype.resumed = function () {
            console.log((new Date).toISOString() + ' : Entered MainGame resumed()');
        };
        MainGame.prototype.shutdown = function () {
            console.log((new Date).toISOString() + ' : Entered MainGame shutdown()');
        };
        MainGame.prototype.moveUp = function () {
            if (this.canMove) {
                // The player can move.
                this.canMove = false;
                var moved = false;
                this.tileSprites.sort("y", Phaser.Group.SORT_ASCENDING);
                this.tileSprites.forEach(function (item) {
                    var row = this.toRow(item.pos);
                    var col = this.toCol(item.pos);
                    if (row > 0) {
                        // Tile can move.
                        var remove = false;
                        // Loop through the rows.
                        for (var i = row - 1; i >= 0; i--) {
                            if (this.cells[i * 4 + col] != 0) {
                                if (this.cells[i * 4 + col] == this.cells[row * 4 + col]) {
                                    // Tile values are the same, and will be combined.
                                    remove = true;
                                    i--;
                                }
                                break;
                            }
                        }
                        if (row != i + 1) {
                            // We can move the tile.
                            moved = true;
                            this.moveTile(item, row * 4 + col, (i + 1) * 4 + col, remove);
                        }
                    }
                }, this);
                this.endMove(moved);
            }
        };
        MainGame.prototype.moveDown = function () {
            if (this.canMove) {
                this.canMove = false;
                var moved = false;
                this.tileSprites.sort("y", Phaser.Group.SORT_DESCENDING);
                this.tileSprites.forEach(function (item) {
                    var row = this.toRow(item.pos);
                    var col = this.toCol(item.pos);
                    if (row < 3) {
                        var remove = false;
                        for (var i = row + 1; i <= 3; i++) {
                            if (this.cells[i * 4 + col] != 0) {
                                if (this.cells[i * 4 + col] == this.cells[row * 4 + col]) {
                                    remove = true;
                                    i++;
                                }
                                break;
                            }
                        }
                        if (row != i - 1) {
                            moved = true;
                            this.moveTile(item, row * 4 + col, (i - 1) * 4 + col, remove);
                        }
                    }
                }, this);
                this.endMove(moved);
            }
        };
        MainGame.prototype.moveLeft = function () {
            if (this.canMove) {
                this.canMove = false;
                var moved = false;
                this.tileSprites.sort("x", Phaser.Group.SORT_ASCENDING);
                this.tileSprites.forEach(function (item) {
                    var row = this.toRow(item.pos);
                    var col = this.toCol(item.pos);
                    if (col > 0) {
                        var remove = false;
                        for (var i = col - 1; i >= 0; i--) {
                            if (this.cells[row * 4 + i] != 0) {
                                if (this.cells[row * 4 + i] == this.cells[row * 4 + col]) {
                                    remove = true;
                                    i--;
                                }
                                break;
                            }
                        }
                        if (col != i + 1) {
                            moved = true;
                            this.moveTile(item, row * 4 + col, row * 4 + i + 1, remove);
                        }
                    }
                }, this);
                this.endMove(moved);
            }
        };
        MainGame.prototype.moveRight = function () {
            if (this.canMove) {
                this.canMove = false;
                var moved = false;
                this.tileSprites.sort('x', Phaser.Group.SORT_DESCENDING);
                this.tileSprites.forEach(function (item) {
                    var row = this.toRow(item.pos);
                    var col = this.toCol(item.pos);
                    if (col < 3) {
                        var remove = false;
                        for (var i = col + 1; i <= 3; i++) {
                            if (this.cells[row * 4 + i] != 0) {
                                if (this.cells[row * 4 + i] == this.cells[row * 4 + col]) {
                                    remove = true;
                                    i++;
                                }
                                break;
                            }
                        }
                        if (col != i - 1) {
                            moved = true;
                            this.moveTile(item, row * 4 + col, row * 4 + i - 1, remove);
                        }
                    }
                }, this);
                this.endMove(moved);
            }
        };
        MainGame.prototype.moveTile = function (tile, from, to, remove) {
            this.cells[to] = this.cells[from];
            this.cells[from] = 0;
            tile.pos = to;
            var movement = this.game.add.tween(tile);
            movement.to({ x: TwentyFortyEightGame.Game.TILE_SIZE * this.toCol(to), y: TwentyFortyEightGame.Game.TILE_SIZE * this.toRow(to) }, 150);
            if (remove) {
                // If we're removing a tile, we need to double the tile we're moving it to.
                this.cells[to] *= 2;
                // Then destroy the tile we moved.
                movement.onComplete.add(function () {
                    tile.destroy();
                });
            }
            movement.start();
        };
        MainGame.prototype.endMove = function (moved) {
            if (moved) {
                this.addTwo();
            }
            else {
                this.canMove = true;
            }
        };
        MainGame.prototype.addTwo = function () {
            // Find an empty tile.
            var randomValue;
            do {
                randomValue = Math.floor(Math.random() * 16);
            } while (this.cells[randomValue] != 0);
            // Populate the cell with a value.
            this.cells[randomValue] = 2;
            // Create a new sprite to add to the game.
            var tile = new TwentyFortyEightGame.Tile(this.game, this.toCol(randomValue) * TwentyFortyEightGame.Game.TILE_SIZE, this.toRow(randomValue) * TwentyFortyEightGame.Game.TILE_SIZE);
            tile.pos = randomValue;
            // Tile should initially be transparent.
            tile.alpha = 0;
            // Text to display within the tile.
            var text = this.game.add.text(TwentyFortyEightGame.Game.TILE_SIZE / 2, TwentyFortyEightGame.Game.TILE_SIZE / 2, "2", { font: '16px Arial bold', align: 'center' });
            text.anchor.setTo(0.5);
            tile.addChild(text);
            this.tileSprites.add(tile);
            // Fade in the new tile.
            var fadeIn = this.game.add.tween(tile);
            fadeIn.to({ alpha: 1 }, 250);
            fadeIn.onComplete.add(function () {
                this.updateNumbers();
                this.canMove = true;
            }, this);
            fadeIn.start();
        };
        MainGame.prototype.toCol = function (cell) {
            return cell % 4;
        };
        MainGame.prototype.toRow = function (cell) {
            return Math.floor(cell / 4);
        };
        MainGame.prototype.updateNumbers = function () {
            this.tileSprites.forEach(function (sprite) {
                var value = this.cells[sprite.pos];
                sprite.getChildAt(0).text = value;
                sprite.tint = this.colors[value];
            }, this);
        };
        return MainGame;
    })(Phaser.State);
    TwentyFortyEightGame.MainGame = MainGame;
})(TwentyFortyEightGame || (TwentyFortyEightGame = {}));
var TwentyFortyEightGame;
(function (TwentyFortyEightGame) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered MainMenu create()');
            // Handle user input as needed.
            this.game.state.start('MainGame');
        };
        return MainMenu;
    })(Phaser.State);
    TwentyFortyEightGame.MainMenu = MainMenu;
})(TwentyFortyEightGame || (TwentyFortyEightGame = {}));
var TwentyFortyEightGame;
(function (TwentyFortyEightGame) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered Preloader preload()');
            // If your game uses a graphic while assets are loaded, you would create the sprite and then display it via the below.
            //this.load.setPreloadSprite(this.preloadSprite);
            // Load the actual assets. By default the path will be set to the assets directory.
            this.load.path = 'assets/';
            // Assets loaded here can include image and audio files, as well as sprite sheets and more.
            this.game.load.image('tile');
        };
        Preloader.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Preloader create()');
            // Once the assets have been preloaded you can move to the next state.
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    TwentyFortyEightGame.Preloader = Preloader;
})(TwentyFortyEightGame || (TwentyFortyEightGame = {}));
//# sourceMappingURL=app.js.map