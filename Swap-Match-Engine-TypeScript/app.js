var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () { return _this.span.innerHTML = new Date().toUTCString(); }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StarterProject;
(function (StarterProject) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            console.log((new Date).toISOString() + ' : Entered Game constructor()');
            // Update the width (800) and height (600) accordingly.
            _super.call(this, 300, 300, Phaser.AUTO, 'content');
            // Add the game states.
            this.state.add('Boot', StarterProject.Boot);
            this.state.add('Preloader', StarterProject.Preloader);
            this.state.add('MainMenu', StarterProject.MainMenu);
            this.state.add('Play', StarterProject.Play);
            // Start the initial game state.
            this.state.start('Boot');
        }
        // Define static/constant variables here, as needed. Reference later by Game.SOME_VARIABLE.
        // Size of a tile in pixels.
        Game.TILE_SIZE = 50;
        return Game;
    })(Phaser.Game);
    StarterProject.Game = Game;
})(StarterProject || (StarterProject = {}));
window.onload = function () {
    var game = new StarterProject.Game();
};
var StarterProject;
(function (StarterProject) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered Boot init()');
            // If you want to scale the game, you can set that here.
            // Uncomment to show all content in the view.
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // If we put our game in a div, we need to add the following as well, if you SHOW_ALL.
            this.game.scale.windowConstraints.bottom = 'visual';
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
    StarterProject.Boot = Boot;
})(StarterProject || (StarterProject = {}));
var StarterProject;
(function (StarterProject) {
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
    StarterProject.MainMenu = MainMenu;
})(StarterProject || (StarterProject = {}));
var StarterProject;
(function (StarterProject) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
            // Number of rows and columns in the grid.
            this.fieldSize = 6;
            // Number of different tile possibilities.
            this.tileTypes = 6;
            // Zoom ratio to highlight a selected tile.
            this.pickedZoom = 1.1;
            // Store whether the user is actively dragging.
            this.dragging = false;
            // Game's tiles.
            this.tileArray = [];
        }
        Play.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered Play init()');
            // init can receive parameters.
        };
        Play.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered Play preload()');
            // Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
        };
        Play.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Play create()');
            this.tileGroup = this.game.add.group();
            // Since we want the moving tile to display above all others, we add it to a group that's added to the game last.
            this.movingTileGroup = this.game.add.group();
            this.generateGameField();
            this.game.input.onDown.add(this.pickTile, this);
            this.game.input.onUp.add(this.releaseTile, this);
        };
        Play.prototype.update = function () {
            if (this.dragging) {
                this.distX = this.game.input.worldX - this.startX;
                this.distY = this.game.input.worldY - this.startY;
                this.tileArray[this.movingRow][this.movingColumn].x = this.movingColumn * StarterProject.Game.TILE_SIZE + StarterProject.Game.TILE_SIZE / 2 + this.distX;
                this.tileArray[this.movingRow][this.movingColumn].y = this.movingRow * StarterProject.Game.TILE_SIZE + StarterProject.Game.TILE_SIZE / 2 + this.distY;
            }
        };
        Play.prototype.generateGameField = function () {
            for (var i = 0; i < this.fieldSize; i++) {
                this.tileArray[i] = [];
                for (var j = 0; j < this.fieldSize; j++) {
                    var randomTile = this.game.rnd.integerInRange(0, this.tileTypes);
                    var theTile = this.game.add.sprite(j * StarterProject.Game.TILE_SIZE + StarterProject.Game.TILE_SIZE / 2, i * StarterProject.Game.TILE_SIZE + StarterProject.Game.TILE_SIZE / 2, "tiles");
                    theTile.frame = randomTile;
                    theTile.anchor.setTo(0.5);
                    this.tileArray[i][j] = theTile;
                    this.tileGroup.add(theTile);
                }
            }
        };
        Play.prototype.pickTile = function () {
            // They've started dragging.
            this.startX = this.game.input.worldX;
            this.startY = this.game.input.worldY;
            // Determine what row and column they started on.
            this.movingRow = Math.floor(this.startY / StarterProject.Game.TILE_SIZE);
            this.movingColumn = Math.floor(this.startX / StarterProject.Game.TILE_SIZE);
            this.movingTileGroup.add(this.tileArray[this.movingRow][this.movingColumn]);
            this.tileArray[this.movingRow][this.movingColumn].scale.setTo(1.1);
            this.dragging = true;
        };
        Play.prototype.releaseTile = function () {
            var _this = this;
            if (this.dragging) {
                // It doesn't need to be above the other tiles now, so put it back in with the others.
                this.tileGroup.add(this.tileArray[this.movingRow][this.movingColumn]);
                var landingRow = Math.floor(this.tileArray[this.movingRow][this.movingColumn].y / StarterProject.Game.TILE_SIZE);
                var landingColumn = Math.floor(this.tileArray[this.movingRow][this.movingColumn].x / StarterProject.Game.TILE_SIZE);
                this.tileArray[this.movingRow][this.movingColumn].scale.setTo(1);
                this.tileArray[this.movingRow][this.movingColumn].x = landingColumn * StarterProject.Game.TILE_SIZE + StarterProject.Game.TILE_SIZE / 2;
                this.tileArray[this.movingRow][this.movingColumn].y = landingRow * StarterProject.Game.TILE_SIZE + StarterProject.Game.TILE_SIZE / 2;
                if (this.movingRow !== landingRow || this.movingColumn !== landingColumn) {
                    // We actually moved, so display an animation.
                    this.movingTileGroup.add(this.tileArray[landingRow][landingColumn]);
                    var tileTween = this.game.add.tween(this.tileArray[landingRow][landingColumn]);
                    tileTween.to({
                        x: this.movingColumn * StarterProject.Game.TILE_SIZE + StarterProject.Game.TILE_SIZE / 2,
                        y: this.movingRow * StarterProject.Game.TILE_SIZE + StarterProject.Game.TILE_SIZE / 2
                    }, 800, Phaser.Easing.Cubic.Out, true);
                    tileTween.onComplete.add(function () {
                        _this.tileGroup.add(_this.tileArray[landingRow][landingColumn]);
                        var temp = _this.tileArray[landingRow][landingColumn];
                        _this.tileArray[landingRow][landingColumn] = _this.tileArray[_this.movingRow][_this.movingColumn];
                        _this.tileArray[_this.movingRow][_this.movingColumn] = temp;
                    }, this);
                }
                // Let the user drag again.
                this.dragging = false;
            }
        };
        return Play;
    })(Phaser.State);
    StarterProject.Play = Play;
})(StarterProject || (StarterProject = {}));
var StarterProject;
(function (StarterProject) {
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
            this.game.load.spritesheet("tiles", "tiles.png", StarterProject.Game.TILE_SIZE, StarterProject.Game.TILE_SIZE);
        };
        Preloader.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Preloader create()');
            // Once the assets have been preloaded you can move to the next state.
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    StarterProject.Preloader = Preloader;
})(StarterProject || (StarterProject = {}));
//# sourceMappingURL=app.js.map