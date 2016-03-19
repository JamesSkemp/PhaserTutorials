var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CandyCrushBejeweledClone;
(function (CandyCrushBejeweledClone) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // Define static/constant variables here, as needed. Reference later by Game.SOME_VARIABLE.
        //static SOME_VARIABLE: number = 10;
        function Game() {
            console.log((new Date).toISOString() + ' : Entered Game constructor()');
            // Update the width (800) and height (600) accordingly.
            _super.call(this, 800, 600, Phaser.AUTO, 'content');
            // Add the game states.
            this.state.add('Boot', CandyCrushBejeweledClone.Boot);
            this.state.add('Preloader', CandyCrushBejeweledClone.Preloader);
            this.state.add('MainMenu', CandyCrushBejeweledClone.MainMenu);
            this.state.add('Play', CandyCrushBejeweledClone.Play);
            // Start the initial game state.
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    CandyCrushBejeweledClone.Game = Game;
})(CandyCrushBejeweledClone || (CandyCrushBejeweledClone = {}));
window.onload = function () {
    var game = new CandyCrushBejeweledClone.Game();
};
var CandyCrushBejeweledClone;
(function (CandyCrushBejeweledClone) {
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
    CandyCrushBejeweledClone.ExampleState = ExampleState;
})(CandyCrushBejeweledClone || (CandyCrushBejeweledClone = {}));
var CandyCrushBejeweledClone;
(function (CandyCrushBejeweledClone) {
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
    CandyCrushBejeweledClone.Boot = Boot;
})(CandyCrushBejeweledClone || (CandyCrushBejeweledClone = {}));
var CandyCrushBejeweledClone;
(function (CandyCrushBejeweledClone) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered MainMenu create()');
            // Handle user input as needed.
            this.game.state.start('Play');
        };
        return MainMenu;
    })(Phaser.State);
    CandyCrushBejeweledClone.MainMenu = MainMenu;
})(CandyCrushBejeweledClone || (CandyCrushBejeweledClone = {}));
var CandyCrushBejeweledClone;
(function (CandyCrushBejeweledClone) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
            this.score = 0;
            this.activeTile1 = null;
            this.activeTile2 = null;
            this.canMove = false;
            this.tileWidth = 125;
            this.tileHeight = 100;
        }
        Play.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered Play init()');
            // init can receive parameters.
        };
        Play.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered Play preload()');
            // Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
        };
        Play.prototype.loadUpdate = function () {
            // Called while assets are being loaded.
        };
        Play.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Play create()');
            this.stage.backgroundColor = '#34495f';
            this.tileTypes = [
                'blue', 'green', 'red', 'yellow'
            ];
            // This isn't working, so hard-coding in the tile width/height.
            //var sampleTile = this.game.cache.getImage('blue');
            //console.log(sampleTile);
            //this.tileWidth = sampleTile.frame.width;
            //this.tileHeight = sampleTile.frame.height;
            // Will hold all tiles.
            this.tiles = this.game.add.group();
            this.tileGrid = [
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null],
                [null, null, null, null, null, null]
            ];
            var seed = Date.now();
            this.random = new Phaser.RandomDataGenerator([seed]);
            this.initTiles();
            this.createScore();
        };
        Play.prototype.update = function () {
            var _this = this;
            // See if the user is dragging a tile.
            if (this.activeTile1 && !this.activeTile2) {
                // Current input position.
                var hoverX = this.game.input.x;
                var hoverY = this.game.input.y;
                // Grid location.
                var hoverPosX = Math.floor(hoverX / this.tileWidth);
                var hoverPosY = Math.floor(hoverY / this.tileHeight);
                // Calculate starting and current grid change, if any.
                var difX = (hoverPosX - this.startPosX);
                var difY = (hoverPosY - this.startPosY);
                // Verify they're within the bounds of the game.
                if (!(hoverPosY > this.tileGrid[0].length - 1 || hoverPosY < 0)
                    && !(hoverPosX > this.tileGrid.length - 1 || hoverPosX < 0)) {
                    // See if a tile has been moved an entire width or height in a direction.
                    if ((Math.abs(difY) == 1 && difX == 0) || (Math.abs(difX) == 1 && difY == 0)) {
                        this.canMove = false;
                        this.activeTile2 = this.tileGrid[hoverPosX][hoverPosY];
                        this.swapTiles();
                        this.game.time.events.add(500, function () {
                            _this.checkMatch();
                        });
                    }
                }
            }
        };
        Play.prototype.paused = function () {
            console.log((new Date).toISOString() + ' : Entered Play paused()');
        };
        Play.prototype.pauseUpdate = function () {
        };
        Play.prototype.resumed = function () {
            console.log((new Date).toISOString() + ' : Entered Play resumed()');
        };
        Play.prototype.shutdown = function () {
            console.log((new Date).toISOString() + ' : Entered Play shutdown()');
        };
        Play.prototype.initTiles = function () {
            var _this = this;
            console.log((new Date).toISOString() + ' : Entered Play initTiles()');
            for (var column = 0; column < this.tileGrid.length; column++) {
                for (var row = 0; row < this.tileGrid.length; row++) {
                    var tile = this.addTile(column, row);
                    this.tileGrid[column][row] = tile;
                }
            }
            this.game.time.events.add(600, function () {
                _this.checkMatch();
            });
        };
        Play.prototype.addTile = function (x, y) {
            console.log((new Date).toISOString() + ' : Entered Play addTile()');
            var tileToAdd = this.tileTypes[this.random.integerInRange(0, this.tileTypes.length - 1)];
            var tile = this.tiles.create((x * this.tileWidth) + this.tileWidth / 2, 0, tileToAdd);
            this.game.add.tween(tile).to({ y: y * this.tileHeight + this.tileHeight / 2 }, 500, Phaser.Easing.Linear.None, true);
            tile.anchor.setTo(0.5);
            tile.inputEnabled = true;
            tile.events.onInputDown.add(this.tileDown, this);
            return tile;
        };
        Play.prototype.tileDown = function (tile, pointer) {
            if (this.canMove) {
                this.activeTile1 = tile;
                this.startPosX = (tile.x - this.tileWidth / 2) / this.tileWidth;
                this.startPosY = (tile.y - this.tileHeight / 2) / this.tileHeight;
            }
        };
        Play.prototype.swapTiles = function () {
            if (this.activeTile1 && this.activeTile2) {
                var tile1Pos = {
                    x: (this.activeTile1.x - this.tileWidth / 2) / this.tileWidth,
                    y: (this.activeTile1.y - this.tileHeight / 2) / this.tileHeight
                };
                var tile2Pos = {
                    x: (this.activeTile2.x - this.tileWidth / 2) / this.tileWidth,
                    y: (this.activeTile2.y - this.tileHeight / 2) / this.tileHeight
                };
                // Swap them in our grid.
                this.tileGrid[tile1Pos.x][tile1Pos.y] = this.activeTile2;
                this.tileGrid[tile2Pos.x][tile2Pos.y] = this.activeTile1;
                // Move the sprites.
                this.game.add.tween(this.activeTile1).to({ x: tile2Pos.x * this.tileWidth + (this.tileWidth / 2), y: tile2Pos.y * this.tileHeight + (this.tileHeight / 2) }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.activeTile2).to({ x: tile1Pos.x * this.tileWidth + (this.tileWidth / 2), y: tile1Pos.y * this.tileHeight + (this.tileHeight / 2) }, 200, Phaser.Easing.Linear.None, true);
                this.activeTile1 = this.tileGrid[tile1Pos.x][tile1Pos.y];
                this.activeTile2 = this.tileGrid[tile2Pos.x][tile2Pos.y];
            }
        };
        Play.prototype.checkMatch = function () {
            var _this = this;
            var matches = this.getMatches(this.tileGrid);
            if (matches.length > 0) {
                this.removeTileGroup(matches);
                this.resetTile();
                this.fillTile();
                this.game.time.events.add(500, function () {
                    _this.tileUp();
                });
                this.game.time.events.add(600, function () {
                    _this.checkMatch();
                });
            }
            else {
                // There are no matches, so put the tiles back where they were.
                this.swapTiles();
                this.game.time.events.add(500, function () {
                    _this.tileUp();
                    _this.canMove = true;
                });
            }
        };
        Play.prototype.getMatches = function (tileGrid) {
            var matches = [];
            var groups = [];
            //Check for horizontal matches
            for (var i = 0; i < tileGrid.length; i++) {
                var tempArr = tileGrid[i];
                groups = [];
                for (var j = 0; j < tempArr.length; j++) {
                    if (j < tempArr.length - 2)
                        if (tileGrid[i][j] && tileGrid[i][j + 1] && tileGrid[i][j + 2]) {
                            if (tileGrid[i][j].key == tileGrid[i][j + 1].key && tileGrid[i][j + 1].key == tileGrid[i][j + 2].key) {
                                if (groups.length > 0) {
                                    if (groups.indexOf(tileGrid[i][j]) == -1) {
                                        matches.push(groups);
                                        groups = [];
                                    }
                                }
                                if (groups.indexOf(tileGrid[i][j]) == -1) {
                                    groups.push(tileGrid[i][j]);
                                }
                                if (groups.indexOf(tileGrid[i][j + 1]) == -1) {
                                    groups.push(tileGrid[i][j + 1]);
                                }
                                if (groups.indexOf(tileGrid[i][j + 2]) == -1) {
                                    groups.push(tileGrid[i][j + 2]);
                                }
                            }
                        }
                }
                if (groups.length > 0)
                    matches.push(groups);
            }
            //Check for vertical matches
            for (j = 0; j < tileGrid.length; j++) {
                var tempArr = tileGrid[j];
                groups = [];
                for (i = 0; i < tempArr.length; i++) {
                    if (i < tempArr.length - 2)
                        if (tileGrid[i][j] && tileGrid[i + 1][j] && tileGrid[i + 2][j]) {
                            if (tileGrid[i][j].key == tileGrid[i + 1][j].key && tileGrid[i + 1][j].key == tileGrid[i + 2][j].key) {
                                if (groups.length > 0) {
                                    if (groups.indexOf(tileGrid[i][j]) == -1) {
                                        matches.push(groups);
                                        groups = [];
                                    }
                                }
                                if (groups.indexOf(tileGrid[i][j]) == -1) {
                                    groups.push(tileGrid[i][j]);
                                }
                                if (groups.indexOf(tileGrid[i + 1][j]) == -1) {
                                    groups.push(tileGrid[i + 1][j]);
                                }
                                if (groups.indexOf(tileGrid[i + 2][j]) == -1) {
                                    groups.push(tileGrid[i + 2][j]);
                                }
                            }
                        }
                }
                if (groups.length > 0)
                    matches.push(groups);
            }
            return matches;
        };
        Play.prototype.removeTileGroup = function (matches) {
            //Loop through all the matches and remove the associated tiles
            for (var i = 0; i < matches.length; i++) {
                var tempArr = matches[i];
                for (var j = 0; j < tempArr.length; j++) {
                    var tile = tempArr[j];
                    //Find where this tile lives in the theoretical grid
                    var tilePos = this.getTilePos(this.tileGrid, tile);
                    //Remove the tile from the screen
                    this.tiles.remove(tile);
                    // Add to the user's score.
                    this.incrementScore();
                    //Remove the tile from the theoretical grid
                    if (tilePos.x != -1 && tilePos.y != -1) {
                        this.tileGrid[tilePos.x][tilePos.y] = null;
                    }
                }
            }
        };
        Play.prototype.getTilePos = function (tileGrid, tile) {
            var pos = { x: -1, y: -1 };
            //Find the position of a specific tile in the grid
            for (var i = 0; i < tileGrid.length; i++) {
                for (var j = 0; j < tileGrid[i].length; j++) {
                    //There is a match at this position so return the grid coords
                    if (tile == tileGrid[i][j]) {
                        pos.x = i;
                        pos.y = j;
                        break;
                    }
                }
            }
            return pos;
        };
        Play.prototype.resetTile = function () {
            //Loop through each column starting from the left
            for (var i = 0; i < this.tileGrid.length; i++) {
                //Loop through each tile in column from bottom to top
                for (var j = this.tileGrid[i].length - 1; j > 0; j--) {
                    //If this space is blank, but the one above it is not, move the one above down
                    if (this.tileGrid[i][j] == null && this.tileGrid[i][j - 1] != null) {
                        //Move the tile above down one
                        var tempTile = this.tileGrid[i][j - 1];
                        this.tileGrid[i][j] = tempTile;
                        this.tileGrid[i][j - 1] = null;
                        this.game.add.tween(tempTile).to({ y: (this.tileHeight * j) + (this.tileHeight / 2) }, 200, Phaser.Easing.Linear.None, true);
                        //The positions have changed so start this process again from the bottom
                        //NOTE: This is not set to this.tileGrid[i].length - 1 because it will immediately be decremented as
                        //we are at the end of the loop.
                        j = this.tileGrid[i].length;
                    }
                }
            }
        };
        Play.prototype.fillTile = function () {
            //Check for blank spaces in the grid and add new tiles at that position
            for (var i = 0; i < this.tileGrid.length; i++) {
                for (var j = 0; j < this.tileGrid.length; j++) {
                    if (this.tileGrid[i][j] == null) {
                        //Found a blank spot so lets add animate a tile there
                        var tile = this.addTile(i, j);
                        //And also update our "theoretical" grid
                        this.tileGrid[i][j] = tile;
                    }
                }
            }
        };
        Play.prototype.tileUp = function () {
            this.activeTile1 = null;
            this.activeTile2 = null;
        };
        Play.prototype.createScore = function () {
            this.scoreLabel = this.game.add.text((Math.floor(this.tileGrid[0].length / 2) * this.tileWidth), this.tileGrid.length * this.tileHeight - this.tileHeight / 4, "0", { font: '50px Arial', fill: '#fff' });
            this.scoreLabel.anchor.setTo(0.5);
            this.scoreLabel.align = "center";
        };
        Play.prototype.incrementScore = function () {
            this.score += 10;
            this.scoreLabel.text = this.score.toString();
        };
        return Play;
    })(Phaser.State);
    CandyCrushBejeweledClone.Play = Play;
})(CandyCrushBejeweledClone || (CandyCrushBejeweledClone = {}));
var CandyCrushBejeweledClone;
(function (CandyCrushBejeweledClone) {
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
            this.load.image('blue', 'gemBlue.png');
            this.load.image('green', 'gemGreen.png');
            this.load.image('red', 'gemRed.png');
            this.load.image('yellow', 'gemYellow.png');
        };
        Preloader.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Preloader create()');
            // Once the assets have been preloaded you can move to the next state.
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    CandyCrushBejeweledClone.Preloader = Preloader;
})(CandyCrushBejeweledClone || (CandyCrushBejeweledClone = {}));
//# sourceMappingURL=app.js.map