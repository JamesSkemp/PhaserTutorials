var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HiLoProject;
(function (HiLoProject) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // Define static/constant variables here, as needed. Reference later by Game.SOME_VARIABLE.
        //static SOME_VARIABLE: number = 10;
        function Game() {
            console.log((new Date).toISOString() + ' : Entered Game constructor()');
            // Update the width (800) and height (600) accordingly.
            _super.call(this, 320, 480, Phaser.AUTO, 'content');
            // Add the game states.
            this.state.add('Boot', HiLoProject.Boot);
            this.state.add('Preloader', HiLoProject.Preloader);
            this.state.add('MainMenu', HiLoProject.MainMenu);
            this.state.add('TheGame', HiLoProject.TheGame);
            this.state.add('GameOver', HiLoProject.GameOver);
            // Start the initial game state.
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    HiLoProject.Game = Game;
})(HiLoProject || (HiLoProject = {}));
window.onload = function () {
    var game = new HiLoProject.Game();
};
var HiLoProject;
(function (HiLoProject) {
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
    HiLoProject.ExampleState = ExampleState;
})(HiLoProject || (HiLoProject = {}));
var HiLoProject;
(function (HiLoProject) {
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
            //this.scale.pageAlignVertically = true;
        };
        Boot.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered Boot preload()');
            // If your preload state will display a progress bar, you should load the image here.
            this.game.load.image('loading', 'assets/loading.png');
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
    HiLoProject.Boot = Boot;
})(HiLoProject || (HiLoProject = {}));
var HiLoProject;
(function (HiLoProject) {
    var GameOver = (function (_super) {
        __extends(GameOver, _super);
        function GameOver() {
            _super.apply(this, arguments);
            this.score = 0;
        }
        GameOver.prototype.init = function (score) {
            console.log((new Date).toISOString() + ' : Entered GameOver init()');
            // init can receive parameters.
            this.score = score;
        };
        GameOver.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered GameOver preload()');
            // Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
        };
        GameOver.prototype.loadUpdate = function () {
            // Called while assets are being loaded.
        };
        GameOver.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered GameOver create()');
            var gameOverTitle = this.game.add.sprite(160, 160, 'gameover');
            gameOverTitle.anchor.setTo(0.5);
            var finalScore = this.game.add.text(this.game.width / 2, this.game.height / 2, this.score.toString() + ' correct', { fill: '#fff', fontSize: '32px' });
            finalScore.anchor.setTo(0.5);
            var playButton = this.game.add.button(160, 320, 'play', this.playGame, this);
        };
        GameOver.prototype.paused = function () {
            console.log((new Date).toISOString() + ' : Entered GameOver paused()');
        };
        GameOver.prototype.resumed = function () {
            console.log((new Date).toISOString() + ' : Entered GameOver resumed()');
        };
        GameOver.prototype.shutdown = function () {
            console.log((new Date).toISOString() + ' : Entered GameOver shutdown()');
        };
        GameOver.prototype.playGame = function () {
            this.game.state.start('TheGame');
        };
        return GameOver;
    })(Phaser.State);
    HiLoProject.GameOver = GameOver;
})(HiLoProject || (HiLoProject = {}));
var HiLoProject;
(function (HiLoProject) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered MainMenu create()');
            // Handle user input as needed.
            var gameTitle = this.game.add.sprite(160, 160, 'gametitle');
            gameTitle.anchor.setTo(0.5);
            var playButton = this.game.add.button(160, 320, 'play', this.playGame, this);
            playButton.anchor.setTo(0.5);
        };
        MainMenu.prototype.playGame = function () {
            this.game.state.start('TheGame');
        };
        return MainMenu;
    })(Phaser.State);
    HiLoProject.MainMenu = MainMenu;
})(HiLoProject || (HiLoProject = {}));
var HiLoProject;
(function (HiLoProject) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered Preloader preload()');
            var loadingBar = this.add.sprite(160, 240, 'loading');
            loadingBar.anchor.setTo(0.5);
            // If your game uses a graphic while assets are loaded, you would create the sprite and then display it via the below.
            this.load.setPreloadSprite(loadingBar);
            // Load the actual assets. By default the path will be set to the assets directory.
            this.load.path = 'assets/';
            // Assets loaded here can include image and audio files, as well as sprite sheets and more.
            this.game.load.spritesheet('numbers', 'numbers.png', 100, 100);
            this.game.load.image('gametitle');
            this.game.load.image('play');
            this.game.load.image('higher');
            this.game.load.image('lower');
            this.game.load.image('gameover');
        };
        Preloader.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Preloader create()');
            // Once the assets have been preloaded you can move to the next state.
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    HiLoProject.Preloader = Preloader;
})(HiLoProject || (HiLoProject = {}));
var HiLoProject;
(function (HiLoProject) {
    var TheGame = (function (_super) {
        __extends(TheGame, _super);
        function TheGame() {
            _super.apply(this, arguments);
            this.spriteNumber = null;
            this.number = 0;
            this.workingButtons = true;
            this.higher = true;
            this.score = 0;
        }
        TheGame.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered TheGame init()');
            // init can receive parameters.
        };
        TheGame.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered TheGame preload()');
            // Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
        };
        TheGame.prototype.loadUpdate = function () {
            // Called while assets are being loaded.
        };
        TheGame.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered TheGame create()');
            this.number = Math.floor(Math.random() * 10);
            this.spriteNumber = this.game.add.sprite(160, 240, 'numbers');
            this.spriteNumber.anchor.setTo(0.5);
            this.spriteNumber.frame = this.number;
            var higherButton = this.game.add.button(160, 100, 'higher', this.clickedHigher, this);
            higherButton.anchor.setTo(0.5);
            var lowerButton = this.game.add.button(160, 380, 'lower', this.clickedLower, this);
            lowerButton.anchor.setTo(0.5);
        };
        TheGame.prototype.update = function () {
        };
        TheGame.prototype.paused = function () {
            console.log((new Date).toISOString() + ' : Entered TheGame paused()');
        };
        TheGame.prototype.pauseUpdate = function () {
        };
        TheGame.prototype.resumed = function () {
            console.log((new Date).toISOString() + ' : Entered TheGame resumed()');
        };
        TheGame.prototype.shutdown = function () {
            console.log((new Date).toISOString() + ' : Entered TheGame shutdown()');
        };
        TheGame.prototype.clickedHigher = function () {
            this.higher = true;
            this.tweenNumber(true);
        };
        TheGame.prototype.clickedLower = function () {
            this.higher = false;
            this.tweenNumber(false);
        };
        TheGame.prototype.tweenNumber = function (higher) {
            if (this.workingButtons) {
                this.workingButtons = false;
                var exitTween = this.game.add.tween(this.spriteNumber)
                    .to({ x: 420 }, 500);
                exitTween.onComplete.add(this.exitNumber, this);
                exitTween.start();
            }
        };
        TheGame.prototype.exitNumber = function () {
            this.spriteNumber.x = -180;
            this.spriteNumber.frame = Math.floor(Math.random() * 10);
            var enterTween = this.game.add.tween(this.spriteNumber)
                .to({ x: 160 }, 500);
            enterTween.onComplete.add(this.enterNumber, this);
            enterTween.start();
        };
        TheGame.prototype.enterNumber = function () {
            this.workingButtons = true;
            if ((this.higher && this.spriteNumber.frame < this.number)
                || (!this.higher && this.spriteNumber.frame > this.number)) {
                this.game.state.start('GameOver', true, false, this.score);
            }
            else {
                this.score++;
                this.number = this.spriteNumber.frame;
            }
        };
        return TheGame;
    })(Phaser.State);
    HiLoProject.TheGame = TheGame;
})(HiLoProject || (HiLoProject = {}));
//# sourceMappingURL=app.js.map