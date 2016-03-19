var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Concentration;
(function (Concentration) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // Define static/constant variables here, as needed. Reference later by Game.SOME_VARIABLE.
        //static SOME_VARIABLE: number = 10;
        function Game() {
            console.log((new Date).toISOString() + ' : Entered Game constructor()');
            // Update the width (800) and height (600) accordingly.
            _super.call(this, 640, 960, Phaser.AUTO, 'content');
            // Add the game states.
            this.state.add('Boot', Concentration.Boot);
            this.state.add('Preloader', Concentration.Preloader);
            this.state.add('MainMenu', Concentration.MainMenu);
            this.state.add('Play', Concentration.Play);
            // Start the initial game state.
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Concentration.Game = Game;
})(Concentration || (Concentration = {}));
window.onload = function () {
    var game = new Concentration.Game();
};
var Concentration;
(function (Concentration) {
    var Tile = (function (_super) {
        __extends(Tile, _super);
        function Tile(game, x, y, image, frame) {
            _super.call(this, game);
            this.animal = "";
            this.hidden = true;
            this.onTap = new Phaser.Signal();
            this.x = x;
            this.y = y;
            this.front = this.create(0, 0, image, frame);
            this.front.anchor.setTo(0.5);
            this.front.scale.setTo(0, 1);
            this.back = this.create(0, 0, image, 'blind.png');
            this.back.anchor.setTo(0.5);
            this.back.inputEnabled = true;
            this.back.events.onInputDown.add(this.dispatchStateChange, this);
        }
        Tile.prototype.hide = function () {
            this.hidden = true;
            var t1 = this.game.add.tween(this.back.scale).to({ x: 1 }, 100, Phaser.Easing.Linear.None);
            var t2 = this.game.add.tween(this.front.scale).to({ x: 0 }, 100, Phaser.Easing.Linear.None);
            t2.chain(t1);
            t2.start();
        };
        Tile.prototype.reveal = function () {
            this.hidden = false;
            var t1 = this.game.add.tween(this.back.scale).to({ x: 0 }, 100, Phaser.Easing.Linear.None);
            var t2 = this.game.add.tween(this.front.scale).to({ x: 1 }, 100, Phaser.Easing.Linear.None);
            t1.chain(t2);
            t1.start();
        };
        Tile.prototype.dispatchStateChange = function () {
            this.onTap.dispatch(this);
        };
        return Tile;
    })(Phaser.Group);
    Concentration.Tile = Tile;
})(Concentration || (Concentration = {}));
var Concentration;
(function (Concentration) {
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
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
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
    Concentration.Boot = Boot;
})(Concentration || (Concentration = {}));
var Concentration;
(function (Concentration) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered MainMenu create()');
            this.bg = this.game.add.sprite(0, 0, 'bg');
            // Handle user input as needed.
            this.playButton = this.add.button(this.game.width / 2, this.game.height / 2, 'playButton', this.startGame, this);
            this.playButton.anchor.setTo(0.5);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Play');
        };
        return MainMenu;
    })(Phaser.State);
    Concentration.MainMenu = MainMenu;
})(Concentration || (Concentration = {}));
var Concentration;
(function (Concentration) {
    var Play = (function (_super) {
        __extends(Play, _super);
        function Play() {
            _super.apply(this, arguments);
            this.previousTile = null;
            this.busy = false;
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
            this.bg = this.game.add.sprite(0, 0, 'bg');
            this.previousTile = null;
            this.tiles = this.add.group();
            var animals = ["elephant", "giraffe", "hippo", "monkey", "panda", "parrot", "pig", "rabbit", "snake", "penguin"];
            // Double the animals in the array.
            animals = animals.concat(animals);
            var tileSize = 128;
            var cols = 5;
            for (var i = 0; i < 20; i++) {
                var xx = (i % cols) * tileSize;
                var yy = Math.floor(i / cols) * tileSize;
                var randomName = Phaser.ArrayUtils.removeRandomItem(animals);
                var tile = new Concentration.Tile(this.game, xx, yy, "animals", randomName + ".png");
                tile.animal = randomName;
                tile.onTap.add(this.onTileTap, this);
                this.tiles.add(tile);
            }
            this.tiles.x = this.game.width / 2 - this.tiles.width / 2 + (tileSize / 2);
            this.tiles.y = this.game.height / 2 - this.tiles.height / 2 + (tileSize / 2);
        };
        Play.prototype.onTileTap = function (tile) {
            if (this.busy) {
                return;
            }
            this.busy = true;
            tile.reveal();
            if (this.previousTile === null) {
                this.previousTile = tile;
                this.busy = false;
                return;
            }
            var t = this.game.time.create(true);
            t.add(1000, function () {
                if (this.previousTile.animal !== tile.animal) {
                    console.log("No match: ", this.previousTile.animal, tile.animal);
                    this.previousTile.hide();
                    tile.hide();
                    this.previousTile = null;
                }
                else if (this.previousTile.animal === tile.animal) {
                    console.log("Match: ", this.previousTile.animal, tile.animal);
                    this.tiles.removeChild(this.previousTile);
                    this.tiles.removeChild(tile);
                    this.previousTile = null;
                    if (this.tiles.children.length === 0) {
                        this.quitGame();
                    }
                }
                this.busy = false;
            }, this);
            t.start();
        };
        Play.prototype.quitGame = function (pointer) {
            this.game.state.start('MainMenu');
        };
        return Play;
    })(Phaser.State);
    Concentration.Play = Play;
})(Concentration || (Concentration = {}));
var Concentration;
(function (Concentration) {
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
            this.load.image('bg');
            this.load.image('playButton', 'play.png');
            this.load.atlas('animals', 'animals.png', 'animals.json');
        };
        Preloader.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Preloader create()');
            // Once the assets have been preloaded you can move to the next state.
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Concentration.Preloader = Preloader;
})(Concentration || (Concentration = {}));
//# sourceMappingURL=app.js.map