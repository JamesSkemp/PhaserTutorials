var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LevelSelectProject;
(function (LevelSelectProject) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            console.log((new Date).toISOString() + ' : Entered Game constructor()');
            // Update the width (800) and height (600) accordingly.
            _super.call(this, 320, 480, Phaser.AUTO, 'content');
            // Add the game states.
            this.state.add('Boot', LevelSelectProject.Boot);
            this.state.add('Preloader', LevelSelectProject.Preloader);
            this.state.add('MainMenu', LevelSelectProject.MainMenu);
            this.state.add('Option1', LevelSelectProject.Option1);
            this.state.add('Option1Game', LevelSelectProject.Option1Game);
            // Start the initial game state.
            this.state.start('Boot');
        }
        // Define static/constant variables here, as needed. Reference later by Game.SOME_VARIABLE.
        //static SOME_VARIABLE: number = 10;
        // Array with finished levels and stars collected.
        // 0 = playable yet unfinished level
        // 1, 2, 3 = level finished with 1, 2, 3 stars
        // 4 = locked
        Game.STARS_ARRAY = [
            0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
            4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
            4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4
        ];
        return Game;
    })(Phaser.Game);
    LevelSelectProject.Game = Game;
})(LevelSelectProject || (LevelSelectProject = {}));
window.onload = function () {
    var game = new LevelSelectProject.Game();
};
var LevelSelectProject;
(function (LevelSelectProject) {
    var LevelButton = (function (_super) {
        __extends(LevelButton, _super);
        function LevelButton(game, x, y, key, callback, callbackContext) {
            _super.call(this, game, x, y, key, callback, callbackContext);
        }
        return LevelButton;
    })(Phaser.Button);
    LevelSelectProject.LevelButton = LevelButton;
})(LevelSelectProject || (LevelSelectProject = {}));
var LevelSelectProject;
(function (LevelSelectProject) {
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
    LevelSelectProject.ExampleState = ExampleState;
})(LevelSelectProject || (LevelSelectProject = {}));
var LevelSelectProject;
(function (LevelSelectProject) {
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
    LevelSelectProject.Boot = Boot;
})(LevelSelectProject || (LevelSelectProject = {}));
var LevelSelectProject;
(function (LevelSelectProject) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered MainMenu create()');
            // Handle user input as needed.
            this.game.state.start('Option1');
        };
        return MainMenu;
    })(Phaser.State);
    LevelSelectProject.MainMenu = MainMenu;
})(LevelSelectProject || (LevelSelectProject = {}));
var LevelSelectProject;
(function (LevelSelectProject) {
    var Option1 = (function (_super) {
        __extends(Option1, _super);
        function Option1() {
            _super.apply(this, arguments);
            // Number of thumbnail rows.
            this.thumbRows = 5;
            // Number of thumbnail cololumns.
            this.thumbCols = 4;
            // Width of a thumbnail, in pixels.
            this.thumbWidth = 64;
            // Height of a thumbnail, in pixels.
            this.thumbHeight = 64;
            // Space between thumbnails, in pixels.
            this.thumbSpacing = 8;
            // Number of pages to show all levels.
            this.pages = LevelSelectProject.Game.STARS_ARRAY.length / (this.thumbRows * this.thumbCols);
            // Current page.
            this.currentPage = 0;
        }
        Option1.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered Option1 init()');
            // init can receive parameters.
            // Uncomment to place our game in the center of the screen both horizontally and vertically.
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        };
        Option1.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered Option1 preload()');
            // Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
        };
        Option1.prototype.loadUpdate = function () {
            // Called while assets are being loaded.
        };
        Option1.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Option1 create()');
            // Setup both arrows.
            this.leftArrow = this.game.add.button(50, 420, 'level_arrows', this.arrowClicked, this);
            this.leftArrow.anchor.setTo(0.5);
            this.leftArrow.frame = 0;
            this.leftArrow.alpha = 0.3;
            this.rightArrow = this.game.add.button(270, 420, 'level_arrows', this.arrowClicked, this);
            this.rightArrow.anchor.setTo(0.5);
            this.rightArrow.frame = 1;
            if (this.pages == 1) {
                this.rightArrow.alpha = 0.3;
            }
            this.levelThumbsGroup = this.game.add.group();
            var levelLength = this.thumbWidth * this.thumbCols + this.thumbSpacing * (this.thumbCols - 1);
            var levelHeight = this.thumbWidth * this.thumbRows + this.thumbSpacing * (this.thumbRows - 1);
            // Setup each page.
            for (var p = 0; p < this.pages; p++) {
                var offsetX = (this.game.width - levelLength) / 2 + this.game.width * p;
                var offsetY = 20;
                // Setup each row on the page.
                for (var i = 0; i < this.thumbRows; i++) {
                    // Setup each column in the row.
                    for (var j = 0; j < this.thumbCols; j++) {
                        var levelNumber = i * this.thumbCols + j + p * (this.thumbRows * this.thumbCols);
                        var levelThumb = new LevelSelectProject.LevelButton(this.game, offsetX + j * (this.thumbWidth + this.thumbSpacing), offsetY + i * (this.thumbHeight + this.thumbSpacing), 'levels', this.thumbClicked, this);
                        levelThumb.frame = LevelSelectProject.Game.STARS_ARRAY[levelNumber];
                        levelThumb.levelNumber = levelNumber + 1;
                        this.levelThumbsGroup.add(levelThumb);
                        // Display the level number if unlocked.
                        if (LevelSelectProject.Game.STARS_ARRAY[levelNumber] < 4) {
                            var style = {
                                font: '18px Arial',
                                fill: '#fff'
                            };
                            var levelText = this.game.add.text(levelThumb.x + 5, levelThumb.y + 5, (levelNumber + 1).toString(), style);
                            levelText.setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 1);
                            this.levelThumbsGroup.add(levelText);
                        }
                    }
                }
            }
        };
        Option1.prototype.update = function () {
        };
        Option1.prototype.paused = function () {
            console.log((new Date).toISOString() + ' : Entered Option1 paused()');
        };
        Option1.prototype.pauseUpdate = function () {
        };
        Option1.prototype.resumed = function () {
            console.log((new Date).toISOString() + ' : Entered Option1 resumed()');
        };
        Option1.prototype.shutdown = function () {
            console.log((new Date).toISOString() + ' : Entered Option1 shutdown()');
        };
        Option1.prototype.arrowClicked = function (button) {
            if (button.frame == 0 && this.currentPage > 0) {
                // Pressed the left arrow, and we're not on the first page.
                this.rightArrow.alpha = 1;
                this.currentPage--;
                if (this.currentPage == 0) {
                    // Fade the left arrow slightly if now on the first page.
                    button.alpha = 0.3;
                }
                var buttonsTween = this.game.add.tween(this.levelThumbsGroup);
                buttonsTween.to({
                    x: this.currentPage * this.game.width * -1
                }, 400, Phaser.Easing.Cubic.In);
                buttonsTween.start();
            }
            if (button.frame == 1 && this.currentPage < this.pages - 1) {
                // Pressed the right arrow, and we're not on the last page.
                this.leftArrow.alpha = 1;
                this.currentPage++;
                if (this.currentPage == this.pages - 1) {
                    // Fade the right arrow slightly if now on the last page.
                    button.alpha = 0.3;
                }
                var buttonsTween = this.game.add.tween(this.levelThumbsGroup);
                buttonsTween.to({
                    x: this.currentPage * this.game.width * -1
                }, 400, Phaser.Easing.Cubic.In);
                buttonsTween.start();
            }
        };
        Option1.prototype.thumbClicked = function (button) {
            if (button.frame < 4) {
                // The level is unlocked, and can be played.
                this.game.state.start('Option1Game', true, false, button.levelNumber);
            }
            else {
                // The level is locked.
                var buttonTween = this.game.add.tween(button);
                buttonTween.to({ x: button.x + this.thumbWidth / 15 }, 20, Phaser.Easing.Cubic.Out);
                buttonTween.to({ x: button.x - this.thumbWidth / 15 }, 20, Phaser.Easing.Cubic.Out);
                buttonTween.to({ x: button.x + this.thumbWidth / 15 }, 20, Phaser.Easing.Cubic.Out);
                buttonTween.to({ x: button.x - this.thumbWidth / 15 }, 20, Phaser.Easing.Cubic.Out);
                buttonTween.to({ x: button.x }, 20, Phaser.Easing.Cubic.Out);
                buttonTween.start();
            }
        };
        return Option1;
    })(Phaser.State);
    LevelSelectProject.Option1 = Option1;
})(LevelSelectProject || (LevelSelectProject = {}));
var LevelSelectProject;
(function (LevelSelectProject) {
    var Option1Game = (function (_super) {
        __extends(Option1Game, _super);
        function Option1Game() {
            _super.apply(this, arguments);
        }
        Option1Game.prototype.init = function (levelNumber) {
            console.log((new Date).toISOString() + ' : Entered Option1Game init()');
            // init can receive parameters.
            this.level = levelNumber;
        };
        Option1Game.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered Option1Game preload()');
            // Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
        };
        Option1Game.prototype.loadUpdate = function () {
            // Called while assets are being loaded.
        };
        Option1Game.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Option1Game create()');
            var style = {
                font: '32px Arial',
                fill: '#fff'
            };
            var levelTitle = this.game.add.text(0, 0, 'Playing Level ' + this.level, style);
            levelTitle.align = 'center';
            levelTitle.x = (this.game.width - levelTitle.width) / 2;
            for (var i = 0; i <= 3; i++) {
                var gameThumb = this.game.add.button(this.game.width / 2, 90 * (i + 1), 'game', this.levelFinished, this);
                gameThumb.anchor.setTo(0.5);
                gameThumb.frame = i;
            }
        };
        Option1Game.prototype.update = function () {
        };
        Option1Game.prototype.paused = function () {
            console.log((new Date).toISOString() + ' : Entered Option1Game paused()');
        };
        Option1Game.prototype.pauseUpdate = function () {
        };
        Option1Game.prototype.resumed = function () {
            console.log((new Date).toISOString() + ' : Entered Option1Game resumed()');
        };
        Option1Game.prototype.shutdown = function () {
            console.log((new Date).toISOString() + ' : Entered Option1Game shutdown()');
        };
        Option1Game.prototype.levelFinished = function (button) {
            if (LevelSelectProject.Game.STARS_ARRAY[this.level - 1] < button.frame) {
                // If the score was improved, update the score stored.
                LevelSelectProject.Game.STARS_ARRAY[this.level - 1] = button.frame;
            }
            if (button.frame > 0 && LevelSelectProject.Game.STARS_ARRAY[this.level] == 4 && this.level < LevelSelectProject.Game.STARS_ARRAY.length) {
                // Unlock the next level if they got at least one star on the level.
                LevelSelectProject.Game.STARS_ARRAY[this.level] = 0;
            }
            // Go back to the main level select screen.
            this.game.state.start('Option1');
        };
        return Option1Game;
    })(Phaser.State);
    LevelSelectProject.Option1Game = Option1Game;
})(LevelSelectProject || (LevelSelectProject = {}));
var LevelSelectProject;
(function (LevelSelectProject) {
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
            this.load.spritesheet('level_arrows', 'level_arrows.png', 48, 48);
            this.load.spritesheet('levels', 'levels.png', 64, 64);
            this.load.spritesheet('game', 'game.png', 200, 80);
        };
        Preloader.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Preloader create()');
            // Once the assets have been preloaded you can move to the next state.
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    LevelSelectProject.Preloader = Preloader;
})(LevelSelectProject || (LevelSelectProject = {}));
//# sourceMappingURL=app.js.map