var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BoidsProject;
(function (BoidsProject) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // Define static/constant variables here, as needed. Reference later by Game.SOME_VARIABLE.
        //static SOME_VARIABLE: number = 10;
        function Game() {
            console.log((new Date).toISOString() + ' : Entered Game constructor()');
            // Update the width (800) and height (600) accordingly.
            _super.call(this, 800, 600, Phaser.AUTO, 'content');
            // Add the game states.
            this.state.add('Boot', BoidsProject.Boot);
            this.state.add('Preloader', BoidsProject.Preloader);
            this.state.add('MainMenu', BoidsProject.MainMenu);
            this.state.add('FlockingBehavior', BoidsProject.FlockingBehavior);
            this.state.add('SteeringBehavior', BoidsProject.SteeringBehavior);
            // Start the initial game state.
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    BoidsProject.Game = Game;
})(BoidsProject || (BoidsProject = {}));
window.onload = function () {
    var game = new BoidsProject.Game();
};
var BoidsProject;
(function (BoidsProject) {
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
    BoidsProject.Boot = Boot;
})(BoidsProject || (BoidsProject = {}));
var BoidsProject;
(function (BoidsProject) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered MainMenu create()');
            // Handle user input as needed.
            //this.game.state.start('FlockingBehavior');
            this.game.state.start('SteeringBehavior');
        };
        return MainMenu;
    })(Phaser.State);
    BoidsProject.MainMenu = MainMenu;
})(BoidsProject || (BoidsProject = {}));
var BoidsProject;
(function (BoidsProject) {
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
            this.load.image('boid');
            this.load.image('target');
        };
        Preloader.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered Preloader create()');
            // Once the assets have been preloaded you can move to the next state.
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    BoidsProject.Preloader = Preloader;
})(BoidsProject || (BoidsProject = {}));
var BoidsProject;
(function (BoidsProject) {
    var SteeringBehavior = (function (_super) {
        __extends(SteeringBehavior, _super);
        function SteeringBehavior() {
            _super.apply(this, arguments);
            this.boidsAmount = 5;
            this.boids = [];
        }
        SteeringBehavior.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered SteeringBehavior init()');
            // init can receive parameters.
        };
        SteeringBehavior.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered SteeringBehavior preload()');
            // Recommendation is to limit calls to the Phaser Loader only. (Interphase 1, pg 29)
        };
        SteeringBehavior.prototype.loadUpdate = function () {
            // Called while assets are being loaded.
        };
        SteeringBehavior.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered SteeringBehavior create()');
            this.target = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'target');
            this.target.anchor.setTo(0.5);
            for (var i = 0; i < this.boidsAmount; i++) {
                var randomPoint = new Phaser.Point(this.game.rnd.between(0, this.game.width - 1), this.game.rnd.between(0, this.game.height - 1));
                this.boids[i] = this.game.add.sprite(randomPoint.x, randomPoint.y, 'boid');
                this.boids[i].anchor.setTo(0.5);
                this.boids[i].speed = this.game.rnd.between(50, 150);
                this.boids[i].force = this.game.rnd.between(5, 25);
                this.game.physics.enable(this.boids[i], Phaser.Physics.ARCADE);
                this.boids[i].body.allowRotation = false;
            }
        };
        SteeringBehavior.prototype.update = function () {
            for (var i = 0; i < this.boidsAmount; i++) {
                // Direction vector from the current boid to the target.
                var direction = new Phaser.Point(this.target.x, this.target.y);
                // Subtract the current boid's location.
                direction.subtract(this.boids[i].x, this.boids[i].y);
                // Normalize - vector length is 1 but direction remains the same.
                direction.normalize();
                // Set length equal to the boid's speed.
                direction.setMagnitude(this.boids[i].speed);
                // Subtract current velocity.
                direction.subtract(this.boids[i].body.velocity.x, this.boids[i].body.velocity.y);
                direction.normalize();
                // Now set magnitude equal to force.
                direction.setMagnitude(this.boids[i].force);
                this.boids[i].body.velocity.add(direction.x, direction.y);
                this.boids[i].body.velocity.normalize();
                (this.boids[i].body).velocity.setMagnitude(this.boids[i].speed);
                this.boids[i].angle = 180 + Phaser.Math.radToDeg(Phaser.Point.angle(this.boids[i].position, new Phaser.Point(this.boids[i].x + this.boids[i].body.velocity.x, this.boids[i].y + this.boids[i].body.velocity.y)));
                if (this.boids[i].position.distance(this.target.position) < 2) {
                    this.target.x = this.game.rnd.between(10, this.game.width - 10);
                    this.target.y = this.game.rnd.between(10, this.game.height - 10);
                }
            }
        };
        SteeringBehavior.prototype.paused = function () {
            console.log((new Date).toISOString() + ' : Entered SteeringBehavior paused()');
        };
        SteeringBehavior.prototype.pauseUpdate = function () {
        };
        SteeringBehavior.prototype.resumed = function () {
            console.log((new Date).toISOString() + ' : Entered SteeringBehavior resumed()');
        };
        SteeringBehavior.prototype.shutdown = function () {
            console.log((new Date).toISOString() + ' : Entered SteeringBehavior shutdown()');
        };
        return SteeringBehavior;
    })(Phaser.State);
    BoidsProject.SteeringBehavior = SteeringBehavior;
})(BoidsProject || (BoidsProject = {}));
var BoidsProject;
(function (BoidsProject) {
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
    BoidsProject.ExampleState = ExampleState;
})(BoidsProject || (BoidsProject = {}));
var BoidsProject;
(function (BoidsProject) {
    var FlockingBehavior = (function (_super) {
        __extends(FlockingBehavior, _super);
        function FlockingBehavior() {
            _super.apply(this, arguments);
            // Number of boids.
            this.boidsAmount = 50;
            // Speed of each boid, in pixels per second.
            this.boidSpeed = 100;
            // Boid sight radius.
            this.boidRadius = 50;
            // Boids.
            this.boids = [];
        }
        FlockingBehavior.prototype.init = function () {
            console.log((new Date).toISOString() + ' : Entered FlockingBehavior init()');
            // init can receive parameters.
        };
        FlockingBehavior.prototype.preload = function () {
            console.log((new Date).toISOString() + ' : Entered FlockingBehavior preload()');
        };
        FlockingBehavior.prototype.loadUpdate = function () {
            // Called while assets are being loaded.
        };
        FlockingBehavior.prototype.create = function () {
            console.log((new Date).toISOString() + ' : Entered FlockingBehavior create()');
            for (var i = 0; i < this.boidsAmount; i++) {
                var randomPoint = new Phaser.Point(this.game.rnd.between(0, this.game.width - 1), this.game.rnd.between(0, this.game.height - 1));
                this.boids[i] = {
                    position: randomPoint,
                    asset: this.game.add.sprite(randomPoint.x, randomPoint.y, 'boid')
                };
                this.boids[i].asset.anchor.set(0.5);
                // Enable physics.
                this.game.physics.enable(this.boids[i].asset, Phaser.Physics.ARCADE);
                // Allow boids to rotate.
                this.boids[i].asset.body.allowRotation = false;
            }
        };
        FlockingBehavior.prototype.update = function () {
            // Used to calculate the centroid.
            var centroidArray = [];
            // Loop through each boid.
            for (var i = 0; i < this.boidsAmount; i++) {
                // Next loop through each boid.
                for (var j = 0; j < this.boidsAmount; j++) {
                    // See if the boid is different, and within the sight radius.
                    if (i != j && this.boids[i].position.distance(this.boids[j].position) < this.boidRadius) {
                        // Keep track of it.
                        centroidArray.push(this.boids[j].position);
                    }
                }
                var centroid;
                // If there are any boids nearby, determine the midpoint.
                if (centroidArray.length > 0) {
                    centroid = Phaser.Point.centroid(centroidArray);
                }
                else {
                    // Use a random point.
                    centroid = new Phaser.Point(this.game.rnd.between(0, this.game.width - 1), this.game.rnd.between(0, this.game.height - 1));
                }
                // Rotate the boid towards the centroid.
                this.boids[i].asset.angle = this.boids[i].position.angle(centroid, true);
                // Move towards the centroid.
                this.game.physics.arcade.moveToXY(this.boids[i].asset, centroid.x, centroid.y, this.boidSpeed);
                // Update the stored position.
                this.boids[i].position.set(this.boids[i].asset.x, this.boids[i].asset.y);
            }
        };
        FlockingBehavior.prototype.paused = function () {
            console.log((new Date).toISOString() + ' : Entered FlockingBehavior paused()');
        };
        FlockingBehavior.prototype.pauseUpdate = function () {
        };
        FlockingBehavior.prototype.resumed = function () {
            console.log((new Date).toISOString() + ' : Entered FlockingBehavior resumed()');
        };
        FlockingBehavior.prototype.shutdown = function () {
            console.log((new Date).toISOString() + ' : Entered FlockingBehavior shutdown()');
        };
        return FlockingBehavior;
    })(Phaser.State);
    BoidsProject.FlockingBehavior = FlockingBehavior;
})(BoidsProject || (BoidsProject = {}));
//# sourceMappingURL=app.js.map