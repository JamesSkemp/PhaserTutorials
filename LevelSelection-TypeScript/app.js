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
            this.state.add('ScrollableMap', LevelSelectProject.ScrollableMap);
            this.state.add('CharacterSelection', LevelSelectProject.CharacterSelection);
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
    LevelSelectProject.Boot = Boot;
})(LevelSelectProject || (LevelSelectProject = {}));
var LevelSelectProject;
(function (LevelSelectProject) {
    var CharacterSelection = (function (_super) {
        __extends(CharacterSelection, _super);
        function CharacterSelection() {
            _super.apply(this, arguments);
            this.speedMult = 0.7;
            this.friction = 0.99;
            this.colors = [
                0xac81bd, 0xff5050, 0xdab5ff, 0xb5ffda, 0xfffdd0, 0xcc0000, 0x54748b, 0x4b0082, 0x80ab2f, 0xff784e, 0xe500db, 0x223c4a, 0x223c4a, 0xf1290e, 0x648080, 0xbbc1c4, 0x6f98a2, 0x71717e
            ];
        }
        CharacterSelection.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered CharacterSelection init()');
            // init can receive parameters.
        };
        CharacterSelection.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered CharacterSelection preload()');
            // Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
        };
        CharacterSelection.prototype.loadUpdate = function () {
            // Called while assets are being loaded.
        };
        CharacterSelection.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered CharacterSelection create()');
            this.game.stage.backgroundColor = "#004";
            this.game.add.text(this.game.width / 2, 50, "Select your fish", { font: '18px Arial', fill: '#fff' }).anchor.setTo(0.5);
            this.scrollingMap = this.game.add.tileSprite(0, 0, this.game.width / 2 + this.colors.length * 90 + 60, this.game.height, 'transp');
            this.scrollingMap.inputEnabled = true;
            this.scrollingMap.input.enableDrag(false);
            this.scrollingMap.input.allowVerticalDrag = false;
            this.scrollingMap.input.boundsRect = new Phaser.Rectangle(this.game.width - this.scrollingMap.width, this.game.height - this.scrollingMap.height, this.scrollingMap.width * 2 - this.game.width, this.scrollingMap.height * 2 - this.game.height);
            this.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
            this.isBeingDragged = false;
            this.movingSpeed = 0;
            for (var i = 0; i < this.colors.length; i++) {
                var fish = this.game.add.image(this.game.width / 2 + i * 90, this.game.height / 2, 'fish');
                fish.anchor.setTo(0.5);
                fish.tint = this.colors[i];
                this.scrollingMap.addChild(fish);
            }
            this.scrollingMap.events.onDragStart.add(function () {
                this.isBeingDragged = true;
                this.movingSpeed = 0;
            }, this);
            this.scrollingMap.events.onDragStop.add(function () {
                this.isBeingDragged = false;
            }, this);
        };
        CharacterSelection.prototype.update = function () {
            var zoomed = false;
            for (var i = 0; i < this.scrollingMap.children.length; i++) {
                if (Math.abs(this.scrollingMap.children[i].worldPosition.x - this.game.width / 2) < 46 && !zoomed) {
                    this.scrollingMap.getChildAt(i).scale.set(1.5, 1.5);
                    zoomed = true;
                }
                else {
                    this.scrollingMap.getChildAt(i).scale.set(1, 1);
                }
            }
            if (this.isBeingDragged) {
                this.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
            }
            else {
                if (this.movingSpeed > 1) {
                    this.scrollingMap.x += this.movingSpeed * Math.cos(this.movingAngle);
                    if (this.scrollingMap.x < this.game.width - this.scrollingMap.width) {
                        this.scrollingMap.x = this.game.width - this.scrollingMap.width;
                        this.movingSpeed *= 0.5;
                        this.movingAngle += Math.PI;
                    }
                    if (this.scrollingMap.x > 0) {
                        this.scrollingMap.x = 0;
                        this.movingSpeed *= 0.5;
                        this.movingAngle += Math.PI;
                    }
                    this.movingSpeed *= this.friction;
                    this.savedPosition = new Phaser.Point(this.scrollingMap.x, this.scrollingMap.y);
                }
                else {
                    var distance = this.savedPosition.distance(this.scrollingMap.position);
                    var angle = this.savedPosition.angle(this.scrollingMap.position);
                    if (distance > 4) {
                        this.movingSpeed = distance;
                        this.movingAngle = angle;
                    }
                }
            }
        };
        CharacterSelection.prototype.paused = function () {
            console.log((new Date).toISOString() + ' : Entered CharacterSelection paused()');
        };
        CharacterSelection.prototype.pauseUpdate = function () {
        };
        CharacterSelection.prototype.resumed = function () {
            console.log((new Date).toISOString() + ' : Entered CharacterSelection resumed()');
        };
        CharacterSelection.prototype.shutdown = function () {
            console.log((new Date).toISOString() + ' : Entered CharacterSelection shutdown()');
        };
        return CharacterSelection;
    })(Phaser.State);
    LevelSelectProject.CharacterSelection = CharacterSelection;
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
            var link1 = this.game.add.text(0, 0, 'Option 1', { fill: '#fff' });
            link1.inputEnabled = true;
            link1.events.onInputDown.add(function () { this.game.state.start('Option1'); }, this);
            var link2 = this.game.add.text(0, 50, 'Scrollable Map', { fill: '#fff' });
            link2.inputEnabled = true;
            link2.events.onInputDown.add(function () { this.game.state.start('ScrollableMap'); }, this);
            var link3 = this.game.add.text(0, 100, 'Character Selection', { fill: '#fff' });
            link3.inputEnabled = true;
            link3.events.onInputDown.add(function () { this.game.state.start('CharacterSelection'); }, this);
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
            // Assets for character selection example.
            this.load.image('fish');
            this.load.image('transp');
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
var LevelSelectProject;
(function (LevelSelectProject) {
    var ScrollableMap = (function (_super) {
        __extends(ScrollableMap, _super);
        function ScrollableMap() {
            _super.apply(this, arguments);
            // Map scrolling speed.
            this.mapSpeed = 1;
        }
        ScrollableMap.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered ScrollableMap init()');
            // init can receive parameters.
        };
        ScrollableMap.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered ScrollableMap preload()');
            // Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
            this.game.load.image('map');
            this.game.load.image('town');
        };
        ScrollableMap.prototype.loadUpdate = function () {
            // Called while assets are being loaded.
        };
        ScrollableMap.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered ScrollableMap create()');
            this.mapGroup = this.game.add.group();
            this.map = this.game.add.image(0, 0, 'map');
            this.mapGroup.add(this.map);
            // Randomly place ten towns on the map.
            for (var i = 0; i < 10; i++) {
                var town = this.game.add.image(this.game.rnd.between(50, this.map.width - 50), this.game.rnd.between(50, this.map.height - 50), 'town');
                town.anchor.setTo(0.5);
                town.inputEnabled = true;
                town.events.onInputDown.add(this.selectTown, this);
                town.events.onInputUp.add(this.confirmTown, this);
                this.mapGroup.add(town);
            }
            this.mapGroup.x = (this.game.width - this.map.width) / 2;
            this.mapGroup.y = (this.game.height - this.map.height) / 2;
            this.game.input.onDown.add(this.fingerOnMap, this);
        };
        ScrollableMap.prototype.update = function () {
        };
        ScrollableMap.prototype.paused = function () {
            console.log((new Date).toISOString() + ' : Entered ScrollableMap paused()');
        };
        ScrollableMap.prototype.pauseUpdate = function () {
        };
        ScrollableMap.prototype.resumed = function () {
            console.log((new Date).toISOString() + ' : Entered ScrollableMap resumed()');
        };
        ScrollableMap.prototype.shutdown = function () {
            console.log((new Date).toISOString() + ' : Entered ScrollableMap shutdown()');
        };
        ScrollableMap.prototype.fingerOnMap = function () {
            this.startX = this.game.input.worldX;
            this.startY = this.game.input.worldY;
            this.mapX = this.mapGroup.x;
            this.mapY = this.mapGroup.y;
            this.game.input.onDown.remove(this.fingerOnMap);
            this.game.input.onUp.add(this.stopMap, this);
            this.game.input.addMoveCallback(this.dragMap, this);
        };
        ScrollableMap.prototype.selectTown = function (sprite, pointer) {
            this.candidateTown = sprite;
        };
        ScrollableMap.prototype.confirmTown = function (sprite, pointer) {
            if (this.candidateTown == sprite) {
                alert('Town selected');
            }
        };
        ScrollableMap.prototype.dragMap = function () {
            var currentX = this.game.input.worldX;
            var currentY = this.game.input.worldY;
            var deltaX = this.startX - currentX;
            var deltaY = this.startY - currentY;
            // If they move off the town far enough then they didn't want to select it.
            if (deltaX * deltaX + deltaY * deltaY > 25) {
                this.candidateTown = null;
            }
            this.mapGroup.x = this.mapX - deltaX * this.mapSpeed;
            this.mapGroup.y = this.mapY - deltaY * this.mapSpeed;
            // Make sure that the map stays in the display.
            if (this.mapGroup.x < -this.map.width + this.game.width) {
                this.mapGroup.x = -this.map.width + this.game.width;
            }
            if (this.mapGroup.x > 0) {
                this.mapGroup.x = 0;
            }
            if (this.mapGroup.y < -this.map.height + this.game.height) {
                this.mapGroup.y = -this.map.height + this.game.height;
            }
            if (this.mapGroup.y > 0) {
                this.mapGroup.y = 0;
            }
        };
        ScrollableMap.prototype.stopMap = function () {
            this.game.input.onDown.add(this.fingerOnMap);
            this.game.input.onUp.remove(this.stopMap);
            this.game.input.deleteMoveCallback(this.dragMap, this);
        };
        return ScrollableMap;
    })(Phaser.State);
    LevelSelectProject.ScrollableMap = ScrollableMap;
})(LevelSelectProject || (LevelSelectProject = {}));
//# sourceMappingURL=app.js.map