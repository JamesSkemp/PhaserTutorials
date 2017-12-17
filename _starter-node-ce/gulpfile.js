var gulp = require("gulp");
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var browserify = require("browserify");
var tsify = require("tsify");
var source = require("vinyl-source-stream");
var glob = require("glob");
var buffer = require("vinyl-buffer");

var paths = {
	content: [
		"src/assets/**/*",
		"src/plugins/**/*",
		"src/app.css",
		"src/favicon.ico",
		"src/*.html"
	]
};

gulp.task("copy-html", function () {
	return gulp.src(paths.content, { base: "src" })
		.pipe(gulp.dest('dist'));
});

gulp.task("copy-phaser", function () {
	return gulp.src("./node_modules/phaser-ce/build/phaser.min.js")
		.pipe(gulp.dest('dist/lib'));
});

gulp.task("default", ["copy-html", "copy-phaser"], function () {
	var typeScriptFiles = glob.sync('./src/ts/**/*.ts');
	return browserify({
		basedir: '.',
		debug: false,
		entries: [typeScriptFiles],
		//entries: ["src/ts/Game.ts"],
		extensions: ["*.ts"]
	})
		.plugin(tsify)
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(gulp.dest('dist'));
});
